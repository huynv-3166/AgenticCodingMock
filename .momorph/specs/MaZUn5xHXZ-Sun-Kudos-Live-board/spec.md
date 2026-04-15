# Feature Specification: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**Screen ID**: `MaZUn5xHXZ`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-13
**Status**: Draft

---

## Overview

The Sun* Kudos - Live Board is the central gratitude recognition page for the SAA 2025 (Sun* Annual Awards) event. It allows authenticated Sunners (Sun* employees) to view, send, and interact with kudos -- thank-you messages between colleagues. The page features a hero banner with quick-action CTA, a carousel of top highlighted kudos, an interactive spotlight board visualizing kudo recipients, a live feed of all kudos with infinite scroll, personal statistics, and a leaderboard of recent gift recipients.

**Target Users**: Authenticated Sun* employees (Sunners) participating in SAA 2025
**Route**: `/kudos`
**Auth Required**: Yes (authenticated users only)

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View All Kudos Feed (Priority: P1)

As an authenticated Sunner, I want to browse a live feed of all kudos so that I can see the gratitude being shared across the organization.

**Why this priority**: The kudos feed is the core content of the page. Without it, the page has no primary value.

**Independent Test**: Navigate to `/kudos` as an authenticated user and verify the feed loads with kudo cards showing sender, receiver, message, timestamp, hashtags, and action buttons.

**Acceptance Scenarios**:

1. **Given** an authenticated user navigates to `/kudos`, **When** the page loads, **Then** a scrollable list of kudo cards is displayed sorted by newest first (created_at DESC), each showing sender info (avatar, name, department, stars), receiver info, timestamp (format "HH:mm - MM/DD/YYYY"), message content, hashtags, and action buttons (heart, copy link).
2. **Given** the kudo feed is displayed, **When** the user scrolls to within 200px of the bottom, **Then** the next batch of 10 kudos is loaded via infinite scroll, and a loading spinner is shown below the last card while fetching.
3. **Given** a kudo message exceeds 5 lines, **When** it is displayed in the feed, **Then** it is truncated with "..." after 5 lines.
4. **Given** a kudo has attached images (max 5), **When** the card is displayed, **Then** image thumbnails (88x88px) are shown, and clicking a thumbnail opens the full-size image.
5. **Given** a kudo has more than 5 hashtags per line, **When** displayed, **Then** overflow hashtags show "...".
6. **Given** there are no kudos in the system, **When** the page loads, **Then** the empty state message "Hien tai chua co Kudos nao." is displayed.
7. **Given** the page is loading for the first time, **When** data is being fetched, **Then** skeleton placeholders are displayed for each section (hero, highlight carousel, feed, sidebar) matching the card/box shapes.
8. **Given** the API returns an error while loading the kudo feed, **When** the error is received, **Then** an error state with a "Retry" button is displayed in place of the feed.
9. **Given** a kudo card displays sender and receiver info, **When** either user has received >= 10 kudos, **Then** a star badge (pill shape, 109x19) is shown next to their name: 1 star at 10 kudos, 2 stars at 20, 3 stars at 50. Hovering the badge shows a descriptive tooltip (e.g., "Received 10+ kudos").
10. **Given** a kudo is marked anonymous (`is_anonymous: true`), **When** the card is rendered, **Then** the sender block shows "An danh" with a generic avatar, and the sender's name, department, and star badge are hidden.

---

### User Story 2 - Heart/Like a Kudo (Priority: P1)

As an authenticated Sunner, I want to heart (like) a kudo so that I can show appreciation for the gratitude shared between colleagues.

**Why this priority**: The heart system is the primary interaction mechanism and drives engagement. It also feeds into the highlight ranking and the star milestone system.

**Independent Test**: Click the heart button on a kudo card and verify the count increments, the button state changes, and business rules are enforced.

**Acceptance Scenarios**:

