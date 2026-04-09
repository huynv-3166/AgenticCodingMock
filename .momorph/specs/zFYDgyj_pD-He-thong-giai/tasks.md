# Tasks: Hệ thống giải thưởng SAA 2025

**Frame**: `zFYDgyj_pD-He-thong-giai`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets & Project Structure)

**Purpose**: Verify assets, create directories, ensure project readiness

- [x] T001 Check existing award images in `public/assets/home/logos/award-*-full.png` — verify if 336x336px and suitable for awards page. If not, download from Figma using `get_media_files` tool | public/assets/awards/
- [x] T002 [P] Download hero banner image for awards page from Figma using `get_media_files` tool. Save as `hero-awards.png` | public/assets/awards/hero-awards.png
- [x] T003 [P] Verify SVN-Gotham font exists in `public/fonts/`. If missing, request from design team or add fallback font strategy | public/fonts/
- [x] T004 Organize award images (6 category images 336x336px) into `public/assets/awards/` with names: `top-talent.png`, `top-project.png`, `top-project-leader.png`, `best-manager.png`, `signature-2025.png`, `mvp.png` | public/assets/awards/

---

## Phase 2: Foundation (Types, Data, CSS Variables, i18n)

**Purpose**: Core infrastructure required by ALL user stories. No component work can begin until this phase is complete.

- [x] T005 Add `AwardDetail` type to types file. Fields: id, title, description, image, quantity, unit, prizeValue, prizeNote, prizeValueGroup?, prizeNoteGroup? (all from spec.md Data Requirements table) | src/types/index.ts
- [x] T006 [P] Create static awards data file with `AWARD_CATEGORIES: AwardDetail[]` array containing all 6 categories (Top Talent: qty 10, 7M; Top Project: qty 02, 15M; Top Project Leader: qty 03, 7M; Best Manager: qty 01, 10M; Signature 2025: qty 01, 5M/8M; MVP: qty 01, 15M). Also export `AWARDS_PAGE_META` with hero image path and title strings | src/libs/data/awards.ts
- [x] T007 [P] Add new CSS variables to globals.css: `--spacing-sidebar-width: 178px`, `--spacing-sidebar-content-gap: 120px`, `--spacing-award-card-gap: 48px`, `--spacing-award-cards-gap: 80px`, `--radius-award-image: 24px`. Verify existing tokens (`--color-bg-primary`, `--shadow-award`, `--color-button-bg`, `--color-divider`) are already present | src/app/globals.css
- [x] T008 [P] Add award page i18n keys to Vietnamese dictionary: `awards_page_subtitle`, `awards_page_title`, `awards_quantity_label`, `awards_prize_label`, `awards_prize_note`, `awards_prize_note_individual`, `awards_prize_note_group`, `awards_or_divider`, `kudos_promo_label`, `kudos_promo_title`, `kudos_promo_cta` | src/libs/i18n/dictionaries/vi.json
- [x] T009 [P] Add same award page i18n keys to English dictionary with English translations | src/libs/i18n/dictionaries/en.json
- [x] T010 [P] Add same award page i18n keys to Japanese dictionary with Japanese translations | src/libs/i18n/dictionaries/ja.json

**Checkpoint**: Foundation ready — all types, data, CSS variables, and i18n keys in place. Component implementation can begin.

---

## Phase 3: User Story 1 — Xem thông tin hệ thống giải thưởng (Priority: P1) MVP

**Goal**: All 6 award cards visible with correct data, hero banner, and section title rendered.

**Independent Test**: Navigate to `/awards` — page shows hero banner "ROOT FURTHER", title "Hệ thống giải thưởng SAA 2025", and 6 award cards each with image, title, description, quantity (with unit), and prize value (VNĐ).

### Frontend (US1)

