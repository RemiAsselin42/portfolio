# Portfolio - Copilot Instructions

Instructions for GitHub Copilot when working in this React + TypeScript portfolio codebase.

## Build & Development Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # TypeScript check + production build
npm run lint       # Run ESLint on all files
npm run preview    # Preview production build locally
```

## Architecture Overview

### Page-Based Navigation System

This is a **single-page application (SPA)** that mimics multi-page navigation with animated transitions:

- **App.tsx** is the main container managing page state via `usePageTransition` hook
- **src/pages/** contains individual page components (HomePage, ContactPage, Project1-8Page)
- Pages are indexed in `src/pages/index.ts` and rendered conditionally based on `currentPage` state
- Navigation is handled through transitions (fade-in/fade-out) with different animations for forward/backward movement

**Key Navigation Flow:**
1. User triggers navigation (click, swipe, arrow keys)
2. `usePageTransition` hook initiates fade-out animation
3. After animation, `currentPage` state updates
4. New page component fades in

### Project Pages Pattern

All project pages (Project1-8) follow the **ProjectTemplate** component pattern:

```typescript
// Each project page passes its data to ProjectTemplate
<ProjectTemplate
  projectId={1}
  projectInfo="Course Project"
  projectImage={{ src: "/image.webp", alt: "..." }}
  projectTitle="Project Name"
  projectDescription={<>JSX content</>}
  projectTech="Tech stack"
  modalContent={<>Detailed modal JSX</>}  // or legacy ModalContent object
  onNextPage={onNextPage}
/>
```

**Two View States:**
- `"project"` - Shows preview with image/video and brief description
- `"details"` - Modal overlay with full project details, tech stack, galleries

### Custom Hooks Architecture

**usePageTransition** - Centralized page navigation logic
- Manages `currentPage` state and `animationStage` ("fade-in", "fade-out", "left-fade-in", etc.)
- Returns navigation functions: `goToNextPage()`, `goToPreviousPage()`, `goToHomePage()`, `goToContactPage()`, `transitionToPage(index)`
- Mobile vs desktop animation durations: 300ms vs 500ms (breakpoint: 992px)

**useImagePreloader** - Progressive image loading
- Critical images preloaded on mount (home page, first project preview)
- Next page images preloaded based on `currentPage` state
- Strategy: Load 5 critical images initially (vs 40+ total) to reduce initial bandwidth by ~4MB

**useSwipe** - Touch gesture detection for mobile navigation
- Detects left/right swipe to navigate between pages
- Used in App.tsx with `onSwipeLeft={goToNextPage}` and `onSwipeRight={goToPreviousPage}`

**useBackgroundShapes** - Responsive background animation count
- Returns number of animated shapes based on window width
- Desktop: 6 shapes, Mobile: 3 shapes (breakpoint: 768px)

### Styling Pattern

**SCSS modules with global page styles:**
- Component styles: `ComponentName.scss` in same folder as component
- Page-specific styles: `src/pagesStyles/` with one file per project page
- Global styles imported in App.tsx: `import "./styles/pageStyles"`
- Each page/project has unique class: `project-1`, `project-2`, `contact-page`, etc.

### Performance Optimizations

**Code Splitting (vite.config.ts):**
- `react-vendor`: React/ReactDOM bundled separately
- `zoom-vendor`: react-zoom-pan-pinch isolated (used only in image lightbox)
- `email-vendor`: @emailjs/browser isolated (contact page only)

**Image Optimization:**
- All images are WebP format
- vite-plugin-imagemin compresses on build (85% quality)
- LazyImageComponent with IntersectionObserver for lazy loading
- Progressive preloading: critical → next page → on-demand

**Production Build:**
- `console.log` statements stripped via Terser
- CSS code splitting enabled
- Source maps disabled for smaller bundle size

## Key Conventions

### Component Import Pattern

Use barrel exports from `src/components/index.ts`:

```typescript
// ✅ Correct
import { LazyImageComponent, ProjectDots, RippleEffect } from "./components";

// ❌ Avoid
import { LazyImageComponent } from "./components/LazyImageComponent";
```

Same pattern for pages (`src/pages/index.ts`) and hooks (`src/hooks/index.ts`).

### Image Paths

All images are in `/public/` directory and referenced with root-relative paths:

```typescript
// ✅ Correct
<LazyImageComponent src="/mockup-hirogo.webp" alt="..." />

// ❌ Wrong (do not use relative paths)
<LazyImageComponent src="./mockup-hirogo.webp" alt="..." />
```

### Page Props Interface

Every page component receives these props from App.tsx:

```typescript
interface PageProps {
  onNextPage: () => void;
  onHomePage: () => void;
  onContactPage: () => void;
}
```

Use these callbacks for navigation buttons/links within pages.

### Modal Content Pattern

ProjectTemplate accepts two formats for `modalContent`:

1. **Modern (preferred):** Direct JSX/React.ReactNode
2. **Legacy:** Object with `{ title, description, portfolioTechnologies, aboutProject }`

New project pages should use JSX format for maximum flexibility.

### Accessibility Features

- Skip link for keyboard navigation (`<a href="#main-content">`)
- ARIA live region for page transition announcements (`role="status" aria-live="polite"`)
- Keyboard navigation: Arrow keys (prev/next), Home (first page), End (contact page)
- Form fields excluded from keyboard navigation listeners

### Safari-Specific Handling

Safari requires special CSS for background blur effects:

```typescript
const isSafari = /* user agent detection */;
<div className={`bg ${isSafari ? "safari-bg" : ""}`}>
```

Applied to background shapes and mouse follower animations.

## Environment Variables

Required for EmailJS integration (contact form):

```bash
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Set in GitHub Secrets for deployment workflow.

## Deployment

Automatic deployment to GitHub Pages via `.github/workflows/main.yml`:
- Triggers on push to `main` branch
- Builds with environment secrets injected
- Deploys `dist/` folder to gh-pages
