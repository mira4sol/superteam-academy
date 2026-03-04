<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Superteam Academy. The setup includes client-side SDK initialization via `instrumentation-client.ts` (Next.js 15.3+ pattern), a reverse proxy through Next.js rewrites for improved ad-blocker bypass, a server-side PostHog client in `libs/posthog-server.ts`, and 11 product analytics events across 5 files covering the full user journey from sign-in through course completion.

User identification (`posthog.identify`) is called on onboarding completion with username and auth method. Server-side events include the distinct ID from the authenticated session for cross-domain correlation. Error tracking is enabled via `capture_exceptions: true` in the client init.

| Event | Description | File |
|-------|-------------|------|
| `user_signed_in` | User successfully signs in via wallet, Google, or GitHub | `app/(frontend)/[locale]/(auth)/login/Login.tsx` |
| `user_signed_up` | New user completes onboarding profile setup | `app/(frontend)/[locale]/(auth)/login/Login.tsx` |
| `wallet_connected` | Wallet connected during onboarding (via identify call) | `app/(frontend)/[locale]/(auth)/login/Login.tsx` |
| `course_enrolled` | User clicks Enroll Now on a course detail page | `app/(frontend)/[locale]/courses/[slug]/CourseSlug.tsx` |
| `course_continued` | Enrolled user clicks Continue Learning | `app/(frontend)/[locale]/courses/[slug]/CourseSlug.tsx` |
| `lesson_started` | User begins a lesson (on mount) | `app/(frontend)/[locale]/courses/[slug]/lesson/[id]/Lesson.tsx` |
| `lesson_completed` | User completes a lesson and XP is awarded | `app/(frontend)/[locale]/courses/[slug]/lesson/[id]/Lesson.tsx` |
| `quiz_submitted` | User submits quiz answers | `app/(frontend)/[locale]/courses/[slug]/lesson/[id]/Lesson.tsx` |
| `code_challenge_run` | User runs code in a code challenge | `app/(frontend)/[locale]/courses/[slug]/lesson/[id]/Lesson.tsx` |
| `profile_settings_saved` | User saves changes in Settings (profile/preferences/privacy tabs) | `app/(frontend)/[locale]/settings/Settings.tsx` |
| `profile_updated` | Server-side: profile update API succeeds | `app/(frontend)/api/auth/update-profile/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/319751/dashboard/1330935
- **Learning Conversion Funnel** (Sign In → Enrolled → Started → Completed): https://us.posthog.com/project/319751/insights/vGMJpNLW
- **Daily Active Users: Sign Ins vs Sign Ups**: https://us.posthog.com/project/319751/insights/tLtysndy
- **Lesson Engagement (Started vs Completed)**: https://us.posthog.com/project/319751/insights/EjFP2YkF
- **Course Enrollment vs Return Rate**: https://us.posthog.com/project/319751/insights/zu76vbx4
- **Interactive Content Engagement** (Quizzes & Code Challenges): https://us.posthog.com/project/319751/insights/dczbj2b2

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
