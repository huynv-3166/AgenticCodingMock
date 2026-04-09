# Feature Specification: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-09
**Status**: Draft

---

## Overview

The Homepage SAA is the main landing page of the Sun* Annual Awards (SAA) 2025 application. After successful Google OAuth login, authenticated users are directed to this page. It showcases the "ROOT FURTHER" campaign theme through a visually rich hero section with a countdown timer to the event, an introduction section describing the campaign's mission, a grid of award categories, a Sun* Kudos recognition program promotion block, and a persistent floating action widget. The page includes a top navigation header and a footer with links to key sections.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Homepage and Understand SAA 2025 (Priority: P1)

An authenticated user lands on the Homepage and sees the "ROOT FURTHER" hero section with the countdown timer, event info, and CTA buttons, giving them a clear overview of the SAA 2025 event and its timeline.

**Why this priority**: This is the primary purpose of the homepage -- to inform users about the SAA 2025 event, when it will happen, and provide quick navigation to the awards and kudos sections.

**Independent Test**: Navigate to the homepage after login. Verify the hero section renders with the "ROOT FURTHER" title, countdown timer shows correct remaining time, event date/location are displayed, and both CTA buttons ("ABOUT AWARDS", "ABOUT KUDOS") are visible and clickable.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** they navigate to the homepage, **Then** the hero section displays the "ROOT FURTHER" title, a "Coming soon" subtitle, a countdown timer (Days/Hours/Minutes), event date (e.g., "26/12/2025"), event location (e.g., "Au Co Art Center"), and a livestream note ("Tuong thuat truc tiep qua song Livestream").
2. **Given** the countdown timer is active, **When** time passes, **Then** the timer updates in real-time (per minute) with zero-padded two-digit values for Days, Hours, and Minutes.
3. **Given** the event time has passed, **When** the user visits the homepage, **Then** the "Coming soon" subtitle is hidden and the countdown displays "00" for all units.
4. **Given** the hero section is rendered, **When** the user clicks "ABOUT AWARDS", **Then** they are navigated to the Awards Information page.
5. **Given** the hero section is rendered, **When** the user clicks "ABOUT KUDOS", **Then** they are navigated to the Sun* Kudos page.

---

### User Story 2 - Browse Award Categories (Priority: P1)

An authenticated user scrolls down the homepage to discover the 6 award categories (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP) displayed as a card grid, each with a thumbnail, title, description, and "Chi tiet" (Details) link.

**Why this priority**: Understanding the award categories is core to the SAA event. Users need to explore categories to know which awards they can nominate for or be nominated in.

**Independent Test**: Scroll to the "He thong giai thuong" (Award System) section. Verify all 6 award cards are rendered in a 3-column grid on desktop, each with an image, title, description (max 2 lines with ellipsis), and a "Chi tiet" link.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user scrolls to the awards section, **Then** they see the caption "Sun* annual awards 2025", the section title "He thong giai thuong", a sub-description "Cac hang muc se duoc trao giai theo TOP nhung nguoi xuat sac nhat.", and 6 award category cards in a 3-column grid (desktop).
2. **Given** an award card is displayed, **When** the user hovers over it, **Then** the card has a subtle lift effect and border/glow highlight.
3. **Given** an award card is displayed, **When** the user clicks the card image, title, or "Chi tiet" link, **Then** they are navigated to the Awards Information page with a hash anchor to the specific award category section (e.g., `/awards-information#top-talent`).
4. **Given** an award card description exceeds 2 lines, **When** it is rendered, **Then** the text is truncated with an ellipsis ("...").

---

### User Story 3 - Navigate Using Header (Priority: P1)

An authenticated user uses the top navigation header to switch between the main sections: "About SAA 2025", "Awards Information", and "Sun* Kudos".

**Why this priority**: The header is the primary navigation mechanism across the entire application and is essential for basic usability.

**Independent Test**: Verify the header renders with the logo, three navigation links, notification bell, language selector, and user profile icon. Test each navigation link routes to the correct page. Verify the active state styling (gold text + underline) for the current page.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the header renders, **Then** it shows the SAA logo (left), navigation links ("About SAA 2025", "Awards Information", "Sun* Kudos"), notification bell with badge, language selector ("VN"), and user profile icon (right).
2. **Given** the user is on the Homepage, **When** they view the header, **Then** "About SAA 2025" is in the selected state (gold text with underline and glow).
3. **Given** the header is visible, **When** the user clicks "Awards Information", **Then** they navigate to the Awards Information page.
4. **Given** the header is visible, **When** the user clicks "Sun* Kudos", **Then** they navigate to the Sun* Kudos page.
5. **Given** the user clicks the SAA logo, **When** they are on any page, **Then** they are navigated back to the homepage.
6. **Given** the header is visible, **When** the user clicks the notification bell, **Then** the notification panel opens.
7. **Given** the header is visible, **When** the user clicks the language selector, **Then** the language dropdown opens with VN/EN options.
8. **Given** the header is visible, **When** the user clicks the user profile icon, **Then** the profile dropdown menu opens (Profile / Sign out / Admin Dashboard for admin role).

