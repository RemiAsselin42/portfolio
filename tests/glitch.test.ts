import { describe, it, expect } from 'vitest';
import { createGlitchEnvelope, resolveGlitchIntensity } from '../src/lib/glitch';

/** RNG déterministe : renvoie successivement les valeurs fournies, puis répète la dernière. */
function seq(...values: number[]): () => number {
  let i = 0;
  return () => values[Math.min(i++, values.length - 1)];
}

describe('createGlitchEnvelope', () => {
  it('reste à 0 tant que rien ne déclenche', () => {
    // rng = 0 → timer initial = minGap (3 s) ; un seul update court ne l'atteint pas.
    const env = createGlitchEnvelope({ rng: seq(0) });
    expect(env.update(0.1)).toBe(0);
  });

  it('trigger monte l’intensité dans [0, 1] puis décroît vers 0', () => {
    const env = createGlitchEnvelope({ rng: seq(0), decay: 6 });
    env.trigger(1);
    const a = env.update(0); // lit l'intensité sans décroissance
    expect(a).toBeCloseTo(1, 5);

    const b = env.update(0.1);
    expect(b).toBeGreaterThan(0);
    expect(b).toBeLessThan(a);

    // Au bout d'assez de temps, l'enveloppe retombe exactement à 0 (seuil EPSILON).
    let v = b;
    for (let k = 0; k < 50; k++) v = env.update(0.1);
    expect(v).toBe(0);
  });

  it('trigger ne fait que monter (n’écrase pas un glitch plus fort)', () => {
    const env = createGlitchEnvelope({ rng: seq(0) });
    env.trigger(0.9);
    env.trigger(0.2);
    expect(env.update(0)).toBeCloseTo(0.9, 5);
  });

  it('clampe l’intensité à 1', () => {
    const env = createGlitchEnvelope();
    env.trigger(5);
    expect(env.update(0)).toBe(1);
  });

  it('auto-déclenche quand le timer expire et que le tirage passe sous `chance`', () => {
    // 1er rng → timer = minGap=2. update(2.0) l'épuise → recharge (2e rng) puis
    // test chance (3e rng=0 < 0.5) → trigger (4e rng → intensité).
    // decay:0 → on isole le chemin de déclenchement (pas de décroissance sur le grand dt).
    const env = createGlitchEnvelope({
      rng: seq(0, 0, 0, 0),
      minGap: 2,
      maxGap: 2,
      chance: 0.5,
      decay: 0,
    });
    const v = env.update(2.0);
    expect(v).toBeGreaterThan(0);
  });

  it('n’auto-déclenche pas quand le tirage est au-dessus de `chance`', () => {
    const env = createGlitchEnvelope({
      rng: seq(0, 0, 0.99),
      minGap: 2,
      maxGap: 2,
      chance: 0.5,
    });
    expect(env.update(2.0)).toBe(0);
  });
});

describe('resolveGlitchIntensity', () => {
  // Enveloppe espionne : trace les appels update() sans dépendre de l'aléa.
  const spyEnv = () => {
    let calls = 0;
    return {
      get calls() {
        return calls;
      },
      trigger() {},
      update() {
        calls++;
        return 0.5;
      },
    };
  };

  it('false → 0 sans avancer l’enveloppe', () => {
    const env = spyEnv();
    expect(resolveGlitchIntensity(false, env, 0.016)).toBe(0);
    expect(env.calls).toBe(0);
  });

  it('true → délègue à env.update', () => {
    const env = spyEnv();
    expect(resolveGlitchIntensity(true, env, 0.016)).toBe(0.5);
    expect(env.calls).toBe(1);
  });

  it('nombre → intensité constante clampée [0, 1]', () => {
    const env = spyEnv();
    expect(resolveGlitchIntensity(0.3, env, 0.016)).toBeCloseTo(0.3, 5);
    expect(resolveGlitchIntensity(-2, env, 0.016)).toBe(0);
    expect(resolveGlitchIntensity(5, env, 0.016)).toBe(1);
    expect(env.calls).toBe(0);
  });
});
