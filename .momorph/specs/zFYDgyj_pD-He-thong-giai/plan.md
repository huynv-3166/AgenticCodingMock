# Implementation Plan: Hệ thống giải thưởng SAA 2025

**Frame**: `zFYDgyj_pD-He-thong-giai`
**Date**: 2026-04-09
**Spec**: `specs/zFYDgyj_pD-He-thong-giai/spec.md`

---

## Summary

Build the "Hệ thống giải thưởng SAA 2025" page — a read-only, dark-themed awards showcase with 6 award categories, a sticky sidebar navigation with scroll spy, and a Sun* Kudos promotion block. The page uses static data (no backend API), Server Components for content, and a thin Client Component wrapper for scroll spy + sidebar interactions. Reuses existing `AppHeader`, `AppFooter`, icons, and i18n infrastructure.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 App Router
**Primary Dependencies**: React 19, TailwindCSS 4, next/image
**Database**: N/A — static content (hardcoded JSON data)
**Testing**: Vitest (unit), Playwright (E2E)
**State Management**: Local `useState` only (activeCategory, isScrolling)
**API Style**: N/A — no API endpoints needed
**Deployment**: Cloudflare Workers via OpenNextJS

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **Clean Code & Organization** — Feature-grouped components in `src/components/awards/`, types in `src/types/`, data in `src/libs/data/`
- [x] **Next.js & Cloudflare** — Server Components by default, `"use client"` only for scroll spy wrapper. No Node.js APIs. `next/image` for all images
- [x] **TDD** — Tests planned for each user story (unit + E2E)
- [x] **Responsive Design** — Mobile-first Tailwind with `md:`/`lg:` breakpoints. Sidebar hidden on mobile, replaced by horizontal tabs
- [x] **Security (OWASP)** — Read-only page, no user input. Auth enforced via middleware. Security headers already configured

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based (`src/components/awards/`)
- **Styling Strategy**: Tailwind utility classes with CSS custom properties from `globals.css`. Design tokens from `design-style.md` added to existing CSS variables
- **Data Strategy**: Static JSON array in `src/libs/data/awards.ts` — no API call, no Supabase query. Data imported directly by Server Component. If admin editing is needed later, migrate to Supabase table
- **i18n Strategy**: Award titles and short labels (quantity label, prize label, CTA text) go in i18n dictionaries. Award **descriptions** remain Vietnamese-only in the static data file — they are long-form content that doesn't need translation for the initial release (consistent with homepage pattern where award card descriptions are not translated). If multilingual descriptions are needed later, move to Supabase CMS
- **Rendering**: Page is a Server Component (async). `AwardSidebar` and `AwardContent` are `"use client"`. **Important**: `AwardCardList` (Server) is rendered inside `AwardContent` (Client) — must use the Next.js `children` prop pattern: `<AwardContent sidebar={<AwardSidebar />}>{serverRenderedCards}</AwardContent>` so Server Components are passed as children, not imported inside the Client Component

### Why Static Data (No API)

Award content changes once per year (per SAA cycle). A static JSON file:
1. Zero latency — no network request
2. Full cache — Cloudflare edge caches the entire page
3. Simpler — no Supabase table, no RLS, no migration
4. Easy to update — change one file, redeploy

### Integration Points

- **Reuse `AppHeader`** (server) + `AppHeaderClient` (client) — already handles nav links, language, notifications, profile
- **Reuse `AppFooter`** — already handles footer nav and copyright
- **Reuse existing icons**: `ArrowRightIcon`, `BellIcon`, `UserIcon`, `ChevronDownIcon`
- **Reuse `LanguageSelector`** and `MobileMenuButton`
- **Reuse i18n pattern**: `getDictionary(locale)` with new keys in `en.json`, `vi.json`, `ja.json`
- **Reuse existing CSS variables** from `globals.css` — most award page tokens already defined (`--color-bg-primary`, `--color-button-bg`, `--shadow-award`, etc.)

---

## Project Structure

### Documentation

```text
.momorph/specs/zFYDgyj_pD-He-thong-giai/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
└── tasks.md             # Task breakdown (next step)
```

### Source Code (New Files)

