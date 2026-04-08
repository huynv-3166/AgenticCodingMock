<!--
Sync Impact Report
- Version change: N/A → 1.0.0 (initial constitution)
- Added sections:
  - Core Principles (5 principles)
  - Technology Stack & Constraints
  - Development Workflow
  - Governance
- Templates requiring updates:
  - .momorph/templates/plan-template.md ✅ aligned (Constitution Compliance Check covers all principles)
  - .momorph/templates/spec-template.md ✅ aligned (responsive breakpoints, security requirements present)
  - .momorph/templates/tasks-template.md ✅ aligned (TDD flow, security hardening phase present)
- Follow-up TODOs: None
-->

# Agentic Coding Live Demo Constitution

## Core Principles

### I. Clean Code & Clear Organization

All source code MUST be concise, readable, and logically organized. Files MUST have a single, clear responsibility. Naming MUST be descriptive and consistent across the codebase.

- Follow the existing folder structure strictly:
  - `src/app/` — Next.js App Router pages and layouts
  - `src/components/` — Reusable UI components, grouped by feature
  - `src/libs/` — Shared utilities and third-party integrations (e.g., Supabase clients)
  - `src/types/` — Shared TypeScript type definitions
- Keep files short. Extract components and utilities when a file exceeds ~200 lines.
- Use TypeScript strict mode (`"strict": true` is already configured). No `any` types unless explicitly justified.
- Prefer named exports over default exports for components and utilities.
- Use path aliases (`@/*` → `./src/*`) for all imports within `src/`.
- Do NOT create unnecessary abstractions, helper files, or wrapper functions for one-time operations.

### II. Next.js, Cloudflare Workers & Supabase Best Practices

All code MUST adhere to the established patterns of the tech stack: Next.js 15 App Router, Cloudflare Workers runtime, and Supabase as the backend service.

- **Next.js App Router**: Use Server Components by default. Only add `"use client"` when the component requires browser APIs, event handlers, or React hooks (`useState`, `useEffect`, etc.).
- **Data fetching**: Prefer Server Components with `async/await` for data loading. Use Supabase server client (`src/libs/supabase/server.ts`) in Server Components and middleware. Use Supabase browser client (`src/libs/supabase/client.ts`) only in Client Components.
- **Cloudflare Workers compatibility**: All server-side code MUST be compatible with the Cloudflare Workers runtime (V8 isolates). Do NOT use Node.js-specific APIs (e.g., `fs`, `path`, `child_process`) in server code. Use Web Standard APIs (`fetch`, `Request`, `Response`, `URL`, `crypto`).
- **Middleware**: Use Next.js middleware (`src/libs/supabase/middleware.ts`) for authentication guards and session refresh. Keep middleware lightweight — no heavy computation or database writes.
- **Environment variables**: Access via `process.env` in Next.js. Use Cloudflare bindings (via `getCloudflareContext()`) for Worker-specific secrets. Never hardcode secrets or API keys.
- **Caching & revalidation**: Use Next.js caching strategies (`revalidatePath`, `revalidateTag`) appropriately. Understand that Cloudflare Workers have their own caching layer.
- **TailwindCSS 4**: Use Tailwind utility classes directly. Avoid custom CSS unless Tailwind cannot express the design. Do NOT use `@apply` excessively.

### III. Test-First Development (TDD)

All new features and bug fixes MUST follow the Test-Driven Development cycle: write tests first, verify they fail, then implement code to make them pass.

- **Red-Green-Refactor**: Write a failing test → Implement minimum code to pass → Refactor while keeping tests green.
- **Test scope**: Unit tests for business logic, utility functions, and data transformations. Integration tests for API routes, database operations, and multi-component workflows. E2E tests for critical user journeys.
- **Test placement**: Co-locate test files with source files using `*.test.ts` / `*.test.tsx` naming, or place in a top-level `tests/` directory for integration/E2E tests.
- **Coverage expectations**: All new code paths MUST have corresponding tests. Critical user flows MUST have E2E coverage.
- Every user story in a spec MUST be independently testable before it is considered complete.

### IV. Responsive Design

The application MUST provide a consistent, usable experience across all device sizes: mobile (320px+), tablet (768px+), and desktop (1024px+).

