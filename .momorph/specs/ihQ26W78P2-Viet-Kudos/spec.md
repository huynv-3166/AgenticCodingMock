# Feature Specification: Write Kudos (Viet Kudo)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viet Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-15
**Status**: Draft

---

## Overview

The **Write Kudos** feature is a modal dialog that allows authenticated users (Sunners) to compose and send thank-you/recognition messages (Kudos) to their colleagues. The modal is accessed from the Sun* Kudos Live Board page and includes a rich text editor, recipient search, badge title input, hashtag tagging, image attachments, and an anonymous sending option. This is a core feature of the SAA 2025 recognition system, enabling peer-to-peer appreciation within the organization.

**Target Users**: All authenticated Sunners (Sun* employees)

**Business Context**: Kudos are the primary engagement mechanism for SAA 2025. The Write Kudos modal is the sole entry point for creating new kudos, making it critical for user participation and event engagement metrics.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Send a Basic Kudos (Priority: P1)

A Sunner wants to send a thank-you message to a colleague with a meaningful message, a badge title, and at least one hashtag.

**Why this priority**: This is the core happy path. Without the ability to compose and send a basic kudos, the entire feature has no value. Every other story depends on this foundation.

**Independent Test**: Open modal from Live Board, search and select a recipient, enter a badge title, type a message, add a hashtag, click "Gui" (Send). Verify the kudos appears in the Live Board feed.

**Acceptance Scenarios**:

1. **Given** the user is on the Kudos Live Board and clicks the "Ghi nhan" CTA, **When** the modal opens, **Then** the Write Kudos modal is displayed centered on screen with a dark overlay behind it, showing all form fields empty.

2. **Given** the modal is open and all required fields (Recipient, Badge, Message, Hashtag) are filled, **When** the user clicks "Gui", **Then** the "Gui" button shows a loading spinner and is disabled, the form is submitted, a success toast is displayed, the modal closes, and the new kudos appears at the top of the Live Board feed.

3. **Given** the modal is open, **When** the user clicks "Huy" (Cancel) or clicks outside the modal overlay, **Then** the modal closes without saving any data.

4. **Given** the modal is open and all required fields are filled, **When** the user clicks "Gui" and the server returns an error, **Then** the "Gui" button returns to its default state, an error toast is displayed (e.g., "Gui that bai, vui long thu lai"), and the modal stays open with all form data intact.

---

### User Story 2 - Search and Select Recipient (Priority: P1)

A Sunner wants to find a specific colleague by name to send them a kudos.

**Why this priority**: Selecting the correct recipient is fundamental to sending any kudos. The search/autocomplete UX directly impacts usability.

**Independent Test**: Open modal, type partial name in the "Nguoi nhan" field, verify autocomplete suggestions appear, select one, verify it populates the field.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user types at least 1 character in the "Nguoi nhan" (Recipient) search field, **Then** an autocomplete dropdown appears showing matching Sunner names.

2. **Given** the autocomplete dropdown is visible, **When** the user selects a name, **Then** the recipient field is populated with the selected Sunner's name and the dropdown closes.

3. **Given** the user has not selected a recipient, **When** they click "Gui", **Then** the recipient field shows a red error border and submission is blocked.

4. **Given** the user types a query with no matches, **When** the dropdown appears, **Then** a "No results found" message is displayed.

---

### User Story 3 - Compose Rich Text Message (Priority: P1)

A Sunner wants to format their thank-you message with bold, italic, strikethrough, numbered lists, links, and quotes for expressive communication.

**Why this priority**: The message body is the primary content of a kudos. Rich text formatting enables meaningful, expressive messages.

**Independent Test**: Open modal, use each toolbar button (Bold, Italic, Strikethrough, Numbered List, Link, Quote), verify formatting is applied in the textarea. Also verify keyboard shortcuts work.

**Acceptance Scenarios**:

1. **Given** the editor is focused, **When** the user selects text and clicks Bold (B) or presses Ctrl/Cmd+B, **Then** the selected text becomes bold and the Bold toolbar button shows an active/toggled state.

2. **Given** the editor is focused, **When** the user selects text and clicks Italic (I) or presses Ctrl/Cmd+I, **Then** the selected text becomes italic and the Italic toolbar button shows an active/toggled state.

3. **Given** the editor is focused, **When** the user selects text and clicks Strikethrough (S) or presses Ctrl/Cmd+Shift+S, **Then** the selected text gets a strikethrough style.

4. **Given** the editor is focused, **When** the user clicks the Numbered List button, **Then** a numbered list is created at the cursor position.

