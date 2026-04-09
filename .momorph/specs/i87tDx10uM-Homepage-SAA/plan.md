# Implementation Plan: Homepage SAA

**Frame**: `i87tDx10uM-Homepage-SAA`
**Date**: 2026-04-09
**Spec**: `specs/i87tDx10uM-Homepage-SAA/spec.md`

---

## Summary

Build the authenticated Homepage for SAA 2025, featuring a hero section with countdown timer, 6 award category cards, Sun* Kudos promo, and floating action widget. The page extends the existing Next.js 15 + Supabase Auth + Cloudflare Workers stack. The existing Login screen already handles auth; the Homepage will be the primary protected route at `/`. The current `src/app/page.tsx` placeholder will be replaced with the full homepage implementation.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 App Router
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr
**Database**: Supabase (PostgreSQL) -- static content for MVP, database-backed later
**Testing**: Vitest + React Testing Library (unit), Playwright (E2E)
**State Management**: React Server Components + `useState` for client-only UI state
**API Style**: Server Components with direct Supabase calls (no REST API layer for MVP)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

### I. Clean Code & Clear Organization
- [x] Feature-based folder: `src/components/home/` for homepage, `src/components/shared/` for cross-page
- [x] Named exports via barrel `index.ts`
- [x] TypeScript strict -- all new types in `src/types/index.ts`
- [x] Path aliases `@/*` for all imports
- [x] Files stay under ~200 lines -- components split into focused units (e.g., `AwardCard` vs `AwardGrid`)

### II. Next.js, Cloudflare Workers & Supabase Best Practices
- [x] Server Components by default -- only `CountdownTimer`, `AppHeaderClient`, `MobileMenuButton`, `FloatingActionButton` use `"use client"`
- [x] Supabase server client for auth check in `page.tsx` (existing pattern)
- [x] No Node.js APIs in server code -- compatible with Cloudflare Workers (V8 isolates)
- [x] `next/image` for all images (hero, awards, logos)
- [x] `EVENT_START_DATE` via `process.env` -- no hardcoded secrets
- [x] TailwindCSS utility classes + CSS custom properties (existing pattern from Login)

### III. Test-First Development (TDD)
- [x] Unit tests for: `CountdownTimer` (time logic), `AwardCard` (truncation, links), `AppHeader` (active state), `AppFooter` (links)
- [x] E2E tests for: authenticated homepage load, countdown display, award card navigation, responsive layout
- [x] Test files co-located: `ComponentName.test.tsx` alongside source

### IV. Responsive Design
- [x] Mobile-first with `md:` (768px) and `lg:` (1024px) breakpoints
- [x] All interactive elements >= 44x44px touch targets
- [x] Award grid: 2-col mobile/tablet -> 3-col desktop
- [x] Header collapses to hamburger menu on mobile (< 768px)

### V. Security -- OWASP Compliance
- [x] Auth middleware already redirects unauthenticated users (existing `src/middleware.ts`)
- [x] No user input on homepage (read-only display) -- minimal XSS surface
- [x] `EVENT_START_DATE` is server-side env var, not exposed to client via `NEXT_PUBLIC_`
- [x] Security headers already configured in middleware

**Violations**: None. All implementation uses existing approved stack. No new dependencies.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based grouping under `src/components/home/` for homepage-specific components. Shared components (`Header`, `Footer`) will be extended in-place.
- **Server vs Client split**:
  - **Server Components** (default): Page layout, `HeroSection`, `EventInfo`, `HeroCTA`, `AwardGrid`, `AwardCard`, `AwardSectionHeader`, `KudosPromo`, `RootFurtherContent`
  - **Client Components** (`"use client"`): `CountdownTimer` (setInterval), `AppHeaderClient` (wraps nav active state via `usePathname`, dropdown toggles for notification/language/profile), `FloatingActionButton` (toggle menu), `MobileMenuButton` (hamburger toggle)
