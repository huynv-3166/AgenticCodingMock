# Feature Specification: Countdown - Prelaunch Page

**Frame ID**: `8PJQswPZmU`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-09
**Status**: Draft

---

## Overview

The Countdown Prelaunch page is a full-screen landing page displayed to users **before** the SAA 2025 event officially launches. It features a dramatic dark background with colorful abstract artwork and a prominent countdown timer showing the remaining time (Days, Hours, Minutes) until the event begins. The page serves as a teaser/anticipation builder, keeping users informed about when they can access the full platform.

**Target Users**: All authenticated SAA 2025 participants
**Business Context**: Create excitement and anticipation before the event launch. Prevent users from accessing event features prematurely while keeping them informed about the launch timeline.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View countdown timer before event launch (Priority: P1)

An authenticated user visits the platform before the SAA 2025 event has officially started. Instead of seeing the homepage, they see a full-screen countdown page showing exactly how long until the event begins, with the Vietnamese title "Sự kiện sẽ bắt đầu sau" (Event will start in) and a countdown showing Days, Hours, and Minutes.

**Why this priority**: This is the core and only feature of the page. Without a working countdown, the page has no purpose.

**Independent Test**: Navigate to the prelaunch page, verify the countdown timer displays with correct values and updates in real-time.

**Acceptance Scenarios**:

1. **Given** the event has not started yet, **When** a user visits the platform, **Then** the countdown page is displayed with the title "Sự kiện sẽ bắt đầu sau" (i18n key: `countdown_title`) and the countdown timer shows the remaining Days, Hours, and Minutes until the event start time.
2. **Given** the countdown page is displayed, **When** one minute passes, **Then** the MINUTES value decrements by 1 without requiring a page refresh.
3. **Given** the countdown shows 00 Days, 00 Hours, and 01 Minutes, **When** one minute passes, **Then** the countdown reaches 00:00:00 and the system should redirect the user to the Homepage SAA or show an appropriate transition.
4. **Given** the countdown page is displayed on desktop (>= 1024px), **When** the page loads, **Then** the layout matches the Figma design: centered content with glassmorphism digit cards, background artwork on the right, and gradient overlay.
5. **Given** the event start time is being fetched from the server, **When** the page first renders, **Then** the background and gradient are visible with a loading indicator in the countdown area (no stale or zero values shown).
6. **Given** the server returns an error when fetching event start time, **When** all retry attempts (3x) fail, **Then** an error message is shown with a "Retry" button, and no broken countdown is displayed.

---

### User Story 2 - Responsive countdown display (Priority: P2)

A user views the countdown prelaunch page on mobile, tablet, or desktop devices and sees a properly adapted layout that remains readable and visually appealing at all breakpoints.

**Why this priority**: The constitution mandates responsive design across all breakpoints. The countdown must be usable on any device.

**Independent Test**: Open the countdown page at 320px, 375px, 768px, 1024px, and 1440px widths. Verify the countdown is readable and properly laid out at each breakpoint.

**Acceptance Scenarios**:

1. **Given** a mobile viewport (< 768px), **When** the page loads, **Then** the countdown units may stack or scale down to fit, all text remains readable, and digit cards maintain proper proportions.
2. **Given** a tablet viewport (768px - 1023px), **When** the page loads, **Then** the countdown units are displayed in a row with reduced spacing and slightly smaller digit cards.
3. **Given** a desktop viewport (>= 1024px), **When** the page loads, **Then** the countdown matches the Figma design at 1512px with full-size digit cards and 60px gap between units.

---

### User Story 3 - Auto-redirect when countdown reaches zero (Priority: P2)

When the countdown timer reaches zero (event has started), the user is automatically redirected to the Homepage SAA without manual intervention.

**Why this priority**: Essential for a smooth transition from prelaunch to live event, but secondary to the countdown display itself.

**Independent Test**: Set the event start time to 1 minute in the future, wait for the countdown to reach zero, and verify automatic redirect to the homepage.

**Acceptance Scenarios**:

1. **Given** the countdown reaches 00 Days, 00 Hours, 00 Minutes, **When** the timer hits zero, **Then** the user is automatically redirected to the Homepage SAA (`/`).
2. **Given** a user visits the platform after the event has already started, **When** the server checks the event start time, **Then** the user is immediately redirected to the Homepage SAA without seeing the countdown page.

---

### User Story 4 - i18n support for countdown title (Priority: P3)

The countdown page supports internationalization for the title text. The unit labels (DAYS, HOURS, MINUTES) remain in English across all locales, consistent with the existing i18n dictionary pattern.

**Why this priority**: The project uses i18n with vi/en/ja locales. The title needs translation; the unit labels are intentionally English.

**Independent Test**: Switch language between vi/en/ja and verify the title changes while unit labels stay as DAYS/HOURS/MINUTES.

**Acceptance Scenarios**:

