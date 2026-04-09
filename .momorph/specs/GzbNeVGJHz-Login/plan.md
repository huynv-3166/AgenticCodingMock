# Implementation Plan: Login

**Frame**: `GzbNeVGJHz-Login`
**Date**: 2026-04-09
**Spec**: `specs/GzbNeVGJHz-Login/spec.md`

---

## Summary

Implement the Login screen as the application entry point using Google OAuth via Supabase Auth. The screen is a full-viewport hero page with a background artwork, gradient overlays, "ROOT FURTHER" branding, a single "LOGIN With Google" button, a language selector in the header, and a copyright footer. No form-based login — authentication is exclusively via Supabase's Google OAuth provider.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr, @supabase/supabase-js
**Database**: Supabase (managed auth tables — no custom migrations needed)
**Testing**: Vitest (unit), Playwright (E2E) — to be configured
**State Management**: React local state (useState) — no global state library needed
**API Style**: Supabase Client SDK + Next.js Route Handlers

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

| Constitution Principle | Specific Rule | Plan Approach | Status |
|------------------------|--------------|---------------|--------|
| I. Clean Code | TypeScript strict mode, named exports, `@/*` path aliases | All new files use strict TS, named exports, `@/` imports | ✅ |
| I. Clean Code | Files < 200 lines, single responsibility | One component per file, feature-based grouping | ✅ |
| II. Next.js Best Practices | Server Components by default, `"use client"` only when needed | `page.tsx` is Server Component; `LoginButton`, `LanguageSelector` are Client Components | ✅ |
| II. Next.js Best Practices | Supabase server client in Server Components/middleware, browser client in Client Components | Middleware uses `src/libs/supabase/middleware.ts`; LoginButton uses `src/libs/supabase/client.ts` | ✅ |
| II. Next.js Best Practices | TailwindCSS 4 utility classes, no excessive `@apply` | All styling via Tailwind utilities; inline styles only for gradient stops | ✅ |
| II. Next.js Best Practices | Cloudflare Workers compatible — no Node.js-specific APIs | All server code uses Web Standard APIs (fetch, Request, Response, URL) | ✅ |
| III. TDD | Red-Green-Refactor cycle mandatory | Test setup in Phase 0; tests written before implementation in each phase | ✅ Planned |
| IV. Responsive | Mobile-first approach with Tailwind `sm:`, `md:`, `lg:` prefixes | Base styles for mobile, responsive prefixes for tablet/desktop | ✅ Planned |
| IV. Responsive | Touch targets >= 44x44px on mobile | Login button: 60px height, Language selector: 56px height — both exceed minimum | ✅ |
| V. Security (OWASP) | Domain restriction for auth, no exposed secrets | Google OAuth restricted to `@sun-asterisk.com` via Supabase + callback defense-in-depth | ✅ |
| V. Security (OWASP) | Security headers (CSP, X-Frame-Options, etc.) | Configure in middleware — added to Phase 1 | ✅ Planned |
| V. Security (OWASP) | No hardcoded secrets, `NEXT_PUBLIC_` only for safe values | Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are public | ✅ |

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based grouping under `src/components/login/`
- **Server vs Client split**: Login page (`page.tsx`) is a Server Component that checks session and renders layout. The `LoginButton` and `LanguageSelector` are Client Components (require onClick, local state)
- **Styling Strategy**: TailwindCSS 4 utility classes with inline styles only for complex gradient stops that Tailwind cannot express
- **Fonts**: Montserrat + Montserrat Alternates loaded via `next/font/google` in layout. Replace current Geist fonts
- **Images**: All images via `next/image` with `priority` on background artwork for LCP optimization

### Backend Approach

- **Auth flow**: Supabase `signInWithOAuth({ provider: 'google' })` triggers redirect. The OAuth callback is handled by a Next.js route handler at `/api/auth/callback` that exchanges the code for a session and sets cookies
- **Middleware**: Next.js middleware at `src/middleware.ts` uses the existing Supabase middleware client to: (1) refresh sessions on every request, (2) redirect authenticated users away from `/login`, (3) redirect unauthenticated users to `/login` from protected routes
- **Domain restriction**: Enforced at Supabase dashboard level (Google OAuth domain restriction). Defense-in-depth check in `/api/auth/callback` to verify `@sun-asterisk.com` email domain

### Integration Points

