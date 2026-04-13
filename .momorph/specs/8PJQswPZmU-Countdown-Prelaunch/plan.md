# Implementation Plan: Countdown - Prelaunch Page

**Frame**: `8PJQswPZmU-Countdown-Prelaunch`
**Date**: 2026-04-09
**Spec**: `specs/8PJQswPZmU-Countdown-Prelaunch/spec.md`

---

## Summary

Build a full-screen countdown prelaunch page that displays before the SAA 2025 event launches. The page shows a countdown timer (Days, Hours, Minutes) with glassmorphism digit cards on a dark background with colorful abstract artwork. When the countdown reaches zero, users are auto-redirected to the homepage. The implementation leverages existing patterns (i18n via cookies, Supabase Auth middleware, `next/font` for Digital Numbers) and creates a dedicated `/countdown` route with middleware-driven routing based on event start time.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, Supabase SSR
**Database**: N/A (event start time from environment variable, fallback to static config)
**Testing**: Vitest (unit), Playwright (E2E)
**State Management**: React useState/useEffect (local only)
**API Style**: N/A (no API endpoint needed — uses env var + Server Component)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **Follows project coding conventions** — Named exports, path aliases (`@/*`), files < 200 lines
- [x] **Uses approved libraries and patterns** — Next.js App Router, TailwindCSS, Supabase SSR (all approved)
- [x] **Adheres to folder structure** — `src/app/countdown/`, `src/components/countdown/`
- [x] **Meets security requirements** — Auth check in middleware, no secrets exposed, security headers
- [x] **Follows testing standards** — TDD cycle: write tests for `calculateTimeLeft`/`padTwo` before extracting them (Phase 0); write component render tests before building UI (Phase 1); write middleware redirect tests before modifying middleware. E2E tests after full integration.
- [x] **Responsive design** — Mobile-first approach with Tailwind breakpoints (320px+, 768px+, 1024px+)
- [x] **Server Components by default** — Client Component only for countdown timer logic

**Violations**: None

**New dependency justification**: None required — all dependencies already in project.

---

## Architecture Decisions

### Key Decision 1: Dedicated `/countdown` route (not conditional homepage)

**Chosen**: Create `/src/app/countdown/page.tsx` as a separate route.

**Why**: The prelaunch page is a full-screen immersive experience with NO header/footer, fundamentally different from the homepage layout. Mixing both into `/` with conditionals would violate single-responsibility and bloat the homepage.

**How routing works**:
- Middleware checks `EVENT_CONFIG.event_start_date` (or env var) on every request
- If event NOT started AND user authenticated AND path is `/`: redirect to `/countdown`
- The `/countdown` page itself also checks server-side: if event already started → `redirect("/")`
- When countdown hits zero client-side: `router.push("/")`

### Key Decision 2: New component vs reusing existing CountdownTimer

**Chosen**: Create new `PrelaunchCountdownTimer` component.

**Why**: The existing `src/components/home/CountdownTimer.tsx` is designed for the homepage hero (smaller 51x82px tiles, golden text `#FFEA9E`, no redirect logic). The prelaunch page needs:
- Larger digit cards (77x123px) with different glassmorphism styling
- White text (`#FFFFFF`) instead of golden
- Full-screen centered layout
- Auto-redirect on zero
- Loading/error states

Retrofitting the existing component with size/color/behavior variants would violate "don't add unnecessary abstractions" (constitution). Both components share `calculateTimeLeft` and `padTwo` which can be extracted to a shared utility.

### Key Decision 3: Event start time source

**Chosen**: Environment variable `NEXT_PUBLIC_EVENT_START_TIME` with fallback to `EVENT_CONFIG.event_start_date`.

**Why**:
- No extra API call needed — available at build time and runtime
- Compatible with Cloudflare Workers (no Node.js APIs)
- `NEXT_PUBLIC_` prefix makes it available in both Server and Client Components
- Existing `EVENT_CONFIG.event_start_date` already exists as fallback
- No Supabase query needed for this single config value

**No `/api/event/status` endpoint needed** — the spec predicted this API, but since we can use env var + Server Component, the extra endpoint adds unnecessary complexity.

