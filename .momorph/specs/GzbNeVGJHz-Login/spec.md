# Feature Specification: Login

**Frame ID**: `GzbNeVGJHz`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-08
**Status**: Draft

---

## Overview

The Login screen is the entry point to the Sun Annual Awards (SAA) 2025 application. It presents a visually rich hero page with the "ROOT FURTHER" campaign branding and a single Google OAuth login button. The screen includes a header with logo and language selector, a hero section with key visual artwork and call-to-action, and a copyright footer. No form-based login is used — authentication is exclusively via Google SSO through Supabase Auth.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Login with Google (Priority: P1)

As a Sun* employee,
I want to log in using my Google account,
so that I can access the SAA 2025 platform quickly without creating a new account.

**Why this priority**: This is the only authentication method. Without it, no user can access the application. It is the core MVP functionality of this screen.

**Independent Test**: Navigate to `/login`, click the "LOGIN With Google" button, complete Google OAuth, and verify redirect to the homepage.

**Acceptance Scenarios**:

1. **Given** a user is on the Login page, **When** they click "LOGIN With Google", **Then** the system initiates the Google OAuth flow via Supabase Auth and the button shows a loading/disabled state.
2. **Given** a user completes Google OAuth successfully, **When** the callback is received, **Then** the user is redirected to the homepage with an active session.
3. **Given** a user cancels Google OAuth (closes popup or clicks "Deny"), **When** they return to the login page, **Then** the button returns to its default state and no error is shown (user simply sees the login page again).
4. **Given** a user is already authenticated (valid session), **When** they navigate to `/login`, **Then** they are automatically redirected to the homepage.
5. **Given** a user clicks "LOGIN With Google" but a network or server error occurs during OAuth, **When** the error callback is received, **Then** the button returns to its default state and an inline error message is displayed below the button (e.g., "Login failed. Please try again.").

---

### User Story 2 - Language Selection (Priority: P2)

As a user,
I want to switch the display language on the login page,
so that I can read the content in my preferred language.

**Why this priority**: Enhances usability for non-Vietnamese speakers but is not required for core authentication flow.

**Independent Test**: Click the language selector, choose a different language, verify the page content updates.

**Acceptance Scenarios**:

1. **Given** a user is on the Login page with language set to "VN", **When** they click the language selector, **Then** a dropdown appears with available language options.
2. **Given** the language dropdown is open, **When** the user selects a language, **Then** the page content (description text, button label, footer) updates to the selected language.
3. **Given** a user has selected a language, **When** they refresh the page or return later, **Then** the selected language preference is persisted (via cookie or localStorage).
4. **Given** the language dropdown is open, **When** the user clicks outside the dropdown or presses `Escape`, **Then** the dropdown closes without changing the selected language.

---

### User Story 3 - Responsive Layout (Priority: P2)

As a user on a mobile or tablet device,
I want the login page to display correctly on my screen size,
so that I can log in without layout issues.

**Why this priority**: Per constitution (Principle IV), the app MUST be responsive. Login is the first screen users see, so it must work well on all devices.

**Independent Test**: Resize browser to mobile (375px), tablet (768px), and desktop (1440px) breakpoints and verify layout adapts correctly.

**Acceptance Scenarios**:

1. **Given** a user views the page on a mobile device (< 768px), **When** the page loads, **Then** the layout adjusts: reduced padding, smaller key visual, full-width button, and properly stacked content.
2. **Given** a user views the page on a tablet (768px-1023px), **When** the page loads, **Then** the layout uses medium padding and appropriately sized key visual.
3. **Given** a user views the page on desktop (>= 1024px), **When** the page loads, **Then** the layout matches the Figma design at 1440px.

---

### Edge Cases

- What happens when the Google OAuth service is unavailable? The button returns to default state and an inline error message is shown below the button.
- What happens when the user's Google account is not a `@sun-asterisk.com` account? Authentication MUST be restricted to `@sun-asterisk.com` domain accounts only. Non-authorized accounts MUST be rejected with an appropriate error message.
- What happens on very small screens (< 320px)? Content should still be readable with horizontal scroll prevented via `overflow-x: hidden`.
- What happens when JavaScript is disabled? The page should render the static content; the login button will not function without JS.
- What happens when the user clicks the login button multiple times rapidly? The button MUST be disabled after the first click to prevent duplicate OAuth flows.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Header | 662:14391 | Semi-transparent header bar with logo and language selector | Fixed at top |
| A.1_Logo | I662:14391;186:2166 | Sun Annual Awards 2025 logo | None (static) |
| A.2_Language | I662:14391;186:1601 | Language selector button ("VN" + flag + chevron) | Click opens dropdown |
| C_Keyvisual | 662:14388 | Full-bleed background artwork | None (decorative) |
| B.1_Key Visual | 2939:9548 | "ROOT FURTHER" campaign logo image | None (static) |
| B.2_content | 662:14753 | Hero description text | None (static) |
| B.3_Login | 662:14426 | "LOGIN With Google" button with Google icon | Click triggers OAuth |
| D_Footer | 662:14447 | Copyright footer | None (static) |

### Navigation Flow

- From: Direct URL entry or redirect from protected routes
- To: Homepage (after successful login)
- Triggers: Successful Google OAuth completion

### Visual Requirements

- Responsive breakpoints: mobile (< 768px), tablet (768px-1023px), desktop (>= 1024px)
- Background: 3-layer composition (artwork image + left gradient + bottom gradient)
- Animations: Button hover effect (subtle elevation), language dropdown open/close transition
- See `design-style.md` for complete visual specifications including colors, typography, spacing, and component details