- **ROOT FURTHER title**: Rendered as an `<Image>` (not text) since it uses a custom display font that may not be web-safe. Download the ROOT FURTHER logo as an image asset from Figma.
- **Styling Strategy**: Extend existing CSS custom properties in `globals.css` with Homepage-specific design tokens. Use Tailwind utility classes referencing CSS vars, matching the Login screen pattern.
- **Data Fetching**: Server Components with hardcoded static data for MVP. Award categories and event config defined as TypeScript constants in `src/libs/data/homepage.ts`, easily replaceable with Supabase queries later.
- **i18n**: Follow existing pattern -- read locale from cookie in `page.tsx`, load dictionary via `getDictionary()`, pass down via props. For **Client Components** (`CountdownTimer`, `AppHeaderClient`), pass only the specific translated strings they need as individual props (e.g., `comingSoonLabel="Coming soon"`, `daysLabel="DAYS"`) rather than the full dictionary object. This keeps serialization minimal and avoids exposing the entire dictionary to the client bundle.

### Header Refactoring

The existing `Header` component is a simple logo + language selector for the Login page. The Homepage requires a **full navigation header** with nav links, notification bell, and profile icon. Strategy:

1. **Keep existing `Header`** unchanged (used by Login page).
2. **Create `AppHeader`** in `src/components/shared/AppHeader.tsx` -- Server Component shell with layout (logo, nav container, actions container).
3. **Create `AppHeaderClient`** in `src/components/shared/AppHeaderClient.tsx` -- Client Component wrapper that provides `usePathname()` for active nav state and manages dropdown open/close state for notification, language, and profile.
4. Both `Header` and `AppHeader` share the same `LanguageSelector` component and logo asset.

**Dropdown strategy**: Build trigger buttons with open/close toggle state. Dropdown panel content (notification list, profile menu items) is **out of scope** for this feature -- render an empty shell `<div>` with "Coming soon" placeholder. The dropdown containers handle positioning, backdrop click-to-close, and Escape key dismiss.

**Mobile strategy**: `AppHeader` on mobile (< 768px) shows only logo + hamburger icon. `MobileMenuButton` (Client Component) toggles a slide-out nav panel containing the same nav links, notification, language, and profile buttons.

### Backend Approach

- **No new API endpoints for MVP**. All homepage data is static content.
- **Event target date**: Configurable via `EVENT_START_DATE` environment variable (ISO-8601). Read server-side in `page.tsx` via `process.env.EVENT_START_DATE`, passed to `CountdownTimer` as a string prop. NOT prefixed with `NEXT_PUBLIC_` -- stays server-only, serialized via RSC props. If missing, `CountdownTimer` receives `null` and displays "00" for all units.
- **Notification count**: Stubbed as `0` for MVP (notification feature is out of scope). Header renders bell icon without badge. A `getUnreadNotificationCount()` placeholder function exists in `src/libs/data/homepage.ts` returning `0` for future API integration.
- **Navigation debounce**: CTA buttons and award card links use standard `next/link` `<Link>` component which handles client-side routing. Next.js App Router naturally prevents duplicate navigations during ongoing transitions. No custom debounce needed.

### Integration Points

