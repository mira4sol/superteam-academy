## PR Title

**Add Superteam Academy Courses Frontend (Superteam Brazil branding, auth, analytics, onchain stubs)**

---

### Overview

This PR adds the learner-facing courses experience for Superteam Academy, wired to Payload CMS + Postgres, pre-integrated with Anchor-lang JS for a partially onchain, fully stubbed flow, and aligned with the Superteam Brazil brand for an edtech/LMS UX.

---

### Technologies Used

- **Next.js (App Router)**: File-based routing, RSC-first rendering for the Academy frontend, with nested layouts for courses and lessons.
- **next-intl**: Locale-aware routing under `/[locale]` and translation scaffolding for course metadata and UI copy.
- **Auth (Google, GitHub, Solana wallet plugin)**: Centralized auth layer with Google and GitHub OAuth plus a custom Solana wallet auth plugin to tie Web2 identities and wallets to the same learner profile.
- **Shadcn UI**: Accessible, composable UI primitives for layout, cards, tables, dialogs, and form elements.
- **Tailwind CSS**: Utility-first styling to implement the Superteam Brazil brand system, responsive layouts, and consistent spacing/typography.
- **g4a (GA4)**: Google Analytics 4 integration for high-level traffic and funnel tracking.
- **PostHog**: Product analytics for event-level behavior (e.g. course views, lesson completion attempts).
- **Sentry**: Error and performance monitoring for the courses stack (frontend and API surfaces where applicable).
- **Vercel Analytics**: Edge-native, privacy-friendly web analytics for deployments on Vercel.
- **Anchor-lang JS integration**: Pre-wired client surface (SDK + helpers) to talk to the onchain program for XP/credential flows, currently operating in a stubbed mode.
- **Payload CMS + Postgres**: Headless CMS and relational store for courses, modules, and lessons, used as the fast, low-latency read/write layer for all course content.

---

### Scope of Work – Frontend Route Tree

All primary routes under `onchain-academy/apps/academy/app/(frontend)/[locale]` (landing, courses, dashboard, profile, settings, certificates, leaderboard, paths, and admin):

| Route (per-locale) | File | Description |
| --- | --- | --- |
| `/[locale]` | `page.tsx` | Landing page with hero, primary CTAs, learning path previews, and Superteam Brazil branding. |
| `/[locale]/courses` | `courses/page.tsx` | Course catalog grid with filters, search, and primary enroll/start CTAs. |
| — courses list view | `courses/Courses.tsx` | Reusable course cards, progress display, and analytics/auth wiring. |
| `/[locale]/courses/[slug]` | `courses/[slug]/page.tsx` | Course detail page: syllabus, modules/lessons, XP overview, and enrollment CTA. |
| — course detail component | `courses/[slug]/CourseSlug.tsx` | Course-level layout and data shaping from Payload into presentational UI. |
| `/[locale]/courses/[slug]/lesson/[id]` | `courses/[slug]/lesson/[id]/page.tsx` | Lesson view with content, navigation, and integrated code/challenge interface hooks. |
| — lesson detail component | `courses/[slug]/lesson/[id]/Lesson.tsx` | Lesson shell with completion CTA, progress updates, and space for XP-award wiring. |
| `/[locale]/paths` | `paths/page.tsx` | Learning paths index showing curated tracks (e.g. Solana Fundamentals). |
| — paths list component | `paths/Paths.tsx` | Paths grid and summaries for each curated track. |
| `/[locale]/paths/[slug]` | `paths/[slug]/page.tsx` | Single learning path detail with ordered courses and progress. |
| — path detail component | `paths/[slug]/PathSlug.tsx` | Path layout and data transformation for `[slug]` paths. |
| `/[locale]/leaderboard` | `leaderboard/page.tsx` | XP leaderboard view with filters and highlighted current user. |
| — leaderboard component | `leaderboard/Leaderboard.tsx` | Leaderboard table/cards and interaction logic. |
| `/[locale]/dashboard` | `dashboard/page.tsx` | Personal dashboard: current courses, XP snapshot, streaks, and recommendations. |
| — dashboard shell | `dashboard/Dashboard.tsx` | Dashboard layout and aggregation of KPIs, cards, and lists. |
| — dashboard KPIs | `dashboard/KPI.tsx` | XP, streak, and progress widgets for the dashboard. |
| `/[locale]/profile` | `profile/[username]/page.tsx` | User profile surface (self), routed via username. |
| `/[locale]/profile/[username]` | `profile/[username]/page.tsx` | Public profile page with skills, achievements, and completed courses. |
| — profile component | `profile/[username]/Profile.tsx` | Profile layout, stats, and achievements rendering. |
| `/[locale]/profile/set-up` | `profile/set-up/page.tsx` | Profile set-up flow for first-time users. |
| `/[locale]/settings` | `settings/page.tsx` | Account and preferences settings (profile, auth, notifications, language). |
| — settings component | `settings/Settings.tsx` | Settings form UI and sections. |
| `/[locale]/certificates/[id]` | `certificates/[id]/page.tsx` | Certificate view page with visual credential and share/verify actions. |
| — certificate component | `certificates/[id]/Certificate.tsx` | Certificate layout and onchain verification metadata rendering. |
| `/[locale]/admin` | `admin/page.tsx` | Admin overview/dashboard for courses, users, CMS, and analytics. |
| — admin layout | `admin/layout.tsx` | Admin shell with navigation and shared chrome. |
| — admin sidebar | `admin/components/AdminSidebar.tsx` | Sidebar navigation for all admin routes. |
| `/[locale]/admin/courses` | `admin/courses/page.tsx` | Admin courses listing and management surface. |
| — admin courses component | `admin/courses/AdminCourses.tsx` | Course management table, filters, and actions. |
| `/[locale]/admin/users` | `admin/users/page.tsx` | Admin user management page. |
| — admin users component | `admin/users/AdminUsers.tsx` | User list, roles, and controls. |
| `/[locale]/admin/cms` | `admin/cms/page.tsx` | Admin CMS bridge page for managing course content. |
| — admin CMS component | `admin/cms/AdminCMS.tsx` | CMS integration UI and shortcuts into Payload. |
| `/[locale]/admin/analytics` | `admin/analytics/page.tsx` | Admin analytics dashboard for engagement and performance. |
| — admin analytics component | `admin/analytics/AdminAnalytics.tsx` | Charts and KPIs built on top of analytics tools. |
| `/[locale]/login` | `(auth)/login/page.tsx` | Auth entry point with options for Google, GitHub, and Solana wallet. |
| — login component | `(auth)/login/Login.tsx` | Login UI and provider selection. |
| `/[locale]/auth/callback` | `(auth)/auth/callback/page.tsx` | OAuth callback handler route for configured providers. |
| `/[locale]/*` | `[...rest]/page.tsx` / `[...rest]/NotFound.tsx` | Fallback/not-found handling for unknown routes within the locale scope. |