### Accessibility Requirements

- **Color contrast**: Ratio > 7:1 (white text #FFFFFF on dark background #00101A meets WCAG AAA)
- **Keyboard navigation**: All interactive elements (Login button, Language selector) MUST be reachable via `Tab` key with a visible focus indicator (e.g., 2px solid outline with offset)
- **Focus order**: Tab order MUST follow logical reading order: Language selector → Login button
- **Screen reader**: Login button MUST have `aria-label="Login with Google"`. Language selector MUST have `aria-label="Select language"` and `aria-expanded` state. Language dropdown MUST have `role="listbox"` with `role="option"` items
- **Focus trap**: When language dropdown is open, focus MUST be trapped within the dropdown. `Escape` key closes it and returns focus to the trigger button
- **Reduced motion**: Hover animations MUST respect `prefers-reduced-motion: reduce` media query

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate users exclusively via Google OAuth using Supabase Auth.
- **FR-002**: System MUST redirect authenticated users away from the login page to the homepage.
- **FR-003**: System MUST show a loading/disabled state on the login button while OAuth is in progress.
- **FR-004**: System MUST persist user session using Supabase SSR cookies managed by middleware.
- **FR-005**: System MUST support language switching between available languages: Vietnamese (vi), English (en), and Japanese (ja).
- **FR-006**: System MUST persist the user's language preference in a cookie (for SSR access) across page loads.
- **FR-007**: System MUST render the full-bleed background artwork with gradient overlays as specified in the design.
- **FR-008**: System MUST restrict authentication to `@sun-asterisk.com` Google accounts only. This MUST be enforced via Google OAuth domain restriction configured in the Supabase dashboard. The `/api/auth/callback` route SHOULD additionally verify the email domain as a defense-in-depth measure.
- **FR-009**: System MUST display an inline error message below the login button when OAuth fails due to network/server errors or unauthorized domain.

### Technical Requirements

- **TR-001**: Use Supabase Auth with Google provider for OAuth. Supabase server client for session verification in middleware.
- **TR-002**: The login page MUST be a Server Component. The login button and language selector MUST be Client Components (both require `onClick` handlers and local state).
- **TR-003**: All images (logo, key visual, background artwork, Google icon) MUST use `next/image` for optimization.
- **TR-004**: The page MUST load and be interactive within 3 seconds on a 3G connection (LCP < 2.5s).
- **TR-005**: Server-side session check in middleware MUST redirect authenticated users to homepage.
- **TR-006**: All server-side code MUST be compatible with Cloudflare Workers runtime (no Node.js-specific APIs).

### Key Entities *(if feature involves data)*

- **User Session**: Managed by Supabase Auth. Contains user ID, email, access token, refresh token.
- **Language Preference**: Stored in cookie or localStorage. Key: language code (e.g., "vi", "en", "ja").

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `supabase.auth.signInWithOAuth({ provider: 'google' })` | Client SDK | Initiates Google OAuth redirect (client-side) | Exists (Supabase JS SDK) |
| Supabase Auth `/auth/v1/callback` | GET | Handles OAuth callback and exchanges code for session | Exists (Supabase) |
| `/api/auth/callback` | GET | Next.js route to receive Supabase auth code, exchange for session, set cookies, redirect to homepage | New (predicted) |

---

## State Management

### Local Component State

- `isLoading`: boolean — tracks whether OAuth flow is in progress (login button disabled state)
- `errorMessage`: string | null — displays OAuth error message below the button (null = no error)
- `isLanguageDropdownOpen`: boolean — tracks language dropdown visibility
- `selectedLanguage`: string — current language code from cookie/localStorage (default: "vi")

### Global State Needs

- User session: managed by Supabase Auth (not in app state). Accessed via `supabase.auth.getSession()`.

### Cache Requirements

- Language preference: persisted in cookie for server-side access during SSR.
- Session: managed by Supabase SSR middleware (cookie-based).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully log in via Google OAuth and be redirected to the homepage within 5 seconds of clicking the button.
- **SC-002**: The login page renders correctly at all three breakpoints (mobile, tablet, desktop) with no layout overflow or content clipping.
- **SC-003**: Already-authenticated users are redirected away from the login page without seeing a flash of login content.
- **SC-004**: The page achieves a Lighthouse performance score of 90+ on desktop.

---

## Out of Scope

- Email/password login or any non-Google authentication method
- User registration flow (handled implicitly by Supabase on first OAuth login)
- Admin-specific login flow
- Password reset / account recovery
- Social login with providers other than Google

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — Supabase Auth is external, no custom API spec needed
- [ ] Database design completed (`.momorph/database.sql`) — Not required for login (Supabase manages auth tables)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The Figma design shows a Vietnamese-language interface ("Bắt đầu hành trình của bạn cùng SAA 2025. Đăng nhập để khám phá!"). The i18n system should support Vietnamese as the default locale.
- The "ROOT FURTHER" key visual is an image asset, not rendered text. It must be loaded as a static image.
- The background artwork is a large decorative image. Use `priority` prop on `next/image` to preload it for LCP optimization.
- Supabase Auth with Google provider requires configuration of Google OAuth credentials in the Supabase dashboard (client ID, client secret, redirect URL).
- The linked language dropdown screen is `Dropdown-ngon ngu` (screen ID: `hUyaaugye2`). Its spec should be created separately.
