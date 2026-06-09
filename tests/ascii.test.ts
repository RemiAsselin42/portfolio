import { describe, it, expect } from 'vitest';
import { luma, glyphForBrightness, ASCII_RAMP } from '../src/lib/ascii';

describe('luma (Rec. 601)', () => {
  it('blanc → 1, noir → 0', () => {
    expect(luma(255, 255, 255)).toBeCloseTo(1);
    expect(luma(0, 0, 0)).toBe(0);
  });

  it('pondère le vert plus fort que le rouge, le rouge plus que le bleu', () => {
    expect(luma(0, 255, 0)).toBeCloseTo(0.587);
    expect(luma(255, 0, 0)).toBeCloseTo(0.299);
    expect(luma(0, 0, 255)).toBeCloseTo(0.114);
    expect(luma(0, 255, 0)).toBeGreaterThan(luma(255, 0, 0));
    expect(luma(255, 0, 0)).toBeGreaterThan(luma(0, 0, 255));
  });
});

describe('glyphForBrightness', () => {
  it('mappe les bornes sur les extrémités de la rampe', () => {
    expect(glyphForBrightness(0)).toBe(ASCII_RAMP[0]);
    expect(glyphForBrightness(1)).toBe(ASCII_RAMP[ASCII_RAMP.length - 1]);
  });

  it('clampe les valeurs hors [0,1]', () => {
    expect(glyphForBrightness(-3)).toBe(ASCII_RAMP[0]);
    expect(glyphForBrightness(42)).toBe(ASCII_RAMP[ASCII_RAMP.length - 1]);
  });

  it('renvoie toujours un seul caractère de la rampe', () => {
    for (let b = 0; b <= 1.0001; b += 0.05) {
      const g = glyphForBrightness(b);
      expect(g).toHaveLength(1);
      expect(ASCII_RAMP).toContain(g);
    }
  });
});
