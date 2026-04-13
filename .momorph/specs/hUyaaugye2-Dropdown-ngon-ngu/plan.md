# Implementation Plan: Multi-Language (Da ngon ngu)

**Frame**: `hUyaaugye2-Dropdown-ngon-ngu`
**Date**: 2026-04-10
**Spec**: `specs/hUyaaugye2-Dropdown-ngon-ngu/spec.md`

---

## Summary

Refine the existing `LanguageSelector` component to match the Figma design (gold-bordered dropdown with flag icons for all 3 languages), fix the hardcoded `<html lang="vi">` in `layout.tsx` for WCAG/SEO compliance, add missing flag SVG assets (EN, JA), add the language selector to the mobile menu, and ensure full dictionary parity across vi/en/ja. No backend API or database changes required — this is entirely a frontend feature using cookie-based persistence.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, next/image, next/headers (cookies)
**Database**: N/A (cookie-based persistence)
**Testing**: Vitest + @testing-library/react
**State Management**: Local `useState` (no global state needed)
**API Style**: N/A (no API calls)
**Deployment**: Cloudflare Workers via OpenNext

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — Named exports, path aliases (`@/*`), strict TypeScript
- [x] Uses approved libraries and patterns — No new libraries needed. Uses `next/headers`, `next/image`, Tailwind
- [x] Adheres to folder structure guidelines — Components in `src/components/shared/`, types in `src/types/`, i18n in `src/libs/i18n/`
- [x] Meets security requirements — Cookie uses `SameSite=Lax` per OWASP/constitution V
- [x] Follows testing standards — TDD with Vitest, co-located test files
- [x] Cloudflare Workers compatible — No Node.js-specific APIs. `cookies()` from `next/headers` is Web Standard compatible
- [x] `"use client"` only where needed — `LanguageSelector` uses browser APIs, correctly marked as Client Component

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Modify existing `LanguageSelector` in `src/components/shared/`. No new component files — the feature is a refinement of existing code.
- **Styling Strategy**: Tailwind utility classes with CSS variable references from `globals.css` (`--radius-language`, `--color-border`, `--color-primary`). Design tokens from `design-style.md`.
- **Data Fetching**: Server Components read `NEXT_LOCALE` cookie via `cookies()` from `next/headers` and pass locale prop down. No client-side data fetching.
- **Flag Icon Strategy**: Use `next/image` with static SVG files in `public/assets/auth/login/`. Create a `LANGUAGE_FLAGS` mapping in `src/types/index.ts` to map language codes to flag asset paths.

### Backend Approach

- N/A — No backend changes. Language preference is stored in a browser cookie and read by Next.js Server Components during SSR.

### Integration Points

- **Existing Services**: None
- **Shared Components**: `LanguageSelector` (modify: restyle + `onOpen` prop), `Header` (no change), `AppHeader` (modify: pass `currentLanguage` to `MobileMenuButton`), `AppHeaderClient` (modify: pass `onOpen` callback to `LanguageSelector`), `MobileMenuButton` (modify: accept `currentLanguage` prop, render `LanguageSelector`)
- **Existing Infrastructure**: `src/libs/i18n/index.ts` (no change), `src/types/index.ts` (add flag mapping), `src/app/layout.tsx` (make async, dynamic `<html lang>`)

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/hUyaaugye2-Dropdown-ngon-ngu/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
└── assets/              # Screenshots
```

### Source Code (affected areas)

```text
src/
├── app/
│   └── layout.tsx                          # MODIFY: dynamic <html lang>
├── components/
│   └── shared/
│       ├── LanguageSelector.tsx             # MODIFY: restyle, add flags for all langs, skip-reload, onOpen prop
│       ├── LanguageSelector.test.tsx        # CREATE: unit tests
│       ├── AppHeader.tsx                    # MODIFY: pass currentLanguage to MobileMenuButton
│       ├── AppHeaderClient.tsx              # MODIFY: pass onOpen callback to LanguageSelector
│       └── MobileMenuButton.tsx            # MODIFY: add language selector, accept currentLanguage prop
├── libs/
│   └── i18n/
│       ├── index.ts                        # NO CHANGE
│       ├── i18n.test.ts                    # CREATE: dictionary parity + getDictionary tests
│       └── dictionaries/
│           ├── vi.json                     # AUDIT: key parity
│           ├── en.json                     # AUDIT: key parity
│           └── ja.json                     # AUDIT: key parity
└── types/
    └── index.ts                            # MODIFY: add LANGUAGE_FLAGS mapping

