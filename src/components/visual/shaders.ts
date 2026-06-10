/**
 * Sources GLSL du pass post-process « shaderise » — un seul fragment couvre les
 * trois modes (ASCII / dots / squares) plus le glitch, sélectionnés par uniforms.
 *
 * Pourquoi un fragment unique : tout dérive d'UNE texture source (`uSource`) ; le
 * glitch (décalage de tranche + aberration chromatique) se fait en décalant
 * simplement les UV d'échantillonnage — pas de ping-pong entre cibles. C'est le
 * portage GPU de la logique CPU per-cellule de `peoniap5/js/renderer.js` + `glitch.js`.
 *
 * Sortie en alpha prémultiplié : l'effet ne s'affiche QUE sur la silhouette de la
 * source (le reste est transparent) → compositing en place par-dessus n'importe
 * quel élément HTML, au lieu d'un panneau opaque.
 *
 * Exporté en chaînes TS (et non `.glsl`) pour rester importable sans plugin Vite.
 */

/** Vertex trivial d'un quad plein écran : les positions sont déjà en clip-space. */
export const SHADER_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * Fragment principal.
 *
 * Uniforms :
 * - `uSource`       texture de la source (texte rendu blanc-sur-noir, image, …).
 * - `uAscii`        atlas de glyphes (rampe sombre→clair, bande horizontale).
 * - `uAsciiCount`   nombre de glyphes dans l'atlas.
 * - `uResolution`   taille CSS px de la surface → densité de cellules indépendante du DPR.
 * - `uGrid`         taille d'une cellule en px.
 * - `uMode`         0=ASCII, 1=dots, 2=squares (cf. src/lib/shader.ts).
 * - `uTime`         temps (s) pour l'animation du glitch.
 * - `uGlitch`       intensité du glitch [0, 1] ; 0 = pass propre.
 * - `uTint`         couleur de sortie quand `uUseTint` = 1 (sinon couleur source).
 * - `uUseTint`      0/1 : teinter avec `uTint` (cas texte : couleur réelle de l'élément).
 * - `uAlphaFromLuma` 0/1 : alpha piloté par la luminance source (transparent hors silhouette).
 */
export const SHADER_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform sampler2D uSource;
uniform sampler2D uAscii;
uniform float uAsciiCount;
uniform vec2 uResolution;
uniform float uGrid;
uniform int uMode;
uniform float uTime;
uniform float uGlitch;
uniform vec3 uTint;
uniform float uUseTint;
uniform float uAlphaFromLuma;

// Luminance perçue Rec. 601 (vert >> rouge > bleu) — même pondération que src/lib/ascii.ts.
float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

// Hash scalaire → [0, 1), pour des tranches de glitch pseudo-aléatoires stables.
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

void main() {
  float cell = max(uGrid, 2.0);
  vec2 cells = uResolution / cell;     // nombre de cellules sur chaque axe
  vec2 uv = vUv;

  // --- Glitch : décalage horizontal par tranches ---------------------------
  // Des bandes horizontales glissent latéralement, certaines seulement, dans une
  // direction tirée au hash ; l'amplitude est pilotée par uGlitch. floor(uTime*12)
  // ré-échantillonne le hash ~12×/s pour que les tranches sautillent.
  if (uGlitch > 0.001) {
    float band = floor(uv.y * 16.0);
    float n = hash11(band + floor(uTime * 12.0));
    float gate = step(0.6, n);
    float dir = hash11(band * 1.7) < 0.5 ? -1.0 : 1.0;
    uv.x += gate * dir * (0.02 + 0.06 * n) * uGlitch;
  }

  // --- Coordonnées de cellule ----------------------------------------------
  vec2 cellId = floor(uv * cells);
  vec2 cellUv = fract(uv * cells);            // position locale 0..1 dans la cellule
  vec2 centerUv = (cellId + 0.5) / cells;     // centre de cellule en UV source

  // Couleur de la cellule, échantillonnée au centre. Sous glitch, split RGB
  // (aberration chromatique) : rouge/bleu décalés horizontalement.
  vec3 col;
  if (uGlitch > 0.001) {
    float ca = 0.004 * uGlitch;
    col = vec3(
      texture2D(uSource, centerUv + vec2(ca, 0.0)).r,
      texture2D(uSource, centerUv).g,
      texture2D(uSource, centerUv - vec2(ca, 0.0)).b
    );
  } else {
    col = texture2D(uSource, centerUv).rgb;
  }
  float b = clamp(luma(col), 0.0, 1.0);

  // --- Masque de forme selon le mode ---------------------------------------
  float mask;
  if (uMode == 0) {
    // ASCII : glyphe choisi par luminosité, échantillonné dans l'atlas.
    float idx = min(floor(b * uAsciiCount), uAsciiCount - 1.0);
    vec2 aUv = vec2((idx + cellUv.x) / uAsciiCount, cellUv.y);
    mask = texture2D(uAscii, aUv).r;
  } else if (uMode == 1) {
    // Dots : halftone, rayon ∝ luminosité (cf. peonia : 0.1 + bright*0.0033).
    float r = 0.5 * (0.12 + 0.86 * b);
    float d = distance(cellUv, vec2(0.5));
    float aa = fwidth(d);
    mask = 1.0 - smoothstep(r - aa, r + aa, d);
  } else {
    // Squares : mosaïque, carré plein avec léger interstice (0.93 comme peonia).
    vec2 g = step(vec2(0.035), cellUv) * step(cellUv, vec2(0.965));
    mask = g.x * g.y;
  }

  // --- Couleur + alpha de sortie -------------------------------------------
  vec3 color = mix(col, uTint, uUseTint);
  // Hors silhouette (luma ~ 0) → transparent, pour composer sur la page.
  float coverage = mix(1.0, smoothstep(0.04, 0.2, b), uAlphaFromLuma);
  float alpha = mask * coverage;

  // Alpha prémultiplié (le contexte WebGL de three l'est par défaut).
  gl_FragColor = vec4(color * alpha, alpha);
}
`;
