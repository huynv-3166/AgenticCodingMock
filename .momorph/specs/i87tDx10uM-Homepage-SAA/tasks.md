# Tasks: Homepage SAA

**Frame**: `i87tDx10uM-Homepage-SAA`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4, US5, US6)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets, Tokens, Types, Data)

**Purpose**: Download assets, set up design tokens, types, and static data. No component code yet.

- [x] T001 Download all homepage images from Figma using get_media_files tool (hero-keyvisual, root-further-title, root-further-logo-sm, 6 award thumbnails, kudos-logo) | public/assets/home/
- [x] T002 Add Digital Numbers font file for countdown digits | public/fonts/DigitalNumbers-Regular.ttf
- [x] T003 Register Digital Numbers font via next/font/local in root layout | src/app/layout.tsx
- [x] T004 Extend globals.css with homepage design tokens from design-style.md (colors: --color-primary #FFEA9E, --color-border #998C5F, --color-kudos-bg #0F0F0F, --color-notification #D4271D, --color-gold-glow #FAE287; spacing: --spacing-section-gap 120px, --spacing-award-grid-gap 80px; shadows: --shadow-award, --shadow-nav-active; effects: --blur-countdown) | src/app/globals.css
- [x] T005 [P] Add AwardCategory and EventConfig TypeScript types | src/types/index.ts
- [x] T006 [P] Create static data constants (6 award categories with id/title/description/thumbnail_url/slug/display_order + event config with date/location/livestream + getUnreadNotificationCount placeholder returning 0) | src/libs/data/homepage.ts
- [x] T007 [P] Add homepage i18n dictionary entries to all 3 locale files (section titles, button labels, award titles/descriptions, countdown labels, footer text, "Coming soon") | src/libs/i18n/dictionaries/vi.json, en.json, ja.json
- [x] T008 Add EVENT_START_DATE environment variable to .env.example and .env.local | .env.example, .env.local

**Checkpoint**: All assets downloaded, design tokens configured, types/data/i18n ready. No visual output yet.

---

## Phase 2: Foundation (Shared Icons, Header, Footer)

**Purpose**: Build shared infrastructure required by ALL user stories. BLOCKS story implementation.

### Icons

- [x] T009 [P] Create BellIcon component (24x24, color prop, named export) | src/components/shared/icons/BellIcon.tsx
- [x] T010 [P] Create UserIcon component (24x24, color prop, named export) | src/components/shared/icons/UserIcon.tsx
- [x] T011 [P] Create ArrowRightIcon component (24x24, color prop, named export) | src/components/shared/icons/ArrowRightIcon.tsx
- [x] T012 [P] Create PencilIcon component (24x24, color prop, named export) | src/components/shared/icons/PencilIcon.tsx
- [x] T013 [P] Create SAAWidgetIcon component (24x24, color prop, named export) | src/components/shared/icons/SAAWidgetIcon.tsx
- [x] T014 [P] Create HamburgerIcon component (24x24, color prop, named export) | src/components/shared/icons/HamburgerIcon.tsx

### AppHeader (US3 dependency)

- [x] T015 Create AppHeader Server Component shell -- sticky top, z-50, logo (52x48 reusing existing SAA logo asset), nav links container, actions container (bell, language, profile). Desktop layout: flex space-between. Mobile (< 768px): show only logo + hamburger | src/components/shared/AppHeader.tsx
- [x] T016 Create AppHeaderClient Client Component ("use client") -- wraps nav section with usePathname() for active state (gold text + underline + glow on current route). Manages open/close state for 3 dropdown triggers (notification, language, profile). Dropdown panels = empty placeholder shells with "Coming soon". Handles click-outside-to-close + Escape key dismiss. Nav links: "About SAA 2025" -> /, "Award Information" -> /awards-information, "Sun* Kudos" -> /sun-kudos | src/components/shared/AppHeaderClient.tsx
- [x] T017 Create MobileMenuButton Client Component ("use client") -- hamburger icon toggle, slide-out nav panel with same nav links + notification + language + profile buttons. Visible only below 768px | src/components/shared/MobileMenuButton.tsx
- [ ] T018 Write AppHeader unit tests -- active state highlights correct link per route, all 3 nav links render with correct hrefs, dropdown toggles open/close, Escape key closes dropdown | src/components/shared/AppHeader.test.tsx

### AppFooter (US6 dependency)

- [x] T019 Create AppFooter Server Component -- logo (69x64, <a href="#"> to scroll to top), 4 nav links (About SAA 2025, Award Information, Sun* Kudos, Tieu chuan chung) in flex row gap-12 (48px), copyright text in Montserrat Alternates. Border-top 1px #2E3940. Padding 40px 90px desktop, responsive stacking on mobile | src/components/shared/AppFooter.tsx
- [ ] T020 Write AppFooter unit tests -- all 4 links render with correct hrefs, copyright text present, logo links to # | src/components/shared/AppFooter.test.tsx

### Barrel Exports

- [x] T021 Update barrel exports to include all new icons, AppHeader, AppHeaderClient, MobileMenuButton, AppFooter | src/components/index.ts

**Checkpoint**: Shared header + footer + icons ready. User story implementation can begin.

---

## Phase 3: User Story 1 - View Homepage Hero Section (Priority: P1) MVP

**Goal**: Authenticated user sees ROOT FURTHER hero with countdown timer, event info, and CTA buttons.

**Independent Test**: Navigate to / after login. Verify hero section renders with ROOT FURTHER title image, countdown timer shows correct remaining time (Days/Hours/Minutes), event date/location/livestream are displayed, and both CTA buttons are visible and link correctly.

### Components (US1)

- [x] T022 [P] [US1] Create HeroSection Server Component -- full-bleed keyvisual background image (next/image with priority, fill, sizes="100vw"), gradient overlay (linear-gradient per design-style.md), ROOT FURTHER title image (451x200) rendered internally, children slot for countdown/event/CTA. Height 1392px desktop, responsive | src/components/home/HeroSection.tsx
- [x] T023 [P] [US1] Create CountdownTimer Client Component ("use client") -- props: targetDate: string | null, comingSoonLabel: string, daysLabel: string, hoursLabel: string, minutesLabel: string. Calculate remaining days/hours/minutes from targetDate. setInterval every 60s. Zero-pad to 2 digits. Glassmorphism digit tiles (51.2x81.92px, border 0.5px #FFEA9E, backdrop-blur 16.64px, opacity 0.5, gradient bg, Digital Numbers font ~49px dark text). "Coming soon" label hidden when event passed. aria-live="polite" on timer region. If targetDate is null, show "00" for all units and hide "Coming soon" | src/components/home/CountdownTimer.tsx
- [x] T024 [P] [US1] Create EventInfo Server Component -- 2-row flex layout. Row 1: flex row gap-60px with "Thoi gian:" (gold) + date value (white) + "Dia diem:" (gold) + location value (white). Row 2: livestream note (white). Font: Montserrat 16px 400. Props from EventConfig data | src/components/home/EventInfo.tsx
- [x] T025 [P] [US1] Create HeroCTA Server Component -- flex row gap-40px. "ABOUT AWARDS" button: Link to /awards-information, 276x60px, bg #FFEA9E, rounded-lg, Montserrat 22px 700 dark text, ArrowRightIcon. "ABOUT KUDOS" button: Link to /sun-kudos, 60px height, border 1px #998C5F, rounded-lg, Montserrat 22px 700 gold text, ArrowRightIcon. Hover states per design-style.md (swap fill/outline). Responsive: stack vertically on mobile | src/components/home/HeroCTA.tsx

### Tests (US1)

- [ ] T026 [US1] Write CountdownTimer unit tests -- correct time calculation from future date, zero-padding (5 -> "05"), event-passed state hides "Coming soon" and shows 00:00:00, null targetDate fallback, setInterval cleanup on unmount, aria-live attribute present | src/components/home/CountdownTimer.test.tsx

**Checkpoint**: Hero section complete and independently testable. User can see ROOT FURTHER + countdown + event info + CTAs.

---

## Phase 4: User Story 2 - Browse Award Categories (Priority: P1)

**Goal**: User scrolls to see 6 award category cards in a responsive grid with navigation to detail pages.

**Independent Test**: Scroll to "He thong giai thuong" section. Verify 6 cards render in 3-col grid (desktop), each with image/title/description/link. Click any card -> navigates to /awards-information#{slug}. Long descriptions truncate at 2 lines.

### Components (US2)

- [x] T027 [P] [US2] Create AwardSectionHeader Server Component -- caption "Sun* annual awards 2025" (16px 700 gold), title "He thong giai thuong" (57px 700 white, letter-spacing -0.25px), sub-description (16px 400 white). Flex column gap-16px | src/components/home/AwardSectionHeader.tsx
- [x] T028 [P] [US2] Create AwardCard Server Component -- props: AwardCategory. Entire card wrapped in Link href="/awards-information#{slug}". Image: 336x336 next/image, rounded-3xl, border 1px #FFEA9E, box-shadow gold glow, mix-blend-mode screen. Title: 24px 400 gold. Description: 16px 400 white, display -webkit-box, -webkit-line-clamp 2, overflow hidden. "Chi tiet" link: 16px 500 gold + ArrowRightIcon 24x24. Hover: translateY(-4px), glow intensifies. Transition 200ms ease-out | src/components/home/AwardCard.tsx
- [x] T029 [US2] Create AwardGrid Server Component -- props: AwardCategory[]. Responsive grid: grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-20. Maps array to AwardCard components. Empty array fallback: centered "No awards available" message | src/components/home/AwardGrid.tsx

### Tests (US2)

- [ ] T030 [US2] Write AwardCard unit tests -- renders title and description, long text truncates (line-clamp-2 class applied), Link href includes slug hash (#top-talent), image has descriptive alt text | src/components/home/AwardCard.test.tsx

**Checkpoint**: Award section complete. 6 cards render in grid, each navigates to correct award detail.

---

## Phase 5: User Story 3 - Navigate Using Header (Priority: P1)

**Goal**: Header shows active state for current page, all nav links work, dropdown triggers function.

**Independent Test**: On homepage, "About SAA 2025" shows gold + underline. Click "Award Information" -> navigates. Click bell/language/profile -> dropdown opens. Click outside -> dropdown closes.

> Note: AppHeader and AppFooter were built in Phase 2 (Foundation). This phase verifies integration with page.tsx.

- [x] T031 [US3] Integrate AppHeader into page.tsx -- pass currentLanguage from cookie, pass dictionary strings for nav labels to AppHeaderClient as individual props | src/app/page.tsx (partial -- header integration only)

**Checkpoint**: Header navigation works on homepage with correct active state.

---

## Phase 6: User Story 4 - Discover Sun* Kudos Program (Priority: P2)

**Goal**: User sees Kudos promotional section and can navigate to Sun* Kudos page.

**Independent Test**: Scroll to Kudos section. Verify "Phong trao ghi nhan" label, "Sun* Kudos" title, "DIEM MOI CUA SAA 2025" highlight, description, KUDOS logo image, and "Chi tiet" button linking to /sun-kudos.

- [x] T032 [US4] Create KudosPromo Server Component -- outer container max-w-1224px h-500px. Inner card: max-w-1120px, bg #0F0F0F, rounded-2xl (16px), flex row. Left content (457x408px): "Phong trao ghi nhan" label (16px 700 gold), "Sun* Kudos" title (57px 700 white), "DIEM MOI CUA SAA 2025" highlight label, description paragraph (16px 400 white), "Chi tiet" button (127x56px, bg #FFEA9E, rounded 4px, 16px 500 dark text, ArrowRightIcon, Link to /sun-kudos). Right: KUDOS logo image via next/image. Responsive: stack vertically on tablet/mobile | src/components/home/KudosPromo.tsx

**Checkpoint**: Kudos promo section renders and links to Sun* Kudos page.

---

## Phase 7: User Story 5 - Floating Action Widget (Priority: P2)

**Goal**: FAB appears fixed at bottom-right, click opens placeholder menu.

**Independent Test**: Verify gold pill button (106x64px) visible at bottom-right. Click -> placeholder menu toggles.

- [x] T033 [US5] Create FloatingActionButton Client Component ("use client") -- pill shape 106x64px, bg #FFEA9E, rounded-full (100px), box-shadow gold glow, fixed bottom-6 right-6 z-50. Contains PencilIcon + "/" + SAAWidgetIcon (all #00101A). Click toggles placeholder menu panel. Hover: scale(1.05). Focus: outline 2px solid #FFEA9E offset 2px | src/components/home/FloatingActionButton.tsx

**Checkpoint**: FAB visible and toggles on click.

---

## Phase 8: User Story 6 - Footer Navigation (Priority: P3)

**Goal**: Footer renders with nav links and copyright.

**Independent Test**: Scroll to footer. Verify logo, 4 nav links, copyright "Ban quyen thuoc ve Sun* (c) 2025". Click links navigate correctly.

> Note: AppFooter was built in Phase 2 (Foundation). This phase is integration only.

- [x] T034 [US6] Integrate AppFooter into page.tsx -- pass dictionary for translated footer text | src/app/page.tsx (partial -- footer integration only)

**Checkpoint**: Footer renders with all navigation links and copyright.

---

## Phase 9: Page Assembly & Root Further Content

**Purpose**: Wire up RootFurtherContent and assemble the complete page.tsx.

- [x] T035 Create RootFurtherContent Server Component -- small ROOT FURTHER logo top-right (opacity 0.3, float right or absolute). Justified gold paragraphs (16px 700 Montserrat, text-align justify, letter-spacing 0.5px). Centered quote block ("A tree with deep roots fears no storm") at 20px 700, centered. Quote attribution (16px 400, centered). Container max-w-1152px, px-104px, py-120px, rounded-lg | src/components/home/RootFurtherContent.tsx
- [x] T036 Assemble complete page.tsx -- replace placeholder with full Homepage composition per plan.md Assembly Order. Auth check (createClient + getUser + redirect). Read EVENT_START_DATE from process.env. Read locale from cookie. Load dictionary via getDictionary(). Compose: AppHeader -> main (HeroSection with CountdownTimer + EventInfo + HeroCTA, 120px gap, RootFurtherContent, 120px gap, Awards section with AwardSectionHeader + AwardGrid, 120px gap, KudosPromo) -> AppFooter -> FloatingActionButton. Pass translated string props to client components | src/app/page.tsx
- [x] T037 Update barrel exports with all home/ components (HeroSection, CountdownTimer, EventInfo, HeroCTA, RootFurtherContent, AwardSectionHeader, AwardCard, AwardGrid, KudosPromo, FloatingActionButton) | src/components/index.ts

**Checkpoint**: Full homepage renders with all sections in correct order.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Responsive fixes, hover/focus states, accessibility, loading states.

### Responsive

- [ ] T038 [P] Responsive fixes for HeroSection -- mobile: reduce ROOT FURTHER image to 280px width, stack countdown vertically if needed | src/components/home/HeroSection.tsx
- [ ] T039 [P] Responsive fixes for HeroCTA -- mobile: stack buttons vertically (flex-col, full width), tablet: stack vertically | src/components/home/HeroCTA.tsx
- [ ] T040 [P] Responsive fixes for RootFurtherContent -- mobile: padding 24px 16px, tablet: padding 48px 24px | src/components/home/RootFurtherContent.tsx
- [ ] T041 [P] Responsive fixes for KudosPromo -- mobile/tablet: stack vertically (content above, image below), height auto | src/components/home/KudosPromo.tsx
- [ ] T042 [P] Responsive fixes for EventInfo -- mobile: stack date/location vertically instead of row | src/components/home/EventInfo.tsx

### Hover, Focus & Active States

- [ ] T043 Add hover/focus/active states for all interactive elements per design-style.md -- CTA buttons (Normal/Hover/Active/Focus), award cards (translateY + glow), chi-tiet links (underline + icon shift), nav links (Selected/Hover/Normal), footer links (Hover/Active/Focus), FAB (scale), notification/language/profile buttons (bg tint on hover, focus ring) | Multiple files (apply via Tailwind classes)

### Accessibility

- [ ] T044 [P] Add ARIA landmarks to page.tsx -- semantic <header>, <nav>, <main>, <footer> elements. aria-live="polite" + aria-label on CountdownTimer region | src/app/page.tsx
- [ ] T045 [P] Add focus indicators (outline 2px solid #FFEA9E offset 2px) as global focus-visible style | src/app/globals.css
- [ ] T046 [P] Verify and fix alt text on all images -- hero bg: decorative alt="", award badges: descriptive (e.g., "Top Talent award badge"), logos: "Sun* Annual Awards 2025" | Multiple component files
- [ ] T047 Verify keyboard tab order -- header L-to-R, then page top-to-bottom. Escape closes dropdowns. Enter/Space activates buttons | Manual verification + fix

### Loading States

- [ ] T048 [P] Add Next.js Image placeholder="blur" with blurDataURL for hero keyvisual image | src/components/home/HeroSection.tsx
- [ ] T049 [P] Add explicit width/height to all next/image usages to prevent CLS (award cards: 336x336, logos: per design-style.md dimensions) | Multiple component files

### Reduced Motion

- [ ] T050 Verify prefers-reduced-motion CSS in globals.css disables card lift animations and countdown transitions (already exists from Login implementation -- verify it covers new animations) | src/app/globals.css

**Checkpoint**: Homepage is responsive, accessible, and polished at all breakpoints.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──────► Phase 2 (Foundation) ──────► Phase 3-8 (User Stories) ──────► Phase 9 (Assembly) ──────► Phase 10 (Polish)
                                                       ├── Phase 3: US1 (Hero) ──────┐
                                                       ├── Phase 4: US2 (Awards) ────┤
                                                       ├── Phase 5: US3 (Header) ────┤
                                                       ├── Phase 6: US4 (Kudos) ─────┼──► Phase 9 (Assembly)
                                                       ├── Phase 7: US5 (FAB) ───────┤
                                                       └── Phase 8: US6 (Footer) ────┘
```

- **Phase 1 (Setup)**: No dependencies -- start immediately
- **Phase 2 (Foundation)**: Depends on Phase 1 (needs icons, tokens, types)
- **Phases 3-8 (User Stories)**: All depend on Phase 2 completion. Can run **in parallel** with each other.
- **Phase 9 (Assembly)**: Depends on ALL user story phases (3-8) being complete
- **Phase 10 (Polish)**: Depends on Phase 9 (needs assembled page)

### Within Each User Story

- Components marked [P] within a phase can be built in parallel
- Tests depend on the component they test being complete
- Integration tasks (T031, T034) depend on the component + page.tsx existing

### Parallel Opportunities

Within Phase 1 (Setup):
- T005, T006, T007 can run in parallel (different files)

Within Phase 2 (Foundation):
- T009-T014 (all 6 icons) can run in parallel
- T015-T017 (AppHeader, AppHeaderClient, MobileMenuButton) are sequential
- T019 (AppFooter) can parallel with T015-T017

Within Phase 3 (US1 Hero):
- T022, T023, T024, T025 can all run in parallel (different component files)

Within Phase 4 (US2 Awards):
- T027, T028 can run in parallel

Across user story phases:
- Phases 3, 4, 6, 7 can all run **in parallel** (independent component files)
- Phases 5 and 8 are integration-only (depend on Phase 2 components + page.tsx)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (US1 - Hero Section)
3. **STOP and VALIDATE**: Verify hero renders with countdown + event info + CTAs
4. If ready: proceed to remaining phases

### Incremental Delivery

1. Phase 1 + 2 -> Foundation ready
2. Phase 3 (Hero) -> Test -> visible hero section
3. Phase 4 (Awards) -> Test -> award grid works
4. Phase 6 (Kudos) + Phase 7 (FAB) -> Test -> supplementary sections
5. Phase 5 + 8 (Header/Footer integration) -> already built, just wire up
6. Phase 9 (Assembly) -> full page
7. Phase 10 (Polish) -> responsive + a11y + loading states

---

## Notes

- Commit after each completed phase or logical group of tasks
- Run `yarn lint` before each commit (constitution requirement)
- Run `yarn test` after completing test tasks to verify tests pass
- Mark tasks complete as you go: `[x]`
- US3 (Header) and US6 (Footer) are thin integration phases since the components are built in Phase 2 (Foundation)
- The `RootFurtherContent` component is in Phase 9 (not a user story) because it's static display content with no interactive behavior or independent testability
