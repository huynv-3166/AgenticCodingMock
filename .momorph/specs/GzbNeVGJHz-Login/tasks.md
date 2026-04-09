# Tasks: Login

**Frame**: `GzbNeVGJHz-Login`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Install dependencies, configure test tooling, download assets, set up fonts and design tokens

- [x] T001 Install test dev dependencies: `yarn add -D vitest @testing-library/react jsdom @playwright/test` | package.json
- [x] T002 [P] Create Vitest configuration with jsdom environment, `@/` path alias, and React plugin | vitest.config.ts
- [x] T003 [P] Create Playwright configuration with base URL `http://localhost:3000`, Chromium browser | playwright.config.ts
- [x] T004 [P] Create shared type definitions: `Language = "vi" | "en" | "ja"`, component prop types | src/types/index.ts
- [x] T005 [P] Download SAA logo from Figma (node `I662:14391;178:1033;178:1030`) and save as PNG | public/assets/auth/login/saa-logo.png
- [x] T006 [P] Download ROOT FURTHER key visual from Figma (node `2939:9548`) and save as PNG | public/assets/auth/login/root-further.png
- [x] T007 [P] Download VN flag from Figma (node `I662:14391;186:1696;186:1821;186:1709`) and save as SVG | public/assets/auth/login/vn-flag.svg
- [x] T008 [P] Export background artwork from Figma (use `get_frame_image` for full frame, crop background layer) and save as optimized PNG | public/assets/auth/login/background.png
- [x] T009 [P] Create GoogleIcon component: download SVG from Figma (node `I662:14426;186:1766`), convert to React SVG component, 24x24px, named export | src/components/shared/icons/GoogleIcon.tsx
- [x] T010 [P] Create ChevronDownIcon component: simple SVG chevron pointing down, 24x24px, color currentColor, named export | src/components/shared/icons/ChevronDownIcon.tsx
- [x] T011 [P] Create LoadingSpinner component: animated SVG spinner, 24x24px, `animate-spin` tailwind class, named export | src/components/shared/icons/LoadingSpinner.tsx
- [x] T012 Update layout.tsx: replace Geist fonts with Montserrat (weight 400/500/700, italic) + Montserrat Alternates (weight 700) via `next/font/google`. Update metadata title to "Sun Annual Awards 2025". Update `<html lang="vi">`. Apply font CSS variables to `<body>` | src/app/layout.tsx
- [x] T013 Update globals.css: add CSS custom properties for all design tokens from design-style.md (12 colors, 5 typography scales, 12 spacing values, 3 border/radius, 1 shadow). Remove Geist font references | src/app/globals.css
- [x] T014 [P] Create barrel exports file for components | src/components/index.ts

**Checkpoint**: `yarn dev` runs, Montserrat fonts render, assets display in browser; `yarn test` runs with 0 tests; `npx playwright install` completes

---

## Phase 2: Foundation (Auth Infrastructure)

**Purpose**: Auth middleware and OAuth callback — blocks all user story work

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T015 Create Next.js middleware: use existing `src/libs/supabase/middleware.ts` to create Supabase client, refresh session on every request, redirect authenticated users from `/login` to `/`, redirect unauthenticated users from protected routes to `/login`, add security headers (CSP, X-Content-Type-Options, X-Frame-Options, HSTS), export `config.matcher` excluding `/_next/static`, `/_next/image`, `/favicon.ico`, `/assets/(.*)` | src/middleware.ts
- [x] T016 Create OAuth callback route handler: extract `code` from URL search params, call `supabase.auth.exchangeCodeForSession(code)`, verify email domain is `@sun-asterisk.com` (defense-in-depth), redirect to `/` on success, redirect to `/login?error=auth_failed` on failure, handle missing code gracefully | src/app/api/auth/callback/route.ts
- [x] T017 Write unit tests for OAuth callback: test code exchange success, test domain rejection for non-sun-asterisk emails, test missing code param handling, test redirect URLs | src/app/api/auth/callback/route.test.ts