1. **Given** a user views a kudo they did NOT send, **When** they click the heart button, **Then** the heart count increments by 1, the button changes to the "liked" state (red), and the kudo sender's total heart count increases by 1.
2. **Given** a user has already hearted a kudo, **When** they click the heart button again, **Then** the heart is removed, the count decrements by 1, the button returns to default state (gray), and the sender's heart count decreases by 1.
3. **Given** a user views a kudo they DID send, **When** the card is displayed, **Then** the heart button is disabled (sender cannot heart their own kudo).
4. **Given** an admin has configured a special day (x2 hearts), **When** a user hearts a kudo on that day, **Then** the heart adds +2 to the sender's total heart count instead of +1, and a "x2" badge (Montserrat 700 ~17.5px, white on gold pill) is displayed next to the heart icon on all kudo cards to indicate the multiplier is active.
5. **Given** it is a special day and a user removes their heart, **When** the un-heart action completes, **Then** the sender's heart count decreases by 2 (matching the special day multiplier).
6. **Given** a user has already hearted a kudo, **When** they try to add another heart, **Then** the system prevents it (max 1 heart per user per kudo).

---

### User Story 3 - View Highlight Kudos Carousel (Priority: P1)

As an authenticated Sunner, I want to see the top 5 most-hearted kudos in a prominent carousel so that I can discover the most appreciated messages.

**Why this priority**: The highlight section showcases the best content and drives engagement by surfacing popular kudos.

**Independent Test**: Load the page and verify the carousel shows the top 5 kudos ranked by heart count, with navigation and active card highlighting.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the Highlight Kudos section renders, **Then** a carousel displays the top 5 kudos with the most hearts, center card is active/highlighted (4px gold border), flanking cards are dimmed (opacity: 0.5 with left/right gradient fade overlays).
2. **Given** the carousel is on page 2 of 5, **When** the user clicks "next", **Then** the carousel slides to page 3 with a 300ms slide transition, and the pagination indicator updates to "3/5".
3. **Given** the carousel is on page 1, **When** the previous button is shown, **Then** it is disabled (opacity: 0.3, cursor: not-allowed).
4. **Given** the carousel is on page 5, **When** the next button is shown, **Then** it is disabled (opacity: 0.3, cursor: not-allowed).
5. **Given** a highlight kudo card is shown, **When** the message exceeds 3 lines, **Then** it is truncated with "..." after 3 lines.
6. **Given** there are no kudos with hearts, **When** the highlight section loads, **Then** it shows the empty state: "Hien tai chua co Kudos nao."
7. **Given** a highlight kudo card has a "Xem chi tiet" (View details) link in the action row, **When** the user clicks it, **Then** the full kudo detail view opens showing the complete message, all images, and comments.

---

### User Story 4 - Filter Kudos by Hashtag and Department (Priority: P2)

As an authenticated Sunner, I want to filter kudos by hashtag or department so that I can find relevant recognition within specific categories or teams.

**Why this priority**: Filtering enhances discoverability but the page is usable without it.

**Independent Test**: Click the Hashtag filter dropdown, select a hashtag, and verify both the Highlight carousel and All Kudos feed update to show only matching kudos.

**Acceptance Scenarios**:

1. **Given** the user clicks the "Hashtag" filter button, **When** the dropdown opens, **Then** a list of available hashtags is displayed (linked to Dropdown list hashtag frame).
2. **Given** the user selects a hashtag, **When** the filter is applied, **Then** BOTH the Highlight Kudos carousel AND the All Kudos feed update to show only kudos with that hashtag.
3. **Given** the user clicks the "Phong ban" (Department) filter button, **When** the dropdown opens, **Then** a list of departments is displayed (linked to Dropdown Phong ban frame).
4. **Given** the user selects a department, **When** the filter is applied, **Then** both sections update to show only kudos from/to members of that department.
5. **Given** filters are active, **When** the carousel pagination changes, **Then** the pagination resets to page 1.
6. **Given** the user clicks a hashtag tag inside a kudo card, **When** the action completes, **Then** the hashtag filter is applied and both sections update accordingly.
7. **Given** a filter is currently active, **When** the user clicks the same filter button again and deselects the value (or selects "All"), **Then** the filter is cleared and both sections return to showing all kudos.
8. **Given** the user has selected a hashtag filter, **When** they also select a department filter, **Then** both filters are applied simultaneously (AND logic: only kudos matching both the selected hashtag AND department are shown).
9. **Given** a filter is being applied, **When** the API call is in progress, **Then** a loading indicator is shown within the affected sections while preserving the current content until new data arrives.
10. **Given** active filters exist, **When** the filter state changes, **Then** the active filter values are reflected in the URL query parameters (e.g., `/kudos?hashtag=X&department=Y`) for shareable filtered views.

