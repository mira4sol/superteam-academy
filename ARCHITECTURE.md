# System Architecture

The Onchain Academy consists of two primary parts: a Next.js full-stack application that serves the frontend UI and CMS admin panel, and an Anchor-based Solana smart contract that handles state and credentials on-chain.

## Component Structure

The repository is structured as a monorepo containing the Solana program and a web application context:

- **`programs/onchain-academy/`**: The Solana smart contract (Anchor). Handles enrollment validation, lesson completion verification, XP minting, and Metaplex Core credential generation.
- **`apps/academy/`**: The primary web application.
  - **`app/`**: Next.js App Router containing all page routes, API endpoints, and layout files. Supports internationalization (`[locale]`).
  - **`collections/`**: Payload CMS schema definitions. Defines the structure of Courses, Modules, Lessons, Users, etc.
  - **`components/`**: Reusable React components built with Tailwind CSS, Framer Motion, and Shadcn UI.
  - **`libs/`**: Shared utilities, configuration files, and type definitions.
  - **`services/`**: Server-side logic to handle interactions with the Payload CMS database and the Better Auth system.
  - **`hooks/`**: Custom React hooks, notably for fetching data and communicating with the Solana wallet adapter and smart contract.

## Data Flow

### Course Content Delivery

1. Admins create and organize course material within the Payload CMS dashboard (`/admin`).
2. Course data is saved in the PostgreSQL database.
3. The Next.js frontend fetches course data statically or dynamically from the database using server components.
4. Users browse and interact with the localized frontend UI.

### Authentication

1. Users authenticate using GitHub, Google, or direct credentials via Better Auth.
2. The user session establishes an identity in the database, allowing platform progress tracking.
3. Users simultaneously connect their Solana wallet to perform on-chain actions linked to their web2 profile.

### On-Chain Interactions

1. When a user completes a lesson, the frontend triggers a Solana transaction utilizing `useOnchainAcademy` hooks.
2. The user's wallet signs the transaction to record progress on-chain.
3. The backend uses an administrative signer (`backend_signer`) to verify the completion state and mint Token-2022 XP.
4. Upon course completion, the smart contract mints a soulbound Metaplex Core NFT credential to the user's wallet.

## Service Interfaces

### Payload CMS

Payload CMS functions as a headless data layer. Application components interact with the database via Payload's local API, ensuring type safety and abstracting direct SQL queries.

### Better Auth

Authentication is exposed at the `/api/auth/*` routes. State is managed globally on the client and is checked securely on the server to conditionally render restricted lesson content or admin panels.

### Solana Anchor Program

The frontend interacts with the Solana program using `@coral-xyz/anchor`.

Key integration points include:

- `enroll`: Called when a user starts a course. Creates an enrollment Program Derived Address (PDA).
- `complete_lesson`: Submits lesson completion proof to the contract, minting XP to the user.
- `finalize_course`: Closes out an enrollment and awards course completion bonuses.
- `issue_credential`: Triggers the creation of a Metaplex Core NFT upon verified course completion.