- [x] T011 [P] [US1] Create `HeroBanner` Server Component: full-width `next/image` with `priority` loading, gradient overlay using `::after` pseudo-element with `linear-gradient(0deg, #00101A -4.23%, transparent 52.79%)`, `position: relative`. "ROOT FURTHER" is part of the image, not text. Responsive: maintain aspect-ratio 1440/627 | src/components/awards/HeroBanner.tsx
- [x] T012 [P] [US1] Create `AwardSectionTitle` Server Component: centered flex-col layout with gap-4. Subtitle "Sun\* Annual Awards 2025" (24px/700, #2E3940, `aria-hidden="true"` for low contrast decorative text). Title from i18n `awards_page_title` (57px/700, #FFEA9E). Use `<h1>` for title | src/components/awards/AwardSectionTitle.tsx
- [x] T013 [P] [US1] Create `AwardCard` Server Component: Props: `award: AwardDetail`, `dictionary`. Layout: flex-row gap-48px (responsive: flex-col on mobile). Left: `next/image` 336x336px with `box-shadow: var(--shadow-award)`, `mix-blend-mode: screen`, `border-radius: 24px`, `border: 0.955px solid #FFEA9E`. Right: flex-col gap-32px with backdrop-filter blur(32px). Content: title (24px/700 gold), description (16px/700 white), quantity row (label 24px gold + number 36px white + unit 14px white), prize row (same pattern). Handle Signature 2025 dual-prize: two prize rows with "Hoặc" divider (14px/700, #2E3940). Image `onError`: show gradient placeholder | src/components/awards/AwardCard.tsx
- [x] T014 [P] [US1] Create `AwardCardList` Server Component: Maps over `AWARD_CATEGORIES` array, renders `AwardCard` for each. Wrap each card in `<section id={award.id} aria-labelledby={award.id + '-title'}>` with `scroll-margin-top: 100px` for anchor offset. Vertical stack with gap-80px | src/components/awards/AwardCardList.tsx
- [x] T015 [US1] Create barrel exports for all award components | src/components/awards/index.ts
- [x] T016 [US1] Create awards page Server Component: async function, auth check (reuse pattern from `src/app/page.tsx` — `createClient()`, `getUser()`, redirect if no user). Get locale from cookies, get dictionary. Import `AWARD_CATEGORIES` from static data. Render: `<AppHeader>` → `<main>` containing `<HeroBanner>` → `<AwardSectionTitle>` → `<AwardCardList>` → `<AppFooter>`. Dark background `bg-[var(--color-bg-primary)]` | src/app/awards/page.tsx
- [x] T017 [US1] Update component barrel exports to include new award components | src/components/index.ts

**Checkpoint**: User Story 1 complete — `/awards` shows all 6 award cards with correct static data.

---

## Phase 4: User Story 2 — Điều hướng nhanh giữa các hạng mục giải (Priority: P1)

**Goal**: Sticky sidebar navigation with scroll spy, smooth scroll on click, active state tracking.

**Independent Test**: Click each of 6 sidebar items — page smooth-scrolls to correct section. Manually scroll the page — sidebar active state updates automatically. Tab through sidebar items with keyboard — focus ring visible, Enter/Space activates.

### Frontend (US2)

- [x] T018 [US2] Create `AwardSidebar` Client Component (`"use client"`): Props: `categories: { id: string; title: string }[]`. State: `activeCategory` (string, default first category id), `isScrolling` (boolean). Render: `<nav aria-label="Award categories">` with sticky positioning (`sticky top-[100px]`), width 178px, flex-col gap-16px. Each item is a `<button>` with: padding 16px, border-radius 4px, font 14px/700 Montserrat, letter-spacing 0.25px. States — Default: white text, transparent bg. Active: gold text #FFEA9E, bg rgba(255,234,158,0.1), border-bottom 1px solid #FFEA9E, text-shadow `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`. Hover: bg rgba(255,234,158,0.1). Focus: `outline: 2px solid #FFEA9E, outline-offset: 2px`. Click handler: set `isScrolling=true`, call `document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' })`, setTimeout 600ms to reset `isScrolling=false`. Scroll spy: `useEffect` with `IntersectionObserver` on all `section[id]` elements, config `{ threshold: 0.3, rootMargin: '-100px 0px -60% 0px' }`, update `activeCategory` only when `!isScrolling`. `aria-current="true"` on active item. Cleanup observer on unmount | src/components/awards/AwardSidebar.tsx
- [x] T019 [US2] Create `AwardContent` Client Component (`"use client"`): Props: `sidebar: ReactNode`, `children: ReactNode` (Server/Client boundary pattern). Layout: flex-row with gap `var(--spacing-sidebar-content-gap)` (120px). Sidebar slot renders via prop, children slot renders server-rendered card list. Responsive: on desktop (`lg:`) show sidebar + children side by side. On mobile (`< lg`): hide sidebar, show horizontal scrolling tabs above children (duplicate category buttons in a `flex-row overflow-x-auto` strip, sticky below header at `top-[80px]`). Use `lg:hidden` / `hidden lg:flex` for responsive toggle | src/components/awards/AwardContent.tsx
- [x] T020 [US2] Refactor `src/app/awards/page.tsx` to use Server/Client boundary pattern: wrap `AwardCardList` and `AwardSidebar` inside `AwardContent` using children prop: `<AwardContent sidebar={<AwardSidebar categories={categories} />}><AwardCardList awards={AWARD_CATEGORIES} dictionary={dictionary} /></AwardContent>` | src/app/awards/page.tsx

**Checkpoint**: User Story 2 complete — sidebar navigation, scroll spy, keyboard nav all working.

---

## Phase 5: User Story 3 — Xem thông tin Sun\* Kudos và điều hướng (Priority: P2)

**Goal**: Kudos promotion block at bottom of awards page with working CTA link.

**Independent Test**: Scroll to bottom of `/awards` — see "Sun\* Kudos" block with title, description, decorative text, and gold "Chi tiết" button. Click button — navigates to Kudos page.

### Frontend (US3)

- [x] T021 [US3] Create `KudosPromoBlock` Server Component: Container 1152px max-width, 500px height, rounded-2xl, bg #0F0F0F with background image, padding 40px 90px, flex justify-between items-center. Left content (flex-col): "Phong trào ghi nhận" label (16px/700, white), "Sun\* Kudos" heading (57px/700, #FFEA9E, letter-spacing -0.25px), description text (16px/700, white), CTA button. Right: "KUDOS" decorative text (SVN-Gotham 96px/400, #DBD1C1, letter-spacing -13%) + promotional image. CTA "Chi tiết" button: `<Link>` to Kudos page, gold filled (#FFEA9E bg, #00101A text), 16px/700, padding 16px, border-radius 4px, flex with gap-8px, `ArrowRightIcon` 24x24. Hover: `translateY(-1px)` + brightness. Focus: `outline 2px solid #FFEA9E, offset 2px`. Responsive: flex-col on mobile, reduced padding | src/components/awards/KudosPromoBlock.tsx
- [x] T022 [US3] Add `KudosPromoBlock` to awards page layout between `AwardContent` and `AppFooter`. Pass dictionary for i18n labels | src/app/awards/page.tsx

**Checkpoint**: User Story 3 complete — Kudos block visible with working CTA navigation.

---

## Phase 6: User Story 4 — Responsive Design (Priority: P2)

**Goal**: Page renders correctly on mobile (320px+), tablet (768px+), and desktop (1024px+).

**Independent Test**: View `/awards` at viewport widths 375px, 768px, 1024px, 1440px — layout adapts: mobile shows stacked cards with horizontal tabs; tablet shows compact sidebar; desktop shows full 2-column layout.

### Frontend (US4)

- [x] T023 [US4] Add responsive classes to `HeroBanner`: mobile `h-auto aspect-[1440/627]`, ensure image scales with `object-cover` | src/components/awards/HeroBanner.tsx
- [x] T024 [P] [US4] Add responsive classes to `AwardSectionTitle`: mobile `text-[32px] leading-[40px]`, tablet `text-[40px]`, desktop `text-[57px] leading-[64px]` for main title | src/components/awards/AwardSectionTitle.tsx
- [x] T025 [P] [US4] Add responsive classes to `AwardCard`: mobile `flex-col items-center`, image `w-[200px] h-[200px]` centered. Tablet: `gap-6`, image `w-[250px] h-[250px]`. Desktop: `flex-row gap-12`, image `w-[336px] h-[336px]`. Prize text: mobile `text-[28px]`, desktop `text-[36px]` | src/components/awards/AwardCard.tsx
- [x] T026 [P] [US4] Add responsive classes to `KudosPromoBlock`: mobile `flex-col gap-6 p-6`, tablet `p-8`, desktop `flex-row p-[40px_90px]` | src/components/awards/KudosPromoBlock.tsx
- [x] T027 [US4] Add responsive classes to `AwardContent`: mobile content padding `px-4 py-6`, tablet `px-8 py-12`, desktop `px-[144px] py-[96px]`. Verify mobile tabs and desktop sidebar toggle correctly | src/components/awards/AwardContent.tsx

**Checkpoint**: User Story 4 complete — all 3 breakpoints render correctly.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, deep links, loading states, reduced motion, final cleanup

- [x] T028 [P] Create route transition skeleton for awards page: placeholder blocks matching page structure (hero placeholder, title placeholder, sidebar placeholder, card placeholders) with animated pulse | src/app/awards/loading.tsx
- [x] T029 [P] Add deep link support to `AwardSidebar`: on mount (`useEffect`), check `window.location.hash`, if it matches a category ID, scroll to that section and set `activeCategory`. Ensure `scroll-margin-top: 100px` handles header offset | src/components/awards/AwardSidebar.tsx
- [x] T030 [P] Add `prefers-reduced-motion` support: wrap `scrollIntoView` behavior in motion check — use `behavior: 'instant'` when reduced motion is preferred. Add `motion-reduce:transition-none` to hover effects on sidebar items and CTA button | src/components/awards/AwardSidebar.tsx, src/components/awards/KudosPromoBlock.tsx
- [x] T031 [P] Verify `AppHeader` active state highlights "Award Information" when on `/awards` route. Check `AppHeaderClient` nav link logic and fix if needed | src/components/shared/AppHeaderClient.tsx
- [ ] T032 Run `yarn lint` and fix any ESLint warnings/errors across all new files | src/components/awards/*.tsx, src/app/awards/*.tsx
- [ ] T033 Run `yarn build` and verify successful build with no TypeScript errors. Test on Cloudflare Workers compatibility (no Node.js APIs used) | (project root)

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup/Assets)
  ↓
Phase 2 (Foundation: types, data, CSS, i18n)
  ↓ BLOCKS all user stories
Phase 3 (US1: Core UI) ←── MVP milestone
  ↓
Phase 4 (US2: Sidebar + Scroll Spy)  ←── depends on US1 (needs section elements)
  ↓
Phase 5 (US3: Kudos Block)  ←── can run parallel with US2
Phase 6 (US4: Responsive)   ←── can run parallel with US2/US3, applies to all components
  ↓
Phase 7 (Polish)  ←── after all user stories
```

### Parallel Opportunities

**Phase 1**: T001-T004 can all run in parallel (different assets)
**Phase 2**: T006, T007, T008, T009, T010 can run in parallel (different files). T005 should complete first (type used by T006)
**Phase 3**: T011, T012, T013, T014 can run in parallel (independent components). T015-T017 are sequential (integration)
**Phase 4**: T018 and T019 are sequential (T019 depends on T018 for sidebar component)
**Phase 5**: Can run in parallel with Phase 4 (different component)
**Phase 6**: T023-T026 can run in parallel (different component files). T027 depends on T019
**Phase 7**: T028, T029, T030, T031 can all run in parallel (different concerns)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1: static display of 6 award cards)
3. **STOP and VALIDATE**: Navigate to `/awards`, verify all content renders correctly
4. Deploy if ready — awards page is usable even without sidebar navigation

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 (US1) → Test → Deploy (static awards page)
3. Phase 4 (US2) → Test → Deploy (add sidebar navigation)
4. Phase 5 (US3) → Test → Deploy (add Kudos block)
5. Phase 6 (US4) → Test → Deploy (responsive polish)
6. Phase 7 → Test → Deploy (accessibility + final polish)

---

## Notes

- Commit after each phase or logical group of parallel tasks
- Run `yarn lint` and `yarn build` before moving to next phase
- Award descriptions are Vietnamese-only in static data (i18n labels are translated, descriptions are not — consistent with homepage pattern)
- Verify existing `award-*-full.png` images before downloading new ones from Figma
- SVN-Gotham font is only used for decorative "KUDOS" text — a serif fallback is acceptable if font unavailable
- Open question: Top Talent unit — "Đơn vị" vs "Cá nhân". Use whichever appears in the data; easy to change later
