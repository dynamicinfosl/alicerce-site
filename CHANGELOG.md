# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-30

### Added
- Split-screen video backgrounds in Hero section
  - Left video: `hero-video-1.mp4` (f_a_d_e_c_dmp_.mp4)
  - Right video: `hero-video-2.mp4` (a_b_e_e_b_cb_dmp_.mp4)
  - Dark gradient overlay (`rgba(26,58,92,0.82)` to `rgba(37,99,235,0.72)`) for text readability
  - Center divider line with sky-blue accent
  - Videos set to `autoPlay muted loop playsInline` for immediate playback
- `tsconfig.json` with strict TypeScript configuration
- `.gitignore` for professional project hygiene (node_modules, dist, .env, IDE files)
- `pnpm-workspace.yaml` with `onlyBuiltDependencies` for pnpm 11 compatibility
- TypeScript type definitions: `@types/react`, `@types/react-dom`

### Fixed
- **Hero section elements not appearing**
  - Root cause: `gsap.from()` only set initial state (`opacity: 0`), leaving elements invisible if animation failed
  - Fix: Replaced all `gsap.from()` with `gsap.fromTo()` with explicit end states (`opacity: 1`, `y: 0`)
  - Added null guards for all refs before animation execution
- **Cards not appearing in scroll sections**
  - Affected components: `Services`, `Stats`, `WhyChooseUs`, `Process`, `Team`, `About`, `Blog`, `QuoteForm`
  - Root cause 1: `toggleActions: 'play none none reverse'` caused cards to revert to `opacity: 0` when user scrolled back up
  - Fix: Changed to `'play none none none'` across all 8 components
  - Root cause 2: `gsap.from()` without explicit end state left elements invisible if ScrollTrigger misfired
  - Fix: Applied `gsap.set()` as pre-animation fallback + `gsap.fromTo()` with explicit `opacity: 1` end state
  - Added `invalidateOnRefresh: true` to ScrollTrigger configs for responsive recalculation
- **pnpm install failing**
  - Root cause: pnpm 11 blocks build scripts for `@tailwindcss/oxide` and `esbuild` without explicit approval
  - Fix: Migrated pnpm settings from deprecated `package.json` `pnpm` field to `pnpm-workspace.yaml`
  - Configured `onlyBuiltDependencies` list for trusted packages

### Changed
- Updated `Hero.tsx` background from solid gradient to layered video + overlay composition
- Refactored animation patterns across 8 components from `gsap.from()` to `gsap.fromTo()`
- Adjusted ScrollTrigger `start` positions from `'top 80%'` to `'top 85%'` for earlier visibility
- Reduced stagger duration from `0.15-0.2` to `0.1-0.15` for snappier animations

## [1.0.0] - 2026-05-29

### Added
- Initial project scaffold with React 18 + Vite + TypeScript
- Tailwind CSS v4 with custom theme variables
- GSAP + ScrollTrigger for scroll animations
- shadcn/ui component library integration
- Complete website sections:
  - Navbar with scroll-aware transparency
  - Hero with animated text and CTA buttons
  - Services (Limpeza Profissional, Construcao, Instalacoes)
  - Stats counter animation
  - WhyChooseUs benefits list
  - Process timeline (4 steps)
  - Team member cards
  - About (Missao, Visao, Valores)
  - Blog article cards
  - QuoteForm with contact information
  - Testimonials carousel
- Loader component with GSAP logo animation
- Lucide React icons throughout
