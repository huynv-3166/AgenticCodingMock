# Tasks: Sun* Kudos - Live Board

**Frame**: `MaZUn5xHXZ-Sun-Kudos-Live-board`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US11)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Assets, types, design tokens, database schema, i18n — everything before feature code.

- [x] T001 [P] Export hero background image from Figma node `2940:13432` as WebP | public/assets/kudos/kv-kudos-bg.webp
- [x] T002 [P] Export or source SVN-Gotham font file, add `@font-face` declaration. Fallback: Montserrat 700 italic | public/fonts/SVN-Gotham.woff2
- [x] T003 [P] Add Kudos page design tokens to globals.css. Reference design-style.md sections: Colors (16 tokens), Spacing (17 tokens), Border/Radius (17 tokens). Add under `/* === Kudos Page Design Tokens === */` | src/app/globals.css
- [x] T004 [P] Create TypeScript types: `Kudo`, `Heart`, `UserProfile`, `SecretBox`, `SpecialDay`, `Hashtag`, `Department`, `UserInfo`, `KudoFeedResponse`, `SpotlightResponse`. Match API contract shapes from plan.md | src/types/kudos.ts
- [x] T005 [P] Re-export all kudos types from barrel file | src/types/index.ts
- [x] T006 [P] Create Zod validation schemas: `kudoFeedParamsSchema` (cursor, limit, hashtag, department), `heartParamsSchema` (kudo id), `spotlightSearchSchema` (query string, maxLength 100) | src/libs/validations/kudos.ts
- [x] T007 Create Supabase migration with full DDL from plan.md: 9 tables, 16 RLS policies, `update_heart_count()` trigger function, all indexes. Copy SQL directly from plan.md Database Schema section | supabase/migrations/001_kudos_schema.sql
- [x] T008 Create seed data: 50 sample kudos, 5 hashtags, 3 departments, 10 user_profiles, 5 hearts, 3 secret boxes, 1 special_day (today) | supabase/seed.sql
- [x] T009 Run migration locally (`supabase db reset`), verify all tables + RLS + trigger work | -
- [x] T010 [P] Add 25 i18n keys from plan.md i18n Keys table to Vietnamese dictionary | src/libs/i18n/dictionaries/vi.json
- [x] T011 [P] Add 25 i18n keys to English dictionary (translate from Vietnamese) | src/libs/i18n/dictionaries/en.json
- [x] T012 [P] Add 25 i18n keys to Japanese dictionary (translate from Vietnamese) | src/libs/i18n/dictionaries/ja.json
- [x] T013 Install dependencies: `zod`, `d3-cloud`, `d3-scale`. Add `@types/d3-cloud` as devDependency | package.json
- [x] T014 Fix link from `/kudos` to `/sun-kudos` for route consistency | src/components/awards/KudosPromoBlock.tsx

**Checkpoint**: All infrastructure ready. Migration verified. Seed data loaded.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: API routes + page shell + static components. MUST complete before user story work.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

### API Routes