- **Existing Services**: `src/libs/supabase/client.ts` (browser), `src/libs/supabase/server.ts` (server), `src/libs/supabase/middleware.ts` — all exist and ready to use
- **Shared Components**: Header and Footer will be created as reusable components for other screens
- **API Contracts**: Supabase Auth SDK handles all auth endpoints; only `/api/auth/callback` is custom

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/GzbNeVGJHz-Login/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── research.md          # (not needed — fresh project)
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── layout.tsx                  # MODIFY — Add Montserrat fonts, update metadata
│   ├── globals.css                 # MODIFY — Add login-specific CSS variables
│   ├── login/
│   │   └── page.tsx                # NEW — Login page (Server Component)
│   ├── api/auth/
│   │   └── callback/
│   │       └── route.ts            # NEW — OAuth callback handler
│   └── page.tsx                    # MODIFY — Replace starter with homepage placeholder
├── components/
│   ├── login/
│   │   ├── LoginButton.tsx         # NEW — "LOGIN With Google" button (Client Component)
│   │   ├── LoginHero.tsx           # NEW — Hero section with key visual + description
│   │   └── BackgroundLayers.tsx    # NEW — Artwork + gradient overlays
│   ├── shared/
│   │   ├── Header.tsx              # NEW — App header with logo + language selector
│   │   ├── Footer.tsx              # NEW — Copyright footer
│   │   ├── LanguageSelector.tsx    # NEW — Language dropdown trigger (Client Component)
│   │   └── icons/
│   │       ├── GoogleIcon.tsx      # NEW — Google brand icon component
│   │       ├── ChevronDownIcon.tsx # NEW — Chevron down icon component
│   │       └── LoadingSpinner.tsx  # NEW — Loading spinner for button disabled state
│   └── index.ts                    # NEW — Barrel exports
├── libs/
│   ├── supabase/
│   │   ├── client.ts               # EXISTS — No changes needed
│   │   ├── server.ts               # EXISTS — No changes needed
│   │   └── middleware.ts            # EXISTS — No changes needed
│   └── i18n/
│       ├── index.ts                # NEW — getDictionary(locale) helper
│       └── dictionaries/
│           ├── vi.json             # NEW — Vietnamese translations
│           ├── en.json             # NEW — English translations
│           └── ja.json             # NEW — Japanese translations
├── middleware.ts                    # NEW — Next.js middleware (auth guards + security headers)
└── types/
    └── index.ts                    # NEW — Shared types (Language, etc.)

tests/
└── e2e/
    └── login.spec.ts               # NEW — E2E: full login flow, redirects, responsive

vitest.config.ts                     # NEW — Vitest configuration
playwright.config.ts                 # NEW — Playwright E2E configuration

public/
└── assets/
    └── auth/
        └── login/
            ├── saa-logo.png        # NEW — Sun Annual Awards logo (from Figma)
            ├── root-further.png    # NEW — ROOT FURTHER key visual (from Figma)
            ├── background.png      # NEW — Background artwork (from Figma)
            └── vn-flag.svg         # NEW — Vietnam flag icon (from Figma)
