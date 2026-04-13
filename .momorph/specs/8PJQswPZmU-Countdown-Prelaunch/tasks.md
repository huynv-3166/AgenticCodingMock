# Tasks: Countdown - Prelaunch Page

**Frame**: `8PJQswPZmU-Countdown-Prelaunch`
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

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download assets, create folder structure, prepare shared infrastructure

- [x] T001 Download background artwork from Figma using `get_media_files` tool for screen `8PJQswPZmU`. Save to `public/assets/countdown/background.png`. Verify image quality and dimensions | public/assets/countdown/background.png
- [x] T002 [P] Add `countdown_title` i18n key to Vietnamese dictionary: `"countdown_title": "Sự kiện sẽ bắt đầu sau"` | src/libs/i18n/dictionaries/vi.json
- [x] T003 [P] Add `countdown_title` i18n key to English dictionary: `"countdown_title": "Event will start in"` | src/libs/i18n/dictionaries/en.json
- [x] T004 [P] Add `countdown_title` i18n key to Japanese dictionary: `"countdown_title": "イベント開始まで"` | src/libs/i18n/dictionaries/ja.json
- [x] T005 Add Countdown Prelaunch CSS variables to globals.css under a `/* === Countdown Prelaunch Design Tokens === */` section: `--color-prelaunch-gradient`, `--spacing-prelaunch-unit-gap: 60px`, `--spacing-prelaunch-digit-gap: 21px`, `--spacing-prelaunch-title-gap: 24px`, `--blur-prelaunch-digit: 24.96px` | src/app/globals.css

---

## Phase 2: Foundation (Shared Utils — Blocking)

**Purpose**: Extract shared countdown utilities used by both homepage and prelaunch timers. TDD: write tests first.

**CRITICAL**: Must complete before US1 can begin.

