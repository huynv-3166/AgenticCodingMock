# Tasks: Write Kudos (Viet Kudo)

**Frame**: `ihQ26W78P2-Viet-Kudos`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, etc.)
- **|**: File path affected by this task

---

## Phase 1: Setup

**Purpose**: Install dependencies and initialize project structure for the Write Kudos feature.

- [x] T001 Install TipTap packages via `yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-mention @tiptap/extension-placeholder @tiptap/extension-character-count` | package.json
- [x] T002 Create barrel export file for write kudos components | src/components/kudos/write/index.ts

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Types, schemas, utilities, i18n keys, and API endpoints required by ALL user stories.

**CRITICAL**: No user story frontend work can begin until this phase is complete.

### Types & Schemas

- [x] T003 [P] Add `CreateKudoPayload`, `CreateKudoResponse`, `UserSearchResult`, `WriteKudoFormState` types | src/types/kudos.ts
- [x] T004 [P] Add `createKudoSchema` (POST /api/kudos body validation: recipient_id UUID, badge_title max 100, message required, hashtag_ids 1-5, image_urls 0-5, is_anonymous boolean, anonymous_name max 50) | src/libs/validations/kudos.ts
- [x] T005 [P] Add `userSearchSchema` (GET /api/users/search: query string min 1 char, max 100) | src/libs/validations/kudos.ts
- [x] T006 [P] Add `imageUploadSchema` (file type JPEG/PNG/GIF/WebP, max 5MB) | src/libs/validations/kudos.ts

### Utilities

- [x] T007 [P] Create custom HTML sanitizer `sanitizeKudoHtml(html: string): string` — allowlist 8 tags (b, i, s, ol, li, a, blockquote, p, br), preserve only `href` on `<a>`, strip everything else. Include XSS test vectors in comments | src/libs/utils/sanitize.ts
- [x] T008 [P] Create Supabase Storage helper for authenticated image upload to `kudo-images/{user_id}/{timestamp}-{filename}` bucket. Export `uploadKudoImage(file: File): Promise<{ url: string }>` | src/libs/supabase/storage.ts

### i18n

- [x] T009 [P] Add ~20 Vietnamese dictionary keys for Write Kudos modal (`write_kudo_title`, `write_kudo_recipient_label`, `write_kudo_recipient_placeholder`, `write_kudo_badge_label`, `write_kudo_badge_placeholder`, `write_kudo_badge_helper`, `write_kudo_editor_placeholder`, `write_kudo_editor_hint`, `write_kudo_community_standards`, `write_kudo_hashtag_label`, `write_kudo_hashtag_max`, `write_kudo_image_label`, `write_kudo_image_max`, `write_kudo_anonymous_label`, `write_kudo_cancel`, `write_kudo_submit`, `write_kudo_success`, `write_kudo_error`, `write_kudo_no_results`, `write_kudo_uploading`) | src/libs/i18n/dictionaries/vi.json
- [x] T010 [P] Add matching English dictionary keys for Write Kudos modal | src/libs/i18n/dictionaries/en.json
- [x] T011 [P] Add matching Japanese dictionary keys for Write Kudos modal | src/libs/i18n/dictionaries/ja.json

### API Endpoints

- [x] T012 Add POST handler to existing kudos route — auth check, Zod validation (`createKudoSchema`), call `sanitizeKudoHtml()` on message, self-send rejection (sender_id !== recipient_id → 400), sequential insert into `kudos` → `kudo_hashtags` → `kudo_images` (with `display_order` = array index) with manual rollback on failure, return created `Kudo` object | src/app/api/kudos/route.ts
- [x] T013 [P] Create GET `/api/users/search` endpoint — auth check, Zod validation (`userSearchSchema`), search `user_profiles` by name (ilike `%q%`), exclude current user, return array of `UserSearchResult` (user_id, name, avatar_url, department). If `name` column unavailable, fallback to `auth.users` metadata via `raw_user_meta_data->>'full_name'` | src/app/api/users/search/route.ts
- [x] T014 [P] Create POST `/api/kudos/upload` endpoint — auth check, validate file type/size (imageUploadSchema), upload to Supabase Storage via `uploadKudoImage()`, return `{ url, thumbnail_url }` | src/app/api/kudos/upload/route.ts