- [x] T015 [P] Create GET `/api/kudos` route handler: cursor pagination, hashtag/department filters, `is_hearted_by_me` via EXISTS subquery (see plan.md query strategy). Validate params with Zod. Return `{ data: Kudo[], nextCursor, total }` | src/app/api/kudos/route.ts
- [x] T016 [P] Create GET `/api/kudos/highlight` route handler: top 5 by `heart_count DESC`, same filter params as feed. Return `{ data: Kudo[] }` | src/app/api/kudos/highlight/route.ts
- [x] T017 [P] Create GET `/api/kudos/[id]` route handler: single kudo by UUID. Return `{ data: Kudo }` or 404 | src/app/api/kudos/[id]/route.ts
- [x] T018 [P] Create POST + DELETE `/api/kudos/[id]/heart` route handler: POST adds heart (check not own kudo, not duplicate, fetch special day multiplier server-side), DELETE removes heart. Both return `{ heart_count }`. Error codes: 409 duplicate, 403 own kudo, 404 not found | src/app/api/kudos/[id]/heart/route.ts
- [x] T019 [P] Create GET `/api/kudos/spotlight` route handler: aggregate kudo recipients with counts. Return `{ total_kudos, nodes: [{ user_id, name, kudo_count, avatar_url }] }` | src/app/api/kudos/spotlight/route.ts
- [x] T020 [P] Create GET `/api/users/me/stats` route handler: query user_profiles + secret_boxes for authenticated user. Return `{ kudos_received, kudos_sent, hearts_received, secret_boxes_opened, secret_boxes_unopened }` | src/app/api/users/me/stats/route.ts
- [x] T021 [P] Create GET `/api/users/gifts/recent` route handler: 10 most recent opened secret boxes with user info. Return `{ data: [{ user_id, name, avatar_url, gift_description, opened_at }] }` | src/app/api/users/gifts/recent/route.ts
- [x] T022 [P] Create GET `/api/hashtags` route handler: all hashtags sorted alphabetically. Return `{ data: [{ id, name }] }` | src/app/api/hashtags/route.ts
- [x] T023 [P] Create GET `/api/departments` route handler: all departments sorted by name. Return `{ data: [{ id, name, code }] }` | src/app/api/departments/route.ts
- [x] T024 [P] Create POST `/api/secret-box/open` route handler: find oldest unopened box for user, mark opened, return `{ gift_details, remaining_unopened }` or 404 | src/app/api/secret-box/open/route.ts
- [x] T025 [P] Create GET `/api/special-days/current` route handler: check if today's date exists in special_days table. Return `{ active: boolean, multiplier: number }` | src/app/api/special-days/current/route.ts

### Page Shell & Static Components