public/
└── assets/
    └── auth/
        └── login/
            ├── vn-flag.svg                 # EXISTS
            ├── en-flag.svg                 # CREATE: UK flag SVG
            └── ja-flag.svg                 # CREATE: Japan flag SVG
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| (none) | - | No new dependencies needed |

---

## Implementation Strategy

### Phase 0: Asset Preparation

**Goal**: Add missing flag SVG assets so all 3 languages have icons.

- Create `public/assets/auth/login/en-flag.svg` — UK (Union Jack) flag, 24x24 viewBox with 20x15 flag area, matching `vn-flag.svg` structure
- Create `public/assets/auth/login/ja-flag.svg` — Japan flag, same format
- Add `LANGUAGE_FLAGS` constant to `src/types/index.ts`:
  ```typescript
  export const LANGUAGE_FLAGS: Record<Language, string> = {
    vi: "/assets/auth/login/vn-flag.svg",
    en: "/assets/auth/login/en-flag.svg",
    ja: "/assets/auth/login/ja-flag.svg",
  };
  ```

### Phase 1: Foundation — Dynamic `<html lang>` (FR-013, TR-006)

**Goal**: Fix the hardcoded `<html lang="vi">` accessibility/SEO bug.

**File**: `src/app/layout.tsx`
- Make `RootLayout` an `async` function
- Import `cookies` from `next/headers`
- Read `NEXT_LOCALE` cookie, default to `"vi"`
- Validate value is one of `LANGUAGES`, fallback to `"vi"` if invalid
- Set `<html lang={locale}>` dynamically

**Before**:
```tsx
export default function RootLayout({ children }) {
  return <html lang="vi">...</html>;
}
```

**After**:
```tsx
export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = LANGUAGES.includes(rawLocale as Language) ? rawLocale : "vi";
  return <html lang={locale}>...</html>;
}
```

**Test**: Verify `<html>` element has correct `lang` attribute for each locale.

### Phase 2: Core Feature — Restyle LanguageSelector (US1 + US2, FR-001 to FR-012)

**Goal**: Match the Figma design and show flag icons for all languages.

**File**: `src/components/shared/LanguageSelector.tsx`

Key changes:
1. **Trigger button**: Show flag icon for `currentLanguage` (not just VN), using `LANGUAGE_FLAGS` mapping and `next/image`
2. **Dropdown container**: Apply Figma styles — `bg-[#00070C]`, `border border-[var(--color-border)]`, `rounded-lg`, `p-1.5`, `z-50`
3. **Selected item**: Gold highlight `bg-[rgba(255,234,158,0.2)]`, `rounded-sm`
4. **Option items**: Transparent bg, `hover:bg-white/10`, `rounded`
5. **Each item**: Flag icon (24x24) + language code (Montserrat 16px/700) with `gap-1`
6. **Skip-reload optimization** (FR-011): In `handleSelect`, check `if (lang === currentLanguage)` → just close dropdown, don't set cookie or reload
7. **ARIA improvements**: Add `aria-label="Language options"` to `<ul>`, ensure `tabIndex={0}` and `onKeyDown` on each `<li>`

**Design tokens to apply** (from `design-style.md`):
- Container: `bg-[#00070C] border border-[var(--color-border)] rounded-lg p-1.5`
- Selected: `bg-[rgba(255,234,158,0.2)] rounded-sm`
- Option: `bg-transparent rounded hover:bg-white/10`
- Text: `text-base font-bold text-white tracking-[0.15px] font-[family-name:var(--font-montserrat)]`
- Transition: `transition-colors duration-150`

### Phase 3: UX Polish — Dismiss, Accessibility & Concurrent Dropdowns (US3 + US4 + Edge Case)

**Goal**: Ensure proper dismiss behavior, full keyboard accessibility, and fix the concurrent dropdown bug.

**File**: `src/components/shared/LanguageSelector.tsx`

The existing code already handles:
- [x] Outside click dismiss (via `useEffect` + `mousedown` listener)
- [x] Escape key dismiss (via `useEffect` + `keydown` listener)
- [x] Focus return to trigger on Escape
- [x] `aria-label`, `aria-expanded`, `aria-haspopup` on trigger
- [x] `role="option"`, `aria-selected`, `tabIndex`, `onKeyDown` on items