---

### User Story 4 - Discover Sun* Kudos Program (Priority: P2)

An authenticated user scrolls to the Sun* Kudos promotional section to learn about the recognition program and navigates to the Kudos page for details.

**Why this priority**: The Kudos program is a secondary feature promoted on the homepage. Users should be able to discover and access it, but it is not the primary focus of the homepage.

**Independent Test**: Scroll to the Sun* Kudos section. Verify it displays the "Phong trao ghi nhan" label, "Sun* Kudos" title, description text, the KUDOS logo image, and a "Chi tiet" button that navigates to the Sun* Kudos page.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user scrolls to the Kudos section, **Then** they see a promotional card with "Phong trao ghi nhan" label, "Sun* Kudos" title, a "DIEM MOI CUA SAA 2025" highlight label, a description paragraph about the recognition program, the KUDOS logo image (right side), and a "Chi tiet" button.
2. **Given** the Kudos section is visible, **When** the user clicks the "Chi tiet" button, **Then** they navigate to the Sun* Kudos page.

---

### User Story 5 - Use Floating Action Widget (Priority: P2)

An authenticated user sees and interacts with a floating action button (FAB) pinned to the bottom-right corner of the screen to access quick action options.

**Why this priority**: The FAB provides a shortcut to commonly used features, improving workflow efficiency. It enhances UX but is not essential for core homepage functionality.

**Independent Test**: Verify the FAB is rendered as a gold pill-shaped button with a pencil icon and SAA icon, fixed to the bottom-right of the viewport. Click it to verify the quick action menu opens.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user views the page, **Then** a floating action button (pill shape, gold background, 106x64px) is visible at the bottom-right corner of the screen.
2. **Given** the FAB is visible, **When** the user clicks it, **Then** a quick action menu opens with available options.

---

### User Story 6 - Navigate Using Footer (Priority: P3)

An authenticated user can use the footer links to navigate between main sections, view community standards, and see copyright information.

**Why this priority**: The footer provides redundant navigation and legal information. It is useful but not critical compared to the header navigation.

**Independent Test**: Scroll to the footer. Verify it shows the SAA logo, navigation links ("About SAA 2025", "Awards Information", "Sun* Kudos", "Tieu chuan chung"), and copyright text.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user scrolls to the footer, **Then** they see the SAA logo, navigation links, and "Ban quyen thuoc ve Sun* (c) 2025" copyright text.
2. **Given** the footer is visible, **When** the user clicks any navigation link, **Then** they are directed to the corresponding page.
3. **Given** the footer is visible, **When** the user clicks the logo, **Then** the page scrolls to the top.

---

### Edge Cases

- What happens when the event target date is not configured? Display "00" for all countdown units and hide "Coming soon".
- What happens when the user is not authenticated? They should be redirected to the Login page via Supabase middleware.
- What happens on a slow network? The hero background image and award card images should use lazy loading with skeleton placeholders to prevent layout shifts (CLS).
- What happens when award category data is empty or unavailable? Display a "No awards available" message centered in the grid area.
- What happens when the notification API fails? Display the bell icon without a badge (graceful degradation).
- What happens when the countdown reaches 0 during a user's session? The timer should stop at "00 00 00" and the "Coming soon" subtitle should animate out (fade).
- What happens when the user rapidly clicks a CTA button or award card? Navigation should be debounced to prevent double-navigation.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header (A1) | `2167:9091` | Top navigation bar with logo, nav links, notification, language, profile | Click nav links, click icons to open dropdowns |
| Keyvisual Hero (3.5) | `2167:9027` | Hero banner with ROOT FURTHER title, countdown, event info, CTAs | Countdown auto-updates; CTA buttons navigate |
| Countdown Timer (B1) | `2167:9035` | Real-time countdown (Days/Hours/Minutes) | Auto-updates per minute |
| Event Info (B2) | `2167:9053` | Static event time, location, livestream info | Display only |
| CTA Buttons (B3) | `2167:9062` | "ABOUT AWARDS" and "ABOUT KUDOS" buttons | Click navigates; hover/active states |
| Root Further Content (B4) | `5001:14827` | Campaign description with ROOT FURTHER logo (top-right), justified paragraphs, centered quote block ("A tree with deep roots fears no storm"), all gold text on dark background | Static display |
| Award Section Header (C1) | `2167:9069` | "He thong giai thuong" section title | Static display |
| Award Card Grid (C2) | `5005:14974` | 3-column grid of 6 award category cards | Click navigates to award detail; hover lift |
| Top Talent Card (C2.1) | `2167:9075` | Award card: image, title, description, link | Click navigates; hover effect |
| Top Project Card (C2.2) | `2167:9076` | Award card | Same as C2.1 |
| Top Project Leader Card (C2.3) | `2167:9077` | Award card | Same as C2.1 |
| Best Manager Card (C2.4) | `2167:9079` | Award card | Same as C2.1 |
| Signature 2025 Creator Card (C2.5) | `2167:9080` | Award card | Same as C2.1 |
| MVP Card (C2.6) | `2167:9081` | Award card | Same as C2.1 |
| Sun* Kudos Section (D1) | `3390:10349` | Promotional block for Kudos program with "DIEM MOI CUA SAA 2025" highlight, description, KUDOS logo image | Click "Chi tiet" navigates |
| Widget Button (6) | `5022:15169` | Floating action button (bottom-right) | Click opens quick action menu |
| Footer (7) | `5001:14800` | Footer with logo, nav links, copyright | Click links navigate |