- **Mobile-first approach**: Write base styles for mobile, then use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) to layer tablet and desktop styles.
- All interactive elements MUST meet minimum touch target size of 44x44px on mobile.
- Navigation MUST adapt appropriately per breakpoint (e.g., hamburger menu on mobile, full navigation on desktop).
- Forms and data tables MUST be usable on narrow viewports without horizontal scrolling.
- Images and media MUST use responsive techniques (`next/image` with appropriate `sizes` attribute, or Tailwind responsive utilities).
- Test all pages at breakpoints: 320px, 375px, 768px, 1024px, 1280px, 1440px.

### V. Security — OWASP Compliance

All code MUST follow OWASP secure coding practices to prevent common web vulnerabilities.

- **Input Validation**: Validate and sanitize ALL user input on the server side. Use schema validation (e.g., Zod) for API route handlers and form submissions. Never trust client-side validation alone.
- **Authentication & Authorization**: Use Supabase Auth for all authentication flows. Verify user sessions in middleware and Server Components. Apply row-level security (RLS) policies in Supabase for data access control.
- **Injection Prevention**: Use Supabase client (parameterized queries) for all database operations — never construct raw SQL from user input. Sanitize any dynamic content rendered in HTML to prevent XSS.
- **CSRF Protection**: Leverage Next.js built-in CSRF protections for Server Actions. Use `SameSite` cookie attributes.
- **Sensitive Data**: Never expose API keys, database credentials, or user tokens in client-side code or logs. Use `NEXT_PUBLIC_` prefix ONLY for values safe for public exposure. Store secrets in Cloudflare Worker secrets or environment variables.
- **Security Headers**: Configure appropriate security headers (`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`) in Next.js middleware or Cloudflare Worker responses.
- **Dependency Security**: Regularly audit dependencies for known vulnerabilities. Do NOT add unnecessary dependencies.

## Technology Stack & Constraints

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| Runtime | React | 19.x |
| Language | TypeScript | 5.x (strict mode) |
| Styling | TailwindCSS | 4.x |
| Backend Service | Supabase (Auth, Database, Realtime) | Latest |
| Deployment | Cloudflare Workers via OpenNext | Latest |
| Package Manager | Yarn | 1.22.22 |
| Node.js | v24.x | Required for development |
| Linting | ESLint (next config) | 9.x |

**Approved libraries** (add new libraries ONLY with justification in plan.md):
- `@supabase/supabase-js`, `@supabase/ssr` — Supabase integration
- `@opennextjs/cloudflare` — Cloudflare Workers deployment
- `next`, `react`, `react-dom` — Core framework
- `tailwindcss`, `@tailwindcss/postcss` — Styling
- `wrangler` — Cloudflare local development and deployment

## Development Workflow

1. **Before coding**: Read the constitution and relevant spec. Ensure `constitution.md` compliance check passes in `plan.md`.
2. **Branching**: Create feature branches from `main`. Use descriptive branch names: `feature/<name>`, `fix/<name>`.
3. **TDD cycle**: Write tests first → Verify failure → Implement → Verify pass → Refactor.
4. **Code style**: Run `yarn lint` before committing. Fix all ESLint warnings and errors.
5. **Commits**: Make small, focused commits. Each commit MUST leave the codebase in a buildable state.
6. **Responsive verification**: Test all UI changes at mobile, tablet, and desktop breakpoints before marking a task complete.
7. **Security review**: Before merging, verify no secrets are exposed, inputs are validated, and auth guards are in place.

## Governance

- This constitution is the authoritative reference for all development decisions in this project. When in conflict with other documents, the constitution takes precedence.
- **Amendments** require: (1) written justification, (2) review by the project lead, (3) version bump following semver, (4) update to all affected templates and documentation.
- **Compliance**: All pull requests and code reviews MUST verify adherence to the principles defined above. Non-compliance MUST be documented with justification in the plan.
- **Versioning**: MAJOR for principle removals or redefinitions, MINOR for new principles or material expansions, PATCH for clarifications and wording fixes.

**Version**: 1.0.0 | **Ratified**: 2026-04-08 | **Last Amended**: 2026-04-08
