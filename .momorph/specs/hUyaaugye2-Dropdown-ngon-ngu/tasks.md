# Tasks: Multi-Language (Da ngon ngu)

**Frame**: `hUyaaugye2-Dropdown-ngon-ngu`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4, US5)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets & Shared Infrastructure)

**Purpose**: Create missing flag SVG assets and add the shared `LANGUAGE_FLAGS` type mapping. No code logic changes — just assets and type definitions.

- [x] T001 [P] Create UK flag SVG (24x24 viewBox, 20x15 flag area, matching vn-flag.svg structure) | public/assets/auth/login/en-flag.svg
- [x] T002 [P] Create Japan flag SVG (24x24 viewBox, 20x15 flag area, white circle on red background, matching vn-flag.svg structure) | public/assets/auth/login/ja-flag.svg
- [x] T003 Add `LANGUAGE_FLAGS` constant mapping each Language to its flag asset path (`vi → /assets/auth/login/vn-flag.svg`, `en → /assets/auth/login/en-flag.svg`, `ja → /assets/auth/login/ja-flag.svg`) | src/types/index.ts

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Fix the hardcoded `<html lang="vi">` accessibility/SEO bug (FR-013, TR-006). This is foundational because it affects ALL pages regardless of which user story is active.

**CRITICAL**: This phase must complete before user story work begins — the dynamic locale reading pattern is used by subsequent tasks.

- [x] T004 Make `RootLayout` async, import `cookies` from `next/headers` and `LANGUAGES`/`Language` from `@/types`, read `NEXT_LOCALE` cookie with validation (fallback to `"vi"` if invalid), set `<html lang={locale}>` dynamically. See plan.md Phase 1 for before/after code. | src/app/layout.tsx

**Checkpoint**: `<html lang>` attribute updates dynamically based on NEXT_LOCALE cookie value.

---

## Phase 3: User Story 1+2 — Core Language Switching (Priority: P1) MVP

**Goal**: Restyle the existing `LanguageSelector` to match the Figma design with flag icons for all 3 languages, gold-bordered dropdown, and skip-reload optimization. This delivers US1 (switch language) and US2 (persistence — already works via existing cookie mechanism).

**Independent Test**: Navigate to any page with a header, click the language trigger, verify dropdown shows 3 languages with flags. Select a different language, verify page reloads with new locale. Close browser, reopen — verify locale persists.

### Tests (US1+US2) — Write BEFORE implementation per TDD

- [x] T005 [P] [US1] Write test: renders trigger button with current language flag icon and code label for each locale (vi, en, ja) | src/components/shared/LanguageSelector.test.tsx
- [x] T006 [P] [US1] Write test: opens dropdown on trigger click showing all 3 languages with flag icons | src/components/shared/LanguageSelector.test.tsx
- [x] T007 [P] [US1] Write test: highlights selected language with gold background `bg-[rgba(255,234,158,0.2)]`, others transparent | src/components/shared/LanguageSelector.test.tsx
- [x] T008 [P] [US1] Write test: sets `NEXT_LOCALE` cookie (max-age 1yr, path /, SameSite Lax) and calls `window.location.reload` on language selection | src/components/shared/LanguageSelector.test.tsx
- [x] T009 [P] [US1] Write test: skips reload when user selects the already-active language (just closes dropdown) | src/components/shared/LanguageSelector.test.tsx

### Implementation (US1+US2)

- [x] T010 [US1] Restyle trigger button: replace conditional VN-only flag with universal flag rendering using `LANGUAGE_FLAGS[currentLanguage]` and `next/image` for all languages. Keep `ChevronDownIcon`. Apply: `flex items-center gap-0.5 px-4 py-4 rounded-[var(--radius-language)] cursor-pointer hover:bg-white/10 transition-colors duration-150` | src/components/shared/LanguageSelector.tsx
- [x] T011 [US1] Restyle dropdown container (`<ul>`): apply `absolute z-50 right-0 top-full mt-1 bg-[#00070C] border border-[var(--color-border)] rounded-lg p-1.5 flex flex-col min-w-[120px]`. Add `role="listbox"` and `aria-label="Language options"` | src/components/shared/LanguageSelector.tsx
- [x] T012 [US1] Restyle dropdown items (`<li>`): selected item gets `bg-[rgba(255,234,158,0.2)] rounded-sm`, unselected gets `bg-transparent rounded hover:bg-white/10`. Each item shows flag icon (24x24, `next/image` with `LANGUAGE_FLAGS`) + language code (Montserrat 16px/700 via `text-base font-bold text-white tracking-[0.15px] font-[family-name:var(--font-montserrat)]`) with `gap-1` | src/components/shared/LanguageSelector.tsx
- [x] T013 [US1] Add skip-reload optimization: in `handleSelect`, check `if (lang === currentLanguage)` then just `setIsOpen(false)` and return without setting cookie or calling `window.location.reload()` | src/components/shared/LanguageSelector.tsx
- [x] T014 [US1] Run tests from T005-T009 — all must pass green | src/components/shared/LanguageSelector.test.tsx