**Checkpoint**: Auth callback works end-to-end; middleware redirects verified; `yarn test` passes; `wrangler dev` confirms Cloudflare Workers compatibility

---

## Phase 3: User Story 1 — Login with Google (Priority: P1) MVP

**Goal**: Full Google OAuth login flow with visual hero page matching Figma design

**Independent Test**: Navigate to `/login`, click "LOGIN With Google", complete OAuth, verify redirect to homepage

### UI Components (US1)

- [x] T018 [P] [US1] Create BackgroundLayers component: render background artwork via `next/image` with `priority` prop (absolute positioned, full bleed), left gradient overlay div with inline style `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)`, bottom gradient overlay div with inline style `linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)` | src/components/login/BackgroundLayers.tsx
- [x] T019 [P] [US1] Create LoginHero component: ROOT FURTHER image via `next/image` (451x200px, aspect-ratio 115/51), description text "Bắt đầu hành trình của bạn cùng SAA 2025. / Đăng nhập để khám phá!" in italic bold 20px/40px Montserrat white | src/components/login/LoginHero.tsx
- [x] T020 [P] [US1] Create Header component: fixed position, h-80px, bg rgba(11,15,18,0.8), padding 12px 144px, flex space-between, logo image via `next/image` (52x48px). Language selector slot deferred to US2 | src/components/shared/Header.tsx
- [x] T021 [P] [US1] Create Footer component: full width, border-top 1px #2E3940, padding 40px 90px, flex center, text "Bản quyền thuộc về Sun* © 2025" in Montserrat Alternates 16px bold white | src/components/shared/Footer.tsx
- [x] T022 [US1] Create LoginButton component (`"use client"`): states `isLoading` (boolean) and `errorMessage` (string|null), click handler calls `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '${origin}/api/auth/callback' } })` with `isLoading=true` and `errorMessage=null`, read `?error=` URL param on mount to set errorMessage, render 305x60px button with bg #FFEA9E, rounded-lg, 22px bold Montserrat #00101A text + GoogleIcon 24x24, disabled state: opacity 0.6 + LoadingSpinner replacing GoogleIcon, error state: `<p>` below button in #FF6B6B 14px Montserrat | src/components/login/LoginButton.tsx

### Page Assembly (US1)

- [x] T023 [US1] Create Login page (Server Component): check session via `createClient()` → `supabase.auth.getUser()`, if authenticated `redirect('/')`, otherwise render full-viewport page with bg #00101A: `<BackgroundLayers />`, `<Header />`, hero section with `<LoginHero />` + `<LoginButton />`, `<Footer />` — all positioned per design-style.md layout (padding 96px 144px, flex-col, gap 80px between key visual and content) | src/app/login/page.tsx
- [x] T024 [US1] Update homepage: replace default Next.js starter with simple authenticated-only placeholder page confirming login success (e.g., "Welcome to SAA 2025") | src/app/page.tsx

### Tests (US1)

- [x] T025 [P] [US1] Write unit tests for LoginButton: renders button text and GoogleIcon, click triggers signInWithOAuth, shows LoadingSpinner when isLoading, disables button when loading, displays error message from URL param, hides error when null | src/components/login/LoginButton.test.tsx
- [x] T026 [P] [US1] Write unit tests for Header: renders logo image with correct dimensions, renders without language selector in initial state | src/components/shared/Header.test.tsx
- [x] T027 [P] [US1] Write unit tests for Footer: renders copyright text "Bản quyền thuộc về Sun* © 2025", has border-top style | src/components/shared/Footer.test.tsx
- [x] T028 [US1] Write E2E test for login flow: visit `/login` → page renders correctly, authenticated user redirected to `/`, login button visible and clickable | tests/e2e/login.spec.ts

**Checkpoint**: Full login flow works end-to-end; all unit tests pass; E2E test passes; page matches Figma design at 1440px

---

## Phase 4: User Story 2 — Language Selection (Priority: P2)