- [x] T006 Write unit tests for `calculateTimeLeft` and `padTwo` functions (Red phase — tests MUST fail initially since the utility file doesn't exist yet). Test cases: future date returns correct days/hours/minutes, past date returns `{ days: 0, hours: 0, minutes: 0, isPassed: true }`, null date returns isPassed true, boundary at exactly 0, day > 99 | src/libs/utils/countdown.test.ts
- [x] T007 Extract `calculateTimeLeft` and `padTwo` functions from existing `src/components/home/CountdownTimer.tsx` into shared utility. Export both as named exports. Run T006 tests — they MUST pass (Green phase) | src/libs/utils/countdown.ts
- [x] T008 Refactor existing `CountdownTimer.tsx` to import `calculateTimeLeft` and `padTwo` from `@/libs/utils/countdown` instead of defining them inline. Verify existing homepage countdown still works (no behavior change) | src/components/home/CountdownTimer.tsx

**Checkpoint**: Shared utils extracted, existing homepage unaffected, unit tests green.

---

## Phase 3: User Story 1 — View Countdown Timer (Priority: P1) MVP

**Goal**: Authenticated user sees a full-screen countdown page at `/countdown` with glassmorphism digit cards showing Days, Hours, Minutes on a dark background with abstract artwork.

**Independent Test**: Navigate to `/countdown` with a future event date. Verify title "Sự kiện sẽ bắt đầu sau", three countdown units (DAYS/HOURS/MINUTES) with correct values, glassmorphism cards, background artwork, gradient overlay. Timer decrements after 60 seconds.

### Components (US1)

- [x] T009 [P] [US1] Create `PrelaunchDigitCard` component: glassmorphism card (77x123px desktop) with gradient bg `linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)`, border `0.75px solid #FFEA9E`, `opacity: 0.5`, `backdrop-filter: blur(24.96px)` + `-webkit-backdrop-filter`, border-radius 12px. Centered digit text using Digital Numbers font (`var(--font-digital-numbers)`), 73.73px, white. Accept `digit: string` prop. Named export | src/components/countdown/PrelaunchDigitCard.tsx
- [x] T010 [P] [US1] Create `PrelaunchCountdownTimer` client component (`"use client"`). Props: `targetDate: string`, `serverNow: number`, `title: string`, `daysLabel: string`, `hoursLabel: string`, `minutesLabel: string`. On mount: calculate clock offset (`serverNow - Date.now()`), store in `useRef`. State: `timeRemaining` (from `calculateTimeLeft` with offset applied), `status: 'loading' | 'active' | 'completed' | 'error'`. `useEffect` with `setInterval(60_000)` to update countdown. Render: italic title (`font-bold italic font-[family-name:var(--font-montserrat)]`), 3 CountdownUnit groups (each has 2 `PrelaunchDigitCard` + label below), `role="timer"`, `aria-live="polite"`, `aria-label` per unit. Gap between units: 60px. Gap between digit cards: 21px. Gap digits-to-label: 21px. Gap title-to-timer: 24px | src/components/countdown/PrelaunchCountdownTimer.tsx
- [x] T011 [US1] Add barrel exports for `PrelaunchCountdownTimer` and `PrelaunchDigitCard` to components index under a `// Countdown components` section | src/components/index.ts

### Page (US1)

- [x] T012 [US1] Create countdown page as async Server Component. Steps: (1) Auth check via `createClient()` from `@/libs/supabase/server` → if no user, `redirect("/login")`; (2) Read event start time from `process.env.NEXT_PUBLIC_EVENT_START_TIME` with fallback to `EVENT_CONFIG.event_start_date`; (3) If event already started (`new Date(eventStartTime) <= new Date()`), `redirect("/")`; (4) Read locale from `NEXT_LOCALE` cookie, get dictionary via `getDictionary(locale)`; (5) Capture `serverNow = Date.now()` for clock drift; (6) Render: outer div (`relative min-h-screen overflow-hidden bg-[var(--color-bg-primary)]`), `<Image>` with `src="/assets/countdown/background.png"` fill priority `sizes="100vw"` `className="object-cover"`, gradient overlay div (`absolute inset-0`, inline style `background: linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)`), content wrapper (`relative z-10 flex items-center justify-center min-h-screen`), `<PrelaunchCountdownTimer>` with all props | src/app/countdown/page.tsx

### Middleware (US1)

- [x] T013 [US1] Write unit tests for middleware event-time routing logic. Test: authenticated user at `/` with future event → redirect to `/countdown`; authenticated user at `/countdown` with past event → redirect to `/`; authenticated user at `/login` with future event → redirect to `/countdown`; unauthenticated user at `/` → no redirect (existing behavior); no event config → assume started (no block). Use mocked `createClient` and `EVENT_CONFIG` | src/middleware.test.ts
- [x] T014 [US1] Update middleware to add event-time routing. Import `EVENT_CONFIG` from `@/libs/data/homepage`. Read `process.env.NEXT_PUBLIC_EVENT_START_TIME` with fallback. Add 3 redirect rules: (1) `user && pathname === "/" && !eventHasStarted` → `/countdown`; (2) `pathname === "/countdown" && eventHasStarted` → `/`; (3) Modify existing login redirect: `user && pathname === "/login"` → `eventHasStarted ? "/" : "/countdown"`. If no event config, assume started (`true`). Run T013 tests — all MUST pass | src/middleware.ts

**Checkpoint**: Full countdown page works on desktop. Navigate to `/countdown` to see the countdown. Middleware redirects `/` → `/countdown` when event not started. Auth check works.

---

## Phase 4: User Story 2 — Responsive Display (Priority: P2)

**Goal**: Countdown page renders correctly at all breakpoints (320px through 1440px).

**Independent Test**: Resize browser to 320px, 375px, 768px, 1024px, 1280px, 1440px. At each breakpoint, all text is readable, digit cards maintain proportions, no overflow or horizontal scrolling.

- [x] T015 [P] [US2] Add responsive Tailwind classes to `PrelaunchDigitCard`: mobile (`w-12 h-[77px]`, `rounded-lg`, digit text `text-[44px]`), tablet (`md:w-[60px] md:h-24`, `md:rounded-[10px]`, digit `md:text-[56px]`), desktop (`lg:w-[77px] lg:h-[123px]`, `lg:rounded-xl`, digit `lg:text-[73.73px]`) | src/components/countdown/PrelaunchDigitCard.tsx
- [x] T016 [P] [US2] Add responsive classes to `PrelaunchCountdownTimer`: title (`text-xl md:text-[28px] lg:text-4xl`, `leading-7 md:leading-9 lg:leading-[48px]`), timer container gap (`gap-4 md:gap-10 lg:gap-[60px]`), countdown unit gap (`gap-2 md:gap-3.5 lg:gap-[21px]`), digit cards row gap (`gap-2 md:gap-3.5 lg:gap-[21px]`), unit label (`text-sm md:text-2xl lg:text-4xl`, `leading-5 md:leading-8 lg:leading-[48px]`) | src/components/countdown/PrelaunchCountdownTimer.tsx
- [x] T017 [US2] Add responsive padding to countdown page content wrapper: mobile (`px-6 py-12`), tablet (`md:px-12 md:py-16`), desktop (`lg:px-[144px] lg:py-24`). Ensure background image has `object-cover` and parent has `overflow-hidden` | src/app/countdown/page.tsx
- [x] T018 [US2] Visual test at all 6 constitution breakpoints: 320px, 375px, 768px, 1024px, 1280px, 1440px. Verify: no horizontal scroll, text readable, digit cards proportional, background covers viewport

**Checkpoint**: Page looks correct at all breakpoints.

---

## Phase 5: User Story 3 — Auto-redirect & Edge Cases (Priority: P2)

**Goal**: Countdown auto-redirects to homepage when timer reaches zero. Loading and error states handle all edge cases.

**Independent Test**: Set event start time to 1 minute in the future. Wait for countdown to reach zero. Verify auto-redirect to `/`. Also test: visit `/countdown` after event started → immediate redirect.

- [x] T019 [US3] Implement client-side redirect logic in `PrelaunchCountdownTimer`: add `useEffect` watching `timeRemaining` — when all values are 0 and `status === 'active'`, set `status` to `'completed'`, then after 1-second delay call `useRouter().push("/")`. Import `useRouter` from `next/navigation` | src/components/countdown/PrelaunchCountdownTimer.tsx
- [x] T020 [US3] Implement loading state in `PrelaunchCountdownTimer`: initial `status` is `'loading'`. On first `useEffect` mount, calculate initial `timeRemaining`, if valid transition to `'active'`. While `'loading'`: render title + 6 skeleton digit cards (same dimensions but with pulse animation, no digit text). Use `animate-pulse bg-white/10 rounded-xl` for skeleton | src/components/countdown/PrelaunchCountdownTimer.tsx
- [x] T021 [US3] Implement error state in `PrelaunchCountdownTimer`: if `targetDate` is null, empty string, or results in `NaN` when parsed, set `status` to `'error'`. Render: background visible + error message "Unable to load event information. Please try again." centered + native `<button>` with `onClick={() => window.location.reload()}`. Button uses standard styling (`bg-[var(--color-button-bg)] text-[var(--color-button-text)] px-6 py-4 rounded-lg font-bold`) and is keyboard-accessible | src/components/countdown/PrelaunchCountdownTimer.tsx
- [x] T022 [US3] Handle days > 99 edge case: in `PrelaunchCountdownTimer`, if `timeRemaining.days > 99`, cap display at `99` and add `+` indicator (e.g., render "99+" using 3 characters or simply cap at 99). Update `padTwo` call to handle this gracefully | src/components/countdown/PrelaunchCountdownTimer.tsx

**Checkpoint**: Auto-redirect works. Loading skeleton shows on initial render. Error state displays when targetDate is invalid. Days > 99 handled.

---

## Phase 6: User Story 4 — i18n & Polish (Priority: P3)

**Goal**: Title text translates correctly for all 3 locales. Page has polished animations and meets performance targets.

**Independent Test**: Switch language to EN (via language selector on another page or cookie), navigate to `/countdown`. Title shows "Event will start in". Switch to JA. Title shows Japanese text. Unit labels stay as DAYS/HOURS/MINUTES in all locales.

- [x] T023 [US4] Verify `countdown_title` renders correctly for all 3 locales. Test: set `NEXT_LOCALE` cookie to `vi`, `en`, `ja` in sequence, reload `/countdown`. Title must change, unit labels must stay English. Fix any rendering issues | src/app/countdown/page.tsx
- [x] T024 [P] [US4] Add page load fade-in animation to countdown page: wrap content in a div with `animate-[fadeIn_500ms_ease-in]`. Add `@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }` to globals.css (under Countdown section). Respect `prefers-reduced-motion` (already handled by existing media query in globals.css) | src/app/globals.css, src/app/countdown/page.tsx
- [x] T025 [P] [US4] Optional: add digit value change transition. When a digit changes, briefly animate opacity (200ms ease-out). Use React `key` prop on digit card to trigger re-mount, or use CSS transition on the digit text element | src/components/countdown/PrelaunchCountdownTimer.tsx
- [x] T026 [US4] Performance check: verify LCP < 2s on `/countdown`. Background image uses `priority` prop on `<Image>`. If LCP exceeds target, add `fetchPriority="high"` to the Image component and verify Montserrat italic variant is loaded in layout.tsx (already configured with `style: ["normal", "italic"]`) | src/app/countdown/page.tsx

**Checkpoint**: i18n works for all locales. Animations smooth. LCP < 2s.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks across all stories

- [x] T027 [P] Run `yarn lint` and fix all ESLint warnings/errors in new and modified files | src/app/countdown/, src/components/countdown/, src/libs/utils/, src/middleware.ts
- [x] T028 [P] Verify accessibility: `role="timer"` present, `aria-live="polite"` present, each countdown unit has descriptive `aria-label` (e.g., "5 hours"), retry button is keyboard-focusable via Tab key, contrast ratio exceeds WCAG AAA | src/components/countdown/PrelaunchCountdownTimer.tsx
- [x] T029 [P] Verify glassmorphism renders in Chrome, Firefox, Safari, Edge. Check `-webkit-backdrop-filter` is applied alongside `backdrop-filter`. Verify graceful degradation if blur not supported (card still renders without blur) | src/components/countdown/PrelaunchDigitCard.tsx
- [x] T030 Cross-browser/cross-device final verification. Test full flow: login → redirect to `/countdown` → countdown runs → (set event time to near-future) → auto-redirect to `/`. Verify at 375px mobile and 1440px desktop
- [x] T031 Code cleanup: remove any `console.log` statements, verify no `any` types, ensure all files have named exports, verify no files exceed 200 lines

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────→ Phase 2 (Foundation) ─────────→ Phase 3 (US1 MVP)
                                                              │
                                                              ├→ Phase 4 (US2 Responsive)
                                                              │
                                                              ├→ Phase 5 (US3 Redirect/Edge)
                                                              │
                                                              └→ Phase 6 (US4 i18n/Polish)
                                                                        │
                                                              All ──────→ Phase 7 (Polish)
```

- **Phase 1 → Phase 2**: Setup must complete first (assets, i18n keys, CSS vars)
- **Phase 2 → Phase 3**: Shared utils must be extracted before building timer component
- **Phase 3 → Phase 4/5/6**: US1 must complete before responsive/redirect/i18n work
- **Phase 4, 5, 6**: Can run in parallel after US1 (different concerns, same files but different sections)
- **Phase 7**: After all user stories

### Within Each Phase

- Tasks marked `[P]` can run in parallel
- Tests (T006, T013) MUST be written BEFORE their implementation tasks (T007, T014) — TDD Red-Green flow
- Barrel exports (T011) after components are created (T009, T010)
- Page (T012) after components (T009, T010) and barrel exports (T011)

### Parallel Opportunities

**Phase 1**: T002, T003, T004 (i18n keys) can all run in parallel
**Phase 3**: T009 (DigitCard) and T010 (CountdownTimer) can run in parallel; T013 (middleware tests) can run in parallel with T009/T010
**Phase 4**: T015 (DigitCard responsive) and T016 (Timer responsive) in parallel
**Phase 6**: T024 (fade-in) and T025 (digit transition) in parallel
**Phase 7**: T027, T028, T029 all in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1 — Core countdown page)
3. **STOP and VALIDATE**: Navigate to `/countdown`, verify countdown works on desktop
4. Deploy MVP if ready

### Incremental Delivery

1. Setup + Foundation → validates shared utils
2. US1 (Phase 3) → core countdown working → deploy
3. US2 (Phase 4) → responsive design → deploy
4. US3 (Phase 5) → redirect + edge cases → deploy
5. US4 (Phase 6) → i18n + polish → deploy
6. Polish (Phase 7) → final quality → deploy

---

## Notes

- Commit after each task or logical group (e.g., T009+T010 together, T012 alone)
- Run tests before moving to next phase
- The `PrelaunchCountdownTimer` component (T010) is the most complex file — it handles state, effects, rendering, and accessibility. Keep it under 200 lines by keeping `PrelaunchDigitCard` separate.
- Middleware changes (T014) must be tested carefully to avoid redirect loops — run T013 tests after implementation
- Verify existing homepage (`/`) still works after Phase 2 (refactoring `CountdownTimer.tsx` to use shared utils)
- Background image from Figma (T001) is a blocking dependency — if not available, temporarily use `hero-keyvisual.png` as fallback