**Checkpoint**: Foundation ready — all APIs testable via curl/Postman, types/schemas available for frontend.

---

## Phase 3: US1 + US9 — Send Basic Kudos + Form Validation (P1) MVP

**Goal**: A user can open the Write Kudos modal, fill all required fields, submit, and see the kudo in the feed. Validation blocks incomplete submissions.

**Independent Test**: Click "Ghi nhan" CTA on Live Board → modal opens → fill recipient, badge, message, hashtag → click "Gui" → success toast → modal closes → new kudo at top of feed. Also: click "Gui" with empty fields → all 4 fields show red error borders.

### Shared UI

- [x] T015 [P] [US1] Create `Toast.tsx` — simple auto-dismiss notification (success/error variants), fixed bottom-center, auto-dismiss 3s, React portal, fadeIn/fadeOut CSS animation. Props: `message: string`, `type: 'success' | 'error'`, `onDismiss: () => void` | src/components/shared/Toast.tsx

### Modal Container

- [x] T016 [US1] Create `WriteKudoModal.tsx` — modal overlay (fixed inset-0, bg `#00101A/80`, z-50) + dialog container (752px, `#FFF8E1`, rounded-3xl, max-h `min(1012px,90vh)`, overflow-y-auto, p-10, gap-8 flex-col). Implement: focus trap via keydown cycling first/last focusable, Escape to close, click overlay to close. ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="write-kudo-title"`. Title: centered h2 "Gui loi cam on va ghi nhan den dong doi" (Montserrat 32px/40px bold #00101A). Props: `isOpen`, `onClose`, `onSuccess(kudo)`, `dictionary` | src/components/kudos/write/WriteKudoModal.tsx
- [x] T017 [US1] Implement form state with `useReducer` inside WriteKudoModal — 12 fields: `recipient`, `badgeTitle`, `messageContent`, `hashtags`, `images`, `isAnonymous`, `anonymousName`, `isSubmitting`, `errors`, `recipientQuery`, `uploadingImages`. Actions: SET_FIELD, SET_ERROR, CLEAR_ERRORS, SET_SUBMITTING, RESET | src/components/kudos/write/WriteKudoModal.tsx
- [x] T018 [US1] Implement validation-on-submit in WriteKudoModal (FR-010) — on "Gui" click: validate recipient (not null), badgeTitle (not empty), messageContent (not empty HTML), hashtags (length >= 1). Set field-level errors with border #CF1322. "Gui" button stays golden (#FFEA9E), validates on click. Only call POST /api/kudos if all valid | src/components/kudos/write/WriteKudoModal.tsx
- [x] T019 [US1] Implement action buttons in WriteKudoModal — "Huy" (Cancel): icon X + text, padding 16px 40px, border 1px #998C5F, radius 4px, bg rgba(255,234,158,0.10). "Gui" (Submit): flex-1, h-60px, bg #FFEA9E, radius 8px, Montserrat 22px bold, send icon. Submit shows loading spinner during API call, disabled while `uploadingImages > 0` | src/components/kudos/write/WriteKudoModal.tsx
- [x] T020 [US1] Implement submit handler — POST to `/api/kudos` with `CreateKudoPayload`, on success: show success toast, call `onSuccess(kudo)`, close modal. On error: show error toast, keep modal open with data intact, re-enable button | src/components/kudos/write/WriteKudoModal.tsx

### Parent Integration

- [x] T021 [US1] Modify `KudosPageClient.tsx` — add `isModalOpen` state, `onOpenModal` callback, `onKudoCreated` callback. Pass `onOpenModal` to KudosHero, pass `onKudoCreated` to WriteKudoModal. Use `next/dynamic` with `ssr: false` to import WriteKudoModal (keeps TipTap out of server bundle). Pass dictionary props for i18n | src/components/kudos/KudosPageClient.tsx
- [x] T022 [US1] Modify `KudosHero.tsx` — accept `onOpenModal` prop, wire the existing "Ghi nhan" CTA button (line ~57) to call `onOpenModal()` on click | src/components/kudos/KudosHero.tsx
- [x] T023 [US1] Modify `KudoFeed.tsx` — expose `resetFeed()` via `useImperativeHandle` + `forwardRef`. `resetFeed()` clears kudos array, resets cursor to null, refetches first page from GET /api/kudos. Parent calls this after successful kudo creation | src/components/kudos/KudoFeed.tsx
- [x] T024 [US1] Wire feed refresh in `KudosPageClient.tsx` — create ref for KudoFeed, in `onKudoCreated` callback call `kudoFeedRef.current?.resetFeed()` to show new kudo at top | src/components/kudos/KudosPageClient.tsx

**Checkpoint**: US1+US9 complete — modal opens, validates, submits, feed refreshes. MVP is functional.

---

## Phase 4: US2 — Search and Select Recipient (P1)

**Goal**: User can search for a colleague by name in the "Nguoi nhan" field with autocomplete and select them.

**Independent Test**: Open modal → type "Ngu" in recipient field → dropdown shows matching names with avatars → select one → field populated → submit succeeds. Type gibberish → "No results found" shown.

- [x] T025 [US2] Create `RecipientSearch.tsx` — label "Nguoi nhan" (Montserrat 22px bold #00101A) with red asterisk (#CF1322). Input: flex-1, h-56px, padding 16px 24px, border 1px #998C5F, radius 8px, bg white, placeholder "Tim kiem" (#999), dropdown arrow icon (24px). Implement 300ms debounced fetch to `/api/users/search?q=`. Dropdown below input showing user name + avatar + department. Keyboard nav: arrow up/down to highlight, Enter to select, Escape to close dropdown. Empty state: "No results found". Error state: red border #CF1322 on submit when empty. Props: `value: UserSearchResult | null`, `onChange(user)`, `error?: string`, `dictionary` | src/components/kudos/write/RecipientSearch.tsx
- [x] T026 [US2] Integrate RecipientSearch into WriteKudoModal — render between title and badge input. Wire `value` to `state.recipient`, `onChange` dispatches SET_FIELD('recipient'), `error` from `state.errors.recipient` | src/components/kudos/write/WriteKudoModal.tsx

**Checkpoint**: US2 complete — recipient search works with autocomplete, keyboard nav, and error states.

---

## Phase 5: US5 + US3 — Badge Title + Rich Text Editor (P1)

**Goal**: User can enter a custom badge title and compose a formatted message with toolbar.

**Independent Test**: Type badge title → counter shows chars → type message → use Bold/Italic/Link → formatting applied → keyboard shortcuts work (Ctrl+B, Ctrl+I). Leave editor empty → error border on submit.

### Badge Input

- [x] T027 [P] [US5] Create `BadgeInput.tsx` — label "Danh hieu" (Montserrat 22px bold #00101A) with red asterisk. Input: flex-1, h-56px, padding 16px 24px, border 1px #998C5F, radius 8px, bg white, placeholder "Danh tang mot danh hieu cho dong doi" (#999). Max 100 chars enforced via `maxLength`, counter "N/100" shown when typing. Helper text below: "Vi du: Nguoi truyen dong luc cho toi. Danh hieu se hien thi lam tieu de Kudos cua ban." (Montserrat 16px #999). Error state: red border #CF1322. Props: `value`, `onChange`, `error?`, `dictionary` | src/components/kudos/write/BadgeInput.tsx

### Rich Text Editor

- [x] T028 [P] [US3] Create `EditorToolbar.tsx` — flex row, h-40px. 6 icon buttons (Bold/Italic/Strike/NumberedList/Link/Quote) + Community Standards link. Shared button style: h-40px, padding 10px 16px, border 1px #998C5F, bg transparent, icon 24px. First button: border-radius 8px 0 0 0. Last (Community Std): border-radius 0 8px 0 0, flex-1, text-right, color #E46060, "Tieu chuan cong dong". Toggle states: active bg rgba(153,140,95,0.2). Props: `editor: Editor` (TipTap instance) | src/components/kudos/write/EditorToolbar.tsx
- [x] T029 [P] [US3] Create `KudoEditor.tsx` — TipTap editor wrapper. Configure extensions: StarterKit (bold, italic, strike, orderedList, blockquote, history), Link (openOnClick: false), Placeholder ("Hay gui gam loi cam on va ghi nhan den dong doi tai day nhe!"), CharacterCount (limit: 2000). Editor area: w-full, h-200px, min-h-120px, padding 16px 24px, border 1px #998C5F, border-radius 0 0 8px 8px (bottom only — connects to toolbar), bg white, font Montserrat 16px. Output HTML to `onUpdate` callback. Error state: border #CF1322. Hint text below: "Ban co the @ + ten de nhac toi dong nghiep khac" (Montserrat 16px bold #00101A tracking 0.5px). Props: `content`, `onUpdate(html)`, `error?`, `dictionary` | src/components/kudos/write/KudoEditor.tsx
- [x] T030 [US3] Integrate BadgeInput, EditorToolbar, and KudoEditor into WriteKudoModal — BadgeInput after RecipientSearch. Toolbar+Editor as connected unit (toolbar top, editor bottom, gap-0 with 4px gap to hint). Wire values/onChange to form reducer. Wire errors from `state.errors` | src/components/kudos/write/WriteKudoModal.tsx

**Checkpoint**: US5+US3 complete — badge input with counter, rich text editor with toolbar, keyboard shortcuts, connected border design.

---

## Phase 6: US6 — Add Hashtags (P1)

**Goal**: User can add 1-5 hashtags from a dropdown, see chips, and remove them.

**Independent Test**: Click "+ Hashtag" → dropdown shows available hashtags → select one → chip appears → select 4 more → button hides at 5 → click "x" on chip → removed, button reappears. Submit with 0 hashtags → error state.

- [x] T031 [P] [US6] Create `HashtagChip.tsx` — pill shape: h-32px, padding 4px 12px, bg rgba(153,140,95,0.15), border 1px #998C5F, radius 16px, font Montserrat 14px bold #00101A. Close icon: 16px "x", color #999, gap 4px from text. Props: `name: string`, `onRemove()` | src/components/kudos/write/HashtagChip.tsx
- [x] T032 [P] [US6] Create `HashtagSelector.tsx` — label "Hashtag" (Montserrat 22px bold #00101A) with red asterisk. Tag group area: flex row, gap 8px. "+ Hashtag" button: h-48px, padding 4px 8px, border 1px #998C5F, radius 8px, bg white, plus icon 24px, text "Hashtag / Toi da 5" (11px #999). Click opens dropdown fetching from existing `/api/hashtags`. Selected hashtags render as HashtagChip. Hide button when 5 selected. Error state when 0 on submit. Props: `selected: string[]`, `onChange(hashtags)`, `error?`, `dictionary` | src/components/kudos/write/HashtagSelector.tsx
- [x] T033 [US6] Integrate HashtagSelector into WriteKudoModal — render inside content section after editor hint. Wire to `state.hashtags` and `state.errors.hashtags` | src/components/kudos/write/WriteKudoModal.tsx

**Checkpoint**: US6 complete — hashtag selection with chips, max 5 limit, error on empty.

---

## Phase 7: US7 — Attach Images (P2)

**Goal**: User can attach 0-5 images with upload progress, thumbnails, and delete.

**Independent Test**: Click "+ Image" → file picker → select JPEG → spinner during upload → thumbnail appears with red "x" → upload 5 → button hides → click "x" → removed, button reappears. Select 10MB file → error toast.

- [x] T034 [P] [US7] Create `ImageUploadThumbnail.tsx` — 80x80px, border 1px #998C5F, radius 18px, object-fit cover, relative positioning. Close button: absolute top-right (-4px), 20x20px, bg #D4271D, rounded-full, white X icon 17px. Loading state: same dimensions with centered spinner, bg #f0f0f0. Props: `url: string | null` (null = loading), `onRemove()` | src/components/kudos/write/ImageUploadThumbnail.tsx
- [x] T035 [P] [US7] Create `ImageUploader.tsx` — label "Image" (Montserrat 22px bold #00101A, NO asterisk — optional). Flex row, gap 16px, items-center. Render ImageUploadThumbnail for each image. "+ Image / Toi da 5" button: h-48px, padding 4px 8px, border 1px #998C5F, radius 8px, bg white, plus icon, text 11px #999. Hidden `<input type="file" accept="image/jpeg,image/png,image/gif,image/webp">`. On file select: validate size (<=5MB) and type, show error toast if invalid. Upload via POST `/api/kudos/upload`, show spinner during upload, add URL to state on success. Hide button when 5 images. Props: `images: ImageAttachment[]`, `uploadingCount: number`, `onAdd(attachment)`, `onRemove(index)`, `onUploadStart()`, `onUploadEnd()`, `dictionary` | src/components/kudos/write/ImageUploader.tsx
- [x] T036 [US7] Integrate ImageUploader into WriteKudoModal — render inside content section after HashtagSelector. Wire to `state.images` and `state.uploadingImages`. Dispatch `onUploadStart`/`onUploadEnd` to track upload count. "Gui" button disabled when `uploadingImages > 0` | src/components/kudos/write/WriteKudoModal.tsx

**Checkpoint**: US7 complete — image upload with progress, thumbnails, delete, max 5, file validation.

---

## Phase 8: US4 + US8 — @Mentions + Anonymous Sending (P2)

**Goal**: User can @mention colleagues in the editor and optionally send anonymously.

**Independent Test**: Type "@Ngu" in editor → suggestion dropdown → select → mention tag inserted. Check "Gui an danh" checkbox → anonymous name field appears → submit → sender shown as "An danh" on feed.

### @Mentions

- [x] T037 [US4] Configure TipTap Mention extension in KudoEditor — trigger on "@" + 1 char, suggestion popup reuses `/api/users/search` endpoint (same as RecipientSearch), render dropdown with user name + avatar, on select insert styled mention node. Extract `mentioned_user_ids` from editor content for form state | src/components/kudos/write/KudoEditor.tsx

### Anonymous Toggle

- [x] T038 [P] [US8] Create `AnonymousToggle.tsx` — flex row, gap 16px, items-center. Checkbox: 24x24px, border 1px #999, radius 4px, bg white. Checked state: bg #FFEA9E, border #998C5F, checkmark icon #00101A. Label: "Gui loi cam on va ghi nhan an danh" (Montserrat 22px bold #999). When checked: reveal text input below for optional anonymous display name (max 50 chars, placeholder "e.g. Mot nguoi ban"). Props: `isAnonymous`, `anonymousName`, `onToggle()`, `onNameChange(name)`, `dictionary` | src/components/kudos/write/AnonymousToggle.tsx
- [x] T039 [US8] Integrate AnonymousToggle into WriteKudoModal — render between content section and action buttons. Wire `isAnonymous` and `anonymousName` to form state. Include `is_anonymous` and `anonymous_name` in POST payload | src/components/kudos/write/WriteKudoModal.tsx

**Checkpoint**: US4+US8 complete — @mentions work in editor, anonymous toggle reveals name field.

---

## Phase 9: US10 + Polish & Cross-Cutting Concerns

**Purpose**: Community Standards link, responsive behavior, accessibility, and animations.

### Community Standards (US10)

- [x] T040 [US10] Wire "Tieu chuan cong dong" button in EditorToolbar to open community standards page in new tab (`window.open`) | src/components/kudos/write/EditorToolbar.tsx

### Responsive

- [x] T041 [P] Add responsive styles to WriteKudoModal — Mobile (<768px): w-full, rounded-none (fullscreen), p-6. Field layout (B,C): flex-col (label on top). Image thumbnails: 64x64. Action buttons: flex-col-reverse (Submit first, full width). Title: text-2xl. Tablet (768-1023px): w-[90vw] max-w-[752px], p-8. Desktop (>=1024px): w-[752px] as designed | src/components/kudos/write/WriteKudoModal.tsx

### Accessibility

- [x] T042 [P] Audit and fix accessibility across all Write Kudos components — verify focus trap cycles correctly, all inputs have `<label>` with `htmlFor`, all icon buttons have `aria-label`, Escape key closes modal from any focused element, Tab key navigates logically through form fields, screen reader announces modal title on open | src/components/kudos/write/*.tsx

### Animation

- [x] T043 [P] Add modal open/close animations — overlay: opacity 0→1 (200ms ease-out). Dialog: opacity 0→1 + scale 0.95→1 (200ms ease-out). Close: reverse. Use Tailwind `transition` + conditional classes or CSS keyframes | src/components/kudos/write/WriteKudoModal.tsx

### Barrel Export

- [x] T044 Update barrel export with all components | src/components/kudos/write/index.ts

**Checkpoint**: All user stories complete, responsive, accessible, animated.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1+US9 MVP)
                                               │
                                               ├──→ Phase 4 (US2)
                                               ├──→ Phase 5 (US5+US3)
                                               ├──→ Phase 6 (US6)
                                               │         │
                                               │         ├──→ Phase 7 (US7)
                                               │         └──→ Phase 8 (US4+US8)
                                               │
                                               └──→ Phase 9 (Polish)
```