**Goal**: Language switching (VN/EN/JA) with cookie persistence and dropdown UI

**Independent Test**: Click language selector, choose a language, verify page content updates and persists across refresh

### i18n Infrastructure (US2)

- [x] T029 [P] [US2] Create Vietnamese translation dictionary with keys: `description_line1`, `description_line2`, `login_button`, `footer_copyright`, `error_login_failed` | src/libs/i18n/dictionaries/vi.json
- [x] T030 [P] [US2] Create English translation dictionary with same keys as vi.json | src/libs/i18n/dictionaries/en.json
- [x] T031 [P] [US2] Create Japanese translation dictionary with same keys as vi.json | src/libs/i18n/dictionaries/ja.json
- [x] T032 [US2] Create getDictionary helper: `getDictionary(locale: Language)` function that dynamically imports the correct JSON dictionary, export type `Dictionary` for prop typing | src/libs/i18n/index.ts

### Language Selector Component (US2)

- [x] T033 [US2] Create LanguageSelector component (`"use client"`): trigger button with flag icon (VN flag SVG for vi, placeholder for en/ja) + label ("VN"/"EN"/"JA") + ChevronDownIcon, dropdown menu with `role="listbox"` and 3 `role="option"` items, state `isOpen` boolean, close on outside click / Escape / selection, on select: set `NEXT_LOCALE` cookie (max-age 365d, path `/`, SameSite Lax) and `window.location.reload()`, keyboard: `aria-expanded` on trigger, focus trap when open, Escape returns focus to trigger | src/components/shared/LanguageSelector.tsx

### Integration (US2)

- [x] T034 [US2] Update Header to include LanguageSelector component in right section next to logo | src/components/shared/Header.tsx
- [x] T035 [US2] Update Login page to read `NEXT_LOCALE` cookie via `cookies()`, call `getDictionary(locale)`, pass dictionary as props to LoginHero, LoginButton, Footer | src/app/login/page.tsx
- [x] T036 [US2] Update LoginHero to accept dictionary prop and render translated description text | src/components/login/LoginHero.tsx
- [x] T037 [US2] Update LoginButton to accept dictionary prop and render translated button label and error messages | src/components/login/LoginButton.tsx
- [x] T038 [US2] Update Footer to accept dictionary prop and render translated copyright text | src/components/shared/Footer.tsx

**Checkpoint**: Language switching works (VN/EN/JA), persists across refresh, dropdown is keyboard accessible

---

## Phase 5: User Story 3 — Responsive Layout & Polish (Priority: P2)

**Goal**: Mobile-first responsive design, animations, accessibility, performance optimization

**Independent Test**: Resize browser to 375px, 768px, 1440px and verify layout adapts correctly at each breakpoint

### Responsive Styles (US3)

- [x] T039 [P] [US3] Add responsive styles to Header: mobile (px-4, h-16, logo 40x36px, compact language selector), tablet (px-12), desktop (px-36, h-20) | src/components/shared/Header.tsx
- [x] T040 [P] [US3] Add responsive styles to LoginHero: mobile (text-base leading-7, w-full, key visual max-w-[280px]), tablet (text-lg, key visual w-[360px]), desktop (Figma values) | src/components/login/LoginHero.tsx
- [x] T041 [P] [US3] Add responsive styles to LoginButton: mobile (w-full max-w-[305px]), desktop (w-[305px]) | src/components/login/LoginButton.tsx
- [x] T042 [P] [US3] Add responsive styles to Footer: mobile (px-4 py-6, text-center), tablet (px-12 py-8), desktop (px-[90px] py-10) | src/components/shared/Footer.tsx
- [x] T043 [P] [US3] Add responsive styles to Login page layout: mobile (px-4 py-12), tablet (px-12 py-16), desktop (px-36 py-24 with 80px gap) | src/app/login/page.tsx
- [x] T044 [US3] Add `overflow-x: hidden` to root login container to prevent horizontal scroll on small screens | src/app/login/page.tsx

### Transitions & Animations (US3)