- **Existing Services**: Supabase Auth (session check), i18n dictionaries
- **Shared Components to Reuse**: `LanguageSelector`, `ChevronDownIcon`, Logo image assets
- **Shared Components to Extend**: `Header` -> `AppHeader`, `Footer` -> add nav links
- **New Shared Icons Needed**: BellIcon, UserIcon, ArrowRightIcon, PencilIcon, SAAWidgetIcon, HamburgerIcon

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/i87tDx10uM-Homepage-SAA/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── globals.css                      # [MODIFY] Add homepage design tokens
│   ├── page.tsx                         # [MODIFY] Replace placeholder with Homepage assembly
│   └── layout.tsx                       # [MODIFY] Add Digital Numbers local font
│
├── components/
│   ├── index.ts                         # [MODIFY] Add all new exports
│   ├── home/                            # [NEW] Homepage-specific components
│   │   ├── HeroSection.tsx              #   Server: keyvisual bg + gradient + ROOT FURTHER image + children
│   │   ├── CountdownTimer.tsx           #   Client: real-time countdown (Days/Hours/Minutes)
│   │   ├── CountdownTimer.test.tsx      #   Unit: time calc, zero-pad, event-passed, interval
│   │   ├── EventInfo.tsx                #   Server: 2-row (date+location / livestream)
│   │   ├── HeroCTA.tsx                  #   Server: ABOUT AWARDS + ABOUT KUDOS buttons
│   │   ├── RootFurtherContent.tsx       #   Server: paragraphs + quote block + small logo
│   │   ├── AwardSectionHeader.tsx       #   Server: caption + title + sub-description
│   │   ├── AwardCard.tsx                #   Server: image + title + desc (2-line clamp) + link
│   │   ├── AwardCard.test.tsx           #   Unit: truncation, link href, alt text
│   │   ├── AwardGrid.tsx               #   Server: responsive grid wrapping 6 AwardCards
│   │   ├── KudosPromo.tsx              #   Server: promo card (content left + KUDOS image right)
│   │   └── FloatingActionButton.tsx    #   Client: FAB pill + toggle (placeholder menu)
│   │
│   └── shared/
│       ├── Header.tsx                   # [KEEP] Login page header (unchanged)
│       ├── AppHeader.tsx                # [NEW] Server: layout shell (logo, nav slot, actions slot)
│       ├── AppHeaderClient.tsx          # [NEW] Client: usePathname active state + dropdown toggles
│       ├── AppHeader.test.tsx           # [NEW] Unit: active state, nav links render, dropdown toggle
│       ├── AppFooter.tsx                # [NEW] Server: logo + nav links + "Tieu chuan chung" + copyright
│       ├── AppFooter.test.tsx           # [NEW] Unit: links render, copyright text
│       ├── MobileMenuButton.tsx         # [NEW] Client: hamburger icon + slide-out nav toggle
│       ├── Footer.tsx                   # [KEEP] Login page footer (unchanged)
│       ├── LanguageSelector.tsx         # [KEEP] Reused in AppHeader
│       └── icons/
│           ├── BellIcon.tsx             # [NEW]
│           ├── UserIcon.tsx             # [NEW]
│           ├── ArrowRightIcon.tsx       # [NEW]
│           ├── PencilIcon.tsx           # [NEW]
│           ├── SAAWidgetIcon.tsx        # [NEW]
│           └── HamburgerIcon.tsx        # [NEW]
│
├── libs/
│   ├── data/
│   │   └── homepage.ts                 # [NEW] Static data: award categories, event config
│   └── i18n/
│       └── dictionaries/
│           ├── en.json                  # [MODIFY] Add homepage text entries
│           ├── vi.json                  # [MODIFY] Add homepage text entries
│           └── ja.json                  # [MODIFY] Add homepage text entries
│
├── types/
│   └── index.ts                        # [MODIFY] Add AwardCategory, EventConfig types
│
public/
├── fonts/
│   └── DigitalNumbers-Regular.woff2    # [NEW] Countdown digit font
└── assets/
    └── home/
        ├── images/
        │   ├── hero-keyvisual.webp      # [DOWNLOAD] Hero background image
        │   ├── root-further-title.webp  # [DOWNLOAD] ROOT FURTHER display title (hero)
        │   └── root-further-logo-sm.webp # [DOWNLOAD] Small logo for B4 section
        └── logos/
            ├── award-top-talent.webp
            ├── award-top-project.webp
            ├── award-top-project-leader.webp
            ├── award-best-manager.webp
            ├── award-signature-creator.webp
            ├── award-mvp.webp
            └── kudos-logo.webp
```

### page.tsx Assembly Order

The `page.tsx` Server Component composes sections in this exact order (matching design-style.md ASCII layout):

```tsx
// src/app/page.tsx (simplified structure)
<AppHeader />                    {/* sticky top, z-50 */}
<main>
  <HeroSection>                  {/* full-bleed bg image + gradient; renders ROOT FURTHER <Image> (451x200) internally */}
    <CountdownTimer />           {/* Client: Days/Hours/Minutes */}
    <EventInfo />                {/* date, location, livestream */}
    <HeroCTA />                  {/* 2 buttons */}
  </HeroSection>
                                 {/* 120px gap */}
  <RootFurtherContent />         {/* paragraphs + quote */}
                                 {/* 120px gap */}
  <section>                      {/* Awards section */}
    <AwardSectionHeader />
    <AwardGrid />                {/* 6 AwardCards */}
  </section>
                                 {/* 120px gap */}
  <KudosPromo />
