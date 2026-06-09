import { describe, it, expect } from 'vitest';
import { isRenderableSize } from '../src/lib/canvas';

describe('isRenderableSize', () => {
  it('accepte des dimensions finies strictement positives', () => {
    expect(isRenderableSize(1600, 900)).toBe(true);
    expect(isRenderableSize(1, 1)).toBe(true);
  });

  it('rejette 0 et les valeurs négatives', () => {
    expect(isRenderableSize(0, 900)).toBe(false);
    expect(isRenderableSize(1600, 0)).toBe(false);
    expect(isRenderableSize(-1, 900)).toBe(false);
  });

  it('rejette NaN et Infinity', () => {
    expect(isRenderableSize(NaN, 900)).toBe(false);
    expect(isRenderableSize(1600, NaN)).toBe(false);
    expect(isRenderableSize(Infinity, 900)).toBe(false);
    expect(isRenderableSize(1600, Infinity)).toBe(false);
  });
});
