# Implementation Plan: Write Kudos (Viet Kudo)

**Frame**: `ihQ26W78P2-Viet-Kudos`
**Date**: 2026-04-15
**Spec**: `specs/ihQ26W78P2-Viet-Kudos/spec.md`

---

## Summary

Build a modal dialog for composing and sending kudos within the SAA 2025 platform. The modal includes a recipient search (autocomplete), badge title input, rich text editor (TipTap), hashtag selector, image uploads (Supabase Storage), and anonymous sending option. This is the first **write** feature in a codebase that has been read-only until now — it introduces POST APIs, file uploads, rich text editing, and a complex form with validation.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router) + React 19
**Primary Dependencies**: React, TailwindCSS 4, Supabase (Auth, DB, Storage), Zod, **TipTap (new)**
**Database**: Supabase PostgreSQL (existing tables: `kudos`, `kudo_hashtags`, `kudo_images`, `user_profiles`, `hashtags`, `departments`)
**Testing**: Vitest (unit), Playwright (E2E)
**State Management**: React hooks (useState/useReducer) — no external library
**API Style**: REST (Next.js API Routes)
**Deployment**: Cloudflare Workers via OpenNext (`nodejs_compat` flag enabled in wrangler.jsonc — some Node.js APIs polyfilled, but constitution still prefers Web Standard APIs)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **Follows project coding conventions** — TypeScript strict, named exports, path aliases (`@/*`), files < 200 lines
- [x] **Uses approved libraries** — Next.js, React, TailwindCSS, Supabase, Zod are all approved. **TipTap requires justification** (see below)
- [x] **Adheres to folder structure** — `src/components/kudos/`, `src/app/api/`, `src/libs/`, `src/types/`
- [x] **Meets security requirements** — Server-side validation (Zod), HTML sanitization, Supabase RLS, OWASP compliance
- [x] **Follows testing standards** — TDD cycle, unit + integration + E2E planned
- [x] **Responsive design** — Mobile-first with md/lg breakpoints
- [x] **Cloudflare Workers compatible** — TipTap runs client-side only, no Node.js APIs on server

**New Library Justification:**

