import { describe, it, expect } from 'vitest';
import { cssColorToVec3 } from '../src/lib/color';

describe('cssColorToVec3', () => {
  it('parse rgb()', () => {
    expect(cssColorToVec3('rgb(255, 0, 0)')).toEqual([1, 0, 0]);
    expect(cssColorToVec3('rgb(0, 0, 0)')).toEqual([0, 0, 0]);
  });

  it('parse rgba() en ignorant l’alpha', () => {
    const [r, g, b] = cssColorToVec3('rgba(0, 128, 255, 0.5)');
    expect(r).toBe(0);
    expect(g).toBeCloseTo(128 / 255, 5);
    expect(b).toBe(1);
  });

  it('parse #rrggbb et #rgb', () => {
    expect(cssColorToVec3('#ffffff')).toEqual([1, 1, 1]);
    expect(cssColorToVec3('#000')).toEqual([0, 0, 0]);
    const [r, g, b] = cssColorToVec3('#ff8800');
    expect(r).toBe(1);
    expect(g).toBeCloseTo(136 / 255, 5);
    expect(b).toBe(0);
  });

  it('clampe les composantes hors plage', () => {
    expect(cssColorToVec3('rgb(300, -20, 128)')).toEqual([1, 0, 128 / 255]);
  });

  it('retourne le fallback (blanc) sur entrée invalide', () => {
    expect(cssColorToVec3('chartreuse')).toEqual([1, 1, 1]);
    expect(cssColorToVec3('')).toEqual([1, 1, 1]);
    expect(cssColorToVec3('not a color', [0, 0, 0])).toEqual([0, 0, 0]);
  });
});