**Checkpoint**: LanguageSelector matches Figma design. User can switch between VN/EN/JA with flags. Cookie persists across sessions. Skip-reload works. All tests green.

---

## Phase 4: User Story 3+4 — Dismiss & Accessibility (Priority: P2)

**Goal**: Verify dismiss behavior (outside click, Escape), ensure full ARIA compliance, fix concurrent dropdown bug where language and notification/profile dropdowns can open simultaneously.

**Independent Test**: Open dropdown → click outside → closes. Open dropdown → Escape → closes, focus returns to trigger. Tab to trigger → Enter → opens. Tab to option → Enter → selects. Open notification dropdown → click language trigger → notification closes, language opens.

### Tests (US3+US4)

- [x] T015 [P] [US3] Write test: closes dropdown on outside click without changing language | src/components/shared/LanguageSelector.test.tsx
- [x] T016 [P] [US3] Write test: closes dropdown on Escape key and returns focus to trigger button | src/components/shared/LanguageSelector.test.tsx
- [x] T017 [P] [US4] Write test: trigger has `aria-label="Select language"`, `aria-expanded`, `aria-haspopup="listbox"`. List has `role="listbox"`, `aria-label="Language options"`. Items have `role="option"` with `aria-selected` | src/components/shared/LanguageSelector.test.tsx
- [x] T018 [P] [US4] Write test: keyboard navigation — Enter/Space opens dropdown, Tab navigates items, Enter/Space selects | src/components/shared/LanguageSelector.test.tsx
- [x] T019 [P] [US3] Write test: calls `onOpen` callback when dropdown opens (for concurrent dropdown fix) | src/components/shared/LanguageSelector.test.tsx

### Implementation (US3+US4)

- [x] T020 [US3] Add optional `onOpen` callback prop to `LanguageSelector`. Extract toggle logic into `handleToggle` that calls `onOpen?.()` when opening. See plan.md Phase 3 for code snippet | src/components/shared/LanguageSelector.tsx
- [x] T021 [US3] Pass `onOpen={() => setOpenDropdown(null)}` to `LanguageSelector` to close notification/profile dropdowns when language dropdown opens | src/components/shared/AppHeaderClient.tsx
- [x] T022 [US4] Verify existing ARIA attributes are correct. Fix if needed: ensure `<ul>` has `role="listbox"` and `aria-label="Language options"` (may already be done in T011) | src/components/shared/LanguageSelector.tsx
- [x] T023 [US3] Run tests from T015-T019 — all must pass green | src/components/shared/LanguageSelector.test.tsx

**Checkpoint**: Dismiss behavior works (outside click, Escape). Keyboard fully accessible. ARIA compliant. Concurrent dropdown bug fixed. All tests green.

---

## Phase 5: User Story 5 — Translation Completeness (Priority: P3)

**Goal**: Ensure 100% dictionary key parity across vi.json, en.json, ja.json so all content is fully localized.

**Independent Test**: Switch to each language and navigate Login, Homepage, Awards, Countdown — all text should display in the selected language with no English/Vietnamese fallback leaking through.

### Tests (US5)

- [x] T024 [P] [US5] Write test: all 3 dictionary files (vi.json, en.json, ja.json) have identical key sets — fails if any key is missing in any file | src/libs/i18n/i18n.test.ts
- [x] T025 [P] [US5] Write test: `getDictionary("vi")` returns vi dictionary, `getDictionary("en")` returns en dictionary, `getDictionary("ja")` returns ja dictionary | src/libs/i18n/i18n.test.ts
- [x] T026 [P] [US5] Write test: `getDictionary("fr")` (unsupported) falls back to vi dictionary | src/libs/i18n/i18n.test.ts