```text
src/
├── app/
│   └── awards/
│       ├── page.tsx                    # Awards page (Server Component)
│       └── loading.tsx                 # Route transition skeleton
├── components/
│   └── awards/
│       ├── HeroBanner.tsx              # Hero section with gradient overlay (Server)
│       ├── AwardSectionTitle.tsx       # "Hệ thống giải thưởng SAA 2025" heading (Server)
│       ├── AwardSidebar.tsx            # Sticky sidebar menu with scroll spy (Client)
│       ├── AwardCard.tsx               # Single award info card (Server)
│       ├── AwardCardList.tsx           # Award cards container (Server)
│       ├── AwardContent.tsx            # Main content wrapper: sidebar + cards (Client)
│       ├── KudosPromoBlock.tsx         # Sun* Kudos promotion section (Server)
│       └── index.ts                    # Barrel exports
├── libs/
│   └── data/
│       └── awards.ts                   # Static award categories data + types
└── types/
    (update index.ts)                   # Add AwardDetail type
```

### Modified Files

| File | Changes |
|------|---------|
| `src/app/globals.css` | Add new CSS variables for award page (spacing, sidebar width, etc.) |
| `src/types/index.ts` | Add `AwardDetail` type extending existing `AwardCategory` |
| `src/libs/i18n/dictionaries/vi.json` | Add award page translation keys |
| `src/libs/i18n/dictionaries/en.json` | Add award page translation keys |
| `src/libs/i18n/dictionaries/ja.json` | Add award page translation keys |
| `src/components/index.ts` | Export new award components |
| `src/middleware.ts` | Ensure `/awards` is a protected route (already covered by default) |

### Public Assets (New)

```text
public/
└── assets/
    └── awards/
        ├── hero-awards.png             # Hero banner background
        ├── top-talent.png              # Award image 336x336
        ├── top-project.png
        ├── top-project-leader.png
        ├── best-manager.png
        ├── signature-2025.png
        └── mvp.png
```

> **Note**: Award images may already exist in `public/assets/home/logos/award-*-full.png`. Verify and reuse if suitable (336x336px). Otherwise, export from Figma using `get_media_files` tool.

### Dependencies

No new dependencies needed. All required packages already installed:
- `next`, `react` — framework
- `tailwindcss` — styling
- `@supabase/ssr` — auth (existing middleware)

---

## Implementation Strategy

### Phase 0: Asset Preparation

1. **Check existing award images** in `public/assets/home/logos/` — verify if `award-*-full.png` files are 336x336px and suitable
2. If not, download award images from Figma using `get_media_files` tool
3. Download hero banner image for awards page
4. Organize in `public/assets/awards/`

### Phase 1: Foundation (Types, Data, CSS Variables, i18n)

**Goal**: Set up all infrastructure so components can be built immediately

1. **Add `AwardDetail` type** to `src/types/index.ts`:
   ```typescript
   type AwardDetail = {
     id: string
     title: string
     description: string
     image: string
     quantity: number
     unit: string
     prizeValue: string
     prizeNote: string
     prizeValueGroup?: string
     prizeNoteGroup?: string
   }
   ```

2. **Create static data** in `src/libs/data/awards.ts`:
   - Export `AWARD_CATEGORIES: AwardDetail[]` with all 6 categories
   - Export `AWARDS_PAGE_META` for hero/title content

3. **Add CSS variables** to `globals.css`:
   ```css
   --spacing-sidebar-width: 178px;
   --spacing-sidebar-content-gap: 120px;
   --spacing-award-card-gap: 48px;
   --spacing-award-cards-gap: 80px;
   --radius-award-image: 24px;
   ```
   (Most tokens like `--color-bg-primary`, `--shadow-award` already exist)

4. **Add i18n keys** to all 3 dictionaries:
   - `awards_page_subtitle`, `awards_page_title`
   - `awards_quantity_label`, `awards_prize_label`
   - `awards_prize_note`, `kudos_promo_label`, `kudos_promo_cta`

### Phase 2: Core UI — Static Display (US1: P1)

**Goal**: All 6 award cards visible with correct data

1. **Create `src/app/awards/page.tsx`** (Server Component):
   - Auth check (reuse pattern from `src/app/page.tsx`)
   - Get locale, dictionary
   - Import static data from `src/libs/data/awards.ts`
   - Render: `AppHeader` → `HeroBanner` → `AwardSectionTitle` → `AwardContent` → `KudosPromoBlock` → `AppFooter`
   - **Server/Client boundary**: Pass Server-rendered `AwardCardList` as `children` to Client `AwardContent`:
     ```tsx
     <AwardContent sidebar={<AwardSidebar categories={categories} />}>
       <AwardCardList awards={AWARD_CATEGORIES} dictionary={dictionary} />
     </AwardContent>
     ```

2. **Create `HeroBanner.tsx`** (Server):
   - Full-width image with `next/image` (priority loading)
   - Gradient overlay pseudo-element
   - "ROOT FURTHER" is part of the image, not text

