import { describe, it, expect } from 'vitest';
import {
  SHADER_MODES,
  modeToUniform,
  isShaderMode,
  resolveCellSize,
  MIN_CELL,
  type ShaderMode,
} from '../src/lib/shader';

describe('modeToUniform', () => {
  it('mappe chaque mode sur son index dans SHADER_MODES', () => {
    expect(modeToUniform('ascii')).toBe(0);
    expect(modeToUniform('dots')).toBe(1);
    expect(modeToUniform('squares')).toBe(2);
  });

  it('produit des entiers uniques et contigus pour tous les modes', () => {
    const ids = SHADER_MODES.map(modeToUniform);
    expect(new Set(ids).size).toBe(SHADER_MODES.length);
    expect(ids).toEqual([...ids].sort((a, b) => a - b));
    ids.forEach((id) => expect(Number.isInteger(id)).toBe(true));
  });
});

describe('isShaderMode', () => {
  it('accepte les modes connus', () => {
    SHADER_MODES.forEach((m: ShaderMode) => expect(isShaderMode(m)).toBe(true));
  });

  it('rejette les valeurs inconnues ou non-string', () => {
    expect(isShaderMode('ASCII')).toBe(false);
    expect(isShaderMode('glitch')).toBe(false);
    expect(isShaderMode('')).toBe(false);
    expect(isShaderMode(0)).toBe(false);
    expect(isShaderMode(null)).toBe(false);
    expect(isShaderMode(undefined)).toBe(false);
  });
});

describe('resolveCellSize', () => {
  it('resolution (colonnes) → width / resolution', () => {
    expect(resolveCellSize(600, 60, 8)).toBe(10);
    expect(resolveCellSize(800, 100, 8)).toBe(8);
  });

  it('resolution l’emporte sur grid', () => {
    expect(resolveCellSize(600, 60, 999)).toBe(10);
  });

  it('retombe sur grid (px) si resolution absente ou ≤ 0', () => {
    expect(resolveCellSize(600, undefined, 8)).toBe(8);
    expect(resolveCellSize(600, 0, 12)).toBe(12);
    expect(resolveCellSize(600, -5, 12)).toBe(12);
  });

  it('clampe à MIN_CELL', () => {
    expect(resolveCellSize(600, 100000, 8)).toBe(MIN_CELL); // colonnes énormes → cellule < 2px
    expect(resolveCellSize(600, undefined, 1)).toBe(MIN_CELL); // grid sous le minimum
  });
});