- [x] T045 [P] [US3] Add hover/focus/active transitions to LoginButton: `transition-all duration-150 ease-in-out`, hover bg #FFE07A + translateY(-1px) + box-shadow, focus outline 2px solid #FFEA9E offset 2px, active bg #FFD54F + translateY(0), disabled opacity 0.6 transition 200ms | src/components/login/LoginButton.tsx
- [x] T046 [P] [US3] Add hover/focus transitions to LanguageSelector: `transition-colors duration-150`, hover bg rgba(255,255,255,0.1), focus outline 2px solid rgba(255,255,255,0.5) offset 2px | src/components/shared/LanguageSelector.tsx
- [x] T047 [P] [US3] Add dropdown open/close animation: `transition-opacity transition-transform duration-150 ease-out`, enter from opacity-0 translateY(-4px) to opacity-100 translateY(0) | src/components/shared/LanguageSelector.tsx

### Accessibility (US3)

- [x] T048 [US3] Add ARIA attributes: LoginButton `aria-label="Login with Google"` + `aria-busy` when loading, LanguageSelector `aria-label="Select language"` + `aria-expanded` + `aria-haspopup="listbox"`, dropdown options `role="option"` | src/components/login/LoginButton.tsx, src/components/shared/LanguageSelector.tsx
- [x] T049 [US3] Add `prefers-reduced-motion: reduce` media query support: disable transform and opacity transitions when user prefers reduced motion | src/app/globals.css

### Verification (US3)

- [x] T050 [US3] Verify all breakpoints: test at 320px, 375px, 768px, 1024px, 1280px, 1440px — no layout overflow, no content clipping, no horizontal scroll | tests/e2e/login.spec.ts
- [x] T051 [US3] Run Lighthouse audit on desktop — target score 90+ for Performance, verify LCP < 2.5s with `priority` prop on background artwork | (manual verification)

**Checkpoint**: All breakpoints pass, Lighthouse 90+, keyboard navigation complete, `prefers-reduced-motion` respected

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundation (Phase 2)**: Depends on T001 (test deps) and T012-T013 (fonts/tokens) from Phase 1
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion (middleware + callback must exist)
- **User Story 2 (Phase 4)**: Depends on Phase 3 completion (Header, LoginHero, LoginButton, Footer must exist to update)
- **User Story 3 (Phase 5)**: Depends on Phase 4 completion (all components must exist to add responsive + polish)

### Within Each User Story

- Components marked [P] within a story can be built in parallel
- Tests marked [P] can run in parallel with each other
- Page assembly (T023) depends on all component tasks in that story
- Integration tasks (T034-T038) depend on i18n infrastructure (T029-T032)

### Parallel Opportunities

**Phase 1** (max parallelism):
- T002, T003, T004, T005, T006, T007, T008, T009, T010, T011, T014 — all independent after T001

**Phase 3 - US1** (component parallelism):
- T018, T019, T020, T021 — all independent components, can build simultaneously
- T025, T026, T027 — all independent test files

**Phase 4 - US2** (i18n parallelism):
- T029, T030, T031 — all dictionary files independent

**Phase 5 - US3** (responsive parallelism):
- T039, T040, T041, T042, T043 — all independent responsive changes per component
- T045, T046, T047 — all independent transition changes per component

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (User Story 1 — Login with Google)
3. **STOP and VALIDATE**: Test login flow end-to-end independently
4. Deploy if ready — users can log in

### Incremental Delivery

1. Setup + Foundation
2. Add User Story 1 → Test → Deploy (users can log in)
3. Add User Story 2 → Test → Deploy (language switching)
4. Add User Story 3 → Test → Deploy (responsive + polish)

---

## Notes

- Commit after each task or logical group
- Run `yarn test` before moving to next phase
- Run `yarn lint` before committing
- Update barrel exports in `src/components/index.ts` as new components are added
- Mark tasks complete as you go: `[x]`
- The constitution requires TDD — write test tasks before implementation where marked
