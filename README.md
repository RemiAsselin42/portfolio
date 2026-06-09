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

`src/components/visual/HeroShader.tsx` rend le texte dans une texture (police système, aligné gauche) puis lui applique l'ASCII via `<AsciiRenderer>` (drei). Décoratif (`aria-hidden`), avec fallback `<h1>` SSR visible si `prefers-reduced-motion` / pas de JS.

Logique pure (luminance, mapping glyphe) isolée dans `src/lib/ascii.ts` → testée dans `tests/ascii.test.ts`.

> **Roadmap perf :** pour appliquer l'effet à de nombreux éléments, porter l'ASCII en post-processing **GLSL** sur **un seul contexte WebGL** (drei `AsciiRenderer` = conversion CPU, idéale pour le hero unique mais ne scale pas). Ajouter ensuite glitch + aberration chromatique via `@react-three/postprocessing`.

## Infra / déploiement

- GitHub Pages via `.github/workflows/main.yml` (push sur `main`). Astro build → `dist/` : compatible tel quel.
- Domaine : `public/CNAME`. SEO : `public/robots.txt` + sitemap généré (`/sitemap-index.xml`).

## Récupérer la v1

```bash
git checkout v1                 # ancien portfolio (React/Vite)
git checkout v1 -- <chemin>     # un fichier précis
```