> **Note**: This route tree covers the 12 core surfaces from the scope-of-work (landing, catalog, detail, lesson/challenge, dashboard, profile, leaderboard, settings, certificate) plus the personal dashboard, admin console (all subroutes), and supporting auth/fallback pages.

---

### Branding, UI & UX

- **Branding & colors**: The UI follows the **Superteam Brazil** brand system, with consistent primary and secondary colors, typography, and elevation. Primary CTAs use high-contrast brand colors, with a clear hierarchy between primary, secondary, and tertiary actions.
- **CTA ratios & hierarchy**: Key flows (enroll, start/continue course, complete lesson) have visually dominant CTAs, with restrained secondary actions to keep focus on learning progression. CTA placement and spacing are tuned for both desktop and mobile.
- **Edtech / LMS UX**: Navigation is optimized for course discovery and progression (clear “where am I?” and “what’s next?”), using card grids, breadcrumb-like context, and predictable layout patterns suitable for a modern LMS.

---

### Onchain Integration (Partially Onchain, Fully Stubbed)

- **Partially onchain implementation**: The courses and lessons flows are **shaped around** the onchain program (XP + credentials) via the Anchor-lang JS integration, but onchain writes are currently **stubbed**, so this PR is safe to ship without impacting mainnet.
- **Anchor-lang JS**: The client surface includes the necessary wiring (program ID hooks, provider/pluggable connection, method signatures) so that turning on real onchain calls is a configuration change, not a refactor.

---

### Offchain (Payload) + Onchain (Anchor) Sync

- **Payload CMS + Postgres as source of content**: Course, module, and lesson metadata (titles, slugs, ordering, visibility) live in Payload, giving low-latency reads and simple editorial workflows.
- **Sync model**: The frontend and supporting APIs are structured so that:
  - **Offchain**: Learners always read from Payload/Postgres for content and structure (fast, localized, cacheable).
  - **Onchain**: The Anchor-lang JS layer is responsible for syncing important state to the program (e.g. finalized courses, XP awards, credentials) either eagerly or via background jobs.
- This PR lays the groundwork for that sync by clearly separating **content reads** (Payload) from **credential/XP intents** (Anchor stubs), so future onchain wiring is straightforward.

