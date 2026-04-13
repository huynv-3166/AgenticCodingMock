# Feature Specification: Multi-Language (Da ngon ngu)

**Frame ID**: `hUyaaugye2`
**Frame Name**: `Dropdown-ngon ngu`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-10
**Status**: Draft

---

## Overview

The Multi-Language (Da ngon ngu) feature enables users to switch the application's display language through a dropdown component accessible from the header on screens that include one (Login, Homepage SAA, Awards). The application supports Vietnamese (VN), English (EN), and Japanese (JA). Language selection is persisted via a cookie (`NEXT_LOCALE`) and applied across all pages without requiring re-authentication. Note: the Countdown page has no header, and on authenticated pages the selector is desktop-only (`>= 768px`) in the current layout.

The language dropdown appears as an overlay when the user clicks the language trigger button in the header. It displays the currently selected language (highlighted) and available language options with their respective country flag icons and language codes.

---

## User Scenarios & Testing

### User Story 1 - Switch Language via Dropdown (Priority: P1)

As a user viewing any page in the application, I want to click the language selector in the header to open a dropdown and choose a different language, so that all UI text updates to my preferred language immediately.

**Why this priority**: Core functionality of the multi-language feature. Without this, users cannot change the display language at all.

**Independent Test**: Navigate to any page, click the language trigger button, select a different language, verify the page reloads with all text in the newly selected language.

**Acceptance Scenarios**:

1. **Given** the user is on any page with language set to Vietnamese (VN), **When** the user clicks the language trigger button in the header, **Then** a dropdown appears showing all supported languages (VN highlighted as selected, EN and JA as options), each with their country flag icon and language code.

2. **Given** the dropdown is open and showing VN as selected, **When** the user clicks "EN", **Then** the dropdown closes, a `NEXT_LOCALE=en` cookie is set (max-age: 1 year, path: /, SameSite: Lax), the page reloads, and all UI text displays in English.

3. **Given** the dropdown is open, **When** the user clicks the currently selected language (VN), **Then** the dropdown closes and no page reload occurs (language is already active). *(Note: Current implementation always reloads — this optimization should be added.)*

---

### User Story 2 - Language Persistence Across Sessions (Priority: P1)

As a user who has previously selected a language, I want my language preference to be remembered when I return to the application, so that I don't have to re-select my preferred language every time.

**Why this priority**: Without persistence, users would need to switch language on every visit, significantly degrading the experience.

**Independent Test**: Select English, close the browser, re-open the application, and verify the UI displays in English.

**Acceptance Scenarios**:

1. **Given** the user selects English (EN) as their language, **When** the user navigates to a different page or returns later within the cookie's lifetime (1 year), **Then** all pages render in English by reading the `NEXT_LOCALE` cookie on the server side.

2. **Given** no `NEXT_LOCALE` cookie is set (first visit), **When** the user visits any page, **Then** the default language is Vietnamese (vi) as defined in `DEFAULT_LANGUAGE`.

---

### User Story 3 - Dismiss Dropdown Without Selection (Priority: P2)

As a user who opened the language dropdown accidentally, I want to close it without making a selection, so that I can continue browsing without disruption.

**Why this priority**: Important for usability but not as critical as the core language switching functionality.

**Independent Test**: Open the dropdown, then close it via various dismiss methods, and verify no language change occurs.

**Acceptance Scenarios**:

1. **Given** the language dropdown is open, **When** the user clicks outside the dropdown area, **Then** the dropdown closes and no language change occurs.

2. **Given** the language dropdown is open, **When** the user presses the Escape key, **Then** the dropdown closes, focus returns to the trigger button, and no language change occurs.

---

### User Story 4 - Keyboard Accessibility for Language Selection (Priority: P2)

As a user navigating with a keyboard, I want to be able to open the dropdown, navigate between language options, and select one using keyboard controls, so that the feature is accessible without a mouse.