- **Phase 1**: No dependencies — start immediately
- **Phase 2**: Depends on Phase 1 — BLOCKS all frontend work
- **Phase 3 (MVP)**: Depends on Phase 2 — first testable increment
- **Phases 4, 5, 6**: Depend on Phase 3 (need modal shell). Can run in parallel with each other
- **Phase 7**: Depends on Phase 6 (renders after hashtags in the modal layout)
- **Phase 8**: Depends on Phase 5 (mentions need editor to be built first)
- **Phase 9**: Depends on all phases — polish pass

### Within Each Phase

- Tasks marked [P] can run in parallel (different files)
- Integration tasks (unmarked) must run after their component tasks
- Always: create component → integrate into parent

### Parallel Opportunities Per Phase

| Phase | Parallel Tasks | Sequential Tasks |
|-------|---------------|-----------------|
| Phase 2 | T003-T011 (all [P]) | T012-T014 (APIs, after schemas) |
| Phase 3 | T015 (Toast) | T016→T017→T018→T019→T020→T021→T022→T023→T024 |
| Phase 4 | — | T025→T026 |
| Phase 5 | T027, T028, T029 (all [P]) | T030 (integration) |
| Phase 6 | T031, T032 (both [P]) | T033 (integration) |
| Phase 7 | T034, T035 (both [P]) | T036 (integration) |
| Phase 8 | T038 ([P]) | T037, T039 (sequential) |
| Phase 9 | T040, T041, T042, T043 (all [P]) | T044 |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2 (Setup + Foundation)
2. Complete Phase 3 (US1+US9 — Modal + Validation + Submit)
3. **STOP and VALIDATE**: Open modal, fill fields, submit, verify kudo in feed
4. Proceed to Phase 4-6 (Recipient Search, Badge+Editor, Hashtags)

### Incremental Delivery

1. Phase 1+2 → Foundation ready
2. Phase 3 → **MVP**: Modal opens, validates, submits, feed refreshes
3. Phase 4 → Recipient autocomplete works
4. Phase 5 → Badge input + rich text editor with toolbar
5. Phase 6 → Hashtag selection with chips
6. Phase 7 → Image upload with thumbnails
7. Phase 8 → @Mentions + anonymous sending
8. Phase 9 → Polish, responsive, accessibility, animations

---

## Notes

- Each task description includes enough detail (component props, CSS values, behavior) for an LLM to implement without reading design-style.md again
- Commit after completing each phase checkpoint
- Run `yarn lint` before each commit
- Use `next/dynamic` with `ssr: false` for WriteKudoModal import (T021) to keep TipTap out of server bundle
- The existing "Ghi nhan" CTA in KudosHero.tsx (line ~57) is currently a no-op — T022 wires it
- The existing `/api/hashtags` GET endpoint is reused — no new endpoint needed for hashtag list
