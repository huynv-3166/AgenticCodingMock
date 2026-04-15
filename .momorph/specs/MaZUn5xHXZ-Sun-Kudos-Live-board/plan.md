# Implementation Plan: Sun* Kudos - Live Board

**Frame**: `MaZUn5xHXZ-Sun-Kudos-Live-board`
**Date**: 2026-04-13
**Spec**: `specs/MaZUn5xHXZ-Sun-Kudos-Live-board/spec.md`

---

## Summary

Build the Sun* Kudos - Live Board page (`/sun-kudos`) — the central gratitude recognition screen for SAA 2025. This is the **first feature in the project to use real Supabase database queries** (all existing pages use static data). The page displays a kudo feed with infinite scroll, highlight carousel, interactive spotlight board, personal stats sidebar, and leaderboard. Key interactions: heart/like kudos, filter by hashtag/department, copy links, open secret boxes.

**Technical approach**: Server-rendered page shell (SSR) with client-side hydration for interactive sections. Supabase for auth + database + RLS. All new API routes via Next.js App Router route handlers. TDD per constitution.

---

## Technical Context

**Language/Framework**: TypeScript 5 (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/supabase-js, @supabase/ssr
**Database**: Supabase (PostgreSQL with RLS)
**Deployment**: Cloudflare Workers via @opennextjs/cloudflare
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: React state + URL query params (no global store needed)
**API Style**: REST via Next.js route handlers (`src/app/api/`)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **Clean Code & Clear Organization** — Feature-grouped components under `src/components/kudos/`, types in `src/types/`, hooks in dedicated files. Single responsibility per file.
- [x] **Next.js, Cloudflare Workers & Supabase** — Server Components for data fetching, `"use client"` only for interactive parts. No Node.js APIs. Supabase server client for SSR, browser client for mutations.
- [x] **Test-First Development (TDD)** — Each user story has independently testable acceptance scenarios. Tests written before implementation.
- [x] **Responsive Design** — Mobile-first with breakpoints at 768px (md) and 1024px (lg). Touch targets >= 44x44px.
- [x] **Security — OWASP** — Supabase Auth + RLS for all data. Server-side heart multiplier logic. Input validation with Zod. No raw SQL.

**Violations**: None. All constitution rules are met.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-grouped under `src/components/kudos/`. (Existing pattern: `home/`, `awards/`, `login/`, `countdown/`. Using `kudos/` instead of `sun-kudos/` because: (a) the feature name is "Kudos", the `sun-*` prefix is branding only; (b) matches how `home/` maps to `/` not `/home`; (c) shorter import paths.) Server Components for layout/data, Client Components for interactivity.
- **Styling Strategy**: Tailwind utilities + CSS custom properties from `globals.css`. Extend existing design tokens for Kudos-specific values.
- **Data Fetching**:
  - **Initial load**: Supabase server client in the page Server Component (`page.tsx`). Parallel queries for feed, highlight, stats, spotlight, leaderboard.
  - **Mutations/pagination**: Supabase browser client via API route handlers from Client Components.
- **URL State**: Filter values synced to URL query params (`?hashtag=X&department=Y`) via `useSearchParams`. Enables shareable filtered views.

### Backend Approach

- **API Design**: RESTful route handlers in `src/app/api/kudos/`. Each handler validates auth via Supabase server client.
- **Data Access**: Direct Supabase client queries (no ORM layer — project uses `@supabase/supabase-js` directly).
- **Validation**: Zod schemas for all request body/params validation.
- **Authorization**: Row-Level Security (RLS) policies on all tables. Heart multiplier computed server-side.

### Database Schema

New Supabase migration creates these tables:

```sql
-- ============================================================
-- 1. Reference tables (created first — referenced by others)
-- ============================================================

CREATE TABLE hashtags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE departments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(200) NOT NULL,
  code        VARCHAR(20) NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. Core tables
-- ============================================================

CREATE TABLE kudos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id     UUID NOT NULL REFERENCES auth.users(id),
  receiver_id   UUID NOT NULL REFERENCES auth.users(id),
  message       TEXT NOT NULL CHECK (char_length(message) <= 2000),
  category      VARCHAR(100) NOT NULL DEFAULT 'Loi cam on',
  is_anonymous  BOOLEAN NOT NULL DEFAULT false,
  heart_count   INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_kudos_created_at ON kudos(created_at DESC);
CREATE INDEX idx_kudos_heart_count ON kudos(heart_count DESC);
CREATE INDEX idx_kudos_sender ON kudos(sender_id);
CREATE INDEX idx_kudos_receiver ON kudos(receiver_id);

CREATE TABLE kudo_hashtags (
  kudo_id     UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  hashtag_id  UUID NOT NULL REFERENCES hashtags(id),
  PRIMARY KEY (kudo_id, hashtag_id)
);

CREATE TABLE kudo_images (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudo_id        UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  image_url      TEXT NOT NULL,
  display_order  SMALLINT NOT NULL DEFAULT 0,
  CONSTRAINT max_5_images CHECK (display_order < 5)
);

CREATE TABLE hearts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudo_id     UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id),
  multiplier  SMALLINT NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (kudo_id, user_id)  -- max 1 heart per user per kudo
);
CREATE INDEX idx_hearts_kudo ON hearts(kudo_id);

-- ============================================================
-- 3. Gamification
-- ============================================================

CREATE TABLE secret_boxes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id),
  is_opened     BOOLEAN NOT NULL DEFAULT false,
  opened_at     TIMESTAMPTZ,
  gift_details  TEXT
);
CREATE INDEX idx_secret_boxes_user ON secret_boxes(user_id);

CREATE TABLE special_days (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date             DATE NOT NULL UNIQUE,
  heart_multiplier SMALLINT NOT NULL DEFAULT 2,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. User extensions (extends Supabase auth.users)
-- ============================================================

CREATE TABLE user_profiles (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  department_id        UUID REFERENCES departments(id),
  star_level           SMALLINT NOT NULL DEFAULT 0,
  kudo_received_count  INTEGER NOT NULL DEFAULT 0,
  kudo_sent_count      INTEGER NOT NULL DEFAULT 0,
  heart_received_count INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- 5. Trigger: auto-update kudos.heart_count on hearts INSERT/DELETE
-- ============================================================

CREATE OR REPLACE FUNCTION update_heart_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE kudos SET heart_count = heart_count + 1 WHERE id = NEW.kudo_id;
    UPDATE user_profiles SET heart_received_count = heart_received_count + NEW.multiplier
      WHERE user_id = (SELECT sender_id FROM kudos WHERE id = NEW.kudo_id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE kudos SET heart_count = heart_count - 1 WHERE id = OLD.kudo_id;
    UPDATE user_profiles SET heart_received_count = heart_received_count - OLD.multiplier
      WHERE user_id = (SELECT sender_id FROM kudos WHERE id = OLD.kudo_id);
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER heart_count_trigger
  AFTER INSERT OR DELETE ON hearts
  FOR EACH ROW EXECUTE FUNCTION update_heart_count();

-- ============================================================
-- 6. RLS Policies (enable on ALL tables)
-- ============================================================

-- kudos: anyone auth can SELECT, only sender can INSERT
ALTER TABLE kudos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "kudos_select" ON kudos FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudos_insert" ON kudos FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- kudo_hashtags: anyone can SELECT, INSERT tied to kudo ownership
ALTER TABLE kudo_hashtags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "kudo_hashtags_select" ON kudo_hashtags FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudo_hashtags_insert" ON kudo_hashtags FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));

-- kudo_images: anyone can SELECT, INSERT tied to kudo ownership
ALTER TABLE kudo_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "kudo_images_select" ON kudo_images FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudo_images_insert" ON kudo_images FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));

-- hearts: anyone can SELECT, INSERT requires auth + not own kudo, DELETE own only
ALTER TABLE hearts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hearts_select" ON hearts FOR SELECT TO authenticated USING (true);
CREATE POLICY "hearts_insert" ON hearts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND auth.uid() != (SELECT sender_id FROM kudos WHERE id = kudo_id));
CREATE POLICY "hearts_delete" ON hearts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- user_profiles: anyone can SELECT, only own profile UPDATE
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select" ON user_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- secret_boxes: only owner can SELECT/UPDATE
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "boxes_select" ON secret_boxes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "boxes_update" ON secret_boxes FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- reference tables + special_days: anyone auth can SELECT
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hashtags_select" ON hashtags FOR SELECT TO authenticated USING (true);
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "departments_select" ON departments FOR SELECT TO authenticated USING (true);
ALTER TABLE special_days ENABLE ROW LEVEL SECURITY;
CREATE POLICY "special_days_select" ON special_days FOR SELECT TO authenticated USING (true);
```

**RLS Policies**:
- `kudos`: Anyone authenticated can SELECT. Only sender can INSERT.
- `hearts`: Anyone can SELECT. INSERT requires auth + not own kudo. DELETE requires auth + own heart only.
- `user_profiles`: Anyone can SELECT. Only own profile UPDATE.
- `secret_boxes`: Only owner can SELECT/UPDATE.
- `special_days`: Anyone authenticated can SELECT. Admin-only INSERT/UPDATE/DELETE.

### Integration Points

- **Reuse `AppHeader`** (`src/components/shared/AppHeader.tsx`) — "Sun* Kudos" nav link will be active on this page.
- **Reuse `AppFooter`** (`src/components/shared/AppFooter.tsx`) — Same footer across all pages.
- **Reuse `AppFooter`** (`src/components/shared/AppFooter.tsx`) — covers spec's Footer component (node 2940:13522). No new Footer component needed.
- **Reuse `FloatingActionButton`** (`src/components/shared/FloatingActionButton.tsx`)
- **Reuse i18n** (`src/libs/i18n/`) — Add kudos page keys to all 3 dictionaries.
- **Reuse Supabase clients** — `server.ts` (uses `cookies()`, for Server Components + Route Handlers) and `client.ts` (browser client, for Client Components doing mutations like heart toggle). Both already exist in `src/libs/supabase/`.
- **Existing assets**: `public/assets/home/logos/kudos-bg.png`, `kudos-label.svg` — may reuse for hero.

---

## Project Structure

### Documentation

```text
.momorph/specs/MaZUn5xHXZ-Sun-Kudos-Live-board/
├── spec.md              # Feature specification (done)
├── design-style.md      # Design specifications (done)
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/              # Screenshots
```

### Source Code — New Files

| File | Purpose |
|------|---------|
| **Page & Layout** | |
| `src/app/sun-kudos/page.tsx` | Page Server Component — SSR shell, parallel data fetching |
| **Components (Server)** | |
| `src/components/kudos/KudosHero.tsx` | Hero banner with title, KUDOS logo, Write + Search CTA buttons |
| `src/components/kudos/KudosSectionHeader.tsx` | Reusable section header ("Sun* Annual Awards 2025 / SECTION TITLE") |
| **Components (Client — `"use client"`)** | |
| `src/components/kudos/HighlightCarousel.tsx` | Carousel of top 5 kudos with slide navigation, prev/next, pagination |
| `src/components/kudos/HighlightKudoCard.tsx` | Individual highlight card (sender, receiver, message, actions) |
| `src/components/kudos/KudoCard.tsx` | Individual feed kudo card (full version) |
| `src/components/kudos/KudoFeed.tsx` | Infinite scroll feed container with loading/error/empty states |
| `src/components/kudos/KudoUserInfo.tsx` | Sender/receiver block: avatar, name, department, star badge |
| `src/components/kudos/HeroBadge.tsx` | Star level pill badge (1/2/3 stars) |
| `src/components/kudos/HeartButton.tsx` | Heart toggle with optimistic UI, x2 badge, disabled state |
| `src/components/kudos/CopyLinkButton.tsx` | Copy kudo URL to clipboard with toast feedback |
| `src/components/kudos/HashtagTag.tsx` | Clickable hashtag that applies filter |
| `src/components/kudos/ImageThumbnail.tsx` | 88x88 thumbnail with click-to-expand |
| `src/components/kudos/FilterBar.tsx` | Hashtag + Department filter dropdown triggers |
| `src/components/kudos/SpotlightBoard.tsx` | Word cloud visualization with pan/zoom/search |
| `src/components/kudos/SpotlightSearch.tsx` | Search input inside spotlight board |
| `src/components/kudos/StatsSidebar.tsx` | Personal stats box: counts + "Mo qua" button |
| `src/components/kudos/SunnerLeaderboard.tsx` | Top 10 recent gift recipients scrollable list |
| `src/components/kudos/WriteKudosCTA.tsx` | Pill-shaped CTA input that opens write dialog |
| `src/components/kudos/SearchButton.tsx` | Pill-shaped search CTA |
| **API Routes** | |
| `src/app/api/kudos/route.ts` | GET: paginated feed (with filters) |
| `src/app/api/kudos/highlight/route.ts` | GET: top 5 most-hearted |
| `src/app/api/kudos/[id]/route.ts` | GET: single kudo detail |
| `src/app/api/kudos/[id]/heart/route.ts` | POST: add heart, DELETE: remove heart |
| `src/app/api/kudos/spotlight/route.ts` | GET: spotlight board data |
| `src/app/api/users/me/stats/route.ts` | GET: personal stats |
| `src/app/api/users/gifts/recent/route.ts` | GET: 10 recent gift recipients |
| `src/app/api/hashtags/route.ts` | GET: available hashtags |
| `src/app/api/departments/route.ts` | GET: available departments |
| `src/app/api/secret-box/open/route.ts` | POST: open a secret box |
| `src/app/api/special-days/current/route.ts` | GET: today's special day info |
### API Contracts

> All routes require authentication (Supabase session via cookies) unless noted. Auth failure → `401 { error: "Unauthorized" }`.

**GET `/api/kudos`** — Paginated feed
| Param | Type | Required | Notes |
|-------|------|----------|-------|
| `cursor` | string (ISO date) | No | Last item's `created_at` for cursor pagination |
| `limit` | number | No | Default: 10, max: 50 |
| `hashtag` | string | No | Filter by hashtag name |
| `department` | string | No | Filter by department code |

Response `200`:
```json
{ "data": [Kudo], "nextCursor": "2026-04-12T10:00:00Z" | null, "total": 388 }
```
Kudo shape: `{ id, sender: UserInfo, receiver: UserInfo, message, category, hashtags: string[], images: string[], heart_count, is_hearted_by_me, is_anonymous, created_at }`

**Query strategy for `is_hearted_by_me`**: Use a single query with a LEFT JOIN on `hearts` filtered by `auth.uid()`. Do NOT use N+1 queries (one per kudo). Example:
```sql
SELECT k.*, EXISTS(SELECT 1 FROM hearts h WHERE h.kudo_id = k.id AND h.user_id = auth.uid()) AS is_hearted_by_me
FROM kudos k ORDER BY k.created_at DESC LIMIT 10
```

**GET `/api/kudos/highlight`** — Top 5 most-hearted
| Param | Type | Required | Notes |
|-------|------|----------|-------|
| `hashtag` | string | No | Same filter as main feed |
| `department` | string | No | Same filter as main feed |

Response `200`: `{ "data": [Kudo] }` (max 5 items, same Kudo shape)

**GET `/api/kudos/:id`** — Single kudo detail
Response `200`: `{ "data": Kudo }` | `404 { error: "Kudo not found" }`

**POST `/api/kudos/:id/heart`** — Add heart
Response `201`: `{ "heart_count": number, "multiplier": number }` | `409 { error: "Already hearted" }` | `403 { error: "Cannot heart own kudo" }`

**DELETE `/api/kudos/:id/heart`** — Remove heart
Response `200`: `{ "heart_count": number }` | `404 { error: "Heart not found" }`

**GET `/api/kudos/spotlight`** — Spotlight board data
Response `200`: `{ "total_kudos": number, "nodes": [{ "user_id": string, "name": string, "kudo_count": number, "avatar_url": string }] }`

**GET `/api/users/me/stats`** — Personal stats
Response `200`: `{ "kudos_received": number, "kudos_sent": number, "hearts_received": number, "secret_boxes_opened": number, "secret_boxes_unopened": number }`

**GET `/api/users/gifts/recent`** — 10 recent gift recipients
Response `200`: `{ "data": [{ "user_id": string, "name": string, "avatar_url": string, "gift_description": string, "opened_at": string }] }`

**GET `/api/hashtags`** — Available hashtags
Response `200`: `{ "data": [{ "id": string, "name": string }] }`

**GET `/api/departments`** — Available departments
Response `200`: `{ "data": [{ "id": string, "name": string, "code": string }] }`

**POST `/api/secret-box/open`** — Open a secret box
Response `200`: `{ "gift_details": string, "remaining_unopened": number }` | `404 { error: "No unopened boxes" }`

**GET `/api/special-days/current`** — Today's special day info
Response `200`: `{ "active": boolean, "multiplier": number }` (returns `{ active: false, multiplier: 1 }` if not special day)

---

| **Types & Validation** | |
| `src/types/kudos.ts` | Kudo, Heart, UserProfile, SecretBox, SpecialDay, Hashtag, Department types |
| `src/libs/validations/kudos.ts` | Zod schemas for API request/response validation |
| **Database** | |
| `supabase/migrations/001_kudos_schema.sql` | Full schema: tables, indexes, RLS policies, functions |
| `supabase/seed.sql` | Seed data for development (sample kudos, hashtags, departments) |
| **Tests** | |
| `tests/unit/components/kudos/` | Unit tests for each component |
| `tests/unit/api/kudos/` | Unit tests for each API route |
| `tests/e2e/kudos.spec.ts` | E2E tests for critical user flows |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/globals.css` | Add Kudos page design tokens (section gap, card styles, sidebar vars) |
| `src/types/index.ts` | Re-export from `kudos.ts` |
| `src/libs/i18n/dictionaries/vi.json` | Add Kudos page keys (see i18n keys list below) |
| `src/libs/i18n/dictionaries/en.json` | Add Kudos page keys (EN translations) |
| `src/libs/i18n/dictionaries/ja.json` | Add Kudos page keys (JA translations) |

### i18n Keys Required

| Key | Vietnamese (default) | Context |
|-----|---------------------|---------|
| `kudos_hero_title` | Hệ thống ghi nhận và cảm ơn | Hero banner title |
| `kudos_write_placeholder` | Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai? | Write CTA placeholder |
| `kudos_search` | Tìm kiếm | Search button / spotlight search |
| `kudos_section_highlight` | HIGHLIGHT KUDOS | Section title |
| `kudos_section_spotlight` | SPOTLIGHT BOARD | Section title |
| `kudos_section_all` | ALL KUDOS | Section title |
| `kudos_section_subtitle` | Sun* Annual Awards 2025 | Section subtitle |
| `kudos_filter_hashtag` | Hashtag | Filter button label |
| `kudos_filter_department` | Phòng ban | Filter button label |
| `kudos_empty` | Hiện tại chưa có Kudos nào. | Empty state |
| `kudos_no_more` | Không còn kudos để tải. | End of feed |
| `kudos_connection_lost` | Mất kết nối. Nhấn để thử lại. | Connection error |
| `kudos_retry` | Thử lại | Retry button |
| `kudos_copy_link` | Copy Link | Copy link button |
| `kudos_copied` | Đã sao chép liên kết! | Copied toast |
| `kudos_view_detail` | Xem chi tiết | View detail link |
| `kudos_stat_received` | Số Kudos bạn nhận được | Stat label |
| `kudos_stat_sent` | Số Kudos bạn đã gửi | Stat label |
| `kudos_stat_hearts` | Số tim bạn nhận được | Stat label |
| `kudos_stat_boxes_opened` | Số Secret Box bạn đã mở | Stat label |
| `kudos_stat_boxes_unopened` | Số Secret Box chưa mở | Stat label |
| `kudos_open_gift` | Mở quà | Open gift button |
| `kudos_leaderboard_title` | 10 SUNNER NHẬN QUÀ MỚI NHẤT | Leaderboard title |
| `kudos_leaderboard_empty` | Chưa có dữ liệu. | Leaderboard empty |
| `kudos_anonymous` | Ẩn danh | Anonymous sender label |
| `src/middleware.ts` | Re-enable the commented-out auth redirect block (lines 50-56). Middleware uses a PUBLIC_ROUTES whitelist — all other routes including `/sun-kudos` are protected by default once the block is active. Do NOT add `/sun-kudos` to any list. |
| `src/components/awards/KudosPromoBlock.tsx` | Fix link from `/kudos` to `/sun-kudos` (consistency) |

### Dependencies

| Package | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| `zod` | latest | Request/response validation | Constitution requires input validation; no existing validation lib |
| `d3-cloud` | latest | Spotlight Board word cloud layout algorithm | Purpose-built for word clouds. Uses Canvas API internally for text measurement but renders final output to SVG. **Must load client-only** via `next/dynamic({ ssr: false })`. Constitution Principle V: minimal dep for complex visualization. |
| `d3-scale` | latest | Linear scale for word cloud font sizing | Maps kudo counts → font sizes (6px–22px). Pure JS, no browser API dependency. |

---

## Implementation Strategy

### Phase Dependencies & Parallelism

```
Phase 0 (Foundation) ──→ Phase 1 (Shell + APIs) ──→ Phase 2 (P1) ──→ Phase 3 (P2) ──→ Phase 4 (P3 + Polish) ──→ Phase 5 (E2E)
```

**Within-phase parallelism opportunities**:
- **Phase 0**: Steps 1-3 (assets/tokens) can parallel with steps 4-5 (types/validations) and steps 6-7 (DB schema/seed)
- **Phase 1**: All 11 API routes can be split across developers. Static components (KudoCard, UserInfo, Hero) are independent of each other.
- **Phase 2**: US1 (feed), US2 (heart), US3 (carousel) are independent — each can be developed in parallel once Phase 1 API routes exist. **Note**: US2 HeartButton depends on `GET /api/special-days/current` route from Phase 1.
- **Phase 3**: US4 (filters), US5+US7 (CTAs), US8 (spotlight) are independent. US6 (stats) depends on Phase 1 StatsSidebar.
- **Phase 4**: All polish items are independent.

### Phase 0: Asset Preparation & Foundation (Day 1)

**Goal**: Set up everything needed before writing feature code.

1. Export hero background image from Figma node `2940:13432` → `public/assets/kudos/kv-kudos-bg.webp`
2. Export SVN-Gotham font file if not available via CDN → `public/fonts/`
3. Add Kudos design tokens to `globals.css` (colors, spacing, radius from design-style.md)
4. Create `src/types/kudos.ts` with all type definitions
5. Create `src/libs/validations/kudos.ts` with Zod schemas
6. Create Supabase migration `001_kudos_schema.sql` (tables + RLS + indexes)
7. Create `supabase/seed.sql` with sample data
8. Run migration locally, verify schema
9. Add i18n keys to all 3 dictionaries
10. Fix `KudosPromoBlock.tsx` link to `/sun-kudos`

### Phase 1: Core Page Shell + API Routes (Day 2-3)

**Goal**: Full server-rendered page with real data, no interactivity yet.

1. **TDD**: Write tests for each API route handler
2. Create all 11 API route handlers (GET/POST/DELETE)
3. Create `src/app/sun-kudos/page.tsx` — SSR shell with parallel data fetching
4. Create `KudosHero.tsx` (Server Component) — static hero with CTA buttons (click opens dialog)
5. Create `KudosSectionHeader.tsx` — reusable "Sun* Annual Awards 2025 / TITLE" header
6. Create `KudoCard.tsx` — static card layout (no interactions yet)
7. Create `KudoUserInfo.tsx` + `HeroBadge.tsx` — user info block with star badge
8. Create `StatsSidebar.tsx` — stats display (read-only)
9. Create `SunnerLeaderboard.tsx` — leaderboard list (read-only)
10. Update `src/middleware.ts` — re-enable the commented-out auth redirect block (lines 50-56). `/sun-kudos` is already protected by default via the PUBLIC_ROUTES whitelist pattern. Test all existing pages still work after re-enabling.
11. Verify: page renders with real data at all 3 breakpoints

### Phase 2: P1 Interactive Features (Day 4-6)

**Goal**: Core interactions — feed, hearts, carousel.

**US1 — Kudo Feed with Infinite Scroll**:
1. **TDD**: Write tests for KudoFeed infinite scroll behavior
2. Create `KudoFeed.tsx` — Client Component with IntersectionObserver
3. Implement skeleton loading states
4. Implement error state with retry
5. Implement empty state
6. Implement end-of-feed message

**US2 — Heart/Like System**:
1. **TDD**: Write tests for HeartButton state transitions + optimistic UI
2. Create `HeartButton.tsx` — toggle with optimistic update + rollback
3. Implement x2 badge display for special days
4. Implement disabled state for own kudos
5. Test concurrent heart operations

**US3 — Highlight Carousel**:
1. **TDD**: Write tests for carousel navigation + pagination
2. Create `HighlightCarousel.tsx` — Client Component with slide transitions
3. Create `HighlightKudoCard.tsx` — compact card variant
4. Implement active/dimmed card states with gradient fade overlays
5. Implement prev/next with disabled states at boundaries
6. Implement "Xem chi tiet" link
7. Implement keyboard navigation (ArrowLeft/ArrowRight)

### Phase 3: P2 Features (Day 7-9)

**US4 — Filter System**:
1. **TDD**: Write tests for filter state + URL sync
2. Create `FilterBar.tsx` — Hashtag + Department dropdown triggers
3. Implement URL query param sync with `useSearchParams`
4. Implement cross-section filtering (carousel + feed update simultaneously)
5. Create `HashtagTag.tsx` — clickable tags on cards that trigger filter

**US5 — Write Kudos CTA**:
1. Create `WriteKudosCTA.tsx` + `SearchButton.tsx` — pill-shaped hero CTAs
2. Wire click to open Write Kudo dialog (out-of-scope frame — just navigation)

**US6 — Personal Statistics**:
1. Already built in Phase 1 (StatsSidebar) — add real-time data refresh
2. Wire "Mo qua" button click to Secret Box dialog

**US7 — Secret Box**:
1. Implement disabled state on "Mo qua" when count = 0
2. Wire click to open dialog (out-of-scope frame)

**US8 — Spotlight Board**:
1. **TDD**: Write tests for spotlight rendering + search
2. Create `SpotlightBoard.tsx` — Client Component using `d3-cloud` for layout + SVG rendering. **CRITICAL**: Import via `next/dynamic` with `{ ssr: false }` to prevent Cloudflare Workers SSR from importing browser-only code. Show skeleton placeholder during SSR.
3. Create `SpotlightSearch.tsx` — search input with 300ms debounce. Local state (`spotlightSearchQuery`) passed as prop/callback to SpotlightBoard for filtering highlighted nodes.
4. Implement pan/zoom via SVG viewBox transforms (no Canvas/WebGL needed)
5. Implement hover tooltips (absolute-positioned div on mouse event) + click-to-detail
6. Implement empty state
7. Test performance with 500+ nodes (d3-cloud layout is O(n), should handle easily)

### Phase 4: P3 Features + Polish (Day 10-11)

**US9 — Leaderboard**: Already built in Phase 1 — add click-to-profile

**US10 — Copy Link**:
1. Create `CopyLinkButton.tsx` — Clipboard API + toast
2. Create `ImageThumbnail.tsx` — click-to-expand

**US11 — Profile Preview**: Wire avatar hover to profile preview popup (linked frame)

**Polish**:
1. Accessibility audit: focus rings, ARIA attributes, screen reader labels, keyboard nav
2. Reduced motion: `prefers-reduced-motion` for carousel + heart animations
3. Responsive testing at 320px, 375px, 768px, 1024px, 1280px, 1440px
4. Anonymous kudo display (hidden sender info)
5. Long name truncation
6. Default avatar fallback
7. Invalid deep-link filter handling
8. **Unauthenticated redirect**: Verify middleware redirects `/sun-kudos` to `/login?returnUrl=/sun-kudos` when auth block is re-enabled
9. **Special day mid-action**: Heart API uses server `created_at` timestamp to determine which multiplier applies — no client-side timing dependency
10. **Kudo deleted while viewing**: KudoFeed re-fetches on filter/scroll; if a kudo disappears, it is simply absent from the next fetch. Kudo detail view (linked frame) returns 404 → redirect to feed with "This kudo is no longer available" toast

### Phase 5: E2E Testing + Finalization (Day 12)

1. Write Playwright E2E tests for:
   - Page load + initial data display
   - Infinite scroll loading
   - Heart toggle (like/unlike)
   - Carousel navigation
   - Filter apply/clear
   - Copy link
2. Performance audit: LCP < 2s, spotlight at 500+ nodes
3. Final breakpoint verification
4. Code review + constitution compliance check

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Spotlight Board performance at 500+ nodes | Low | Medium | `d3-cloud` uses efficient word cloud layout algorithm. Output is SVG. Performance test early in Phase 3. |
| First Supabase DB feature — unknown patterns | Medium | Medium | Set up database in Phase 0, validate queries work before building UI. Follow Supabase docs closely. |
| SVN-Gotham font availability | Low | Medium | Only used for "KUDOS" hero text. Fallback: use Montserrat 700 italic or load from local file. |
| Auth middleware re-enable may break existing pages | Low | High | Test ALL existing pages (login, home, awards, countdown) after re-enabling auth in middleware. |
| Cloudflare Workers compatibility with d3-cloud | Low | Medium | `d3-cloud` uses Canvas for text measurement internally but renders to SVG. Loaded via `next/dynamic({ ssr: false })` to skip SSR entirely — Canvas is only needed in the browser. Fallback: pure CSS positioned word cloud if dynamic import fails. |

### Estimated Complexity

- **Frontend**: **High** — 20+ components, complex interactions (carousel, infinite scroll, spotlight, optimistic UI)
- **Backend**: **Medium** — 11 API routes, straightforward CRUD with RLS
- **Database**: **Medium** — 8 tables with junction tables and RLS policies
- **Testing**: **High** — 52 acceptance scenarios to cover, E2E for critical flows

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Heart button ↔ feed count, filter ↔ carousel + feed, URL ↔ filter state
- [x] **External dependencies**: Supabase Auth, Supabase Database (via RLS)
- [x] **Data layer**: CRUD operations, pagination, concurrent hearts
- [x] **User workflows**: Browse → filter → heart → copy link flow

### Test Categories

| Category | Applicable | Key Scenarios |
|----------|------------|---------------|
| UI ↔ Logic | Yes | Heart toggle with optimistic UI + rollback, filter apply → URL sync → data refresh |
| App ↔ Data Layer | Yes | Feed pagination, heart CRUD, stats aggregation, spotlight data query |
| Cross-platform | Yes | Responsive layout at 320px / 768px / 1440px breakpoints |

### Test Environment

- **Environment**: Local Supabase instance via `supabase start`
- **Test data**: Seed script with 50 kudos, 5 hashtags, 3 departments, 10 users
- **Isolation**: Transaction rollback per test (Supabase test helpers)

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| Supabase Database | Real (local instance) | Constitution requires integration tests hit real DB. First DB feature — need to validate RLS. |
| Supabase Auth | Mock (test user session) | Auth flow is out-of-scope; use pre-created test sessions. |
| d3-cloud | Mock (in unit tests) | SVG layout can't run in jsdom without canvas polyfill; mock for unit, test real rendering in Playwright E2E. |
| Clipboard API | Mock | Not available in test environment. |

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| API route handlers | 90%+ | High |
| Interactive components (heart, carousel, filter) | 85%+ | High |
| Static components (card, hero, footer) | 70%+ | Medium |
| E2E critical flows | 5 key flows | High |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved (6 review passes complete)
- [x] `design-style.md` approved (6 review passes complete)
- [ ] Supabase project provisioned (local + staging)
- [ ] Figma assets exported (hero background, SVN-Gotham font)
- [ ] Team aligned on route name `/sun-kudos`

### External Dependencies

- Supabase project with Auth enabled (Google OAuth configured)
- SVN-Gotham font file (or acceptable fallback)
- `d3-cloud` compatibility with Cloudflare Workers (verify in Phase 0)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate detailed task breakdown with parallelization
2. **Review** tasks.md for task dependencies and parallel opportunities
3. **Begin** Phase 0 implementation (asset prep + schema + types)

---

## Notes

- **Route name decision**: Using `/sun-kudos` to match existing navigation links in AppHeader, AppFooter, HeroCTA, and MobileMenuButton. One inconsistency in `KudosPromoBlock.tsx` (awards page) uses `/kudos` — will be fixed in Phase 0.
- **First DB feature**: This is the project's first real Supabase database feature. All existing pages use hardcoded static data. Expect learning curve with RLS policies and Supabase query patterns.
- **Spotlight rendering**: `d3-cloud` uses Canvas API for text measurement internally but outputs SVG for display. Loaded via `next/dynamic({ ssr: false })` to prevent server-side import in Cloudflare Workers (Canvas unavailable there). SSR shows a skeleton placeholder; client hydrates with the word cloud.
- **Open business questions** (from spec review, don't block implementation):
  - Q1: Real-time feed updates via Supabase Realtime? (Default: no, refresh on scroll)
  - Q2: Kudo categories fixed list or admin-configurable? (Default: fixed list)
  - Q3: Secret Box earning conditions? (Default: out-of-scope, API returns whatever DB has)
  - Q4: Pixel-accurate mobile specs from iOS frames? (Default: use directional guidelines)
- **Deferred to tasks.md**: Component props interfaces, test file-to-scenario mapping, and per-component implementation details will be defined in the task breakdown step (`/momorph.tasks`), not in this plan.