1. **Given** the user's locale is Vietnamese, **When** the countdown page loads, **Then** the title shows "Sự kiện sẽ bắt đầu sau" and unit labels show "DAYS", "HOURS", "MINUTES" (English).
2. **Given** the user's locale is English, **When** the countdown page loads, **Then** the title shows "Event will start in" and unit labels show "DAYS", "HOURS", "MINUTES".
3. **Given** the user's locale is Japanese, **When** the countdown page loads, **Then** the title is displayed in Japanese and unit labels show "DAYS", "HOURS", "MINUTES".

> **i18n Note**: A new key `countdown_title` must be added to all dictionaries:
> - `vi.json`: `"countdown_title": "Sự kiện sẽ bắt đầu sau"`
> - `en.json`: `"countdown_title": "Event will start in"`
> - `ja.json`: `"countdown_title": "イベント開始まで"` *(needs stakeholder confirmation)*
>
> Existing keys `countdown_days`, `countdown_hours`, `countdown_minutes` are already present in all locale files and are identical (English) across locales.

---

### Edge Cases

- **Event start time not configured**: Display a fallback message ("Event information is being updated") or redirect to homepage. Do not show a broken countdown.
- **Clock drift between client and server**: Use server-provided UTC timestamp as the source of truth. Calculate offset on page load: `serverTime - clientTime`, apply offset to all subsequent calculations.
- **User's system clock significantly off**: Rely on server-provided target timestamp combined with `performance.now()` for elapsed time tracking, not repeated `new Date()` calls.
- **Daylight saving time transitions**: Use UTC timestamps for all calculations. Store and transmit event start time as ISO 8601 UTC string.
- **API failure / network error on initial load**: Display the page with a "Loading..." state. Retry up to 3 times with exponential backoff. If all retries fail, show an error message with a manual retry button.
- **Network loss during active countdown**: Continue countdown using last-known server time offset. Do not freeze or break the UI. Optionally re-sync when network recovers.
- **Multiple browser tabs open**: Each tab runs its own countdown independently. No cross-tab synchronization needed.
- **Days value exceeds 99**: The digit card design shows 2-digit slots per unit. If days >= 100, either add a third digit card or cap display at 99+ (unlikely for this event but should handle gracefully).

---

## State Management

### Component States

| State | Description | UI Behavior |
|-------|-------------|-------------|
| **Loading** | Fetching event start time from server | Show page background + gradient. Countdown area displays a loading skeleton or spinner. No digit values shown yet. |
| **Active** | Event start time loaded, countdown is running | Display countdown with live-updating digit cards. Timer decrements every minute (or second). |
| **Completed** | Countdown has reached zero | Briefly show 00:00:00, then auto-redirect to Homepage SAA within 1-3 seconds. |
| **Error** | Failed to fetch event start time after retries | Show error message: "Unable to load event information. Please try again." with a retry button. |
| **Already Started** | Server indicates event has already started | Immediate redirect to Homepage SAA — user never sees the countdown page. |

### Local State (Client Component)

| State Variable | Type | Initial Value | Purpose |
|----------------|------|---------------|---------|
| `targetTime` | `Date \| null` | `null` | Server-provided event start time (UTC) |
| `timeRemaining` | `{ days: number, hours: number, minutes: number }` | `{ days: 0, hours: 0, minutes: 0 }` | Calculated countdown values |
| `status` | `'loading' \| 'active' \| 'completed' \| 'error'` | `'loading'` | Current component state |
| `serverTimeOffset` | `number` | `0` | Difference between server clock and client clock (ms) |

### Global State

No global state required. This page is self-contained with no shared state dependencies.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Background Image | Colorful abstract artwork positioned on the right side of the screen | Static, decorative only |
| Gradient Overlay | Dark gradient overlay (bottom-left to top-right) ensuring text readability | Static |
| Title Text | "Sự kiện sẽ bắt đầu sau" (i18n key: `countdown_title`) — centered italic heading above the countdown | Static text (i18n) |
| Countdown Timer | 3 countdown units (Days, Hours, Minutes) with glassmorphism digit cards | Auto-updates every minute |
| Digit Card | Glass-effect card containing a single digit (0-9), LED-style font | Updates on value change |
| Unit Label | Text label below each countdown unit (DAYS, HOURS, MINUTES) | Static text (i18n) |

### Navigation Flow

- **From**: Login page (after successful authentication, if event not started)
- **From**: Direct URL access (if event not started)
- **To**: Homepage SAA (when countdown reaches zero OR event has already started)
- **Triggers**: Countdown reaches zero (auto-redirect), event start time passed (server-side redirect)

### Visual Requirements