**Why this priority**: Accessibility is important for compliance and inclusivity, but most users will use mouse/touch interaction.

**Independent Test**: Tab to the language trigger, press Enter to open, use Tab/arrow keys to navigate options, press Enter/Space to select.

**Acceptance Scenarios**:

1. **Given** the trigger button is focused, **When** the user presses Enter or Space, **Then** the dropdown opens and the first option is focusable.

2. **Given** the dropdown is open and an option is focused, **When** the user presses Enter or Space, **Then** that language is selected, the cookie is set, and the page reloads with the new language.

3. **Given** the trigger button is rendered, **When** a screen reader accesses the component, **Then** the trigger has `aria-label="Select language"`, `aria-expanded` reflecting dropdown state, and `aria-haspopup="listbox"`. The dropdown list (`<ul>`) has `role="listbox"` and `aria-label="Language options"`. Each option (`<li>`) has `role="option"` with `aria-selected` for the active language.

---

### User Story 5 - Language Applied to All Content Sections (Priority: P3)

As a user who has selected a language, I want all translatable content across all pages (header navigation, hero section, awards, kudos, footer, countdown) to be displayed in my chosen language, so that the experience is fully localized.

**Why this priority**: Translation completeness is an ongoing effort; individual pages may have partial translations initially.

**Independent Test**: Switch to each supported language and verify text on key pages (Login, Homepage, Awards, Countdown) is fully translated.

**Acceptance Scenarios**:

1. **Given** the user selects English, **When** they navigate through Login, Homepage SAA, Awards (He thong giai), and Countdown pages, **Then** all translatable text (headers, buttons, descriptions, labels) displays in English as defined in `en.json`.

2. **Given** the user selects Japanese, **When** they navigate the same pages, **Then** all translatable text displays in Japanese as defined in `ja.json`.

---

### Edge Cases