Verify and fix if needed:
- Ensure `role="listbox"` and `aria-label="Language options"` on `<ul>`
- Test keyboard flow: Tab → trigger → Enter → dropdown opens → Tab between options → Enter to select

**Concurrent dropdown fix** (spec edge case):

`LanguageSelector` manages its own `isOpen` state independently from `AppHeaderClient`'s notification/profile dropdowns. Since the `LanguageSelector` sits INSIDE `AppHeaderClient`'s `dropdownRef` container, clicking the language trigger does NOT count as an "outside click" for AppHeaderClient — so notification/profile dropdowns stay open simultaneously.

**Solution**: Add an optional `onOpen` callback prop to `LanguageSelector`:

```typescript
// LanguageSelector.tsx
export function LanguageSelector({
  currentLanguage,
  onOpen,
}: {
  currentLanguage: Language;
  onOpen?: () => void;
}) {
  // In toggle handler:
  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) onOpen?.();
  };
```

```typescript
// AppHeaderClient.tsx — pass callback to close other dropdowns
<LanguageSelector
  currentLanguage={currentLanguage}
  onOpen={() => setOpenDropdown(null)}
/>
```

```typescript
// Header.tsx (Login page) — no callback needed, no other dropdowns
<LanguageSelector currentLanguage={currentLanguage} />
```

**File**: `src/components/shared/AppHeaderClient.tsx`
- Pass `onOpen={() => setOpenDropdown(null)}` to `LanguageSelector`

**Test**: Open notification dropdown → click language trigger → notification closes, language dropdown opens.

### Phase 4: Mobile Accessibility (Edge Case Fix)

**Goal**: Add language selector to mobile menu so mobile users on authenticated pages can switch language.

**File**: `src/components/shared/MobileMenuButton.tsx`

Changes:
- Import `LanguageSelector` and accept `currentLanguage` prop
- Add language selector below nav links in the mobile overlay
- Style to fit the mobile menu layout

**File**: `src/components/shared/AppHeader.tsx`
- Pass `currentLanguage` to `MobileMenuButton`

### Phase 5: Translation Audit (US5)

**Goal**: Ensure 100% dictionary key parity across vi.json, en.json, ja.json.

- Write a script or test that compares keys across all 3 dictionary files
- Identify and fill any missing translations
- Add a Vitest test `src/libs/i18n/i18n.test.ts` that asserts key parity

### Phase 6: Testing (runs IN PARALLEL with each phase, per TDD)

**Goal**: Comprehensive test coverage for the language switching feature. Per constitution principle III (TDD), tests are written BEFORE implementation in each phase — not deferred to the end. This phase documents the full test inventory; actual test writing happens within each phase's workflow.

**Create**: `src/components/shared/LanguageSelector.test.tsx`

| Test Case | Type | Covers |
|-----------|------|--------|
| Renders trigger with current language flag and code | Unit | FR-001, FR-004 |
| Opens dropdown on trigger click | Unit | FR-002 |
| Shows all 3 languages with flags | Unit | FR-002, FR-012 |
| Highlights selected language with gold bg | Unit | FR-003 |
| Sets cookie and reloads on selection | Unit | FR-005, FR-006 |
| Skips reload when selecting current language | Unit | FR-011 |
| Closes on outside click | Unit | FR-007 |
| Closes on Escape key, returns focus | Unit | FR-007, US3 |
| Has correct ARIA attributes | Unit | US4 |
| Keyboard navigation works | Unit | US4 |
| Calls `onOpen` callback when dropdown opens | Unit | Concurrent dropdown fix |

**Create**: `src/libs/i18n/i18n.test.ts`

| Test Case | Type | Covers |
|-----------|------|--------|
| All dictionaries have identical keys | Unit | TR-005 |
| `getDictionary` returns correct dictionary | Unit | FR-010 |
| `getDictionary` falls back to vi for invalid locale | Unit | FR-008, Edge Case |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Async `layout.tsx` causes Cloudflare Workers issue | Very Low | High | `await cookies()` is already used in 4 page files (`login`, `page`, `awards`, `countdown`) on Cloudflare Workers. Making `layout.tsx` async uses the same API. Verify with `wrangler dev` to confirm root layout async works the same as page-level async. |
| Flag SVG rendering inconsistency across browsers | Low | Low | Use simple SVG paths matching the existing `vn-flag.svg` structure. Test on Chrome, Firefox, Safari. |
| MobileMenuButton state conflict with LanguageSelector | Medium | Low | LanguageSelector has its own `isOpen` state. When mobile menu closes (`setIsOpen(false)`), the language dropdown will also close since it's unmounted. |
| Dictionary key drift over time | Medium | Medium | Add automated parity test (`i18n.test.ts`) that fails if any key is missing in any dictionary. Run in CI. |