### Frontend Architecture

```
/countdown (Server Component page)
├── Server-side: check auth + event status → redirect if needed
├── Server-side: read locale cookie → get dictionary
└── Render:
    ├── BackgroundImage (Server) — next/image with fill + priority
    ├── GradientOverlay (Server) — div with inline gradient
    └── PrelaunchCountdownTimer (Client) — "use client"
        ├── State: status, timeRemaining, targetTime
        ├── Effect: setInterval every 60s
        ├── Effect: redirect on zero via router.push
        └── Render:
            ├── Title (i18n)
            ├── CountdownUnit × 3 (Days, Hours, Minutes)
            │   ├── PrelaunchDigitCard × 2 (glassmorphism)
            │   └── UnitLabel
            ├── LoadingState (skeleton)
            └── ErrorState (retry button)
```

### Integration Points

- **Existing**: `EVENT_CONFIG` from `src/libs/data/homepage.ts` (event_start_date)
- **Existing**: `getDictionary()` from `src/libs/i18n` (i18n support)
- **Existing**: `createClient()` from `src/libs/supabase/middleware` (auth check)
- **Existing**: Font CSS variables (`--font-montserrat`, `--font-digital-numbers`)
- **Existing**: CSS variables (`--color-bg-primary`, `--color-primary`, etc.)
- **Shared utility**: Extract `calculateTimeLeft` and `padTwo` from existing CountdownTimer

---

## Project Structure

### Documentation

```text
.momorph/specs/8PJQswPZmU-Countdown-Prelaunch/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
└── tasks.md             # Task breakdown (next step)
```

### New Files

| File | Purpose |
|------|---------|
| `src/app/countdown/page.tsx` | Prelaunch countdown page (Server Component) |
| `src/components/countdown/PrelaunchCountdownTimer.tsx` | Client-side countdown timer with loading/error/redirect |
| `src/components/countdown/PrelaunchDigitCard.tsx` | Glassmorphism digit card component |
| `src/libs/utils/countdown.ts` | Shared `calculateTimeLeft` + `padTwo` extracted from existing code |
| `public/assets/countdown/background.png` | Background artwork image (download from Figma) |

### Modified Files

| File | Changes |
|------|---------|
| `src/middleware.ts` | Add event-start-time check: redirect `/` → `/countdown` when event not started |
| `src/libs/i18n/dictionaries/vi.json` | Add `countdown_title` key |
| `src/libs/i18n/dictionaries/en.json` | Add `countdown_title` key |
| `src/libs/i18n/dictionaries/ja.json` | Add `countdown_title` key |
| `src/libs/i18n/index.ts` | Type will auto-update (inferred from vi.json) |
| `src/components/home/CountdownTimer.tsx` | Refactor to use shared `calculateTimeLeft` + `padTwo` from utils |
| `src/components/index.ts` | Add barrel exports for `PrelaunchCountdownTimer` and `PrelaunchDigitCard` |
| `src/app/globals.css` | Add prelaunch-specific CSS variables (see list below) |

### Dependencies

No new packages required. All dependencies already exist:
- `next@15.x`, `react@19.x`, `tailwindcss@4`, `@supabase/ssr`, `@supabase/supabase-js`

### CSS Variables to Add (`globals.css`)

```css
/* === Countdown Prelaunch Design Tokens === */
--color-prelaunch-gradient: linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%);
--spacing-prelaunch-unit-gap: 60px;
--spacing-prelaunch-digit-gap: 21px;
--spacing-prelaunch-title-gap: 24px;
--blur-prelaunch-digit: 24.96px;
```

> **Note**: Most values (colors, fonts, border-radius) already exist in globals.css as shared tokens (`--color-bg-primary`, `--color-primary`, `--blur-countdown`). Only prelaunch-specific values that differ from homepage are added.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Shared Utils

1. Download background artwork from Figma using `get_media_files` tool → `public/assets/countdown/background.png`
2. Extract `calculateTimeLeft` and `padTwo` from `src/components/home/CountdownTimer.tsx` into `src/libs/utils/countdown.ts`
3. Update existing `CountdownTimer.tsx` to import from shared utils (no behavior change)
4. Add `countdown_title` i18n key to all 3 dictionaries
5. Add prelaunch CSS variables to `globals.css`