- What happens when the `NEXT_LOCALE` cookie contains an unsupported value (e.g., "fr")? The `getDictionary()` function falls back to Vietnamese (`vi`).
- What happens if the user's browser blocks cookies? Language cannot be persisted; each page load defaults to Vietnamese. Consider displaying a subtle notice.
- What happens when a translation key is missing in a dictionary? The system should fall back to the Vietnamese value or display the key name (current behavior: returns `undefined`).
- How does the dropdown behave on touch devices? Tap to open, tap option to select, tap outside to dismiss.
- **Mobile visibility gap**: On authenticated pages (Homepage, Awards), the `LanguageSelector` is inside `AppHeaderClient` which uses `hidden md:flex` — making it invisible on mobile (`< 768px`). On the Login page, the `Header` component renders the `LanguageSelector` at all breakpoints. This means mobile users on authenticated pages cannot switch language. This should be addressed in implementation (e.g., add language selector to mobile menu).
- **Concurrent dropdowns**: The `LanguageSelector` manages its own `isOpen` state independently from `AppHeaderClient`'s notification/profile dropdowns. Both could theoretically be open simultaneously. Implementation should close other dropdowns when the language dropdown opens.
- **Countdown page**: The Countdown - Prelaunch page (`/countdown`) does NOT have a header or language selector. Users on this page cannot switch language.
- **`<html lang>` attribute**: Currently hardcoded to `"vi"` in `src/app/layout.tsx`. When a user selects English or Japanese, screen readers will still announce content using Vietnamese pronunciation rules. This MUST be fixed (see FR-013, TR-006).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Language Trigger Button | Button in header showing current flag icon + language code (e.g., VN) + chevron down icon | Click: toggle dropdown open/close. Hover: subtle background highlight (bg-white/10) |
| Dropdown Container | Dark card (bg: #00070C) with gold border (#998C5F), 8px border radius, positioned below trigger | Appears on trigger click. Dismissed on outside click or Escape |
| Selected Language Item | Highlighted item (bg: rgba(255,234,158,0.2)) showing current language flag + code | Click: close dropdown (no change). Visual: warm gold highlight |
| Language Option Item | Non-selected item (bg: transparent) showing flag + code | Click: select language, set cookie, reload. Hover: bg-white/10 |
| Flag Icons | Country flag SVGs (24x24px container, 20x15px flag) for VN, EN (UK), JA | Static display |
| Language Code Labels | Bold white text (Montserrat 16px/700) showing "VN", "EN", "JA" | Static display |

### Navigation Flow

- From: Any screen with a header containing the language selector (Login, Homepage SAA, Awards). **Note**: Countdown page does NOT have a header.
- Trigger: Click language trigger button in header
- Opens: Language dropdown overlay
- Selection: Click a language option -> cookie set -> page reload with new locale
- Dismiss: Click outside / press Escape -> dropdown closes, no change

### Visual Requirements

- **See**: [design-style.md](./design-style.md) for complete visual specifications
- Responsive: Dropdown works on all breakpoints where it is visible. On the Login page: all breakpoints (mobile 320px+). On authenticated pages: tablet 768px+ only (currently hidden on mobile due to `AppHeaderClient` layout)
- The dropdown must be positioned to remain within the viewport on all screen sizes
- Animations: Fade-in/out with 150ms ease-out transition on toggle
- Accessibility: WCAG AA compliant - proper ARIA roles (`listbox`, `option`), keyboard navigation, focus management

---

## State Management

### Local Component State

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Controls dropdown visibility. Toggled by trigger click, set to `false` on outside click, Escape, or selection. |

### Global / Shared State

- **No global state required**. Language preference is stored in the `NEXT_LOCALE` cookie and read server-side via `cookies().get("NEXT_LOCALE")` in each page's Server Component.

### Loading / Error States

- **No loading state**: Language switching triggers a full page reload; the browser handles the loading indicator.
- **No error state**: Cookie setting is synchronous and cannot fail. Dictionary lookup has a fallback to Vietnamese.

---

## Asset Dependencies

### Flag Icons (CRITICAL)

| Language | Asset | Status | Notes |
|----------|-------|--------|-------|
| VN (Vietnamese) | `/assets/auth/login/vn-flag.svg` | Exists | Already used in `LanguageSelector.tsx` |
| EN (English) | `/assets/auth/login/en-flag.svg` (or UK flag) | **Missing** | Needs to be created/added. Figma uses GB-NIR flag. |
| JA (Japanese) | `/assets/auth/login/ja-flag.svg` | **Missing** | Needs to be created/added. Not in Figma design. |

> **Implementation note**: The current `LanguageSelector` only renders the VN flag (`currentLanguage === "vi"` check). Flags for EN and JA are not rendered. This must be fixed to match the Figma design which shows flags for all options.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display a language trigger button in the header on all screens that include a header (Login, Homepage SAA, Awards, and future pages with `Header` or `AppHeader`)
- **FR-002**: System MUST show a dropdown with all supported languages (VN, EN, JA) when the trigger is clicked
- **FR-003**: System MUST visually distinguish the currently selected language from other options using a gold highlight background
- **FR-004**: System MUST display a country flag icon and language code label for each language option
- **FR-005**: System MUST persist the selected language in a `NEXT_LOCALE` cookie (max-age: 1 year, path: /, SameSite: Lax)
- **FR-006**: System MUST reload the page after language selection to apply server-side rendered translations
- **FR-007**: System MUST close the dropdown when clicking outside or pressing Escape
- **FR-008**: System MUST default to Vietnamese (vi) when no `NEXT_LOCALE` cookie is set
- **FR-009**: System MUST support 3 languages: Vietnamese (vi), English (en), Japanese (ja) with dictionary files in `src/libs/i18n/dictionaries/`
- **FR-010**: System MUST render all translatable text using the `getDictionary(locale)` function on Server Components
- **FR-011**: System SHOULD skip page reload when the user selects the already-active language (optimization)
- **FR-012**: System MUST display flag icons for ALL supported languages in the dropdown, not just the selected one
- **FR-013**: System MUST set the `<html lang>` attribute dynamically based on the active language (e.g., `<html lang="en">` when English is selected). This is required for WCAG accessibility (screen readers use it for pronunciation) and SEO. **Current bug**: `layout.tsx` hardcodes `<html lang="vi">`.

### Technical Requirements

- **TR-001**: Language switching MUST complete (page reload and render) within 2 seconds on a standard connection
- **TR-002**: Cookie MUST use `SameSite=Lax` attribute for CSRF protection per constitution security requirements
- **TR-003**: The `LanguageSelector` component MUST be a Client Component (`"use client"`) since it uses `useState`, `useEffect`, and browser APIs (`document.cookie`, `window.location`)
- **TR-004**: Server Components MUST read the locale from `cookies().get("NEXT_LOCALE")` and pass it to `getDictionary()` for SSR translations
- **TR-005**: All dictionary JSON files MUST have identical key structures across all supported languages
- **TR-006**: `RootLayout` in `src/app/layout.tsx` MUST read the `NEXT_LOCALE` cookie and set `<html lang={locale}>` dynamically instead of hardcoding `"vi"`. This requires making the layout async and reading `cookies()`.

### Key Entities

- **Language**: One of `"vi" | "en" | "ja"` as defined in `src/types/index.ts`
- **Dictionary**: JSON object with translation keys mapped to localized strings, one file per language in `src/libs/i18n/dictionaries/`
- **NEXT_LOCALE Cookie**: Client-side persistence mechanism for the user's language preference

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| N/A | N/A | Language switching is entirely client-side (cookie + reload). No API calls required. | N/A |

**Note**: This feature does not require any backend API. Language preference is stored in a browser cookie and read by Next.js Server Components during SSR. Dictionary files are bundled at build time.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can switch between all 3 supported languages (VN, EN, JA) and see fully translated UI within 2 seconds
- **SC-002**: Language preference persists across browser sessions (verified by revisiting after closing browser)
- **SC-003**: Dropdown is fully accessible via keyboard (Tab, Enter, Space, Escape) with proper ARIA attributes
- **SC-004**: All dictionary files (vi.json, en.json, ja.json) have 100% key parity (no missing translations)
- **SC-005**: Dropdown renders correctly at tablet (768px) and desktop (1024px) breakpoints on authenticated pages, and at all breakpoints (including mobile 320px) on the Login page. *(See edge case: mobile visibility gap on authenticated pages.)*

---

## Out of Scope

- Automatic language detection based on browser `Accept-Language` header (future enhancement)
- RTL language support (no RTL languages currently supported)
- Per-user language preference stored in database/user profile (currently cookie-only)
- Inline language switching without page reload (would require client-side state management overhaul)
- Translation management system or admin UI for editing translations
- Adding new languages beyond VN, EN, JA (would require separate spec)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) - Not applicable for this feature
- [ ] Database design completed (`.momorph/database.sql`) - Not applicable for this feature
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The Figma design (frame `hUyaaugye2`) shows only 2 languages (VN, EN), but the codebase already supports 3 languages including Japanese (JA). The spec covers all 3 languages to match the existing implementation.
- The existing `LanguageSelector` component (`src/components/shared/LanguageSelector.tsx`) already implements most of the functionality described in this spec. The design-style document provides visual refinement targets.
- The `LanguageSelector` is used in both `Header` (Login page) and `AppHeader` (authenticated pages), ensuring consistent language switching across all screens.
- Flag icons referenced in Figma: VN flag (`/assets/auth/login/vn-flag.svg`) is already implemented. EN (UK flag) and JA (Japan flag) SVG assets need to be added or conditionally rendered.
- Per constitution principle II, the `LanguageSelector` correctly uses `"use client"` directive since it requires browser APIs and React hooks.