```

### New Files

| File | Phase | Purpose |
|------|-------|---------|
| `src/app/login/page.tsx` | 2 | Login page — Server Component, session check, renders hero + button |
| `src/app/api/auth/callback/route.ts` | 1 | OAuth callback — exchanges code for session, domain check, redirect |
| `src/middleware.ts` | 1 | Auth middleware — session refresh, route protection, security headers |
| `src/components/login/LoginButton.tsx` | 2 | Client Component — Google OAuth button with loading/error/disabled states |
| `src/components/login/LoginHero.tsx` | 2 | Hero section — ROOT FURTHER image + italic description text |
| `src/components/login/BackgroundLayers.tsx` | 2 | Background artwork image + 2 gradient overlay divs |
| `src/components/shared/Header.tsx` | 2 | Reusable header — logo (Phase 2), + language selector (Phase 3) |
| `src/components/shared/Footer.tsx` | 2 | Reusable footer — copyright text with border-top |
| `src/components/shared/LanguageSelector.tsx` | 3 | Client Component — language trigger button + dropdown menu (listbox) |
| `src/components/shared/icons/GoogleIcon.tsx` | 0 | Google brand icon as React SVG component |
| `src/components/shared/icons/ChevronDownIcon.tsx` | 0 | Chevron down arrow as React SVG component |
| `src/components/shared/icons/LoadingSpinner.tsx` | 0 | Animated loading spinner for button disabled state |
| `src/components/index.ts` | 0 | Barrel exports for components |
| `src/types/index.ts` | 0 | Shared type definitions (`Language`, component prop types) |
| `src/libs/i18n/index.ts` | 3 | `getDictionary(locale)` helper to load locale JSON |
| `src/libs/i18n/dictionaries/vi.json` | 3 | Vietnamese translations for login screen |
| `src/libs/i18n/dictionaries/en.json` | 3 | English translations for login screen |
| `src/libs/i18n/dictionaries/ja.json` | 3 | Japanese translations for login screen |
| `vitest.config.ts` | 0 | Vitest configuration with jsdom and path aliases |
| `playwright.config.ts` | 0 | Playwright E2E configuration (base URL, browser settings) |
| `src/components/login/LoginButton.test.tsx` | 2 | Unit tests: button states, click handler, error display, loading |
| `src/components/shared/Header.test.tsx` | 2 | Unit tests: logo rendering, LanguageSelector slot |
| `src/components/shared/Footer.test.tsx` | 2 | Unit tests: copyright text rendering |
| `src/app/api/auth/callback/route.test.ts` | 1 | Unit tests: code exchange, domain check, redirect logic |
| `tests/e2e/login.spec.ts` | 2 | E2E: full login flow, redirect behavior, responsive layout |

### Modified Files

| File | Phase | Changes |
|------|-------|---------|
| `src/app/layout.tsx` | 0 | Replace Geist fonts with Montserrat + Montserrat Alternates via `next/font/google`. Update metadata: title → "Sun Annual Awards 2025", description. Update `<html lang="vi">`. Apply font CSS variables to `<body>`. |
| `src/app/globals.css` | 0 | Add CSS custom properties for design tokens (12 colors, 5 typography, 12 spacing, 3 border/radius, 1 shadow from design-style.md). Remove Geist font references. |
| `src/app/page.tsx` | 2 | Replace default Next.js starter content with a homepage placeholder (simple authenticated-only page confirming login success). Full homepage is out of scope. |
| `package.json` | 0 | Add dev dependencies: `vitest`, `@testing-library/react`, `jsdom`, `@playwright/test`. Add scripts: `"test": "vitest"`, `"test:e2e": "playwright test"`. |

### Dependencies

**Already installed** (no changes needed):
- `@supabase/ssr` (v0.8.0)
- `@supabase/supabase-js` (v2.90.1)
- `next` (15.5.9) — includes `next/font/google`, `next/image`
- `tailwindcss` (v4)

**New dev dependencies** (required for TDD — Constitution Principle III):

| Package | Purpose | Justification |
|---------|---------|---------------|
| `vitest` | Unit test runner | Constitution requires TDD; fast, Vite-native, TS-first |
| `@testing-library/react` | Component testing | Test React components without implementation details |
| `jsdom` | DOM environment for Vitest | Required by @testing-library/react in Node |
| `@playwright/test` | E2E testing | Constitution requires E2E for critical user flows |

---

## Media Assets

Assets to download from Figma using `get_media_files` tool:

| Asset | Figma Node ID | Format | Save To |
|-------|--------------|--------|---------|
| SAA Logo | `I662:14391;178:1033;178:1030` | PNG | `public/assets/auth/login/saa-logo.png` |
| VN Flag | `I662:14391;186:1696;186:1821;186:1709` | SVG | `public/assets/auth/login/vn-flag.svg` |
| ROOT FURTHER | `2939:9548` | PNG | `public/assets/auth/login/root-further.png` |
| Google Icon | `I662:14426;186:1766` | SVG | (convert to React icon component) |
| Chevron Down | `I662:14391;186:1696;186:1821;186:1441` | N/A | Create as SVG React component (no Figma export available) |
| Background Artwork | N/A | PNG | `public/assets/auth/login/background.png` (export manually from Figma or use get_frame_image) |

---

## Implementation Strategy

### Phase 0: Asset Preparation & Project Setup

- Download media assets from Figma to `public/assets/auth/login/`
- Create icon components (GoogleIcon, ChevronDownIcon, LoadingSpinner)
- Update `layout.tsx`: replace Geist with Montserrat + Montserrat Alternates via `next/font/google`, update `<html lang="vi">`, update metadata (title: "Sun Annual Awards 2025", description)
- Update `globals.css`: add design token CSS variables from design-style.md Colors/Spacing tables
- Create `src/types/index.ts` with shared types (`Language`, etc.)
- Create `src/components/index.ts` barrel exports
- Install test dependencies: `yarn add -D vitest @testing-library/react jsdom @playwright/test`
- Create `vitest.config.ts` with jsdom environment and `@/` path alias resolution
- Create `playwright.config.ts` with base URL `http://localhost:3000`, Chromium browser
- **Checkpoint**: `yarn dev` runs, fonts render, assets display; `yarn test` runs (0 tests, no errors); `npx playwright install` completes

