// Installe le hook pre-commit versionné (.githooks/pre-commit) dans .git/hooks,
// SANS toucher à core.hooksPath — pour préserver d'éventuels hooks existants
// (post-checkout, post-commit, …). Lancé par "prepare" à chaque `npm install`.
// No-op hors dépôt git (tarball, CI sans .git).
import { existsSync, mkdirSync, copyFileSync, chmodSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '.githooks', 'pre-commit');
const hooksDir = join(root, '.git', 'hooks');

if (!existsSync(join(root, '.git')) || !existsSync(src)) process.exit(0);

mkdirSync(hooksDir, { recursive: true });
copyFileSync(src, join(hooksDir, 'pre-commit'));
try {
  chmodSync(join(hooksDir, 'pre-commit'), 0o755);
} catch {
  /* chmod inutile/indisponible sous Windows */
}
console.log('[hooks] pre-commit (fallow) installé dans .git/hooks');