3. **Create `AwardSectionTitle.tsx`** (Server):
   - Subtitle: "Sun* Annual Awards 2025" (24px/700, #2E3940)
   - Title: "Hệ thống giải thưởng SAA 2025" (57px/700, #FFEA9E)
   - Centered layout with gap-4

4. **Create `AwardCard.tsx`** (Server):
   - Props: `award: AwardDetail`, `dictionary`
   - Layout: flex-row, gap-48px
   - Left: Award image (336x336, gold glow shadow, mix-blend-mode: screen)
   - Right: Title (gold), description (white), quantity row, prize row
   - Special handling for Signature 2025 dual-prize layout: two prize rows separated by "Hoặc" divider text (14px/700 Montserrat, color: #2E3940 `--color-text-muted`)

5. **Create `AwardCardList.tsx`** (Server):
   - Maps over `AWARD_CATEGORIES`, renders `AwardCard` for each
   - Each card wrapped in `<section id={award.id}>` for anchor navigation
   - Vertical stack with gap-80px

### Phase 3: Sidebar Navigation + Scroll Spy (US2: P1)

**Goal**: Clickable sidebar with scroll spy

1. **Create `AwardSidebar.tsx`** (Client — `"use client"`):
   - Props: `categories: { id: string; title: string }[]`
   - State: `activeCategory` (string)
   - Render: sticky sidebar with 6 menu items
   - **Click handler**: `scrollIntoView({ behavior: 'smooth', block: 'start' })` with header offset (80px via `scroll-margin-top`)
   - **Scroll spy**: `IntersectionObserver` on each `<section>` — update `activeCategory` when section enters viewport. Config: `{ threshold: 0.3, rootMargin: '-100px 0px -60% 0px' }` (offset for sticky header, activate when top 40% of section is visible)
   - **isScrolling flag**: Set true during programmatic scroll (setTimeout ~600ms), ignore observer updates while scrolling. Reset flag in scroll end callback
   - Active state: gold text, bg rgba(255,234,158,0.1), text-shadow glow, border-bottom
   - Hover state: bg rgba(255,234,158,0.1)
   - Focus state: outline 2px solid #FFEA9E

2. **Create `AwardContent.tsx`** (Client wrapper):
   - Wraps `AwardSidebar` + `AwardCardList` in a flex-row layout
   - Handles responsive: sidebar hidden on mobile, shown on desktop
   - On mobile: render horizontal scrolling tabs above cards instead of sidebar

3. **Add `scroll-margin-top: 100px`** to award section elements (offset for sticky header)

### Phase 4: Kudos Promotion + Footer (US3: P2)

**Goal**: Kudos block with working CTA

1. **Create `KudosPromoBlock.tsx`** (Server):
   - Dark container (1152px, 500px, rounded-2xl, bg: #0F0F0F with image)
   - Left: "Phong trào ghi nhận" label, "Sun* Kudos" title (57px gold), description, CTA button
   - Right: KUDOS decorative text (SVN-Gotham 96px, #DBD1C1) + image
   - CTA "Chi tiết": Gold filled button (#FFEA9E bg, #00101A text), `ArrowRightIcon` (24x24), links to Kudos page. Hover: `translateY(-1px)` lift + brightness. Focus: `outline: 2px solid #FFEA9E, offset: 2px`

   > **Note**: This is similar to existing `KudosPromo` component in `src/components/home/`. Evaluate whether to extend or create new. The awards page version has different dimensions (1152x500px vs homepage variant) and includes the "Sun* Kudos" heading at 57px. Recommend creating a new component specific to awards page.

### Phase 5: Responsive Design (US4: P2)

**Goal**: Mobile and tablet layouts

1. **Mobile (<768px)**:
   - Header: hamburger menu (already handled by `MobileMenuButton`)
   - Hero: maintain aspect-ratio, full-width
   - Title: 32px font-size
   - Sidebar: hidden → horizontal scroll tabs (sticky below header)
   - Award cards: flex-col, image 200px centered above content
   - Kudos: flex-col, reduced padding
   - Footer: stacked, centered

2. **Tablet (768px-1023px)**:
   - Sidebar: 150px width, 12px font
   - Award cards: gap-24px, image 250px
   - Content padding: 48px 32px
   - Title: 40px font-size

3. **Implementation approach**:
   - All responsive via Tailwind breakpoint prefixes (`md:`, `lg:`)
   - No separate mobile components — same components with responsive classes
   - Mobile tabs variant inside `AwardContent.tsx` using `lg:hidden` / `hidden lg:block`

### Phase 6: Accessibility + Polish

**Goal**: Keyboard nav, screen reader, loading states, deep links

1. **Semantic HTML**:
   - `<nav aria-label="Award categories">` for sidebar
   - `<section id="top-talent" aria-labelledby="top-talent-title">` for each card
   - `<h1>` for page title, `<h2>` for each award title
   - `aria-current="true"` on active sidebar item

2. **Keyboard Navigation**:
   - Sidebar items are `<button>` elements (focusable, Enter/Space activates)
   - Tab order: header → sidebar items → content → CTA → footer
   - Focus ring: `focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2`

3. **Deep Links**:
   - On page load, check `window.location.hash`
   - If hash matches a category ID, scroll to it and set active
   - `scroll-margin-top: 100px` on sections handles header offset

4. **Reduced Motion**:
   - Wrap smooth scroll in `prefers-reduced-motion` check
   - `motion-reduce:transition-none` on hover effects

5. **Loading States**:
   - Since data is static (no fetch), skeleton not strictly needed
   - Add `loading.tsx` in `app/awards/` for route transition skeleton
   - Image `onError` handler → show gradient placeholder

6. **Skip Link**:
   - Add "Skip to awards" link in header (existing pattern if available)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Sidebar click → scroll → spy update
- [x] **User workflows**: Page load → browse awards → click Kudos CTA
- [ ] **External dependencies**: N/A (no API)
- [ ] **Data layer**: N/A (static data)

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Sidebar click triggers scroll, scroll spy updates active state |
| App ↔ External API | No | Static data, no API calls |
| Cross-platform | Yes | Mobile tabs vs desktop sidebar, responsive layout |

### Test Scenarios Outline

**1. Happy Path (Unit + E2E)**
- [ ] Page loads with 6 award cards showing correct data
- [ ] Sidebar click scrolls to correct section
- [ ] Scroll spy updates active item when scrolling manually
- [ ] "Chi tiết" button navigates to Kudos page
- [ ] Deep link `/awards#mvp` scrolls to MVP section

**2. Responsive (E2E)**
- [ ] Desktop: 2-column layout with sticky sidebar
- [ ] Mobile: horizontal tabs, stacked cards
- [ ] Tablet: compact sidebar, smaller images

**3. Accessibility (Unit + E2E)**
- [ ] Keyboard Tab through sidebar items
- [ ] Enter/Space activates sidebar item
- [ ] Screen reader announces active item (`aria-current`)
- [ ] All images have alt text

### Tooling

- **Unit**: Vitest + React Testing Library
- **E2E**: Playwright (Chromium desktop + mobile viewport)
- **CI**: Existing pipeline runs `yarn test` and `yarn test:e2e`

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Award data rendering | 95%+ | High |
| Sidebar scroll spy | 85%+ | High |
| Responsive layout | E2E only | Medium |
| Accessibility | 80%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Award images not exported from Figma | Medium | High | Check existing `award-*-full.png` first; use `get_media_files` tool as fallback |
| SVN-Gotham font not available | Medium | Medium | Font may be in `public/fonts/` already; if not, request from design team or use fallback font |
| Scroll spy conflicts with smooth scroll | Low | Medium | Use `isScrolling` flag with 600ms timeout to debounce observer during programmatic scroll |
| Cloudflare Workers edge case with IntersectionObserver | Low | Low | IO is client-side only; no Workers compatibility concern |
| Mobile sidebar tabs UX unclear (no Figma mobile design) | Medium | Medium | Implement horizontal scroll tabs as best practice; request mobile design review |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved
- [x] `design-style.md` complete
- [x] Codebase research completed (this plan)
- [ ] Award images available (Phase 0 task)
- [ ] SVN-Gotham font verified in `public/fonts/`

### External Dependencies

- None — fully self-contained page with static data

---

## Estimated Complexity

- **Frontend**: **Medium** — Multiple components, scroll spy logic, responsive layout, but all presentational
- **Backend**: **None** — Static data
- **Testing**: **Medium** — Scroll spy + IntersectionObserver testing requires careful setup

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- The existing `KudosPromo` component in `src/components/home/` has a similar structure but different sizing. Creating a separate `KudosPromoBlock` for awards avoids coupling and allows independent styling.
- Existing award images in `public/assets/home/logos/award-*.png` are compact thumbnails used on the homepage grid. The awards page needs full 336x336px versions — check `award-*-full.png` variants.
- The `AppHeader` already marks "Award Information" as active based on current route. Verify this works for `/awards` path.
- The page subtitle "Sun* Annual Awards 2025" uses #2E3940 on #00101A background (~2:1 contrast). This is intentionally decorative. Consider `aria-hidden="true"` if strict WCAG compliance is required.
- Open question from spec review: Top Talent unit label — "Đơn vị" vs "Cá nhân". Default to what's in the static data file; easy to change later.