### Phase 1: Core Page & Countdown (US1 — P1)

**Goal**: Full countdown page working on desktop with real timer

1. Create `src/app/countdown/page.tsx` (Server Component):
   - Auth check via Supabase server client
   - Event-started check → `redirect("/")` if already started
   - Read locale, get dictionary
   - Render background image + gradient overlay + countdown timer

2. Create `src/components/countdown/PrelaunchDigitCard.tsx`:
   - Glassmorphism card matching design-style.md specs
   - 77x123px, gradient bg, gold border, blur, opacity 0.5
   - Centered Digital Numbers digit text

3. Create `src/components/countdown/PrelaunchCountdownTimer.tsx` (Client Component):
   - Accept `targetDate`, `serverNow`, i18n labels as props
   - On mount: calculate clock offset `serverNow - Date.now()`, store in ref
   - Local state: `timeRemaining`, `status` (loading → active → completed)
   - `useEffect` with `setInterval(60_000)` for countdown updates (apply clock offset)
   - `useEffect`: when `timeRemaining` reaches zero → `useRouter().push("/")`
   - `role="timer"`, `aria-live="polite"`, `aria-label` per countdown unit
   - Render: title (Montserrat Bold Italic), 3 × CountdownUnit (2 digit cards + label)

4. Update `src/middleware.ts`:
   - Import `EVENT_CONFIG` or read `NEXT_PUBLIC_EVENT_START_TIME`
   - Add logic: if event not started + user authenticated + path is `/` → redirect to `/countdown`
   - Add `/countdown` to protected routes (requires auth)

### Phase 2: Responsive Design (US2 — P2)

**Goal**: Page looks great at all breakpoints

1. Add responsive Tailwind classes to all countdown components:
   - Mobile (< 768px): 48x77px cards, 44px digits, 14px labels, 16px gap
   - Tablet (768-1023px): 60x96px cards, 56px digits, 24px labels, 40px gap
   - Desktop (≥ 1024px): Figma values (77x123px cards, 73.73px digits, 36px labels, 60px gap)
2. Background image responsive handling (object-cover, overflow-hidden)
3. Title responsive sizing (20px mobile → 28px tablet → 36px desktop)
4. Test at 320px, 375px, 768px, 1024px, 1280px, 1440px (all constitution-mandated breakpoints)

### Phase 3: Auto-redirect & Edge Cases (US3 — P2)

**Goal**: Smooth transition from prelaunch to live event

1. Client-side: Implement redirect in `useEffect` when `timeRemaining` reaches zero → `router.push("/")`
2. Loading state: Show skeleton/spinner while page hydrates (initial `status: 'loading'` → transitions to `'active'` after first `calculateTimeLeft` call in `useEffect`)
3. Error state: If `targetDate` is null/invalid, show error message with retry button (use standard button styling, native `<button>` for keyboard accessibility). Retry button triggers `window.location.reload()`. No automatic retries are needed because the event time comes from env var/static config (not a fetch) — if it's missing, a page reload re-runs the Server Component which will re-read the value.
4. Edge case: Days > 99 → gracefully handle (split into 3+ digit cards or cap display at 99)

> **Note**: Server-side redirect (event already started → `/`) is already handled in Phase 1 step 1 as part of the page component's initial checks.

### Phase 4: i18n & Polish (US4 — P3)

**Goal**: Multi-language support + final polish

1. Verify `countdown_title` renders correctly for vi/en/ja
2. Add page load fade-in animation (opacity transition)
3. Optional: Add digit flip animation on value change (CSS transition)
4. Verify `prefers-reduced-motion` support (already in globals.css)
5. Performance: Verify LCP < 2s (background image priority loading)

---

## Detailed Component Specifications

### `src/app/countdown/page.tsx` (Server Component)