| Library | Version | Justification | Alternative Rejected |
|---------|---------|---------------|---------------------|
| `@tiptap/react` | ^2.x | Rich text editor required by spec (Bold, Italic, Strikethrough, Lists, Links, Quotes, @mentions). No existing editor in codebase. TipTap is lightweight, headless (no UI — we build our own), React 19 compatible, and runs entirely client-side (Cloudflare safe). | Quill: heavier, opinionated UI. Draft.js: deprecated. Slate: lower-level, more work. Plain textarea: cannot support formatting. |
| `@tiptap/starter-kit` | ^2.x | Bundle of core TipTap extensions (bold, italic, strike, lists, blockquote, etc.) | Installing extensions individually: more maintenance overhead for same result |
| `@tiptap/extension-link` | ^2.x | Link insertion support for the editor toolbar | N/A — core requirement |
| `@tiptap/extension-mention` | ^2.x | @mention functionality with autocomplete popup | Custom implementation: complex and error-prone |
| `@tiptap/extension-placeholder` | ^2.x | Placeholder text in empty editor | CSS-only: fragile across editor updates |
| `@tiptap/extension-character-count` | ^2.x | Character count for message body (max 2000) | Manual counting: doesn't account for HTML vs raw text |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — all Write Kudos components in `src/components/kudos/write/`
- **Styling Strategy**: Tailwind utility classes with design tokens from `design-style.md`. Colors use `#hex` values directly (consistent with existing components like `KudoCard`, `KudosHero`)
- **Data Fetching**: Client-side `fetch()` calls from the modal (it's a `"use client"` component). No server components — the modal is triggered by user interaction
- **Modal Pattern**: Custom-built with **fixed positioning** + manual focus trap (consistent with existing `ImageThumbnail` lightbox pattern). `<dialog>` element rejected — its imperative API (`showModal()`/`close()`) conflicts with React's declarative state management, and existing codebase precedent uses fixed positioning. Focus trap implemented via `keydown` event listener cycling between first/last focusable elements
- **Rich Text Editor**: TipTap (headless) with custom toolbar matching the Figma design. Runs entirely client-side
- **Form State**: `useReducer` for the complex form (12 state fields per spec). Validation via Zod on both client submit and server API

### Backend Approach

- **API Design**: RESTful endpoints following existing pattern (`src/app/api/`). Auth check via `supabase.auth.getUser()` in every route
- **Data Access**: Direct Supabase client queries (consistent with existing API routes — no repository pattern)
- **Validation**: Zod schemas in `src/libs/validations/kudos.ts` (extend existing file)
- **Image Storage**: Supabase Storage bucket `kudo-images` with authenticated upload. Images uploaded individually, URLs stored in DB
- **HTML Sanitization**: Server-side via **custom zero-dependency sanitizer** (`src/libs/utils/sanitize.ts`). The allowlist is tiny (8 tags: `b`, `i`, `s`, `ol`, `li`, `a`, `blockquote`, `p`, `br` + only `href` on `<a>`), making a regex-based strip both safe and simple. No external library needed — `dompurify` rejected (needs DOM), `sanitize-html` rejected (needs Node.js `Stream`). The custom function strips all tags not in the allowlist, strips all attributes except `href` on `<a>`, and escapes any remaining dangerous content. ~30 lines of code, zero dependencies, runs anywhere

### Integration Points

- **Existing Services**: Supabase Auth (session), Supabase DB (kudos/hashtags/images tables), existing `/api/hashtags` endpoint
- **Shared Components**: `HashtagTag` (adapt for removable chips), icon components in `src/components/shared/icons/`
- **Parent Component**: `KudosPageClient.tsx` — will manage modal open/close state and trigger feed refresh after submission
- **i18n**: Add new dictionary keys to `vi.json`, `en.json`, `ja.json` for modal UI text

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/ihQ26W78P2-Viet-Kudos/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
src/
├── components/kudos/write/           # NEW — Write Kudos feature components
│   ├── WriteKudoModal.tsx            # Modal container (overlay + dialog + form state)
│   ├── RecipientSearch.tsx           # Autocomplete search for "Nguoi nhan"
│   ├── BadgeInput.tsx                # Free-text "Danh hieu" input with char counter
│   ├── KudoEditor.tsx                # TipTap rich text editor wrapper
│   ├── EditorToolbar.tsx             # Formatting toolbar (B/I/S/List/Link/Quote/CommunityStd)
│   ├── HashtagSelector.tsx           # Hashtag dropdown + chip display
│   ├── HashtagChip.tsx               # Individual removable hashtag chip
│   ├── ImageUploader.tsx             # Image upload section (thumbnails + add button)
│   ├── ImageUploadThumbnail.tsx      # Single image thumbnail with delete button
│   ├── AnonymousToggle.tsx           # Checkbox + optional anonymous name field
│   └── index.ts                      # Barrel exports
│
├── components/shared/
│   └── Toast.tsx                     # NEW — simple toast notification (success/error)
│
├── components/kudos/
│   ├── KudosPageClient.tsx           # MODIFY — add modal state, onOpenModal, onKudoCreated callback
│   ├── KudosHero.tsx                 # MODIFY — wire "Ghi nhan" CTA to open modal via props callback
│   └── KudoFeed.tsx                  # MODIFY — expose resetFeed() via ref or callback for parent to trigger refresh
│
├── app/api/
│   ├── kudos/route.ts                # MODIFY — add POST handler for creating kudos
│   ├── kudos/upload/route.ts         # NEW — image upload endpoint
│   └── users/search/route.ts         # NEW — user search autocomplete endpoint
│
├── libs/
│   ├── validations/kudos.ts          # MODIFY — add createKudoSchema, userSearchSchema
│   ├── utils/sanitize.ts             # NEW — custom HTML sanitizer (8-tag allowlist, zero deps, Workers safe)
│   └── supabase/storage.ts           # NEW — Supabase Storage helper for image uploads
│
├── types/
│   └── kudos.ts                      # MODIFY — add CreateKudoPayload, UserSearchResult types
│
└── libs/i18n/dictionaries/
    ├── vi.json                       # MODIFY — add write kudos modal keys (~20 keys)
    ├── en.json                       # MODIFY — add write kudos modal keys
    └── ja.json                       # MODIFY — add write kudos modal keys
```

### Dependencies to Add

| Package | Version | Purpose |
|---------|---------|---------|
| `@tiptap/react` | ^2.x | React bindings for TipTap editor (`@tiptap/pm` auto-installed as peer dep) |
| `@tiptap/starter-kit` | ^2.x | Core extensions bundle (bold, italic, strike, lists, blockquote, history) |
| `@tiptap/extension-link` | ^2.x | Link insertion with URL dialog |
| `@tiptap/extension-mention` | ^2.x | @mention autocomplete in editor |
| `@tiptap/extension-placeholder` | ^2.x | Placeholder text for empty editor |
| `@tiptap/extension-character-count` | ^2.x | Character count (max 2000 raw text) |
| ~~`dompurify`~~ | — | **REMOVED**: DOMPurify requires a DOM environment (`DOMParser`), unavailable in Cloudflare Workers. Instead, use a **zero-dependency custom sanitizer** — the allowlist is only 8 tags + 1 attribute, trivial to implement safely. See `src/libs/utils/sanitize.ts` in project structure |

---

## Implementation Strategy

### Phase 0: Foundation & Setup

**Goal**: Install dependencies, create types, Zod schemas, and Supabase Storage setup.

1. Install TipTap packages via `yarn add` (package manager per constitution: Yarn 1.22.22). No sanitization library needed — custom sanitizer built in step 5b
   ```bash
   yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-mention @tiptap/extension-placeholder @tiptap/extension-character-count
   ```
2. Add new TypeScript types to `src/types/kudos.ts`:
   - `CreateKudoPayload` — form submission DTO
   - `CreateKudoResponse` — API response
   - `UserSearchResult` — autocomplete result item
   - `WriteKudoFormState` — local form state shape
3. Add Zod schemas to `src/libs/validations/kudos.ts`:
   - `createKudoSchema` — validate POST /api/kudos body
   - `userSearchSchema` — validate GET /api/users/search params
   - `imageUploadSchema` — validate file type/size
4. Create Supabase Storage bucket `kudo-images` (if not exists)
5. Create `src/libs/supabase/storage.ts` — helper for authenticated image upload
6. Create `src/libs/utils/sanitize.ts` — custom HTML sanitizer function `sanitizeKudoHtml(html: string): string`. Allowlist: `b`, `i`, `s`, `ol`, `li`, `a`, `blockquote`, `p`, `br`. Only `href` attribute preserved on `<a>` tags. All other tags/attributes stripped. ~30 lines, zero dependencies, tested with XSS payloads in vitest
7. Add i18n dictionary keys for Write Kudos modal (~20 keys per language)

### Phase 1: API Endpoints (P1 — Backend)

**Goal**: Build all server-side endpoints needed by the modal.

1. **POST `/api/kudos`** — Create a new kudos
   - Auth check, Zod validation, HTML sanitization (`sanitizeKudoHtml()` from `@/libs/utils/sanitize`)
   - **Transaction**: Use Supabase `rpc()` or sequential inserts with manual rollback — insert into `kudos` table first (get `kudo_id`), then `kudo_hashtags` junction, then `kudo_images` (with `display_order` set to array index: 0, 1, 2... matching the order in the form state). If any step fails, delete the partial kudo row
   - Self-send rejection: `sender_id !== recipient_id` (return 400)
   - **Orphaned image cleanup**: Images are uploaded to Storage before submission. If kudo creation fails, client retains the image URLs. No server cleanup needed — orphaned Storage files can be cleaned by a cron job later (out of scope for this feature)
   - Return created kudo object matching `Kudo` type
2. **GET `/api/users/search?q=`** — Autocomplete user search
   - Auth check, debounce-friendly (client handles debounce)
   - Search `user_profiles` by name (ilike), exclude current user
   - Return name, avatar, department, user_id
3. **POST `/api/kudos/upload`** — Upload single image
   - Auth check, file type/size validation (JPEG/PNG/GIF/WebP, max 5MB)
   - Upload to Supabase Storage `kudo-images/{user_id}/{timestamp}-{filename}`
   - Return public URL + thumbnail URL

### Phase 2: Modal Shell & Core Form (P1 — US1, US9)

**Goal**: Build the modal container with form state management, validation, and action buttons.

1. Create `WriteKudoModal.tsx` — modal overlay + dialog container
   - Fixed overlay with `#00101A/80` background
   - Dialog: 752px, `#FFF8E1`, `rounded-3xl`, `overflow-y-auto`
   - Focus trap, Escape to close, click overlay to close
   - `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (note: `role`, not `aria-role`)
2. Implement form state with `useReducer` (12 fields per spec State Management section)
3. Implement validation-on-submit logic (FR-010)
   - Validate all required fields, show field-level error borders (#CF1322)
   - "Gui" button stays golden, validates on click
4. Create action buttons: "Huy" (Cancel) + "Gui" (Submit)
   - Submit: loading spinner during API call, disabled during image upload
5. Wire modal open/close in `KudosPageClient.tsx` + `KudosHero.tsx`
   - `KudosPageClient` holds `isModalOpen` state, passes `onOpenModal` to `KudosHero`
   - `KudosHero` "Ghi nhan" button calls `onOpenModal()` via props
6. Create `Toast.tsx` — simple auto-dismiss notification component
   - Support `success` and `error` variants
   - Fixed position bottom-center, auto-dismiss after 3s
   - No external library — build with React portal + CSS animation
7. Implement feed refresh after successful submission
   - **Approach**: `KudosPageClient` passes an `onKudoCreated(newKudo)` callback to the modal
   - On success: modal calls `onKudoCreated(response.data)`, parent calls `KudoFeed.resetFeed()`
   - `KudoFeed` exposes a `resetFeed` method (via `useImperativeHandle` + `forwardRef`) that clears the kudo list, resets cursor, and refetches the first page from the API
   - This ensures the new kudo appears at the top with correct server-side data (no optimistic insert needed)

### Phase 3: Recipient Search (P1 — US2)

**Goal**: Build the autocomplete recipient search component.

1. Create `RecipientSearch.tsx`
   - Input with dropdown arrow icon, placeholder "Tim kiem"
   - Debounced API call (300ms) to `/api/users/search`
   - Dropdown with matching user names + avatars + departments
   - Keyboard navigation (arrow keys + Enter)
   - "No results found" empty state
   - Error state: red border on empty submit

### Phase 4: Badge Title & Rich Text Editor (P1 — US3, US5)

**Goal**: Build the badge input and TipTap editor with toolbar.

1. Create `BadgeInput.tsx`
   - Free-text input, placeholder, 100-char limit with counter
   - Error state on empty submit
2. Create `KudoEditor.tsx` — TipTap wrapper
   - Configure extensions: StarterKit, Link, Placeholder, CharacterCount (2000)
   - Output HTML string to form state
3. Create `EditorToolbar.tsx` — formatting buttons
   - 6 format buttons (Bold/Italic/Strike/NumberedList/Link/Quote) + Community Standards link
   - Connected border design (toolbar top-rounded, editor bottom-rounded)
   - Active/toggle state for format buttons
   - Keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+Shift+S, Ctrl+K
4. Hint text below editor: "Ban co the @ + ten..."

### Phase 5: Hashtags (P1 — US6)

**Goal**: Build hashtag selector with chips.

1. Create `HashtagSelector.tsx`
   - Label "Hashtag*" + tag group area
   - "+ Hashtag" button opens dropdown (fetches from existing `/api/hashtags`)
   - Max 5 hashtags, hide button when limit reached
2. Create `HashtagChip.tsx`
   - Pill-shaped chip with hashtag name + "x" remove button
   - Gold-tinted background per design-style

### Phase 6: Image Upload (P2 — US7)

**Goal**: Build image upload with thumbnails.

1. Create `ImageUploader.tsx`
   - Label "Image" (no asterisk — optional)
   - "+ Image / Toi da 5" button opens file picker
   - Accept JPEG/PNG/GIF/WebP, max 5MB
   - Upload to `/api/kudos/upload`, show spinner during upload
   - Hide button when 5 images attached
2. Create `ImageUploadThumbnail.tsx`
   - 80x80px, border-radius 18px, object-fit cover
   - Red close button (20px, top-right, #D4271D)
   - Loading spinner placeholder during upload

### Phase 7: @Mentions & Anonymous (P2 — US4, US8)

**Goal**: Add mention support and anonymous toggle.

1. Configure TipTap `@mention` extension
   - Trigger on "@" + 1 char
   - Suggestion dropdown (reuses `/api/users/search` endpoint)
   - Insert styled mention tag
2. Create `AnonymousToggle.tsx`
   - Checkbox + label "Gui loi cam on va ghi nhan an danh"
   - When checked: reveal optional anonymous name field (max 50 chars)
   - Wire `is_anonymous` and `anonymous_name` to form state

### Phase 8: Community Standards & Polish (P3 — US10 + Responsive + Accessibility)

**Goal**: Final polish, responsive behavior, and accessibility.

1. Wire "Tieu chuan cong dong" toolbar link (opens in new tab)
2. Responsive adjustments per design-style.md:
   - Mobile (< 768px): fullscreen modal, stacked layout, column buttons
   - Tablet (768-1023px): 90vw modal, 32px padding
3. Full accessibility audit:
   - Focus trap verification
   - Screen reader labels for all inputs
   - Keyboard-only navigation test
4. Animation polish: modal open/close fade+scale (200ms ease-out)

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| TipTap bundle size increases load time | Medium | Medium | Use tree-shaking, dynamic import (`next/dynamic` with `ssr: false`) for the entire modal |
| TipTap incompatible with React 19 | Low | High | TipTap v2.x officially supports React 18+. Test early in Phase 0. If incompatible, fallback to simpler contenteditable with manual formatting |
| Supabase Storage bucket permissions | Low | Medium | Configure RLS policy: authenticated users can upload to their own folder only. Test upload/download in Phase 1 |
| Rich text HTML XSS vectors | Medium | High | Custom `sanitizeKudoHtml()` on server with strict 8-tag allowlist + `href`-only attribute. Zero dependencies, tested with XSS payloads in vitest. Both `sanitize-html` (Node.js Stream) and `dompurify` (needs DOM) rejected for Workers compatibility |
| Cloudflare Workers size limit (25MB) | Low | Medium | TipTap is ~50KB gzipped. Dynamic import keeps it out of initial bundle. Monitor with `wrangler deploy --dry-run` |
| Image upload timeout on slow networks | Medium | Low | Client-side timeout (30s), abort controller, retry UI. Images upload individually, not batched |
| `user_profiles.name` column missing or empty | Medium | High | Existing spotlight API returns `name: ""` — verify DB schema in Phase 0. Fallback: search `auth.users` metadata via Supabase RPC |
| Custom sanitizer regex bypass | Low | Medium | The 8-tag allowlist is small enough that a regex-based approach is reliable. Include comprehensive XSS test cases in vitest (script injection, event handlers, data URIs, nested tags). The `nodejs_compat` flag in wrangler.jsonc means `sanitize-html` would technically work, but the custom approach is simpler, has zero dependencies, and avoids constitution gray areas |

### Estimated Complexity

- **Frontend**: **High** — Rich text editor, complex form state, multiple interactive components, responsive modal
- **Backend**: **Medium** — 3 new endpoints, Supabase Storage integration, HTML sanitization
- **Testing**: **Medium** — Editor testing requires special TipTap test utilities, image upload needs mock storage

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Modal form state ↔ all child components, TipTap ↔ toolbar
- [x] **External dependencies**: Supabase Auth, Supabase DB, Supabase Storage
- [x] **Data layer**: INSERT into kudos/kudo_hashtags/kudo_images tables
- [x] **User workflows**: Complete write + submit + verify in feed flow

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Form validation on submit, editor formatting, recipient selection |
| App ↔ External API | Yes | POST /api/kudos, GET /api/users/search, POST /api/kudos/upload |
| App ↔ Data Layer | Yes | Kudo creation, image storage, hashtag junction |
| Cross-platform | Yes | Mobile fullscreen modal, desktop centered modal |

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Mock (vitest) | Avoid real OAuth in unit tests |
| Supabase DB | Real (test DB) | Integration tests need real DB constraints/RLS |
| Supabase Storage | Mock (vitest) | Avoid real storage costs in unit tests; real in E2E |
| TipTap Editor | Real (jsdom) | Editor behavior must be tested with real extensions |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Fill all required fields (recipient, badge, message, 1 hashtag) → submit → kudo created in DB
   - [ ] Attach 3 images → submit → all image URLs stored
   - [ ] Send anonymously → submit → sender hidden in feed

2. **Validation**
   - [ ] Submit with empty form → all 4 required fields show error borders
   - [ ] Submit with badge > 100 chars → blocked client-side
   - [ ] Upload 6th image → button hidden, only 5 stored
   - [ ] Upload 10MB file → rejected with error message

3. **Error Handling**
   - [ ] API returns 500 → error toast, modal stays open, data preserved
   - [ ] Image upload fails mid-way → placeholder removed, other images intact
   - [ ] User search returns no results → "No results found" shown

4. **Edge Cases**
   - [ ] Self-send → server rejects with error
   - [ ] Close modal during image upload → uploads cancelled
   - [ ] Rapid double-click submit → only one submission

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Form validation logic | 90%+ | High |
| API endpoint handlers | 85%+ | High |
| UI component rendering | 75%+ | Medium |
| Rich text editor integration | 70%+ | Medium |
| Image upload flow | 70%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved — reviewed 3 rounds
- [x] `design-style.md` approved — reviewed 3 rounds
- [ ] Supabase Storage bucket `kudo-images` created with RLS policies
- [ ] Supabase `user_profiles` table has a searchable `name` or `display_name` column populated. **WARNING**: Existing API routes (`spotlight/route.ts`) return `name: ""` — the name column may not exist or may be empty. Verify DB schema and seed data before Phase 1.2 (user search). If `name` is not available, search by `email` prefix or use `raw_user_meta_data->>'full_name'` from `auth.users` via RPC

### External Dependencies

- Supabase Storage service (for image uploads)
- Existing database tables: `kudos`, `kudo_hashtags`, `kudo_images`, `hashtags`, `user_profiles`, `departments`
- TipTap npm packages (new — install in Phase 0)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities (API endpoints can be built in parallel with UI components)
3. **Begin** implementation following phase order: Foundation → API → Modal Shell → Components

---

## Notes

- The codebase has been **read-only** until now (feed display, hearts, filters). This is the first write feature, introducing POST APIs, file uploads, and complex form state. Set patterns carefully — future features (edit kudos, profile updates) will follow these patterns.
- **Dynamic import** the entire `WriteKudoModal` component with `next/dynamic({ ssr: false })` to keep TipTap out of the server bundle and ensure Cloudflare Workers compatibility.
- The existing `KudosHero.tsx` already has a "Ghi nhan" CTA button (line 57) — currently a no-op. Wire it to the modal open handler.
- The existing `/api/hashtags` endpoint (GET) already returns all hashtags — reuse it for the hashtag dropdown without building a new endpoint.
- HTML sanitization must happen server-side in the POST /api/kudos handler using the custom `sanitizeKudoHtml()` function, NOT client-side. Client sends raw TipTap HTML, server sanitizes before storage. External libraries rejected: `sanitize-html` (Node.js `Stream` dep), `dompurify` (needs DOM). Custom regex sanitizer is safe for the tiny 8-tag allowlist and has zero dependencies.
- Wrangler config has `nodejs_compat` flag enabled, so Node.js polyfills are available at runtime. However, the custom sanitizer approach is preferred: simpler, zero deps, and avoids relying on polyfills that may have subtle differences from real Node.js.
- All i18n keys should follow the existing flat naming convention: `write_kudo_title`, `write_kudo_recipient_label`, `write_kudo_submit`, etc.
