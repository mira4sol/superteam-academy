# System Architecture

The Superteam Academy architecture consists of three core domains: a Next.js full-stack application (serving the UI and CMS), an off-chain Backend (API validating lessons and acting as a co-signer), and an Anchor-based Solana Smart Contract (handling state, XP tokens, and NFTs).

## System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                        │
│                                                                  │
│  Wallet Adapter  ──  Anchor Client  ──  Helius DAS API           │
└────────┬─────────────────────┬───────────────────┬──────────────┘
         │ learner signs       │ read accounts     │ leaderboard +
         │ (enroll, close)     │ (course, enroll)  │ credential NFTs
         │                     │                   │
┌────────▼─────────────────────▼───────────────────▼──────────────┐
│                        BACKEND (API)                             │
│                                                                  │
│  Validates lesson completion, checks auth, triggers CMS updates  │
│  Holds: `backend_signer` role to co-sign on-chain state changes  │
└────────┬─────────────────────────────────────────────────────────┘
         │ co-signed transactions
         │
┌────────▼─────────────────────────────────────────────────────────┐
│                   SOLANA (On-Chain Program)                       │
│                                                                  │
│  Courses, Enrollments, MinterRoles, and Achievements PDAs        │
│  Mints Soulbound XP Tokens (Token-2022)                          │
│  Mints Credential NFTs (Metaplex Core)                           │
└──────────────────────────────────────────────────────────────────┘
```

## Component Structure

The repository is structured as a monorepo housing both the Solana program and the web application:

- **`onchain-academy/programs/academy/`**: The Rust-based Solana smart contract. It handles enrollment validation, secure state progression using bitmaps, XP minting, and interaction with Metaplex Core.
- **`onchain-academy/apps/academy/`**: The primary Next.js web application.
  - **`app/`**: Next.js App Router handling frontend routes and backend APIs (`/api/*`).
  - **`collections/`**: Payload CMS schemas defining Courses, Modules, Lessons, and Users.
  - **`services/`**: Server-side logic to handle interactions with the Payload database and enforce server-side validation before signing Solana transactions.
  - **`hooks/useOnchainAcademy.ts`**: The primary React hook utilizing `@coral-xyz/anchor` to communicate with the Solana network.

## Data Flow: Core Learning Loop

The learning process combines web2 user validation with web3 proof-of-work:

1. **Enrollment**:
   - A user connects their wallet and clicks Enroll.
   - The frontend (`useOnchainAcademy().enroll`) initializes an `Enrollment` PDA tied to the user's wallet and the specific Course PDA.
2. **Completing a Lesson**:
   - The user completes a quiz or task on the frontend.
   - The frontend triggers a backend API to validate the completion.
   - The backend signs `complete_lesson` alongside the user. This updates a bit in the Enrollment's progress bitmap and mints the lesson's XP to the user's Token-2022 wallet.
3. **Finalizing a Course**:
   - Once all bits in the lesson bitmap are flipped, the backend signs `finalize_course` to mark the enrollment as fully complete, distribute bonus completion XP, and reward the course creator.
4. **Issuing Credentials**:
   - With the course finalized, the backend invokes `issue_credential`.
   - A soulbound Metaplex Core NFT credential is minted to the user's wallet as permanent, immutable proof of their achievement.

## Service Interfaces & Integrations

### Payload CMS

Functions as a headless data layer running closely inside the Next.js process. The frontend uses server-side components to directly fetch course structures locally, avoiding round-trip API delays.

### Better Auth

Handles authentication (Email, GitHub, Google) to map off-chain identities to on-chain wallets, restricting access to lesson content based on the user's authorization status.

### On-Chain Integration points (`useOnchainAcademy`)

The custom React hook `useOnchainAcademy.ts` bridges the Next.js frontend with the Solana smart contract:

- **Queries (`getConfig`)**: Reads the global Config PDA to identify active mints and authorities.
- **Learner Methods**:
  - `enroll`: Called directly by the learner's wallet to initialize their progress tracker (PDA).
  - `closeEnrollment`: Allows learners to reclaim rent for dropped courses (enforces a 24-hour cooldown).
- **Backend/Admin Methods** (Triggered via API endpoints relying on the `backend_signer`):
  - `completeLesson`: Co-signs lesson completion bits.
  - `finalizeCourse`: Formally locks an enrollment as completed.
  - `issueCredential` & `upgradeCredential`: Handles Metaplex Core NFT CPIs to issue permanent certificates.
  - `rewardXp` & `awardAchievement`: Called by registered `MinterRole` delegates to distribute dynamic XP or NFT badges for non-course tasks (e.g., maintaining a daily streak).
  - `createCourse` & `updateCourse`: Executed by admins alongside Payload CMS publishes to map web2 courses to web3 PDAs.