---

### User Story 5 - Initiate Sending a Kudo (Priority: P2)

As an authenticated Sunner, I want to click a CTA to start writing a kudo so that I can send gratitude to a colleague.

**Why this priority**: Sending kudos is essential but the write dialog is a separate frame/feature. This story covers the CTA entry point only.

**Independent Test**: Click the "Ghi nhan" input field in the hero section and verify the kudo composition dialog opens.

**Acceptance Scenarios**:

1. **Given** the hero section is displayed, **When** the user clicks the pill-shaped input field ("Hom nay, ban muon gui loi cam on va ghi nhan den ai?"), **Then** the kudo composition dialog opens (navigates to Viet Kudo frame `ihQ26W78P2`).
2. **Given** the hero section is displayed, **When** the user clicks the search button (magnifying glass icon, 381x72 pill), **Then** the search Sunner dialog opens to find and navigate to a specific Sunner's kudos or profile.

---

### User Story 6 - View Personal Statistics (Priority: P2)

As an authenticated Sunner, I want to see my personal kudos statistics so that I can track my participation and engagement.

**Why this priority**: Personal stats drive continued engagement but are supplementary to the main feed.

**Independent Test**: Load the page and verify the sidebar stats box shows accurate personal metrics.

**Acceptance Scenarios**:

1. **Given** an authenticated user views the page, **When** the sidebar loads, **Then** it displays stats in this exact order: (1) Kudos received count, (2) Kudos sent count, (3) Hearts received count, then a horizontal divider, then (4) Secret boxes opened count, (5) Secret boxes unopened count, then the "Mo qua" button.
2. **Given** the statistics are displayed, **When** the data is current, **Then** all counts reflect the authenticated user's actual data from the database.

---

### User Story 7 - Open Secret Box (Priority: P2)

As an authenticated Sunner, I want to open my secret boxes so that I can discover surprise rewards.

**Why this priority**: The secret box feature is a gamification element that drives engagement but is secondary to core kudos functionality.

**Independent Test**: Click the "Mo qua" (Open Gift) button in the sidebar and verify the secret box dialog opens.

**Acceptance Scenarios**:

1. **Given** the user has unopened secret boxes (count > 0), **When** they click "Mo qua" button, **Then** the Secret Box dialog opens (navigates to Open secret box frame, linked frame ID: 1466:7676).
2. **Given** the user has no unopened secret boxes (count = 0), **When** the sidebar loads, **Then** the "Mo qua" button is visually disabled (reduced opacity, cursor: not-allowed) and clicking it has no effect.

---

### User Story 8 - View Spotlight Board (Priority: P2)

As an authenticated Sunner, I want to view the Spotlight Board visualization so that I can see an overview of who has received kudos across the organization.

**Why this priority**: The spotlight is a visually engaging feature but supplementary to the core feed.

**Independent Test**: Load the page and verify the Spotlight Board renders an interactive word cloud/node diagram with the total kudos count.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the Spotlight Board section renders, **Then** an interactive word cloud/node diagram is displayed showing kudo recipient names, and a total count label (e.g., "388 KUDOS") is shown.
2. **Given** the spotlight board is rendered, **When** the user hovers over a name node, **Then** a tooltip shows the person's name and kudo receipt time.
3. **Given** the spotlight board is rendered, **When** the user clicks a name node, **Then** the kudo detail opens.
4. **Given** the spotlight board is rendered, **When** the user clicks the Pan/Zoom toggle, **Then** pan and zoom mode is activated for exploring the visualization.
5. **Given** the spotlight board has a search bar, **When** the user types a name (max 100 chars), **Then** the matching sunner is highlighted in the visualization.
6. **Given** there are no kudos, **When** the spotlight loads, **Then** a dedicated empty state is shown.

---

