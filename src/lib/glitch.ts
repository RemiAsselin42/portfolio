/**
 * Enveloppe d'intensité du glitch — logique pure, testée unitairement.
 *
 * Le rendu visuel du glitch (décalage de tranches horizontales + aberration
 * chromatique) vit dans le fragment shader ; ce module ne produit que le
 * *scalaire d'intensité* [0, 1] qui pilote l'uniform `uGlitch` au fil du temps.
 *
 * Repris de `peoniap5/js/glitch.js` (déclenchement sur timer aléatoire + à la
 * demande, puis décroissance douce), mais réduit à une enveloppe headless : pas
 * de p5, pas de DOM, RNG injectable → déterministe et testable.
 */

export interface GlitchEnvelopeOptions {
  /** Source d'aléa dans [0, 1). Injectable pour des tests déterministes. Défaut : `Math.random`. */
  rng?: () => number;
  /** Borne basse de l'intervalle (s) entre deux tirages de déclenchement. Défaut : 3. */
  minGap?: number;
  /** Borne haute de l'intervalle (s) entre deux tirages. Défaut : 7. */
  maxGap?: number;
  /** Probabilité qu'un tirage déclenche réellement un glitch. Défaut : 0.4. */
  chance?: number;
  /** Taux de décroissance exponentielle de l'intensité (plus grand = plus court). Défaut : 6. */
  decay?: number;
}

export interface GlitchEnvelope {
  /**
   * Avance l'enveloppe de `dt` secondes et renvoie l'intensité courante [0, 1].
   * Déclenche automatiquement un glitch quand le timer interne expire.
   */
  update(dt: number): number;
  /** Force un glitch immédiat. `intensity` (défaut aléatoire ∈ [0.4, 1]) ne fait que *monter* l'enveloppe. */
  trigger(intensity?: number): void;
}

/** En-deçà de ce seuil, l'intensité est ramenée à 0 (évite une traîne infinitésimale). */
const EPSILON = 0.01;

/**
 * Résout l'intensité de glitch [0, 1] à appliquer cette frame, selon la prop :
 * - `false` → 0 (sans toucher à l'enveloppe) ;
 * - `true`  → avance l'{@link GlitchEnvelope} auto-déclenchée de `delta` s ;
 * - nombre  → intensité constante clampée.
 *
 * Extrait du frame loop pour garder la boucle de rendu plate (complexité basse)
 * et tester la décision sans WebGL.
 */
export function resolveGlitchIntensity(
  glitch: boolean | number,
  envelope: GlitchEnvelope,
  delta: number,
): number {
  if (glitch === true) return envelope.update(delta);
  if (typeof glitch === 'number') return Math.min(1, Math.max(0, glitch));
  return 0;
}

/**
 * Crée une enveloppe de glitch auto-déclenchée.
 *
 * Modèle : un timer compte à rebours depuis un intervalle aléatoire `[minGap,
 * maxGap]` ; à expiration il se recharge et, avec probabilité `chance`, monte
 * l'intensité à une valeur aléatoire ∈ [0.4, 1]. Entre deux déclenchements
 * l'intensité décroît exponentiellement (`exp(-dt·decay)`).
 */
export function createGlitchEnvelope(options: GlitchEnvelopeOptions = {}): GlitchEnvelope {
  const rng = options.rng ?? Math.random;
  const minGap = options.minGap ?? 3;
  const maxGap = options.maxGap ?? 7;
  const chance = options.chance ?? 0.4;
  const decay = options.decay ?? 6;

  const nextGap = () => minGap + rng() * (maxGap - minGap);
  let timer = nextGap();
  let intensity = 0;

  const trigger: GlitchEnvelope['trigger'] = (i) => {
    const target = i ?? 0.4 + rng() * 0.6;
    // On ne fait que monter : un nouveau déclenchement n'écrase pas un glitch plus fort en cours.
    intensity = Math.min(1, Math.max(intensity, target));
  };

  return {
    trigger,
    update(dt) {
      timer -= dt;
      if (timer <= 0) {
        timer = nextGap();
        if (rng() < chance) trigger();
      }
      if (intensity > 0) {
        intensity *= Math.exp(-dt * decay);
        if (intensity < EPSILON) intensity = 0;
      }
      return intensity;
    },
  };
}