### Navigation Flow

- From: Login page (after successful Google OAuth)
- To:
  - Awards Information page (via header nav, CTA button, award cards, footer link)
  - Sun* Kudos page (via header nav, CTA button, Kudos "Chi tiet", footer link)
  - Notification panel (via bell icon)
  - Language dropdown (via language selector)
  - Profile dropdown (via profile icon)
  - Quick action menu (via floating widget)
  - Community Standards page (via footer "Tieu chuan chung" link)

### Visual Requirements

- **Responsive breakpoints**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
  - Award grid: 2 columns on mobile/tablet, 3 columns on desktop
  - Header: Collapse to hamburger menu on mobile
  - Content sections: Stack vertically and reduce padding on smaller screens
- **Animations/Transitions**: Button hover state transitions (150ms ease), card hover lift effect (200ms ease), countdown digit transition
- **Accessibility**: WCAG AA compliance, minimum 44x44px touch targets on mobile, proper alt text for images, focus states for interactive elements
- **See [design-style.md](design-style.md) for complete visual specifications**

### Loading & Error States

| State | Behavior |
|-------|----------|
| Page loading | Server-rendered shell (header, hero background, static content) loads immediately. Client-side countdown hydrates after JS loads. |
| Award cards loading | Show 6 skeleton card placeholders (336x504px with pulse animation) maintaining grid layout. |
| Notification count loading | Show bell icon without badge until count is fetched. |
| Notification count error | Show bell icon without badge (graceful degradation, no error toast). |
| Award data fetch error | Show "Unable to load awards. Please try again." message in the grid area. |
| Hero image slow load | Use a blurred low-resolution placeholder (LQIP) or CSS gradient matching --color-background as fallback. |

### Accessibility Requirements