### User Story 9 - View Latest Gift Recipients Leaderboard (Priority: P3)

As an authenticated Sunner, I want to see the 10 most recent gift recipients so that I can stay informed about rewards activity.

**Why this priority**: The leaderboard is informational and supplementary.

**Independent Test**: Load the page and verify the sidebar leaderboard shows up to 10 entries with avatar, name, and gift description.

**Acceptance Scenarios**:

1. **Given** the sidebar leaderboard loads, **When** data is available, **Then** up to 10 entries are displayed, each with: avatar, name, and gift description.
2. **Given** the list overflows the container, **When** displayed, **Then** the list scrolls independently with a visible scrollbar.
3. **Given** a user clicks on a leaderboard entry's name or avatar, **When** the click event fires, **Then** the user's profile opens.
4. **Given** no gift data exists, **When** the leaderboard loads, **Then** it shows "Chua co du lieu."

---

### User Story 10 - Copy Kudo Link (Priority: P3)

As an authenticated Sunner, I want to copy a shareable link to a specific kudo so that I can share it with colleagues.

**Why this priority**: Nice-to-have sharing feature.

**Independent Test**: Click "Copy Link" on a kudo card and verify the URL is copied to clipboard and a toast notification appears.

**Acceptance Scenarios**:

1. **Given** a user clicks "Copy Link" on a kudo card, **When** the action completes, **Then** the kudo URL is copied to the clipboard and a toast notification "Link copied -- ready to share!" is displayed.

---

### User Story 11 - View User Profile on Hover/Click (Priority: P3)

As an authenticated Sunner, I want to preview a user's profile by hovering over their avatar so that I can quickly learn about them.

**Why this priority**: Supplementary UX enhancement.

**Independent Test**: Hover over an avatar on a kudo card and verify the profile preview popup appears.

**Acceptance Scenarios**:

1. **Given** a user hovers over any avatar (sender or receiver) on any kudo card, **When** the hover event triggers, **Then** a profile preview popup is displayed (linked frame: 721:5827).
2. **Given** a user clicks on an avatar or name, **When** the click event fires, **Then** the full profile page opens.

---

### Edge Cases

- What happens when a user navigates to `/kudos` without authentication? -> Redirect to `/login` with return URL.
- What happens when the API returns an error while loading kudos? -> Show an error state with "Retry" button.
- What happens when a user hearts a kudo during a special day that ends mid-action? -> Use the multiplier at the time the heart was created (server timestamp).
- What happens when filters return zero results? -> Show empty state "Hien tai chua co Kudos nao." in both carousel and feed with active filters still visible.
- What happens when the user's internet connection drops while infinite-scrolling? -> Show a "Connection lost. Tap to retry." message below the last loaded card.
- What happens when two users heart the same kudo simultaneously? -> Backend handles concurrency; both hearts should be recorded.
- What happens when a kudo is deleted/moderated while a user is viewing it? -> If the kudo card is visible, it should be gracefully removed from the feed on next data refresh. If the user is on a kudo detail, redirect back to the feed with a "This kudo is no longer available" toast.
- What happens when the kudo feed has exactly 10 items and the user scrolls to load more? -> If the server returns an empty result set, hide the loading spinner and display "No more kudos to load" at the bottom.
- What happens with very long Sunner names (>30 characters)? -> Truncate with ellipsis within the fixed-width containers (235px sender/receiver blocks).
- What happens when a Sunner has no profile picture? -> Display a default avatar placeholder (initials or generic user icon within the 64x64 circle).
- What happens when the user deep-links to `/kudos?hashtag=invalid_value`? -> Ignore invalid filter values and load the unfiltered feed. Do not show an error.
- What happens when a kudo is marked as anonymous (`is_anonymous: true`)? -> The sender info shows "An danh" (Anonymous) with a generic avatar. The sender's name, department, and star badge are hidden. Heart, copy link, and hashtag interactions still work normally.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Header | 2940:13433 | Top navigation bar: **Logo** (52x48) → nav links in order: **"About SAA 2025"**, **"Awards Information"**, **"Sun* Kudos"** (active on this page) → right group: **Notification bell**, **Language selector**, **Profile icon** | Nav clicks, language dropdown, profile dropdown |
| A_KV Kudos | 2940:13437 | Hero banner with title, KUDOS logo, and action buttons | - |
| A.1_Button ghi nhan | 2940:13449 | Pill-shaped CTA to open kudo composition dialog | Click -> opens write dialog (frame `ihQ26W78P2`) |
| A.1_Search Button | 2940:13448 | Pill-shaped search button (381x72) next to write CTA | Click -> opens search Sunner dialog |
| B_Highlight | 2940:13451 | Highlight Kudos section with carousel of top 5 kudos | - |
| B.1.1_ButtonHashtag | 2940:13459 | Hashtag filter dropdown trigger | Click -> opens dropdown (frame 1002:13013) |
| B.1.2_Button Phong ban | 2940:13460 | Department filter dropdown trigger | Click -> opens dropdown (frame 721:5684) |
| B.2_Carousel | 2940:13461 | Horizontal carousel with highlight kudo cards | Slide navigation |
| B.3_Highlight Card | 2940:13465 | Individual highlight kudo card (sender, receiver, message) | Heart, copy link, view detail |
| B.5_Slide Controls | 2940:13471 | Prev/Next arrows and page indicator | Click prev/next |
| B.7_Spotlight | 2940:14174 | Interactive word cloud visualization | Hover tooltip, click detail, pan/zoom, search |
| C_All kudos | 2940:13475 | All Kudos feed section | Infinite scroll |
| C.3_KUDO Post | 3127:21871 | Individual kudo post card | Heart, copy link, click hashtag |
| D.1_Stats | 2940:13489 | Personal statistics sidebar box | - |
| D.1.8_Button mo qua | 2940:13497 | "Open Gift" button for secret boxes | Click -> opens secret box dialog (frame 1466:7676) |
| D.3_Leaderboard | 2940:13510 | "10 Sunner nhan qua moi nhat" leaderboard list | Click name/avatar -> profile |
| Footer | 2940:13522 | Footer with logo, navigation links, copyright | Nav clicks |