- [x] T026 Create page Server Component with parallel data fetching (feed, highlight, stats, spotlight, leaderboard, special day). Pass data to Client Components as props. Apply i18n via `getDictionary()` | src/app/sun-kudos/page.tsx
- [x] T027 [P] Create KudosHero (Server Component): hero background image with gradient overlay, title "He thong ghi nhan va cam on" (i18n), KUDOS logo (SVN-Gotham), Write CTA + Search button (pill shapes). Reference design-style.md A_KV Kudos section | src/components/kudos/KudosHero.tsx
- [x] T028 [P] Create KudosSectionHeader (Server Component): reusable section header with subtitle "Sun* Annual Awards 2025" (i18n), divider, and customizable title. Used 3 times (HIGHLIGHT KUDOS, SPOTLIGHT BOARD, ALL KUDOS) | src/components/kudos/KudosSectionHeader.tsx
- [x] T029 [P] Create KudoUserInfo (`"use client"`): avatar (64x64, border: 1.869px solid #FFF), name (Montserrat 700 16px #00101A, truncate at 235px), department (14px #999), HeroBadge. Props: `{ user: UserInfo, showBadge?: boolean }`. Hover triggers profile preview (linked frame 721:5827) | src/components/kudos/KudoUserInfo.tsx
- [x] T030 [P] Create HeroBadge: star level pill (109x19, border-radius: 48px, border: 0.5px solid #FFEA9E). Props: `{ level: 0|1|2|3 }`. Show 1-3 stars based on level. Hover shows tooltip "Received 10+/20+/50+ kudos" | src/components/kudos/HeroBadge.tsx
- [x] T031 [P] Create KudoCard (`"use client"`): full card layout (680px, padding 40/40/16/40, bg #FFF8E1, border-radius 24px). Sections: sender → arrow → receiver, divider, timestamp + category + message box + images + hashtags, divider, action row. Props: `{ kudo: Kudo, specialDayActive: boolean, onHeartToggle, onFilterByHashtag }`. Message truncated at 5 lines | src/components/kudos/KudoCard.tsx
- [x] T032 [P] Create StatsSidebar (`"use client"`): stats box (422px, bg #00070C, border-radius 17px, border #998C5F). Display 5 stats in exact order: (1) received, (2) sent, (3) hearts, divider, (4) boxes opened, (5) boxes unopened. "Mo qua" button (bg #FFEA9E, border-radius 8px). Props: `{ stats: UserStats, onOpenGift: () => void }` | src/components/kudos/StatsSidebar.tsx
- [x] T033 [P] Create SunnerLeaderboard (`"use client"`): leaderboard box (422px, bg #00070C, border-radius 17px). Title "10 SUNNER NHAN QUA MOI NHAT" (i18n). Scrollable list of items (avatar 64x64 + name + description). Empty state "Chua co du lieu." Props: `{ entries: GiftRecipient[] }` | src/components/kudos/SunnerLeaderboard.tsx
- [x] T034 Update middleware: re-enable the commented-out auth redirect block (lines 50-56). Test ALL existing pages (login, home, awards, countdown) still work correctly | src/middleware.ts

**Checkpoint**: Page renders at `/sun-kudos` with real data from Supabase. All 11 API routes respond. Static layout visible at all 3 breakpoints (320px, 768px, 1440px).

---

## Phase 3: User Story 1 — View All Kudos Feed (Priority: P1) 🎯 MVP

**Goal**: Infinite scroll feed of kudo cards with loading, error, empty, and end-of-feed states.

**Independent Test**: Navigate to `/sun-kudos`, verify feed loads 10 cards sorted newest-first, scroll to bottom loads 10 more, empty state shows when no kudos.

### Implementation (US1)

- [x] T035 [US1] Create KudoFeed (`"use client"`): Client Component wrapping a list of KudoCards. Uses IntersectionObserver to trigger fetch when 200px from bottom. Manages `kudoFeed`, `isLoadingMore`, `feedError` state. Calls `GET /api/kudos?cursor=X&limit=10`. Props: `{ initialKudos: Kudo[], initialCursor: string|null, filters: { hashtag?, department? }, specialDayActive: boolean }` | src/components/kudos/KudoFeed.tsx
- [x] T036 [US1] Implement skeleton loading state in KudoFeed: show 3 skeleton card placeholders matching KudoCard dimensions (680px height, 24px border-radius) during initial page load (`sectionLoading` state) | src/components/kudos/KudoFeed.tsx
- [x] T037 [US1] Implement error state in KudoFeed: when `feedError` is set, show error message + "Thu lai" (Retry) button (`kudos_retry` i18n key). Retry clears error and re-fetches | src/components/kudos/KudoFeed.tsx
- [x] T038 [US1] Implement empty state in KudoFeed: when `kudoFeed` is empty after successful fetch, show "Hien tai chua co Kudos nao." (`kudos_empty` i18n key) | src/components/kudos/KudoFeed.tsx
- [x] T039 [US1] Implement end-of-feed state: when `nextCursor` is null after fetch, hide spinner and show "Khong con kudos de tai." (`kudos_no_more` i18n key) | src/components/kudos/KudoFeed.tsx
- [x] T040 [US1] Implement star badge rendering in KudoCard: show HeroBadge next to sender/receiver names when `user.star_level > 0`. Thresholds: 1★=10 kudos, 2★=20, 3★=50 | src/components/kudos/KudoCard.tsx
- [x] T041 [US1] Implement anonymous kudo display: when `kudo.is_anonymous === true`, sender block shows "An danh" (`kudos_anonymous` i18n key) with generic avatar, hide name/department/badge | src/components/kudos/KudoCard.tsx

**Checkpoint**: US1 complete. Feed loads, scrolls infinitely, shows all states. Independently testable.

---

## Phase 4: User Story 2 — Heart/Like System (Priority: P1)

**Goal**: Heart toggle with optimistic UI, x2 special day badge, disabled for own kudos.

**Independent Test**: Click heart on a kudo → count increments instantly (optimistic), button turns red. Click again → count decrements. Cannot heart own kudo. On special day, x2 badge visible.

### Implementation (US2)

- [x] T042 [US2] Create HeartButton (`"use client"`): toggle heart with optimistic UI. Manages local `{ isHearted, count }` state. On click: immediately update UI → call POST/DELETE `/api/kudos/:id/heart` → on failure, rollback to previous state. Props: `{ kudoId: string, initialCount: number, initialIsHearted: boolean, isOwnKudo: boolean, specialDayActive: boolean, multiplier: number }` | src/components/kudos/HeartButton.tsx
- [x] T043 [US2] Implement disabled state: when `isOwnKudo === true`, render heart with opacity 0.4, cursor not-allowed, no click handler. Add `aria-disabled="true"` | src/components/kudos/HeartButton.tsx
- [x] T044 [US2] Implement x2 special day badge: when `specialDayActive === true`, show "x2" pill badge (Montserrat 700 ~17.5px, #FFF on #FFEA9E, border-radius 48px) inline after heart icon | src/components/kudos/HeartButton.tsx
- [x] T045 [US2] Implement heart button animation: scale(1.1) on hover (not liked), scale bounce on toggle (200ms ease-out). Respect `prefers-reduced-motion` | src/components/kudos/HeartButton.tsx
- [x] T046 [US2] Wire HeartButton into KudoCard: pass `isOwnKudo` (compare `kudo.sender.user_id` to current user), `specialDayActive`, `multiplier` from page-level state | src/components/kudos/KudoCard.tsx

**Checkpoint**: US2 complete. Heart toggle works with optimistic UI across all cards. Independently testable.

---

## Phase 5: User Story 3 — Highlight Kudos Carousel (Priority: P1)

**Goal**: Carousel of top 5 most-hearted kudos with center highlight, slide navigation, and pagination.

**Independent Test**: Page loads carousel with top 5 kudos. Center card has 4px gold border, flanking cards dimmed. Prev/Next arrows navigate. Arrows disabled at boundaries.

### Implementation (US3)

- [x] T047 [US3] Create HighlightKudoCard (`"use client"`): compact card variant (528px, padding 24px, bg #FFF8E1, border-radius 24px). Same user info + content as KudoCard but message truncated at 3 lines. Includes "Xem chi tiet" link (Montserrat 700 16px #00101A, hover: underline). Props: `{ kudo: Kudo, isActive: boolean, specialDayActive: boolean }` | src/components/kudos/HighlightKudoCard.tsx
- [x] T048 [US3] Create HighlightCarousel (`"use client"`): manages `carouselPage` state (1-5). Renders 3 visible cards: center (active: border 4px solid #FFEA9E, opacity 1), flanking (border: none, opacity 0.5). Left/right gradient fade overlays (400x525, see design-style.md Gradients). Slide transition 300ms ease-out. Props: `{ kudos: Kudo[], specialDayActive: boolean }` | src/components/kudos/HighlightCarousel.tsx
- [x] T049 [US3] Implement carousel arrow buttons: Prev/Next (48x48, border-radius 4px). Disabled at boundaries (page 1: prev disabled opacity 0.3; page 5: next disabled). Hover: bg rgba(255,234,158,0.10). Focus: outline 2px solid #FFEA9E | src/components/kudos/HighlightCarousel.tsx
- [x] T050 [US3] Implement pagination indicator: "2/5" text (Montserrat 700 28px #999) centered between arrows. Gap 32px. Updates on slide change | src/components/kudos/HighlightCarousel.tsx
- [x] T051 [US3] Implement keyboard navigation: ArrowLeft/ArrowRight keys when carousel is focused. Add `aria-roledescription="carousel"`, `aria-label` for current slide | src/components/kudos/HighlightCarousel.tsx
- [x] T052 [US3] Implement empty state: when `kudos` array is empty, show "Hien tai chua co Kudos nao." (`kudos_empty` i18n key) in place of carousel | src/components/kudos/HighlightCarousel.tsx
- [x] T053 [US3] Wire HighlightCarousel into page: pass `highlightKudos` data from page SSR | src/app/sun-kudos/page.tsx

**Checkpoint**: US3 complete. Carousel renders, navigates, dims flanking cards. Independently testable.

---

## Phase 6: User Story 4 — Filter System (Priority: P2)

**Goal**: Filter by hashtag + department, applied to both carousel and feed, synced to URL.

**Independent Test**: Click Hashtag filter → select value → carousel and feed update. URL shows `?hashtag=X`. Click hashtag on card → same filter applied. Clear filter → both sections reset.

### Implementation (US4)

- [x] T054 [US4] Create FilterBar (`"use client"`): two dropdown trigger buttons — Hashtag (icon_text, border #998C5F, bg #FFEA9E/10%, border-radius 4px) and Phong ban (same style). Active state: bg #FFEA9E/30%, border #FFEA9E, color #FFEA9E. Uses `useSearchParams` to sync filter values to URL `?hashtag=X&department=Y`. On change: calls `onFilterChange({ hashtag, department })` callback | src/components/kudos/FilterBar.tsx
- [x] T055 [US4] Create HashtagTag (`"use client"`): clickable hashtag text (Montserrat 700 16px #D4271D). On click: calls `onFilterByHashtag(name)` which updates URL params. Hover: underline, opacity 0.8. Focus: outline 2px solid #FFEA9E | src/components/kudos/HashtagTag.tsx
- [x] T056 [US4] Wire filter state into page: when URL params change, re-fetch both `GET /api/kudos` and `GET /api/kudos/highlight` with filter values. Reset carousel to page 1. Show loading indicator while preserving current content | src/app/sun-kudos/page.tsx
- [x] T057 [US4] Implement filter clear: clicking the same filter value again (or "All") clears that filter. Both sections return to unfiltered state | src/components/kudos/FilterBar.tsx
- [x] T058 [US4] Handle invalid deep-link filters: if URL has `?hashtag=nonexistent`, ignore invalid values and load unfiltered feed without error | src/app/sun-kudos/page.tsx

**Checkpoint**: US4 complete. Filters work cross-section, sync to URL. Independently testable.

---

## Phase 7: User Story 5 — Write Kudos CTA (Priority: P2)

**Goal**: Pill-shaped CTA button that opens the write kudo dialog.

**Independent Test**: Click the pill-shaped input → navigates to write kudo dialog.

### Implementation (US5)

- [x] T059 [P] [US5] Create WriteKudosCTA (`"use client"`): pill-shaped input (738x72, border-radius 68px, border #998C5F, bg #FFEA9E/10%). Placeholder text from `kudos_write_placeholder` i18n key. Pen icon 32x32 on left. On click: navigate to write kudo frame. Hover: bg #FFEA9E/20%, border #FFEA9E. Focus: outline 2px solid #FFEA9E | src/components/kudos/WriteKudosCTA.tsx
- [x] T060 [P] [US5] Create SearchButton (`"use client"`): pill-shaped button (381x72, same style as WriteKudosCTA). Magnifying glass icon 32x32. On click: open search sunner dialog | src/components/kudos/SearchButton.tsx

**Checkpoint**: US5 complete. CTA buttons clickable and navigate correctly.

---

## Phase 8: User Story 6 — Personal Statistics (Priority: P2)

**Goal**: Sidebar stats refresh and "Mo qua" button wiring.

**Independent Test**: Stats sidebar shows 5 accurate personal metrics. "Mo qua" button opens secret box dialog when boxes > 0.

### Implementation (US6)

- [x] T061 [US6] Wire StatsSidebar real-time refresh: add a `refreshStats()` function that re-fetches `GET /api/users/me/stats` after heart toggle or secret box open. Update stats display without full page reload | src/components/kudos/StatsSidebar.tsx
- [x] T062 [US6] Wire "Mo qua" button: when `secret_boxes_unopened > 0`, clicking navigates to secret box dialog (linked frame 1466:7676). When count = 0, button shows disabled state (opacity 40%, cursor not-allowed) | src/components/kudos/StatsSidebar.tsx

**Checkpoint**: US6 complete. Stats accurate, Mo qua works. Independently testable.

---

## Phase 9: User Story 7 — Open Secret Box (Priority: P2)

**Goal**: Secret box dialog trigger with disabled state.

**Independent Test**: Click "Mo qua" when boxes > 0 → dialog opens. When count = 0 → button disabled.

### Implementation (US7)

- [x] T063 [US7] Call POST `/api/secret-box/open` on "Mo qua" click. On success: refresh stats sidebar (decrement unopened count). On 404 (no boxes): show toast "Khong co Secret Box nao." | src/components/kudos/StatsSidebar.tsx

**Checkpoint**: US7 complete. Secret box open flow works.

---

## Phase 10: User Story 8 — Spotlight Board (Priority: P2)

**Goal**: Interactive word cloud visualization with search, hover tooltips, click-to-detail.

**Independent Test**: Spotlight board renders with name nodes. Hover shows tooltip. Search highlights matching name. Pan/zoom works.

### Implementation (US8)

- [x] T064 [US8] Create SpotlightBoard (`"use client"`): **CRITICAL — load via `next/dynamic({ ssr: false })`**. Uses `d3-cloud` for word cloud layout → renders to SVG. Node font size: 6px (min kudo count) to 22px (max), using `d3-scale` linear scale. Container: 1157x548, border-radius 47px, border #998C5F, dark overlay. Show "388 KUDOS" label (Montserrat 700 36px #FFF). Props: `{ data: SpotlightResponse, searchQuery: string }` | src/components/kudos/SpotlightBoard.tsx
- [x] T065 [US8] Implement SpotlightBoard SSR skeleton: since component loads with `ssr: false`, show a skeleton placeholder (1157x548 rounded box with pulsing animation) during SSR and hydration | src/components/kudos/SpotlightBoard.tsx
- [x] T066 [US8] Create SpotlightSearch (`"use client"`): search input (border-radius 46px, border 0.682px #998C5F, bg transparent, placeholder "Tim kiem"). 300ms debounce. Local state `spotlightSearchQuery`. On change: pass query to SpotlightBoard via callback prop. Focus: border-color #FFEA9E. Max length 100 chars | src/components/kudos/SpotlightSearch.tsx
- [x] T067 [US8] Implement pan/zoom: SVG viewBox transforms on drag/scroll. Toggle button (B.7.2) enables/disables pan/zoom mode | src/components/kudos/SpotlightBoard.tsx
- [x] T068 [US8] Implement hover tooltips: on name node hover, show absolute-positioned tooltip div with person's name + kudo count. Style: dark bg, white text, small shadow | src/components/kudos/SpotlightBoard.tsx
- [x] T069 [US8] Implement click-to-detail: clicking a name node opens the kudo detail for that user's most recent kudo | src/components/kudos/SpotlightBoard.tsx
- [x] T070 [US8] Implement search highlighting: when `searchQuery` matches a node name, highlight it with color #F17676 and pulsing outline. Non-matching nodes dim | src/components/kudos/SpotlightBoard.tsx
- [x] T071 [US8] Implement empty state: when `data.nodes` is empty, show dedicated empty state inside the spotlight container | src/components/kudos/SpotlightBoard.tsx

**Checkpoint**: US8 complete. Word cloud renders, search works, pan/zoom works. Independently testable.

---

## Phase 11: User Story 9 — Leaderboard Interactivity (Priority: P3)

**Goal**: Click-to-profile on leaderboard entries.

**Independent Test**: Click a leaderboard name/avatar → user profile opens.

### Implementation (US9)

- [x] T072 [US9] Add click-to-profile on SunnerLeaderboard items: clicking name or avatar navigates to user profile page. Add hover state (bg rgba(255,234,158,0.05), cursor pointer) | src/components/kudos/SunnerLeaderboard.tsx

**Checkpoint**: US9 complete.

---

## Phase 12: User Story 10 — Copy Kudo Link (Priority: P3)

**Goal**: Copy shareable kudo URL to clipboard with toast notification.

**Independent Test**: Click "Copy Link" → URL copied to clipboard, toast "Da sao chep lien ket!" appears.

### Implementation (US10)

- [x] T073 [P] [US10] Create CopyLinkButton (`"use client"`): button (145x56, border-radius 4px). Uses Clipboard API `navigator.clipboard.writeText()`. On success: text changes to "Copied!" for 2s, shows toast. Fallback for unsupported browsers. Props: `{ kudoId: string }` | src/components/kudos/CopyLinkButton.tsx
- [x] T074 [P] [US10] Create ImageThumbnail (`"use client"`): image (88x88, border 1px #998C5F, border-radius 18px, bg #FFF, object-fit cover). On click: open full-size image in modal/lightbox. Hover: opacity 0.85, scale 1.03. Focus: outline 2px solid #FFEA9E. Props: `{ src: string, alt: string }` | src/components/kudos/ImageThumbnail.tsx

**Checkpoint**: US10 complete.

---

## Phase 13: User Story 11 — Profile Preview (Priority: P3)

**Goal**: Avatar hover shows profile preview popup.

**Independent Test**: Hover over any avatar on a kudo card → profile preview popup appears.

### Implementation (US11)

- [x] T075 [US11] Wire avatar hover in KudoUserInfo: on mouseenter, show profile preview popup (linked frame 721:5827). On click: navigate to full profile page. Add appropriate `aria-haspopup` attributes | src/components/kudos/KudoUserInfo.tsx

**Checkpoint**: US11 complete.

---

## Phase 14: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsive, edge cases, performance.

### Accessibility

- [x] T076 [P] Add focus rings to ALL interactive elements: 2px solid #FFEA9E, offset 2px. Verify against dark #00101A background. Components: HeartButton, CopyLinkButton, FilterBar, WriteKudosCTA, SearchButton, carousel arrows, HashtagTag, ImageThumbnail, leaderboard items | src/components/kudos/
- [x] T077 [P] Add ARIA attributes: KudoCard → `role="article"` + `aria-label`; HeartButton → `aria-pressed`; HighlightCarousel → `aria-roledescription="carousel"` + `aria-label`; FilterBar → `aria-expanded` + `aria-haspopup`; KudoFeed infinite scroll → `aria-live="polite"` | src/components/kudos/
- [x] T078 [P] Implement `prefers-reduced-motion`: disable carousel slide animation (300ms → 0ms), heart scale animation (200ms → 0ms), spotlight node hover scale. Use `@media (prefers-reduced-motion: reduce)` | src/app/globals.css

### Responsive

- [x] T079 Test and fix mobile layout (< 768px): page padding 16px, hamburger menu, hero stack vertically, single card carousel, sidebar full-width above feed, kudo cards full-width with padding 16px, footer stack vertically | src/components/kudos/
- [x] T080 Test and fix tablet layout (768-1023px): page padding 40px, 2 visible carousel cards, side-by-side layout with 300px sidebar, kudo cards fill remaining width, section titles 40px | src/components/kudos/

### Edge Cases

- [x] T081 [P] Implement default avatar fallback: when `avatar_url` is null/broken, show initials or generic user icon within 64x64 circle | src/components/kudos/KudoUserInfo.tsx
- [x] T082 [P] Implement long name truncation: names > 30 chars truncated with ellipsis within 235px containers | src/components/kudos/KudoUserInfo.tsx
- [x] T083 Verify unauthenticated redirect: navigate to `/sun-kudos` without login → redirects to `/login?returnUrl=/sun-kudos` | src/middleware.ts
- [x] T084 Verify kudo deletion handling: if a kudo disappears between fetches, feed simply omits it on next load. No error shown | src/components/kudos/KudoFeed.tsx

**Checkpoint**: All accessibility, responsive, and edge cases handled. Constitution responsive testing at 320px, 375px, 768px, 1024px, 1280px, 1440px.

---

## Phase 15: E2E Testing & Finalization

**Purpose**: End-to-end test coverage for critical flows.

- [x] T085 [P] E2E: Page load — navigate to `/sun-kudos`, verify hero, feed, sidebar, footer render with data | tests/e2e/kudos.spec.ts
- [x] T086 [P] E2E: Infinite scroll — scroll to bottom, verify 10 more cards load, scroll again, verify end-of-feed | tests/e2e/kudos.spec.ts
- [x] T087 [P] E2E: Heart toggle — click heart on kudo, verify count +1 and red state. Click again, verify count -1 and gray. Verify cannot heart own kudo | tests/e2e/kudos.spec.ts
- [x] T088 [P] E2E: Carousel navigation — click next arrow, verify slide changes and pagination updates. Verify disabled at page 1 and 5 | tests/e2e/kudos.spec.ts
- [x] T089 [P] E2E: Filter apply/clear — select hashtag filter, verify both carousel and feed update. Clear filter, verify reset | tests/e2e/kudos.spec.ts
- [x] T090 [P] E2E: Copy link — click "Copy Link", verify toast appears | tests/e2e/kudos.spec.ts
- [x] T091 Performance audit: verify LCP < 2s on 3G, spotlight renders at 500+ nodes without frame drops | -
- [x] T092 Final responsive verification at all 6 constitution breakpoints (320px, 375px, 768px, 1024px, 1280px, 1440px) | -
- [x] T093 Code review: verify constitution compliance (TypeScript strict, no `any`, named exports, path aliases, TailwindCSS utilities, no unnecessary deps) | -

**Checkpoint**: All E2E tests pass. Performance verified. Ready for deployment.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────→ Phase 2 (Foundation) ─────→ Phase 3-13 (User Stories) ─────→ Phase 14 (Polish) ─────→ Phase 15 (E2E)
                                                     │
                                                     ├── Phase 3 (US1: Feed) ────── can start immediately after Phase 2
                                                     ├── Phase 4 (US2: Heart) ───── can start immediately after Phase 2
                                                     ├── Phase 5 (US3: Carousel) ── can start immediately after Phase 2
                                                     ├── Phase 6 (US4: Filter) ──── depends on US1 (KudoFeed) and US3 (Carousel)
                                                     ├── Phase 7 (US5: CTAs) ────── can start immediately after Phase 2
                                                     ├── Phase 8 (US6: Stats) ───── can start immediately after Phase 2
                                                     ├── Phase 9 (US7: Secret Box) ─ depends on US6 (StatsSidebar)
                                                     ├── Phase 10 (US8: Spotlight) ─ can start immediately after Phase 2
                                                     ├── Phase 11 (US9: Leaderboard)─ can start immediately after Phase 2
                                                     ├── Phase 12 (US10: Copy Link) ─ can start immediately after Phase 2
                                                     └── Phase 13 (US11: Profile) ── can start immediately after Phase 2
```

### Parallel Opportunities

**Phase 1 (Setup)**: T001-T006, T010-T014 are all [P] — 12 tasks can run in parallel. T007→T008→T009 must be sequential (migration → seed → verify).

**Phase 2 (Foundation)**: All 11 API routes (T015-T025) are [P]. All 7 static components (T027-T033) are [P]. T026 (page.tsx) depends on API routes + components existing. T034 (middleware) is independent.

**After Phase 2**: US1, US2, US3, US5, US6, US8, US10, US11 can all start in parallel (8 independent streams). US4 (filters) waits for US1+US3. US7 (secret box) waits for US6.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (US1 — Kudo Feed only)
3. **STOP and VALIDATE**: Test feed independently at all breakpoints
4. Ship MVP if ready (read-only feed is valuable on its own)

### Incremental Delivery

1. Setup + Foundation → Ship skeleton page
2. Add US1 (Feed) → Ship read-only feed
3. Add US2 (Heart) + US3 (Carousel) → Ship interactive feed
4. Add US4 (Filters) + US5 (CTAs) → Ship filtered experience
5. Add US8 (Spotlight) → Ship visualization
6. Add US6+US7+US9+US10+US11 → Ship complete feature
7. Polish + E2E → Production ready

---

## Notes

- Commit after each task or logical group
- Run `yarn lint` before each commit (constitution requirement)
- Run tests before moving to next phase
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- Reference plan.md API Contracts section for exact request/response shapes
- Reference design-style.md for all visual specs (colors, typography, spacing, states)