### Phase 1: Foundation — Auth Infrastructure (US1 prerequisite)

- Create `src/middleware.ts` — Next.js middleware using existing `src/libs/supabase/middleware.ts`:
  - Refresh user session on every request
  - Redirect authenticated users from `/login` to `/` (homepage)
  - Redirect unauthenticated users from protected routes to `/login`
  - Add security headers (Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security)
  - Export `config.matcher` to exclude: `/_next/static`, `/_next/image`, `/favicon.ico`, `/assets/(.*)`
- Create `src/app/api/auth/callback/route.ts` — OAuth callback handler:
  - Extract `code` from URL search params
  - Exchange code for session via `supabase.auth.exchangeCodeForSession(code)`
  - Defense-in-depth: verify user email domain is `@sun-asterisk.com`, reject otherwise
  - Redirect to homepage on success, redirect to `/login?error=auth_failed` on failure
- Test with `wrangler dev` to verify Cloudflare Workers compatibility early
- **Checkpoint**: Auth callback works end-to-end with manual URL test; middleware redirects verified

### Phase 2: Core Feature — Login with Google (US1, P1 MVP)

- Create `BackgroundLayers.tsx` — artwork image via `next/image` with `priority` + 2 gradient overlay `<div>`s with inline styles for precise gradient stops
- Create `LoginHero.tsx` — ROOT FURTHER image via `next/image` + description text (italic bold Montserrat)
- Create `LoginButton.tsx` (Client Component, `"use client"`):
  - States: `isLoading`, `errorMessage`
  - Click handler: set `isLoading=true`, clear `errorMessage`, call `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '${origin}/api/auth/callback' } })`
  - URL search param `?error=` check on mount → set `errorMessage`
  - Disabled state: opacity 0.6, spinner replaces Google icon
  - Error state: render `<p>` below button with error text in `#FF6B6B`
- Create `Header.tsx` — logo only (static, language selector deferred to Phase 3)
- Create `Footer.tsx` — copyright text with border-top
- Create `src/app/login/page.tsx` (Server Component):
  - Check session via `createClient()` from server.ts → `supabase.auth.getUser()`
  - If authenticated, `redirect('/')` (Next.js server redirect)
  - Render: `<BackgroundLayers />`, `<Header />`, `<LoginHero />`, `<LoginButton />`, `<Footer />`
- Update `src/app/page.tsx` — replace default Next.js content with the homepage placeholder (a simple page that confirms the user is logged in; full homepage is out of scope for this spec)
- **Checkpoint**: Full login flow works: click button → Google OAuth → callback → homepage redirect; error states display correctly

### Phase 3: Language Selection (US2, P2)

- **i18n approach**: Simple JSON dictionary files — no external library needed for a single screen:
  - Create `src/libs/i18n/dictionaries/vi.json`, `en.json`, `ja.json` with keys for login screen text (description, button label, footer, error messages)
  - Create `src/libs/i18n/index.ts` — `getDictionary(locale: Language)` helper that imports the correct JSON
  - Cookie name: `NEXT_LOCALE` (value: `"vi"` | `"en"` | `"ja"`, default: `"vi"`, max-age: 365 days, path: `/`, SameSite: Lax)
  - Read language from `NEXT_LOCALE` cookie in Server Component (`page.tsx`), pass dictionary as prop to Client Components
- Create `LanguageSelector.tsx` (Client Component, `"use client"`):
  - Trigger button: flag icon + language label ("VN"/"EN"/"JA") + chevron down
  - Dropdown menu (rendered as part of this component): `role="listbox"` with `role="option"` items for each language
  - State: `isOpen` boolean; close on outside click, `Escape` key, or selection
  - On select: update cookie (`document.cookie`), reload page to apply server-side language change
  - Keyboard: `aria-expanded`, focus trap when open, `Escape` returns focus to trigger
- Update Header to include LanguageSelector
- Update LoginHero, LoginButton, Footer to consume translated strings from dictionary
- **Checkpoint**: Language switching works (VN/EN/JA), persists across refresh, dropdown keyboard accessible

### Phase 4: Responsive & Polish (US3, P2)

- Apply mobile-first responsive styles (constitution Principle IV: base styles for mobile, Tailwind `md:` for tablet, `lg:` for desktop):
  - Mobile (< 768px): reduced padding, smaller logo, compact language selector, full-width button, stacked content
  - Tablet (768px–1023px): medium padding, mid-sized key visual
  - Desktop (>= 1024px): Figma values as specified