</main>
<AppFooter />
<FloatingActionButton />         {/* fixed bottom-right, z-50 */}
```

### Dependencies

No new npm dependencies required. The existing stack covers all needs:

| Existing Package | Used For |
|-----------------|----------|
| `next/image` | Optimized hero + award card images |
| `next/link` | Client-side navigation for award cards, nav links |
| `next/font` | Montserrat (already loaded). Digital Numbers needs local font file. |
| `@supabase/ssr` | Auth check in Server Component |

**One addition**: The `Digital Numbers` font for countdown digits needs to be added as a local font file in `public/fonts/` and loaded via `@font-face` in `globals.css` (or via `next/font/local`).

---

## Implementation Strategy

### Phase Breakdown

#### Phase 0: Asset Preparation & Design Tokens
- Download all required images from Figma using `get_media_files` tool:
  - `hero-keyvisual.webp` -- hero background
  - `root-further-title.webp` -- ROOT FURTHER display title (rendered as image, not text)
  - `root-further-logo-sm.webp` -- small logo for B4 content section
  - 6x `award-*.webp` -- award category thumbnails
  - `kudos-logo.webp` -- KUDOS image for promo section
- Add `Digital Numbers` font file to `public/fonts/DigitalNumbers-Regular.woff2`
- Register font in `src/app/layout.tsx` via `next/font/local` (or `@font-face` in globals.css)
- Extend `globals.css` with homepage-specific CSS custom properties from `design-style.md`:
  - Colors: `--color-primary` (#FFEA9E), `--color-border` (#998C5F), `--color-kudos-bg` (#0F0F0F), etc.
  - Spacing: `--spacing-section-gap` (120px), `--spacing-award-grid-gap` (80px), etc.
  - Shadows: `--shadow-award`, `--shadow-nav-active`
  - Effects: `--blur-countdown`
- Add TypeScript types to `src/types/index.ts`:
  - `AwardCategory { id, title, description, thumbnail_url, slug, display_order }`
  - `EventConfig { event_start_date, event_date_display, event_location, livestream_info }`
- Add static data constants in `src/libs/data/homepage.ts` (6 award categories + event config)
- Add i18n dictionary entries to `vi.json`, `en.json`, `ja.json` for all homepage text strings (section titles, button labels, award descriptions, footer text)
- Add `EVENT_START_DATE` to `.env.example` and `.env.local`

#### Phase 1: Shared Infrastructure (Header, Footer, Icons)
- Create 6 new icon components: `BellIcon`, `UserIcon`, `ArrowRightIcon`, `PencilIcon`, `SAAWidgetIcon`, `HamburgerIcon`
- Create `AppHeader` (Server Component shell) -- logo, nav links container, actions container
- Create `AppHeaderClient` (Client Component) -- wraps nav to provide `usePathname()` for active state, manages open/close state for 3 dropdown triggers (notification, language, profile). Dropdown panels render empty placeholder shells with "Coming soon" text. Handles click-outside-to-close and Escape key dismiss.
- Create `MobileMenuButton` (Client Component) -- hamburger icon for mobile, toggles slide-out nav panel. Shown only below 768px breakpoint.
- Create `AppFooter` (Server Component) -- logo, 4 nav links (About SAA 2025, Award Information, Sun* Kudos, Tieu chuan chung), copyright text. Footer logo uses `<a href="#">` to scroll to top (native browser behavior, no JS needed).
- Write unit tests: `AppHeader.test.tsx` (active state per route, all links render), `AppFooter.test.tsx` (links render, copyright)
- Update `src/components/index.ts` barrel exports

#### Phase 2: Hero Section (US1 - P1)
- Create `HeroSection` -- full-bleed keyvisual background image with gradient overlay, contains ROOT FURTHER title image (451x200), and child slots for countdown/event/CTA
- Create `CountdownTimer` (Client Component) -- receives `targetDate: string` (ISO-8601) as prop from Server Component. Calculates days/hours/minutes. Uses `setInterval` every 60s. Glassmorphism digit tiles with `backdrop-filter: blur(16.64px)`. Shows "Coming soon" label (hidden when event passed). Uses `aria-live="polite"` for screen readers.
- Create `EventInfo` -- 2-row layout: Row 1 = date + location (flex row, gap 60px), Row 2 = livestream note
- Create `HeroCTA` -- 2 buttons in flex row (gap 40px): "ABOUT AWARDS" (primary, gold bg) + "ABOUT KUDOS" (outline). Both use `next/link` `<Link>` component for client-side navigation (Next.js App Router naturally prevents duplicate navigations during transitions -- no custom debounce needed).
- Wire `EVENT_START_DATE` env var: read in `page.tsx` (Server Component), pass as prop to `CountdownTimer`. Fallback: if env var missing, pass `null` and timer shows "00" for all units.
- Write `CountdownTimer.test.tsx`: time calculation, zero-padding, event-passed hides "Coming soon", null targetDate fallback, interval cleanup on unmount

#### Phase 3: Award Categories (US2 - P1)
- Create `AwardSectionHeader` -- caption ("Sun* annual awards 2025"), title (57px), sub-description
- Create `AwardCard` -- receives `AwardCategory` prop. Image (336x336, rounded-3xl, gold border + glow shadow), title (24px gold), description (16px white, 2-line clamp via `-webkit-line-clamp`), "Chi tiet" link with ArrowRightIcon. Entire card wrapped in `<Link href="/awards-information#{slug}">`. Hover: translateY(-4px) + glow intensifies.
- Create `AwardGrid` -- responsive grid: `grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-20` (16px mobile / 24px tablet / 80px desktop). Receives `AwardCategory[]` prop. Handles empty array: shows "No awards available" message centered in grid area.
- Write `AwardCard.test.tsx`: renders title/description, truncates long text, correct href with slug hash, alt text on image

#### Phase 4: Supplementary Sections (US4-US6 - P2/P3)
- Create `RootFurtherContent` -- small ROOT FURTHER logo (top-right, opacity 0.3), justified gold paragraphs, centered quote block ("A tree with deep roots fears no storm"), quote attribution
- Create `KudosPromo` -- dark card (#0F0F0F, radius 16px), left content (label, title 57px, "DIEM MOI CUA SAA 2025", description, "Chi tiet" button linking to Sun* Kudos page), right KUDOS logo image
- Create `FloatingActionButton` (Client Component) -- pill shape (106x64px, gold bg, rounded-full, fixed bottom-right). Click toggles a placeholder menu panel. Pencil icon + "/" separator + SAA icon.
- Assemble `page.tsx` -- replace placeholder with full Homepage composition (see "page.tsx Assembly Order" above). Auth check preserved. Pass `targetDate` from env var, `locale` from cookie, `dictionary` from i18n.

#### Phase 5: Polish & Responsiveness
- Responsive testing and fixes at breakpoints: 320px, 375px, 768px, 1024px, 1280px, 1440px
- All hover/focus/active states per `design-style.md` for every interactive element (nav links, CTA buttons, award cards, chi-tiet links, kudos button, FAB, footer links, header action buttons)
- `prefers-reduced-motion` support -- disable card lift animations, countdown transitions (already have CSS in `globals.css`)
- Accessibility:
  - ARIA landmarks: `<header>`, `<nav>`, `<main>`, `<footer>` semantic elements
  - `aria-live="polite"` + `aria-label` on countdown timer region
  - Focus indicators: 2px solid #FFEA9E, offset 2px on all focusable elements
  - Alt text for all images per spec (decorative `alt=""` for hero bg, descriptive for award badges)
  - Tab order verification: header L-to-R, then page top-to-bottom
- Loading states: Next.js Image `placeholder="blur"` with `blurDataURL` for hero keyvisual, skeleton pulse animation for award card images
- Keyboard nav: Escape key closes dropdowns, Enter/Space activates buttons

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Digital Numbers font not available or incompatible with Cloudflare Workers | Low | Medium | Use `next/font/local` which bundles at build time, not runtime. Fallback to monospace. |
| Hero keyvisual image too large for performance | Medium | Medium | Use WebP format, Next.js Image with `priority`, appropriate `sizes` attribute. Consider LQIP placeholder. |
| Glassmorphism (backdrop-filter) not rendering on some browsers | Low | Low | Feature detection with fallback to solid semi-transparent background. |
| `EVENT_START_DATE` not set in production env | Medium | Low | Default to a safe fallback (show "00" and hide "Coming soon"). Validated in spec edge cases. |
| Award card images cause layout shift (CLS) | Medium | Medium | Use explicit `width`/`height` on `next/image`, add skeleton placeholders. |

### Estimated Complexity

- **Frontend**: Medium -- ~15 components, responsive layout, 1 client-side timer
- **Backend**: Low -- No new API endpoints, static data, existing auth
- **Testing**: Medium -- Timer logic needs edge case testing, responsive testing via Playwright

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Header nav active state, countdown timer lifecycle, award card navigation
- [x] **External dependencies**: Supabase Auth (session validation), environment variable loading
- [ ] **Data layer**: Not applicable for MVP (static data)
- [x] **User workflows**: Login -> Homepage -> Award detail navigation, Header nav switching

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI <-> Logic | Yes | Countdown timer update, FAB toggle, header dropdown toggles |
| Service <-> Service | No | N/A for MVP |
| App <-> External API | Yes | Supabase Auth session check on page load |
| App <-> Data Layer | No | Static data for MVP |
| Cross-platform | Yes | Responsive at 320px, 768px, 1024px, 1440px |

### Test Environment

- **Environment type**: Local (Vitest for unit, Playwright for E2E)
- **Test data strategy**: Static fixtures matching `src/libs/data/homepage.ts`
- **Isolation approach**: Fresh component render per test, mocked Supabase auth for unit tests

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Mock | Unit tests shouldn't hit real auth; mock `getUser()` response |
| `Date.now()` / timers | Mock (vi.useFakeTimers) | Countdown timer needs deterministic time for testing |
| `next/navigation` | Mock | Mock `usePathname()` for header active state, `redirect()` for auth |
| Environment variables | Real | Use `.env.test` with test `EVENT_START_DATE` |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Homepage renders all sections when authenticated
   - [x] Countdown timer shows correct remaining time from `EVENT_START_DATE`
   - [x] Award cards render with correct titles and link to `/awards-information#{slug}`
   - [x] Header shows "About SAA 2025" as active on homepage
   - [x] CTA buttons navigate to correct pages