5. **Given** the editor is focused, **When** the user clicks the Link button or presses Ctrl/Cmd+K, **Then** a dialog appears to enter a URL, and the link is inserted into the text.

6. **Given** the editor is focused, **When** the user clicks the Quote button, **Then** a blockquote format is applied to the current paragraph.

7. **Given** the editor is empty, **When** the user tries to submit, **Then** the textarea shows an error state and submission is blocked.

8. **Given** a formatting button is active (e.g., Bold is toggled on), **When** the user clicks it again, **Then** the formatting is removed and the button returns to its default state.

---

### User Story 4 - Mention Colleagues with @ (Priority: P2)

A Sunner wants to mention other colleagues in their kudos message using "@" notation to notify them.

**Why this priority**: Mentions enhance engagement by notifying additional colleagues, but kudos can function without them.

**Independent Test**: In the textarea, type "@" followed by characters, verify mention suggestions appear, select one, verify mention is inserted.

**Acceptance Scenarios**:

1. **Given** the user is typing in the textarea, **When** they type "@" followed by at least one character, **Then** a suggestion dropdown appears with matching Sunner names.

2. **Given** the mention dropdown is visible, **When** the user selects a name, **Then** the mention is inserted as a styled tag/link in the text.

---

### User Story 5 - Add Badge Title ("Danh hieu") (Priority: P1)

A Sunner wants to give their colleague a meaningful badge title (e.g., "Nguoi truyen dong luc cho toi") that becomes the kudos headline. This is a **free-text input** field (not a dropdown), allowing creative personalization.

**Why this priority**: The badge title is a required field that serves as the kudos headline, making it essential for every kudos submission.

**Independent Test**: Open modal, type a badge title in the "Danh hieu" field, submit, verify it appears as the kudos title on the Live Board.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user types a badge title in the "Danh hieu" field, **Then** the text is accepted and displayed in the input.

