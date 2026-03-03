# Project description

### title

Superteam Academy

### description

building the ultimate learning platform for Solana-native developers — an open-source, interactive education hub that takes builders from zero to deploying production-ready dApps.

Think "Codecademy meets Cyfrin Updraft" for Solana: gamified progression, interactive coding challenges, on-chain credentials, and a community-driven learning experience built for crypto natives.

We're looking for talented developers and cracked agents to build this platform from the ground up. The winning submission will become the foundation for Solana developer education across Latin America and beyond.

# Overview

Build a production-ready learning management system (LMS) for Solana development, research, and power users.

The platform should:

- Deliver interactive, project-based courses with integrated code editing
- Track learner progress with gamification (XP, streaks, achievements)
- Issue on-chain credentials for course completion
- Support multiple languages (Portuguese, Spanish, English)
- Integrate analytics for user behavior insights
- Be fully open-source and forkable by other communities

On-Chain Program
The platform's gamification and credential logic lives on-chain via an Anchor program. The full spec and code live at github.com/solanabr/superteam-academy — your delivery should be a PR to this repo (inside it's according folder following monorepo structure):

/root
.claude/ (skills & agents)
docs/
onchain-academy/ (program)
-> app (front end client)
-> backend (back end client)

Here's what you need to know:

- XP is a soulbound fungible token (Token-2022, NonTransferable). A learner's token balance = their - XP. Levels are derived: Level = floor(sqrt(xp / 100)).

- Credentials are Metaplex Core NFTs, soulbound via PermanentFreezeDelegate. One NFT per learning track that upgrades in place as the learner progresses — no wallet clutter. Attributes like track, level, courses completed, and total XP are stored on-chain.

- Courses are on-chain PDAs that spawn Enrollment PDAs per learner. Lesson progress is tracked via a 256-bit bitmap (up to 256 lessons per course).

- Enrollments are closeable after completion to reclaim rent. Proof is preserved via the credential NFT and transaction history.

- Streaks are a frontend-only feature — daily activity tracking, streak history visualization, and milestone rewards are not tracked on-chain and should be implemented in the frontend (local storage, database, or CMS).

- Achievements use a bitmap (256 possible) AchievementType defines the badge (name, metadata URI, supply cap, XP reward) and AchievementReceipt records each award to a learner, each backed by a soulbound Metaplex Core NFT..

- Leaderboard is off-chain — derived by indexing XP token balances (Helius DAS API or custom indexer).

- For the full program specification, see docs/SPEC.md. For frontend integration patterns (PDA derivation, instruction usage, events, error codes), see docs/INTEGRATION.md.

# Fully implement on Devnet:

- Wallet authentication (multi-wallet adapter)
- XP balance display from Token-2022 token accounts
- Credential (Metaplex Core NFT) display and verification
- Leaderboard by indexing XP balances
- Course enrollment — the learner signs the enroll transaction directly (no backend needed)

Create clean service interfaces so we can swap local storage for on-chain calls. For example, a LearningProgressService should expose methods like: get progress for a user/course, complete a lesson, get XP balance, get streak data, get leaderboard entries (by weekly/monthly/all-time timeframe), and get credentials for a wallet. See docs/INTEGRATION.md for the exact account structures, instruction parameters, and event signatures your service layer should map to.

# Required technologies:

- TypeScript — strict mode, no any types
- Tailwind CSS — custom theme with design tokens
- Components — shadcn/ui (accessible, composable primitives)
- Headless CMS — payload
- Auth — Solana Wallet Adapter (multi-wallet) + Google sign-in. GitHub sign-in as bonus.
- Analytics — GA4 + heatmaps PostHog + Sentry error monitoring
- i18n — PT-BR, ES, EN from day one. All UI strings externalized, language switcher in header/settings. Course content can remain in original language.

# Account Linking

- Users should be able to:
- Sign up with wallet OR Google OR GitHub
- Link additional auth methods later
- Use any linked method to sign in
- Wallet linking is required to finalize courses and receive credentials

# Code Editor Integration

Implement using one of: embedded Solana Playground (iframe), Monaco Editor, or CodeMirror 6.

Must support: Rust/TypeScript/JSON syntax highlighting, basic autocompletion, error display, and pass/fail feedback for challenges.