```typescript
// Pseudocode
export default async function CountdownPage() {
  // 1. Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. Event status check
  const eventStartTime = process.env.NEXT_PUBLIC_EVENT_START_TIME 
    || EVENT_CONFIG.event_start_date;
  const hasStarted = new Date(eventStartTime) <= new Date();
  if (hasStarted) redirect("/");

  // 3. i18n
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "vi") as Language;
  const dictionary = getDictionary(locale);

  // 4. Server timestamp for clock drift correction
  //    Client uses this to calculate offset: serverNow - clientNow
  const serverNow = Date.now();

  // 5. Render
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg-primary)]">
      {/* BG Image */}
      <Image src="/assets/countdown/background.png" alt="" fill priority sizes="100vw" className="object-cover" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(18deg, ...)" }} />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <PrelaunchCountdownTimer
          targetDate={eventStartTime}
          serverNow={serverNow}
          title={dictionary.countdown_title}
          daysLabel={dictionary.countdown_days}
          hoursLabel={dictionary.countdown_hours}
          minutesLabel={dictionary.countdown_minutes}
        />
      </div>
    </div>
  );
}
```

### `src/middleware.ts` — Changes

```typescript
// Add to middleware logic (pseudocode):
const eventStartTime = process.env.NEXT_PUBLIC_EVENT_START_TIME 
  || EVENT_CONFIG.event_start_date;
const eventHasStarted = eventStartTime 
  ? new Date(eventStartTime) <= new Date() 
  : true; // If no config, assume started (don't block)

// Redirect authenticated users: / → /countdown (when event not started)
if (user && pathname === "/" && !eventHasStarted) {
  url.pathname = "/countdown";
  return NextResponse.redirect(url);
}

// Redirect from /countdown to / when event has started
if (pathname === "/countdown" && eventHasStarted) {
  url.pathname = "/";
  return NextResponse.redirect(url);
}

// Existing: redirect authenticated users from /login → /
if (user && pathname === "/login") {
  url.pathname = eventHasStarted ? "/" : "/countdown";
  return NextResponse.redirect(url);
}
```

> **Note**: `EVENT_CONFIG` is imported from `@/libs/data/homepage`. This is a static import — safe for middleware since it's a plain object with no Node.js APIs.

> **Auth scope**: The middleware auth redirect for unauthenticated users is currently disabled (TODO comments) for all routes. This plan does NOT re-enable it globally. Instead, the `/countdown` page component handles its own auth check via `supabase.auth.getUser()` → `redirect("/login")`. The middleware only handles event-based routing (`/` ↔ `/countdown`) and the existing login redirect. When the global TODO is resolved later, `/countdown` should be added as a protected route in the middleware as well.

### `src/components/countdown/PrelaunchDigitCard.tsx`

Key styling from design-style.md:
```tsx
// Outer container: 77x123px (desktop), responsive sizing at breakpoints
// Inner bg: gradient + border + opacity + blur (glassmorphism)
// Text: Digital Numbers font, 73.73px, white, centered

<div className="relative w-12 h-[77px] md:w-[60px] md:h-24 lg:w-[77px] lg:h-[123px] flex items-center justify-center">
  {/* Glassmorphism background */}
  <div className="absolute inset-0 rounded-lg md:rounded-[10px] lg:rounded-xl
    border-[0.75px] border-[var(--color-primary)] opacity-50
    bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.10)_100%)]
    backdrop-blur-[24.96px] [-webkit-backdrop-filter:blur(24.96px)]" />
  {/* Digit */}
  <span className="relative z-10 font-[family-name:var(--font-digital-numbers)]
    text-[44px] md:text-[56px] lg:text-[73.73px] text-white leading-none">
    {digit}
  </span>
</div>
```

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Background image not exported from Figma | Medium | High | Use `get_media_files` tool; fallback to hero-keyvisual.png if needed |
| Middleware redirect loop (/ ↔ /countdown) | Low | High | Guard with explicit event-started check in both directions; add `/countdown` to matcher |
| Digital Numbers font rendering inconsistent cross-browser | Low | Medium | Already loaded via `next/font/local` with `display: swap`; fallback to monospace |
| `backdrop-filter: blur()` not supported in older browsers | Low | Low | Add `-webkit-` prefix; graceful degradation (card still renders without blur) |
| Clock drift shows wrong countdown values | Medium | Medium | Pass `serverNow` (from Server Component) as prop. Client calculates offset: `serverNow - Date.now()`. Use offset + `performance.now()` for elapsed time tracking instead of repeated `Date.now()` calls |
| Auth check disabled in middleware (TODO comments) | High | Medium | Plan enables auth redirect in middleware for `/countdown`; keep TODO for other routes |