- Add CSS transitions for all interactive elements:
  - LoginButton: `transition-all duration-150 ease-in-out` for hover/active
  - LanguageSelector: `transition-colors duration-150` for hover
  - Language dropdown: `transition-opacity transition-transform duration-150 ease-out` for open/close
- Add `prefers-reduced-motion: reduce` — disable transform/opacity transitions
- Add ARIA attributes:
  - LoginButton: `aria-label="Login with Google"`, `aria-busy` when loading
  - LanguageSelector: `aria-label="Select language"`, `aria-expanded`, `aria-haspopup="listbox"`
- Verify all breakpoints: 320px, 375px, 768px, 1024px, 1280px, 1440px
- Verify `overflow-x: hidden` on root container prevents horizontal scroll on small screens
- **Checkpoint**: Lighthouse score 90+ on desktop, all breakpoints pass visual review, keyboard navigation complete

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: LoginButton → Supabase Auth → callback → redirect
- [x] **External dependencies**: Supabase Auth (Google OAuth provider)
- [x] **User workflows**: Full login E2E flow

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Button click triggers OAuth, loading state, error display |
| App ↔ External API | Yes | Supabase Auth flow, callback code exchange |
| Cross-platform | Yes | Responsive layout at 3 breakpoints |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] User clicks login → redirected to Google → returns → session created → homepage
   - [ ] Authenticated user visits /login → auto-redirected to homepage

2. **Error Handling**
   - [ ] OAuth callback with invalid/missing code → error message shown
   - [ ] Non `@sun-asterisk.com` account → rejected with error

3. **Edge Cases**
   - [ ] Rapid clicks on login button → only one OAuth flow initiated
   - [ ] Direct access to /api/auth/callback without code → handled gracefully

### Tooling & Framework

- **Unit tests**: Vitest + React Testing Library (configured in Phase 0, `vitest.config.ts`)
- **E2E tests**: Playwright (configured in Phase 0, `playwright.config.ts`)
- **CI integration**: Run on PR via GitHub Actions (future — out of scope for this plan)

### Test Files

| Test File | Type | Focus |
|-----------|------|-------|
| `src/components/login/LoginButton.test.tsx` | Unit | Button states, click handler, error display, loading state |
| `src/components/shared/Header.test.tsx` | Unit | Logo rendering, LanguageSelector integration |
| `src/components/shared/Footer.test.tsx` | Unit | Copyright text rendering |
| `src/app/api/auth/callback/route.test.ts` | Unit | Code exchange, domain check, redirect logic |
| `tests/e2e/login.spec.ts` | E2E | Full login flow, redirect behavior, responsive layout |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase Auth not configured (missing Google OAuth credentials) | Medium | High (blocks all login) | Document setup steps in README; verify .env variables before implementation |
| Background artwork image too large for LCP target | Medium | Medium (perf) | Optimize image (WebP, compressed), use `priority` prop, consider CSS background as fallback |
| Cloudflare Workers incompatibility in middleware | Low | High | Use only Web Standard APIs; test with `wrangler dev` early in Phase 1 |
| i18n complexity for 3 languages | Low | Medium | Start with Vietnamese-only in Phase 2 MVP; add EN/JA as iterative enhancement |
| next/font/google may not load Montserrat Alternates italic correctly | Low | Low | Test font loading; fallback to standard Montserrat if needed |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved
- [ ] Supabase project configured with Google OAuth provider
- [ ] `.env.development` populated with valid Supabase URL, keys, and Google OAuth credentials
- [ ] Background artwork image exported from Figma (manual or via get_frame_image)

### External Dependencies

- Supabase Auth service (Google OAuth provider must be enabled)
- Google Cloud Console (OAuth client ID + secret configured)
- Figma media assets (downloadable via MoMorph tools)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (Phase 0 → 1 → 2 → 3 → 4)

---

## Notes

- The project is greenfield — no existing components, types, or middleware to work around. All code is new.
- The Supabase client libraries (`src/libs/supabase/*`) already exist with correct patterns for SSR cookie management. No modifications needed.
- `layout.tsx` currently uses Geist fonts which must be replaced with Montserrat. This is a breaking change for the default page but acceptable since we're replacing it.
- The `public/assets/auth/login/` directory exists but is empty. Assets will be downloaded in Phase 0.
- The Chevron Down icon has no Figma export (returned null). It must be created as a simple SVG component.
- The background artwork is not returned by `get_media_files`. It should be exported directly from Figma or captured via `get_frame_image` and cropped.