### Navigation Flow

- **From**: Homepage SAA (`i87tDx10uM`) via header nav "Sun* Kudos", CTA "ABOUT KUDOS", Kudos "Chi tiet" button, or footer link
- **From**: He thong giai (`zFYDgyj_pD`) via "Chi tiet" button in Kudos promo section
- **To**: Write Kudo dialog (via A.1 CTA click, frame `ihQ26W78P2`)
- **To**: Search Sunner dialog (via hero search button click)
- **To**: Secret Box dialog (via D.1.8 button click, linked frame: 1466:7676)
- **To**: Hashtag filter dropdown (via B.1.1 click, linked frame: 1002:13013)
- **To**: Department filter dropdown (via B.1.2 click, linked frame: 721:5684)
- **To**: User profile preview (via avatar hover, linked frame: 721:5827)
- **To**: Homepage (via header logo click)
- **To**: Awards Information (via header nav click)

### Visual Requirements

- **Responsive breakpoints**: Mobile (< 768px), Tablet (768-1023px), Desktop (>= 1024px)
- **Design reference**: See `design-style.md` for complete visual specifications
- **Dark theme**: Page background #00101A with gold (#FFEA9E) accents and cream (#FFF8E1) cards
- **Primary font**: Montserrat (700 weight dominant)
- **Animations**: Carousel slide transitions (300ms), heart button scale animation (200ms), infinite scroll fade-in (150ms)

### Accessibility Requirements