- **Keyboard Navigation**: All interactive elements (nav links, CTA buttons, award cards, footer links, widget) MUST be reachable via Tab key in logical order (header left-to-right, then page top-to-bottom).
- **Focus Indicators**: All focusable elements MUST have a visible focus ring (2px solid #FFEA9E, offset 2px) meeting WCAG 2.4.7.
- **Screen Reader**: Countdown timer MUST use `aria-live="polite"` with `aria-label` announcing remaining time (e.g., "20 days, 20 hours, 20 minutes remaining"). Timer updates should NOT announce every minute to avoid noise.
- **ARIA Roles**: Award cards MUST use `role="link"` or be wrapped in `<a>` tags. Navigation landmarks (`<nav>`, `<header>`, `<footer>`, `<main>`) MUST be used.
- **Alt Text**: Hero background image: decorative (`alt=""`). Award card images: descriptive (e.g., `alt="Top Talent award badge"`). Logos: `alt="Sun* Annual Awards 2025"`.
- **Reduced Motion**: Honor `prefers-reduced-motion` media query -- disable card lift animations and countdown transitions.
- **Color Contrast**: Gold (#FFEA9E) on dark navy (#00101A) = ~13.7:1 ratio (passes AAA). White (#FFF) on dark navy (#00101A) = ~18.1:1 ratio (passes AAA).

### State Management

| State | Scope | Description |
|-------|-------|-------------|
| Countdown remaining time | Local (Client Component) | Calculated from `EVENT_START_DATE` env var. Updated via `setInterval` every 60 seconds. |
| Is event passed | Local (derived) | Boolean derived from countdown. Controls "Coming soon" visibility. |
| Notification unread count | Global (shared with Header) | Fetched on mount, used to display badge. Shared across pages via context or server state. |
| Active nav item | Local (Header) | Determined by current route (`usePathname()`). |
| Language dropdown open | Local (Header) | Boolean toggle for dropdown visibility. |
| Profile dropdown open | Local (Header) | Boolean toggle for dropdown visibility. |
| Notification panel open | Local (Header) | Boolean toggle for panel visibility. |
| FAB menu open | Local (Widget) | Boolean toggle for quick action menu visibility. |

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render the hero section with "ROOT FURTHER" title, countdown timer, event info, and CTA buttons on page load.
- **FR-002**: System MUST calculate and display the countdown timer (Days, Hours, Minutes) based on a configurable event target datetime (ISO-8601 format via environment variable).
- **FR-003**: System MUST update the countdown timer in real-time (per minute interval).
- **FR-004**: System MUST hide the "Coming soon" subtitle when the event time has passed, and display "00" for all countdown units.
- **FR-005**: System MUST render 6 award category cards in a responsive grid (3 columns desktop, 2 columns mobile/tablet).
- **FR-006**: System MUST truncate award card descriptions to 2 lines with ellipsis overflow.
- **FR-007**: System MUST navigate to the Awards Information page with a hash anchor (slug of award category) when an award card is clicked.
- **FR-008**: System MUST render the Sun* Kudos promotional section with a "Chi tiet" button linking to the Sun* Kudos page.
- **FR-009**: System MUST render a floating action widget button fixed to the bottom-right corner of the viewport.
- **FR-010**: System MUST render the header with logo, navigation links (with active state for current page), notification bell (with badge), language selector, and profile icon.
- **FR-011**: System MUST render the footer with logo, navigation links, community standards link, and copyright text.

### Technical Requirements

- **TR-001**: Page MUST load within 3 seconds on a standard connection. Use Next.js Image component for optimized image loading.
- **TR-002**: Authentication MUST be verified via Supabase Auth middleware. Unauthenticated users are redirected to `/login`.
- **TR-003**: Countdown target date MUST be configurable via environment variable (`EVENT_START_DATE` in ISO-8601 format).
- **TR-004**: All award category data (title, description, thumbnail, slug) SHOULD be fetched from the database or defined as static content, allowing future dynamic management.
- **TR-005**: Page MUST be built as a Server Component by default, with Client Components only for interactive sections (countdown timer, header dropdowns, floating widget).

### Key Entities *(if feature involves data)*

- **Award Category**: Represents a SAA 2025 award type. Key attributes: id, title, description, thumbnail_url, slug, display_order.
- **Event Configuration**: Represents the SAA event details. Key attributes: event_start_date (ISO-8601), event_date_display (e.g., "26/12/2025"), event_location (e.g., "Au Co Art Center"), livestream_info (e.g., "Tuong thuat truc tiep qua song Livestream").
- **User Session**: Authenticated user session from Supabase Auth. Key attributes: user_id, email, role (user/admin), avatar_url.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/auth/session | GET | Verify user authentication (via Supabase middleware) | Exists |
| /api/awards/categories | GET | Fetch award category list (title, description, thumbnail, slug) | Predicted |
| /api/event/config | GET | Fetch event configuration (date, location) | Predicted |
| /api/notifications/unread-count | GET | Fetch unread notification count for badge | Predicted |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Homepage loads and renders all sections (hero, awards, kudos, footer) within 3 seconds on desktop.
- **SC-002**: Countdown timer displays correct remaining time and updates per minute without page refresh.
- **SC-003**: All 6 award cards are clickable and navigate to the correct award detail section.
- **SC-004**: Page is fully responsive at all breakpoints (320px, 375px, 768px, 1024px, 1280px, 1440px) without horizontal scrolling.
- **SC-005**: All interactive elements have visible hover/focus states.

---

## Out of Scope

- Admin dashboard functionality (separate screen)
- Notification panel content and management (separate feature)
- Profile dropdown menu and profile page (separate feature)
- Language switching implementation (separate feature, only UI trigger here)
- Quick action menu contents (separate feature, only FAB button here)
- Award nomination or voting functionality
- Dynamic award data management (admin CMS)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Login screen specification (`.momorph/specs/GzbNeVGJHz-Login/spec.md`)

---

## Notes

- The page design is dark-themed with gold (#FFEA9E) accents consistent with the SAA branding.
- The "ROOT FURTHER" campaign messaging is central to the visual identity.
- Award card thumbnails use a distinctive golden ring/glow effect.
- The countdown timer uses a glassmorphism effect on digit tiles (backdrop-blur + semi-transparent background).
- All navigation uses client-side routing via Next.js App Router.
- The event start date should be configured via `EVENT_START_DATE` environment variable for flexibility.
- **Figma typo**: The Figma design shows "Comming soon" (double-m). Implementation should use the correct English spelling "Coming soon" unless stakeholders confirm the typo is intentional.
- **Footer nav label**: The Figma footer shows "Award Information" (singular) while the header uses "Awards Information" (plural). Implementation should use "Award Information" consistently across both header and footer, matching the Figma design. Confirm with stakeholders if this is intentional or should be unified.