### Estimated Complexity

- **Frontend**: **Medium** — New page + 3 components, responsive, glassmorphism CSS
- **Backend**: **Low** — Middleware changes only, no API endpoints
- **Testing**: **Low** — Unit tests for countdown logic, E2E for redirect flow

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: CountdownTimer rendering with digit cards
- [x] **External dependencies**: Middleware auth redirect, Supabase session check
- [ ] **Data layer**: N/A (no database)
- [x] **User workflows**: Login → Countdown → Homepage redirect flow

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown decrement, digit display, responsive layout |
| Service ↔ Service | Yes | Middleware redirect logic based on event time |
| App ↔ External API | No | No external APIs |
| App ↔ Data Layer | No | No database |
| Cross-platform | Yes | Responsive at 320px, 768px, 1024px, 1440px |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Authenticated user visits `/` before event → redirected to `/countdown`
   - [ ] Countdown page displays with correct timer values
   - [ ] Timer decrements correctly after 60 seconds
   - [ ] Countdown reaches zero → auto-redirect to `/`
   - [ ] User visits `/countdown` after event started → redirected to `/`

2. **Error Handling**
   - [ ] Unauthenticated user visits `/countdown` → redirected to `/login`
   - [ ] No `NEXT_PUBLIC_EVENT_START_TIME` and no `event_start_date` → fallback behavior
   - [ ] Invalid date format → error state displayed

3. **Edge Cases**
   - [ ] Countdown with > 99 days remaining
   - [ ] Countdown with 0 days, 0 hours, 1 minute → transitions to zero correctly
   - [ ] Multiple tabs open — each runs independently
   - [ ] Language switch on countdown page → title updates

### Tooling

- **Unit tests**: Vitest + React Testing Library — `calculateTimeLeft`, `padTwo`, digit card rendering
- **E2E tests**: Playwright — full redirect flow, countdown visual check
- **CI**: Run on PR via existing CI pipeline

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Countdown logic (`calculateTimeLeft`, `padTwo`) | 100% | High |
| Middleware redirect logic | 90%+ | High |
| Component rendering (digit cards, labels) | 80%+ | Medium |
| E2E redirect flow | Key flows | High |
| Responsive layout | Visual only | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved
- [x] `design-style.md` complete
- [ ] Background image downloaded from Figma
- [ ] `NEXT_PUBLIC_EVENT_START_TIME` env var configured as **ISO 8601 UTC string** (e.g., `2025-11-15T09:00:00Z`) — or use existing `EVENT_CONFIG.event_start_date` fallback. UTC format is required to avoid DST issues.

### External Dependencies

- Figma media assets (background artwork) — download via `get_media_files`

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- The existing `CountdownTimer` on the homepage (`src/components/home/CountdownTimer.tsx`) is a **separate component** from the prelaunch timer. They share utility functions but have different visual designs and behaviors.
- The prelaunch page does NOT use `AppHeader` or `AppFooter` — it's a standalone full-screen layout.
- **Network loss during countdown is a non-issue**: Once the page loads, the countdown timer runs entirely client-side using the `targetDate` prop (from env var, not an API). No ongoing network requests are made. The timer continues correctly even offline.
- Middleware currently has auth protection disabled (TODO comments). The plan enables it specifically for the `/countdown` route while preserving the existing TODO state for other routes.
- The `NEXT_PUBLIC_EVENT_START_TIME` environment variable pattern is consistent with Cloudflare Workers deployment (no Node.js APIs, no file system).
- Font loading is already configured in `src/app/layout.tsx`: Montserrat (with italic variant) and Digital Numbers (local font) — no additional font setup needed.
- CSS variables for the prelaunch page will be added to `globals.css` under a `/* === Countdown Prelaunch Design Tokens === */` comment section, consistent with existing organization (Homepage tokens, Awards tokens).