- **WCAG AA compliance**: All text/background combinations must meet 4.5:1 contrast ratio for normal text and 3:1 for large text. Verified: #FFEA9E on #00101A (~11.5:1), #999 on #00101A (~5.3:1).
- **Keyboard navigation**: All interactive elements (buttons, filters, carousel controls, heart toggle, copy link, cards) must be reachable and operable via Tab and Enter/Space. Carousel arrows support ArrowLeft/ArrowRight keys.
- **Focus indicators**: All focusable elements must have a visible focus ring (2px solid #FFEA9E, offset 2px) against the dark background.
- **Screen reader support**: Kudo cards use `article` landmark with `aria-label` describing sender, receiver, and timestamp. Heart button has `aria-pressed` state. Carousel has `aria-roledescription="carousel"` with `aria-label` for current slide. Filter buttons use `aria-expanded` and `aria-haspopup`.
- **Touch targets**: All interactive elements must be at least 44x44px on mobile (constitution requirement).
- **Reduced motion**: Carousel transitions and heart animations respect `prefers-reduced-motion: reduce` media query.
- **Live regions**: New kudos loaded via infinite scroll should use `aria-live="polite"` to announce additions. Heart count changes should be announced.

### State Management

| State | Scope | Description |
|-------|-------|-------------|
| kudoFeed | Page-level | Paginated list of kudo items, managed with infinite scroll cursor |
| highlightKudos | Page-level | Top 5 most-hearted kudos for carousel |
| activeFilters | URL (query params) | Current hashtag and department filter values, synced to URL |
| carouselPage | Local (component) | Current slide index for the highlight carousel (1-5) |
| userStats | Page-level | Authenticated user's personal statistics |
| spotlightData | Page-level | Word cloud/node data for the Spotlight Board |
| leaderboard | Page-level | 10 most recent gift recipients list |
| heartStates | Local (per card) | Map of kudo_id -> { isHearted, count } for optimistic UI |
| isLoadingMore | Local (feed) | Whether infinite scroll is currently loading the next batch |
| feedError | Local (feed) | Error state for feed API call (null or error message) |
| sectionLoading | Page-level | Loading state per section for initial page load (skeleton display) |
| specialDayInfo | Page-level | Whether today is a special day and the current heart multiplier (fetched once on load) |
| spotlightSearchQuery | Local (component) | Current search input value for Spotlight Board search bar |

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a scrollable feed of all kudos with sender/receiver info, message content, timestamps, hashtags, and action buttons.
- **FR-002**: System MUST support infinite scroll pagination for the kudo feed.
- **FR-003**: System MUST display a carousel of the top 5 most-hearted kudos with slide navigation.
- **FR-004**: Users MUST be able to heart/un-heart kudos (max 1 heart per user per kudo, sender cannot self-heart).
- **FR-005**: System MUST apply a x2 heart multiplier on admin-configured special days.
- **FR-006**: System MUST support filtering by hashtag and department, applying to BOTH highlight carousel and all kudos feed simultaneously.
- **FR-007**: System MUST display personal statistics: kudos received, kudos sent, hearts received, secret boxes opened, secret boxes unopened.
- **FR-008**: System MUST display an interactive Spotlight Board word cloud visualization with hover tooltips, click-to-detail, pan/zoom, and search.
- **FR-009**: System MUST display a leaderboard of the 10 most recent gift recipients with scrollable list.
- **FR-010**: Users MUST be able to copy a kudo's shareable link to clipboard.
- **FR-011**: System MUST show the star/badge system next to user names (1 star = 10 kudos, 2 stars = 20 kudos, 3 stars = 50 kudos).
- **FR-012**: Users MUST be able to click a CTA to open the kudo composition dialog.
- **FR-013**: System MUST show empty states when no data is available for each section.
- **FR-014**: Clicking a hashtag tag on a kudo card MUST apply that hashtag as a filter.
- **FR-015**: Hovering over avatars/names MUST show a profile preview popup.
- **FR-016**: The kudo feed MUST be sorted by newest first (created_at DESC) by default, loading 10 kudos per page.
- **FR-017**: Active filter state MUST be reflected in URL query parameters for shareable filtered views.
- **FR-018**: Skeleton loading states MUST be displayed for all sections during initial page load.
- **FR-019**: Error states with retry functionality MUST be shown when API calls fail.
- **FR-020**: Highlight kudo cards MUST include a "Xem chi tiet" (View details) action that opens the full kudo detail.

### Technical Requirements

- **TR-001**: Page MUST load initial content within 2 seconds on 3G connection.
- **TR-002**: Infinite scroll MUST pre-fetch next page when user is within 200px of the bottom.
- **TR-003**: Heart toggle MUST use optimistic UI updates with rollback on failure.
- **TR-004**: All API calls MUST use authenticated Supabase client with RLS enforcement.
- **TR-005**: Spotlight Board visualization MUST support at least 500 name nodes without performance degradation.
- **TR-006**: Page MUST be server-side rendered (SSR) for initial load, with client-side hydration for interactivity.
- **TR-007**: All user input (search, filters) MUST be validated and sanitized per OWASP guidelines.
- **TR-008**: Heart multiplier logic (special days) MUST be server-side to prevent tampering.

### Key Entities *(data model)*

- **Kudo**: Represents a thank-you message (id, sender_id, receiver_id, message, category, hashtags[], images[], created_at, heart_count, is_anonymous)
- **Heart**: Represents a like on a kudo (id, kudo_id, user_id, multiplier, created_at)
- **User/Sunner**: Employee profile (id, name, email, avatar_url, department, star_level, kudo_received_count, kudo_sent_count, heart_received_count)
- **SecretBox**: Gift box (id, user_id, is_opened, opened_at, gift_details)
- **SpecialDay**: Admin-configured day with multiplier (id, date, heart_multiplier)
- **Hashtag**: Tag category (id, name)
- **Department**: Organizational unit (id, name, code)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/kudos | GET | Fetch paginated kudo feed (with filters) | Predicted |
| /api/kudos/highlight | GET | Fetch top 5 most-hearted kudos | Predicted |
| /api/kudos/:id/heart | POST | Add heart to a kudo | Predicted |
| /api/kudos/:id/heart | DELETE | Remove heart from a kudo | Predicted |
| /api/kudos/spotlight | GET | Fetch spotlight board data. Predicted response: `{ total_kudos: number, nodes: [{ user_id, name, kudo_count, avatar_url }] }`. Node font size scales linearly from 6px (min kudos) to 22px (max kudos). | Predicted |
| /api/users/me/stats | GET | Fetch authenticated user's personal stats | Predicted |
| /api/users/gifts/recent | GET | Fetch 10 most recent gift recipients | Predicted |
| /api/hashtags | GET | Fetch available hashtags for filter | Predicted |
| /api/departments | GET | Fetch available departments for filter | Predicted |
| /api/secret-box/open | POST | Open a secret box | Predicted |
| /api/special-days/current | GET | Check if today is a special day (for heart multiplier) | Predicted |
| /api/kudos/:id | GET | Fetch single kudo detail (for "Xem chi tiet" / view details) | Predicted |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page loads and displays initial kudo feed within 2 seconds (LCP).
- **SC-002**: Infinite scroll loads next batch within 500ms of trigger.
- **SC-003**: Heart toggle reflects state change within 200ms (optimistic UI).
- **SC-004**: Filter application updates both sections within 1 second.
- **SC-005**: Spotlight Board renders interactively without frame drops at 500+ nodes.
- **SC-006**: All interactive elements have visible focus states for keyboard navigation.
- **SC-007**: Page is fully functional across mobile, tablet, and desktop breakpoints.

---

## Out of Scope

- Kudo composition/writing dialog (separate frame: Viet Kudo / `ihQ26W78P2`)
- Admin settings for special days configuration
- Notification panel
- Profile page (full view)
- Community standards page
- Secret box opening animation and reward reveal (separate frame: Open secret box)
- Admin review/moderation of kudos content

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Design style document (`.momorph/specs/MaZUn5xHXZ-Sun-Kudos-Live-board/design-style.md`)

---

## Notes

- The star/badge system (hoa thi) uses these milestones: 1 star = 10 kudos received, 2 stars = 20, 3 stars = 50. Hover on stars shows descriptive text about the milestone.
- The heart multiplier on special days is an admin-configured feature. The multiplier value should be fetched from the server and applied server-side to prevent manipulation.
- The Spotlight Board is a complex visualization component that may require a dedicated charting/visualization library (e.g., D3.js, react-force-graph, or similar).
- The "Sun* Kudos" nav link in both header and footer should have the active/glow state on this page.
- Filter state should be preserved in URL query parameters for shareable filtered views.
- The page relies on several linked frames for overlays: Hashtag dropdown (1002:13013), Department dropdown (721:5684), Profile preview (721:5827), Secret box (1466:7676).
