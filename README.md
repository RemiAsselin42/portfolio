# Portfolio — Rémi Asselin

Refonte (v2) en cours. La version actuellement en ligne sur [remiasselin.com](https://remiasselin.com) reste servie par la branche `main` ; cette branche `v2` la remplacera une fois prête.

## Infra conservée

- **Déploiement** : GitHub Pages via `.github/workflows/main.yml` (déclenché au push sur `main`).
- **Domaine** : `public/CNAME` → `remiasselin.com`.
- **SEO** : `public/robots.txt`, `public/sitemap.xml`.

> ⚠️ Le workflow build suppose `npm run build` → `./dist`. À adapter au step `Build` si la nouvelle stack diffère (commande et dossier de sortie).

## Récupérer l'ancienne version

Tout l'historique v1 est sur la branche `main` et le tag `v1` :

```bash
git checkout v1                 # voir l'ancien portfolio
git checkout v1 -- <chemin>     # récupérer un fichier précis
```
