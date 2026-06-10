import * as THREE from 'three';
import { ASCII_RAMP } from '../../lib/ascii';

export interface AsciiAtlas {
  /** Bande horizontale de glyphes (1 ligne × `count` tuiles), filtrage NEAREST. */
  texture: THREE.CanvasTexture;
  /** Nombre de glyphes — alimente l'uniform `uAsciiCount`. */
  count: number;
}

/**
 * Construit un atlas de glyphes pour le mode ASCII du shader : chaque caractère
 * de la rampe (sombre→clair) est rendu blanc sur noir dans une tuile carrée,
 * juxtaposées horizontalement. Le fragment échantillonne la tuile `floor(b·count)`
 * puis lit `.r` comme masque (espace = tuile noire = cellule vide).
 *
 * Orientation : `flipY` par défaut (true) + dessin y-down → les glyphes
 * apparaissent à l'endroit quand on échantillonne avec `cellUv.y` brut.
 *
 * @param ramp Rampe de caractères, du plus sombre au plus clair. Défaut : {@link ASCII_RAMP}.
 * @param tile Côté d'une tuile en px (résolution du glyphe). Défaut : 64.
 */
export function makeAsciiAtlas(ramp: string = ASCII_RAMP, tile = 64): AsciiAtlas {
  const chars = [...ramp];
  const count = chars.length;

  const canvas = document.createElement('canvas');
  canvas.width = tile * count;
  canvas.height = tile;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${Math.round(tile * 0.8)}px "Courier New", monospace`;

  chars.forEach((ch, i) => {
    ctx.fillText(ch, i * tile + tile / 2, tile / 2);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return { texture, count };
}