### Implementation (US5)

- [x] T027 [US5] Audit dictionaries: compare keys across vi.json, en.json, ja.json. Add any missing keys with correct translations | src/libs/i18n/dictionaries/{vi,en,ja}.json
- [x] T028 [US5] Run tests from T024-T026 — all must pass green | src/libs/i18n/i18n.test.ts

**Checkpoint**: All 3 dictionaries have identical keys. getDictionary returns correct data for all locales. Fallback works for unsupported locales.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Mobile accessibility fix (language selector in mobile menu), final lint/build verification, and visual QA across breakpoints.

- [x] T029 Add `currentLanguage: Language` prop to `MobileMenuButton` component and render `<LanguageSelector currentLanguage={currentLanguage} />` below the nav links in the mobile overlay | src/components/shared/MobileMenuButton.tsx
- [x] T030 Pass `currentLanguage` prop to `<MobileMenuButton>` from `AppHeader` (Server Component that already has the prop) | src/components/shared/AppHeader.tsx
- [x] T031 Run `yarn lint` and fix any ESLint warnings or errors across all modified files
- [x] T032 Start dev server (`yarn dev`), test language switching on Login page (all breakpoints including mobile 320px) and Homepage (tablet 768px+ and mobile menu)
- [x] T033 Verify `<html lang>` updates correctly when switching languages (inspect DOM)
- [x] T034 Verify concurrent dropdown fix: open notification/profile dropdown on Homepage, then click language trigger — only language dropdown should be open

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundation (Phase 2)**: Depends on Setup T003 (needs `LANGUAGES` import from types). T001, T002 can run in parallel with T004.
- **US1+US2 (Phase 3)**: Depends on Phase 1 (flag assets + LANGUAGE_FLAGS) and Phase 2 (layout.tsx). This is the MVP.
- **US3+US4 (Phase 4)**: Depends on Phase 3 (modifies same LanguageSelector file after core restyle)
- **US5 (Phase 5)**: Can run in parallel with Phase 3 or 4 (different files: dictionary JSONs vs component TSX)
- **Polish (Phase 6)**: Depends on Phases 3 and 4 (needs LanguageSelector finalized before adding to mobile menu)

### Parallel Opportunities

```
Timeline:
─────────────────────────────────────────────────────────
Phase 1:  [T001 T002] ──┐  (flag SVGs, parallel)
          [T003] ────────┤  (LANGUAGE_FLAGS type)
                         │
Phase 2:  [T004] ────────┤  (layout.tsx — can overlap with T001/T002)
                         │
Phase 3:  [T005-T009] ──┤  (write tests, all parallel)
          [T010-T014] ──┤  (implement + verify)
                         │
Phase 4:  [T015-T019] ──┤  (write tests, all parallel)
          [T020-T023] ──┤  (implement + verify)
                         │           ┌─── Phase 5: [T024-T028] (i18n audit, parallel with Phase 4)
Phase 6:  [T029-T034] ──┘           └─── (can start after Phase 3 if Phase 5 done)
─────────────────────────────────────────────────────────
```

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD per constitution III)
- Implementation tasks are sequential within the same file
- Run tests at checkpoint to verify green

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (US1+US2: Core Language Switching)
3. **STOP and VALIDATE**: Test independently — switch languages, verify flags, verify persistence, verify `<html lang>`
4. Deploy if ready — this alone delivers full language switching functionality

### Incremental Delivery

1. Phase 1 + 2: Setup + Foundation → verify `<html lang>` fix
2. Phase 3: US1+US2 → Test → Deploy (MVP)
3. Phase 4: US3+US4 → Test → Deploy (accessibility + concurrent fix)
4. Phase 5: US5 → Test → Deploy (translation completeness)
5. Phase 6: Polish → Test → Deploy (mobile menu + final QA)

---

## Notes

- Commit after each phase or logical group of tasks
- Run `yarn lint` before each commit (constitution workflow)
- The existing `LanguageSelector` already handles ~70% of functionality — most tasks are refinements
- No new npm packages needed
- Phase 5 (US5) is the only phase that can run fully in parallel with other phases since it touches different files (JSON dictionaries vs TSX components)
- Mark tasks complete as you go: `- [x]`