### Estimated Complexity

- **Frontend**: Low-Medium (mostly restyling existing component + 1 new feature: mobile menu integration)
- **Backend**: None
- **Testing**: Low (straightforward unit tests for a UI component)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: LanguageSelector ↔ Header, LanguageSelector ↔ AppHeaderClient, LanguageSelector ↔ MobileMenuButton
- [ ] **External dependencies**: N/A
- [ ] **Data layer**: N/A
- [x] **User workflows**: Language switch → page reload → correct locale rendered

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Trigger click opens dropdown, selection sets cookie + reloads, dismiss without change |
| Service ↔ Service | No | - |
| App ↔ External API | No | - |
| App ↔ Data Layer | No | Cookie read/write only |
| Cross-platform | Yes | Mobile vs desktop visibility, touch vs mouse |

### Test Environment

- **Environment type**: Local (Vitest + jsdom)
- **Test data strategy**: Mock `document.cookie`, mock `window.location.reload`
- **Isolation approach**: Fresh render per test, mock external modules (`next/image`, `next/navigation`)

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| `next/image` | Mock | Return `<img>` element, avoid Next.js image optimization in tests |
| `next/navigation` | Mock | Mock `usePathname` for route-aware tests |
| `document.cookie` | Real | Test actual cookie manipulation in jsdom |
| `window.location.reload` | Mock | Prevent actual page reload, verify it's called |

### Test Scenarios Outline

1. **Happy Path**
   - [x] User clicks trigger → dropdown opens with 3 languages
   - [x] User selects EN → cookie set to `en`, page reloads
   - [x] User selects JA → cookie set to `ja`, page reloads
   - [x] Revisit after selection → correct locale rendered (cookie persistence)

2. **Error Handling**
   - [x] Invalid cookie value ("fr") → falls back to Vietnamese
   - [x] Missing dictionary key → does not crash (returns undefined, fallback behavior)

3. **Edge Cases**
   - [x] Select already-active language → no reload, dropdown closes
   - [x] Click outside → dropdown closes, no cookie change
   - [x] Escape key → dropdown closes, focus returns to trigger
   - [x] Keyboard navigation → Tab/Enter/Space work correctly

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| LanguageSelector component | 90%+ | High |
| i18n dictionary parity | 100% | High |
| Layout html lang | 80%+ | Medium |
| Mobile menu integration | 70%+ | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (3 review passes completed)
- [x] `design-style.md` approved (3 review passes completed)
- [ ] Flag SVG assets created (EN, JA) — **Phase 0 deliverable**
- [x] No API contracts needed
- [x] No database migrations needed

### External Dependencies

- None. All assets and code are self-contained.

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities (Phase 0 assets can run in parallel with Phase 1 layout fix)
3. **Begin** implementation following TDD: write test → verify failure → implement → verify pass

---

## Notes

- **TR-001 (performance)**: The 2-second language switch requirement is inherently met since it's a standard page reload. No special optimization needed beyond what the browser provides.
- **Browser-blocks-cookies edge case**: Spec mentions "consider displaying a subtle notice." This is deferred as P3+ — the feature degrades gracefully (defaults to Vietnamese on every load) and a notice adds complexity for a very rare scenario. Can be addressed in a future iteration.
- **`prefers-reduced-motion`**: Already handled globally in `globals.css` which sets all `transition-duration` and `animation-duration` to `0.01ms`. No per-component work needed.
- The existing `LanguageSelector` already handles ~70% of the functionality. This plan is primarily about visual refinement (matching Figma), adding missing flag assets, fixing the `<html lang>` bug, and improving mobile accessibility.
- No new npm packages are needed. The feature uses only built-in Next.js APIs (`cookies`, `next/image`) and existing project conventions.
- The `MobileMenuButton` change (Phase 4) requires passing `currentLanguage` through `AppHeader` → `MobileMenuButton`. This is a small prop-drilling change, not worth adding Context for a single prop.
- Phases 0-2 are the critical path (P1 stories). Phases 3-5 are enhancements (P2/P3). Phase 6 runs continuously alongside implementation per TDD.