- **Design reference**: See [design-style.md](./design-style.md) for complete visual specifications
- **Responsive breakpoints**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Animations/Transitions**: Digit value change animation (optional flip/fade effect), page load fade-in
- **Accessibility**:
  - High contrast white text (#FFF) on dark background (#00101A) — contrast ratio ~19.4:1, exceeds WCAG AAA
  - Countdown container MUST use `role="timer"` and `aria-live="polite"` to announce updates to screen readers
  - Each countdown unit MUST have an `aria-label` describing its value in text (e.g., `aria-label="5 hours"`) since the LED digit font is not semantically readable
  - Retry button in error state MUST be keyboard-focusable (`tabIndex={0}` or native `<button>`)
  - No other keyboard navigation needed — page has no interactive elements in normal state
- **Key visual effects**: Glassmorphism digit cards with backdrop blur, gradient overlay on background image

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a countdown timer showing remaining Days (00–99), Hours (00–23), and Minutes (00–59) until the configured event start time. Each unit displays as two digits (zero-padded).
- **FR-002**: System MUST update the countdown display every minute (at minimum) without requiring a page refresh.
- **FR-003**: System MUST redirect users to the Homepage SAA (`/`) when the countdown reaches zero.
- **FR-004**: System MUST redirect users who visit the page after the event has started directly to the Homepage SAA.
- **FR-005**: System MUST display the countdown page only when the event has not yet started (server-side check).
- **FR-006**: System MUST support i18n for the title text and unit labels (vi, en, ja).
- **FR-007**: System MUST calculate countdown based on a server-provided event start timestamp (not client-side time alone).

### Technical Requirements

- **TR-001**: Countdown timer MUST update at least every 60 seconds. Optionally update every second for a more dynamic feel.
- **TR-002**: The event start time MUST be configurable (environment variable or database-driven), not hardcoded.
- **TR-003**: Background image MUST be optimized for web delivery (WebP/AVIF format, lazy loading if below fold, priority loading if above fold).
- **TR-004**: The page MUST use Server Component for initial render with Client Component only for the countdown timer logic (`useEffect`, `setInterval`).
- **TR-005**: The "Digital Numbers" font MUST be loaded efficiently (preload, subset if possible).
- **TR-006**: `backdrop-filter: blur()` MUST include `-webkit-` prefix for Safari compatibility.

### Key Entities *(if feature involves data)*

- **Event Configuration**: Contains `eventStartTime` (UTC timestamp), `eventName` (string). Source: environment variable or Supabase `events` table.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/event/status` | GET | Returns event start time and whether the event has started | Predicted (New) |

> **Predicted API Response**:
> ```json
> {
>   "eventStartTime": "2025-11-15T09:00:00Z",
>   "serverTime": "2025-11-14T03:40:00Z",
>   "hasStarted": false
> }
> ```
> - `eventStartTime`: UTC ISO 8601 timestamp of event start
> - `serverTime`: Current server time (for client clock offset calculation)
> - `hasStarted`: Boolean flag for quick server-side check
>
> **Alternative approach**: Use environment variable `NEXT_PUBLIC_EVENT_START_TIME` for event time and fetch server time from a lightweight endpoint. Or use Supabase query in a Server Component to read from an `events` table.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Countdown timer displays and updates correctly — no stale values visible after 1 minute.
- **SC-002**: Page loads within 2 seconds on 3G connection (LCP < 2s).
- **SC-003**: Redirect to homepage occurs within 3 seconds of countdown reaching zero.
- **SC-004**: Page renders correctly at all tested breakpoints (320px, 375px, 768px, 1024px, 1280px, 1440px).
- **SC-005**: Glassmorphism effect renders correctly in Chrome, Firefox, Safari, and Edge.

---

## Out of Scope

- **Seconds display**: The Figma design only shows Days, Hours, and Minutes. Seconds are not included (could be a future enhancement).
- **Header/Footer**: The countdown page is a standalone full-screen page without the standard header/footer navigation.
- **User interactions**: No buttons, forms, or interactive elements in the normal (active countdown) state. The only interactive element is the "Retry" button in the error state (not designed in Figma — use project's standard button styling).
- **Push notifications**: No notification sent when the event starts; only the in-page redirect.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — Event status endpoint needed
- [ ] Database design completed (`.momorph/database.sql`) — Event configuration table needed (or env var)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The Figma design shows Vietnamese text ("Sự kiện sẽ bắt đầu sau"). A new i18n key `countdown_title` must be added to all dictionaries (`en.json`, `ja.json`, `vi.json`).
- The "Digital Numbers" font is a specialty font that mimics 7-segment LED displays. If the font is unavailable or too large, consider using a CSS-only approach with a monospace font styled to look similar.
- The background artwork image needs to be exported from Figma. Use the `get_media_files` tool to download it.
- The page does NOT include a header or footer — it is a full-screen immersive experience.
- Consider preloading the background image for faster LCP since it occupies a significant portion of the viewport.
- The countdown should use `requestAnimationFrame` or `setInterval` for updates, with cleanup in `useEffect` return.