2. **Error Handling**
   - [x] Unauthenticated user is redirected to `/login`
   - [x] Missing `EVENT_START_DATE` shows "00" and hides "Coming soon"
   - [x] Images with broken src show fallback

3. **Edge Cases**
   - [x] Countdown reaches 0 during session -> stops at "00 00 00"
   - [x] Award card description truncates at 2 lines
   - [x] Page renders at 320px width without horizontal scroll

### Tooling & Framework

- **Test framework**: Vitest (unit) + Playwright (E2E)
- **Supporting tools**: @testing-library/react, vi.useFakeTimers
- **CI integration**: `yarn test` (Vitest) + `yarn test:e2e` (Playwright) in CI pipeline

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| CountdownTimer logic | 95%+ | High |
| Component rendering | 80%+ | High |
| Responsive layouts | E2E visual | Medium |
| Navigation flows | E2E | High |
| Accessibility (a11y) | E2E audit | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (3 review passes completed)
- [x] `design-style.md` approved (3 review passes completed)
- [ ] Asset images downloaded from Figma
- [ ] `Digital Numbers` font file obtained
- [ ] `EVENT_START_DATE` environment variable defined

### External Dependencies

- Figma media files (hero keyvisual, award thumbnails, logos) -- download via `get_media_files`
- `Digital Numbers` font file (Google Fonts or local)
- `SVN-Gotham` font file for KUDOS logo text (or render as image)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- The existing `Header` and `Footer` are Login-specific. Rather than modifying them (which could break Login), create new `AppHeader` and `AppFooter` for authenticated pages. The Login components remain untouched.
- `SVN-Gotham` font (used for "KUDOS" display text in Kudos section) may not be freely available. If unavailable, render the KUDOS text as an image asset from Figma instead of a text element.
- The `FloatingActionButton` menu content is out of scope -- only the button itself (pill, gold, fixed bottom-right) is implemented. The menu opens/closes but shows a placeholder.
- Award card data is hardcoded in `src/libs/data/homepage.ts` for MVP. The data structure matches the `AwardCategory` type so it can be swapped for a Supabase query without component changes.
- The existing `page.tsx` auth pattern (`createClient()` + `getUser()` + `redirect`) is correct and will be preserved.
