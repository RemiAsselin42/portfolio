# Portfolio — Rémi Asselin

Refonte **v2** (branche `v2`). La version en ligne sur [remiasselin.com](https://remiasselin.com) reste servie par `main` jusqu'à ce que la v2 la remplace.

## Stack

- **Astro 5** + îlots **React 19** (TypeScript strict)
- **react-three-fiber + drei + postprocessing** — effet ASCII/« shader » (hero)
- **Content Collections** (Zod) — `src/content/{projects,experiences,education}`
- **Vitest** (unitaire) · **Playwright + axe** (e2e + a11y)
- **@astrojs/sitemap** · `astro:assets` · `<ClientRouter />` (View Transitions)
- Polices système (RGPD-safe) · zéro cookie/traceur · formulaire via service EU

## Scripts

```bash
npm run dev        # serveur de dev (http://localhost:4321)
npm run build      # build de prod → dist/
npm run preview    # prévisualise le build
npm test           # tests unitaires (Vitest)
npm run test:e2e   # tests e2e + a11y (Playwright) — nécessite `npx playwright install`
npm run check      # astro check (types)
npm run lint       # eslint
```

## Architecture de l'effet visuel

Pass **GLSL post-process** (un seul contexte WebGL, sans dépendance) appliqué **en place**
sur n'importe quel élément texte. Inspiré du prototype `peoniap5` (modes per-cellule +
glitch), porté du CPU au GPU.

```astro
<h1 class="hero__title">Rémi Asselin</h1>
<HeroShader client:only="react" />   <!-- = <Shaderize selector="h1.hero__title" mode="squares" glitch /> -->
```

- `src/components/visual/Shaderize.tsx` — API « shaderise en place » : cible un élément par
  `selector` (texte **ou** `<img>`), le capture en texture, superpose un `<canvas>` transparent
  sur sa boîte et le rend en `mode` + `glitch`. L'élément réel est conservé (SSR/SEO/a11y) ;
  il est juste masqué (texte → `color: transparent`, image → `opacity: 0`). Canvas
  `aria-hidden` + `pointer-events: none`.
- `src/components/visual/elementTexture.ts` — `captureElement()` dispatche : **texte** → lit
  `textContent` + style calculé → texture blanc-sur-noir **exacte** (le canvas 2D partage les
  polices de la page) ; **image** → `TextureLoader` (CORS `anonymous`), couleurs d'origine.
- `src/components/visual/ShaderSurface.tsx` — surface bas niveau réutilisable :
  `<ShaderSurface texture mode glitch grid tint />`, `<Canvas>` transparent + pass.
- `src/components/visual/HeroShader.tsx` — îlot du hero, configure `Shaderize` sur le `<h1>`.
- `src/components/visual/useShaderPass.ts` — quad plein écran échantillonnant la texture
  source (sortie alpha prémultiplié → compositing en place), piloté par uniforms.
- `src/components/visual/shaders.ts` — vertex/fragment ; un fragment couvre les trois modes
  + glitch. `asciiAtlas.ts` — atlas de glyphes (rampe sombre→clair) pour le mode ASCII.

**Modes** (`mode`) : `ascii` (atlas de glyphes), `dots` (halftone, rayon ∝ luminosité),
`squares` (mosaïque). **Glitch** (`glitch`) : `false` | `true` (auto, façon peonia) |
intensité `[0, 1]` → décalage de tranches horizontales + aberration chromatique.
**Résolution** : `resolution` = nombre de cellules sur la largeur (densité cohérente quelle
que soit la taille de l'élément) ; `grid` = taille de cellule en px (override avancé) ;
`resolution` l'emporte (cf. `resolveCellSize`).
`prefers-reduced-motion` → pas d'overlay, le texte normal s'affiche.

Logique pure isolée et testée dans `src/lib/` : `ascii.ts` (luminance, rampe),
`shader.ts` (mapping mode ↔ uniform), `glitch.ts` (enveloppe d'intensité),
`color.ts` (couleur CSS → uniform).

> **Roadmap :** la capture gère le **texte** (au pixel près) et les **images** (URL → texture).
> Le HTML arbitraire (dégradés, bordures, enfants) demanderait un snapshot (`foreignObject` ou
> `html-to-image`) — il s'ajouterait au dispatch de `captureElement`.

## Infra / déploiement

- GitHub Pages via `.github/workflows/main.yml` (push sur `main`). Astro build → `dist/` : compatible tel quel.
- Domaine : `public/CNAME`. SEO : `public/robots.txt` + sitemap généré (`/sitemap-index.xml`).

## Récupérer la v1

```bash
git checkout v1                 # ancien portfolio (React/Vite)
git checkout v1 -- <chemin>     # un fichier précis
```