2. **Given** the badge field is empty, **When** the user clicks "Gui", **Then** the field border turns red (#CF1322) and submission is blocked.

3. **Given** the badge field has a placeholder, **When** the user focuses the field, **Then** the placeholder text ("Danh tang mot danh hieu cho dong doi") disappears.

4. **Given** the user is typing a badge title, **When** they reach the maximum character limit (100 characters), **Then** no more characters are accepted and a counter shows "100/100".

---

### User Story 6 - Add Hashtags (Priority: P1)

A Sunner wants to tag their kudos with relevant hashtags for categorization and filtering on the Live Board.

**Why this priority**: Hashtags are required (at least 1) and enable the filtering functionality on the Live Board.

**Independent Test**: Open modal, click "+ Hashtag", select or create hashtags, verify chips appear, verify max 5 limit, submit.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user clicks the "+ Hashtag" button, **Then** a dropdown appears showing available hashtags to select from.

2. **Given** a hashtag is selected, **When** it is added, **Then** a chip/tag appears in the hashtag section showing the hashtag name with an "x" to remove it.

3. **Given** 5 hashtags are already added, **When** the user tries to add another, **Then** the "+ Hashtag" button is hidden or disabled.

4. **Given** a hashtag chip is displayed, **When** the user clicks the "x" on the chip, **Then** the hashtag is removed.

5. **Given** no hashtags are added, **When** the user clicks "Gui", **Then** the hashtag section shows an error state and submission is blocked.

---

### User Story 7 - Attach Images (Priority: P2)

A Sunner wants to attach photos to their kudos for a more visual and personal message.

**Why this priority**: Images enhance kudos quality but are optional. The feature works without them.

**Independent Test**: Click "+ Image", select files, verify thumbnails appear with delete buttons, verify max 5 limit.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user clicks the "+ Image" button, **Then** a file picker opens allowing image selection (accepted formats: JPEG, PNG, GIF, WebP; max file size: 5MB per image).

2. **Given** an image is selected, **When** it is uploading, **Then** a placeholder thumbnail with a loading spinner is shown. **When** the upload completes, **Then** the 80x80px thumbnail appears with a red close button (x) overlay.

3. **Given** 5 images are attached, **When** the user looks at the image section, **Then** the "+ Image" button is hidden.

4. **Given** an image thumbnail is displayed, **When** the user clicks the red "x" button, **Then** the image is removed from the list and the "+ Image" button reappears if it was hidden.

5. **Given** no images are attached, **When** the user submits, **Then** the form submits successfully (images are optional).

6. **Given** the user selects a file that exceeds 5MB or is an unsupported format, **When** the upload is attempted, **Then** an error message is shown (e.g., "Anh khong hop le. Vui long chon anh JPEG, PNG, GIF hoac WebP duoi 5MB") and the file is not attached.

---

### User Story 8 - Send Anonymously (Priority: P2)

A Sunner wants to send a kudos anonymously so the recipient doesn't know who sent it.

**Why this priority**: Anonymous sending is an engagement feature that encourages shy users to participate, but is not required for basic functionality.

**Independent Test**: Open modal, check the "Gui an danh" checkbox, verify anonymous name input appears (if applicable), submit, verify sender is hidden on Live Board.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user checks the "Gui loi cam on va ghi nhan an danh" checkbox, **Then** the anonymous mode is enabled and a text field appears below the checkbox for entering an optional anonymous display name (e.g., "Mot nguoi ban").

2. **Given** anonymous mode is enabled and the anonymous name field is left empty, **When** the user submits the kudos, **Then** the kudos is posted with sender shown as "An danh" (Anonymous) with a generic avatar.

3. **Given** anonymous mode is enabled and the user enters an anonymous name, **When** the user submits, **Then** the kudos is posted with the anonymous display name instead of the sender's real name.

4. **Given** anonymous mode is enabled, **When** the user unchecks the checkbox, **Then** anonymous mode is disabled, the anonymous name field is hidden, and the kudos will show the sender's real name.

---

### User Story 9 - Form Validation (Priority: P1)

The system must validate all required fields before allowing submission.

**Why this priority**: Without validation, users could submit incomplete kudos, degrading the quality of the feed.

**Independent Test**: Try submitting with each required field empty individually and verify each shows an error.

**Acceptance Scenarios**:

1. **Given** the "Nguoi nhan" field is empty, **When** the user clicks "Gui", **Then** the field border turns red and an error message is shown.

2. **Given** the "Danh hieu" field is empty, **When** the user clicks "Gui", **Then** the field shows an error state.

3. **Given** the textarea (message) is empty, **When** the user clicks "Gui", **Then** the textarea shows an error state.

4. **Given** no hashtags are selected, **When** the user clicks "Gui", **Then** the hashtag section shows an error state.

5. **Given** all required fields are filled, **When** the user clicks "Gui", **Then** the form is submitted successfully.

---

### User Story 10 - View Community Standards (Priority: P3)

A Sunner wants to review community standards before posting to ensure their message is appropriate.

**Why this priority**: Nice-to-have feature for content moderation awareness, not blocking core functionality.

**Independent Test**: Click "Tieu chuan cong dong" link in the toolbar, verify it opens community standards content.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user clicks "Tieu chuan cong dong" in the toolbar, **Then** the community standards page/dialog is opened (may open in new tab or as an overlay).

---

### Edge Cases

- **Page refresh while modal is open**: Modal state is lost, user returns to Live Board with no draft saved.
- **Server error on submission**: Show error toast "Gui that bai, vui long thu lai", keep modal open with all data intact, re-enable "Gui" button.
- **Session expiry during composition**: Redirect to login page. Data is lost (no draft persistence). This is documented as Out of Scope.
- **Badge title exceeds limit**: Max 100 characters enforced client-side. Characters beyond limit are not accepted.
- **Message body exceeds limit**: Max 2000 characters (raw text) enforced. Show character counter near hint text.
- **Image too large or wrong format**: Reject with error message. Only JPEG, PNG, GIF, WebP under 5MB accepted.
- **Recipient deactivated between selection and submission**: Server-side validation returns error, show toast "Nguoi nhan khong hop le".
- **Slow network**: "Gui" button shows loading spinner, all form inputs disabled until response. Prevent double submission.
- **User sends kudos to themselves**: Server-side validation should reject. Show error "Khong the gui kudos cho chinh minh".
- **Concurrent image uploads**: Multiple images can upload simultaneously. Each shows its own loading spinner. "Gui" button is disabled while any image is uploading.
- **Network disconnects during image upload**: Show error toast for the failed upload, remove the placeholder thumbnail, other uploaded images remain.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Modal Overlay | Dark semi-transparent backdrop (#00101A @ 80%) | Click to close modal |
| Modal Dialog | Cream-colored form container (752px, #FFF8E1) | Contains all form elements |
| Title | "Gui loi cam on va ghi nhan den dong doi" | Static display |
| Recipient Search (B) | Search dropdown with autocomplete | Type to search, click to select |
| Badge Input (C) | Text input with helper text | Type badge title, required |
| Rich Text Editor (D) | Toolbar + textarea with formatting | Click toolbar buttons, type text, @mentions |
| Hashtag Section (E) | Label + chip group + add button | Click to add/remove hashtags, max 5 |
| Image Section (F) | Label + thumbnails + add button | Click to upload/remove images, max 5 |
| Anonymous Checkbox (G) | Checkbox with label | Toggle anonymous mode |
| Cancel Button (H.1) | "Huy" with X icon | Click to close modal |
| Submit Button (H.2) | "Gui" with send icon, golden background | Click to validate and submit (always enabled, validates on click per FR-010) |

### Navigation Flow

- **From**: Sun* Kudos Live Board (`MaZUn5xHXZ`) - "Ghi nhan" CTA click
- **To (success)**: Sun* Kudos Live Board (modal closes, new kudos in feed)
- **To (cancel)**: Sun* Kudos Live Board (modal closes, no changes)
- **Linked**: Community Standards page (from toolbar link)

### Visual Requirements

- **Responsive breakpoints**: Mobile (< 768px - fullscreen modal), Tablet (768-1023px - 90vw), Desktop (>= 1024px - 752px centered)
- **Animations/Transitions**: Modal open/close with fade + scale (200ms ease-out), overlay fade (200ms)
- **Accessibility**: All form fields must have associated labels, focus management (trap focus within modal), Escape key to close, ARIA role="dialog"
- **Detailed visual specs**: See [design-style.md](design-style.md)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a modal dialog when user clicks "Ghi nhan" CTA on the Kudos Live Board
- **FR-002**: System MUST provide an autocomplete search field for selecting a recipient from all Sunners
- **FR-003**: System MUST provide a text input for entering a badge title ("Danh hieu") that becomes the kudos headline
- **FR-004**: System MUST provide a rich text editor with Bold, Italic, Strikethrough, Numbered List, Link, and Quote formatting
- **FR-005**: System MUST support @mention functionality within the editor to tag other Sunners
- **FR-006**: System MUST allow adding 1-5 hashtags via a dropdown selector
- **FR-007**: System MUST allow attaching 0-5 images with preview thumbnails and delete capability
- **FR-008**: System MUST provide an anonymous sending option via checkbox
- **FR-009**: System MUST validate all required fields (Recipient, Badge, Message, Hashtag >= 1) before submission
- **FR-010**: System MUST validate on submit: when user clicks "Gui" with empty required fields, show field-level error states and block submission. The "Gui" button remains visually enabled (golden #FFEA9E) at all times except during submission loading and when images are uploading — this matches the Figma design where the button appears active by default
- **FR-011**: System MUST close the modal on successful submission and refresh the kudos feed
- **FR-012**: System MUST close the modal without saving when "Huy" is clicked or overlay is clicked
- **FR-013**: System MUST display a link to "Tieu chuan cong dong" (Community Standards) in the editor toolbar

### Technical Requirements

- **TR-001**: Rich text editor must support HTML output compatible with server storage and feed rendering. Recommended library: TipTap or similar lightweight editor compatible with Cloudflare Workers runtime.
- **TR-002**: Image uploads must be limited to JPEG, PNG, GIF, WebP formats with a maximum file size of 5MB per image. Images should be uploaded individually via `/api/upload/image` and the returned URL stored in the form state.
- **TR-003**: Recipient search must debounce API calls (300ms minimum) to avoid excessive server requests. The autocomplete should support keyboard navigation (arrow keys + Enter to select).
- **TR-004**: Modal must trap focus for accessibility (tabbing stays within modal, Escape closes). Must use ARIA attributes: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title element.
- **TR-005**: Form state must be managed locally via React useState/useReducer (no global state needed for draft). The "Gui" button must be disabled during submission to prevent double-submit.
- **TR-006**: All user input must be sanitized server-side before storage (XSS prevention per OWASP). Rich text HTML must be sanitized to allow only safe tags (b, i, s, ol, li, a, blockquote).
- **TR-007**: Keyboard shortcuts must be supported for the rich text editor: Ctrl/Cmd+B (bold), Ctrl/Cmd+I (italic), Ctrl/Cmd+Shift+S (strikethrough), Ctrl/Cmd+K (insert link).

### Key Entities *(data involved)*

- **Kudo**: The main entity
  - `sender_id` (UUID, required) - auto-filled from authenticated user
  - `recipient_id` (UUID, required) - selected via search
  - `badge_title` (string, required, max 100 chars) - free text kudos headline
  - `message` (HTML string, required, max 2000 chars raw text) - rich text body
  - `hashtag_ids` (UUID[], required, 1-5 items) - selected from predefined list
  - `image_urls` (string[], optional, 0-5 items) - uploaded image URLs
  - `is_anonymous` (boolean, default: false) - anonymous sending flag
  - `anonymous_name` (string, optional, max 50 chars) - custom anonymous display name
  - `mentioned_user_ids` (UUID[], optional) - users @mentioned in message
  - `created_at` (timestamp) - auto-generated

- **Sunner (User)**: Referenced by recipient search and @mentions
  - `id`, `name`, `avatar_url`, `department`, `position`, `star_count`

- **Hashtag**: Predefined tags for categorization
  - `id`, `name`, `usage_count`

- **Image Attachment**: Uploaded files
  - `url` (string) - full-size image URL
  - `thumbnail_url` (string) - 80x80 thumbnail URL
  - `file_name`, `file_size`, `mime_type`

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/kudos | POST | Submit new kudos (recipient, badge, message, hashtags, images, anonymous) | Predicted (New) |
| /api/users/search | GET | Autocomplete search for recipients and @mentions (query param: `q`, debounced 300ms) | Predicted (New) |
| /api/hashtags | GET | List available hashtags for selection dropdown | Predicted (New) |
| /api/upload/image | POST | Upload image attachment (multipart/form-data, max 5MB), returns URL | Predicted (New) |

---

## State Management

### Local Component State (React useState/useReducer)

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| `isOpen` | boolean | false | Controls modal visibility |
| `recipient` | User \| null | null | Selected recipient |
| `badgeTitle` | string | "" | Badge title text (max 100 chars) |
| `messageContent` | string (HTML) | "" | Rich text editor content |
| `hashtags` | string[] | [] | Selected hashtags (1-5) |
| `images` | ImageAttachment[] | [] | Uploaded image objects (0-5) |
| `isAnonymous` | boolean | false | Anonymous mode toggle |
| `anonymousName` | string | "" | Optional anonymous display name |
| `isSubmitting` | boolean | false | Submission loading state |
| `errors` | Record<string, string> | {} | Field-level validation errors |
| `recipientQuery` | string | "" | Current search query for recipient autocomplete |
| `uploadingImages` | number | 0 | Count of images currently uploading |

### Loading States

| State | UI Behavior |
|-------|-------------|
| Modal opening | Fade-in overlay + scale-up modal (200ms ease-out) |
| Recipient search | Show spinner in dropdown while fetching results |
| Hashtag list loading | Show skeleton in dropdown while fetching |
| Image uploading | Show placeholder thumbnail with spinner |
| Form submitting | "Gui" button shows spinner, all inputs disabled |
| Modal closing | Fade-out overlay + scale-down modal (200ms ease-out) |

### Error States

| Error | UI Behavior |
|-------|-------------|
| Required field empty on submit | Border turns red (#CF1322), field-level error message below field |
| Recipient search fails | Show "Khong the tai du lieu" with retry link in dropdown |
| Image upload fails | Show error toast, remove failed thumbnail placeholder |
| Form submission fails | Show error toast "Gui that bai, vui long thu lai", keep modal open with data intact |
| Session expired during composition | Redirect to login (data is lost) |

### Global State

No global state is needed for this modal. The modal's open/close state is managed by the parent component (Kudos Live Board). After successful submission, the parent should refresh the kudos feed.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully create and submit a kudos within 60 seconds (average time-to-complete)
- **SC-002**: Form validation prevents 100% of invalid submissions (no empty required fields reach the server)
- **SC-003**: Modal loads and is interactive within 500ms of CTA click
- **SC-004**: All form elements are accessible via keyboard navigation
- **SC-005**: Modal is fully usable on mobile, tablet, and desktop viewports

---

## Out of Scope

- Kudos editing (users cannot edit after submission)
- Kudos deletion (managed by admin, not from this modal)
- Draft saving (form state is lost on modal close)
- Recipient multi-select (only one recipient per kudos)
- Hashtag creation (users select from predefined list only)
- Image cropping or editing within the modal
- Real-time collaboration (only one user composes at a time)
- Push notifications for @mentions (handled by separate notification system)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Parent screen spec exists (`.momorph/specs/MaZUn5xHXZ-Sun-Kudos-Live-board/spec.md`)

---

## Notes

- The modal component ID in Figma is `520:10673` (componentId for the "Viet KUDO" instance)
- The "Danh hieu" (Badge Title) field is a new addition not present in earlier designs - it acts as the kudos headline
- The "Tieu chuan cong dong" (Community Standards) link in the toolbar is red (#E46060) to draw attention to content guidelines
- Toolbar and textarea share a connected border design (toolbar has top-rounded corners, textarea has bottom-rounded corners) - they should appear as a single unified editor component
- All font weights in the design are 700 (bold) - this is consistent across the entire SAA 2025 design system using Montserrat
- The modal background color (#FFF8E1) is a warm cream that contrasts with the dark page background (#00101A), creating a focused writing experience
