# Superteam Academy

Superteam Academy is a premium, decentralized web3 learning platform on Solana. It combines a Next.js full-stack application with an Anchor-based Solana smart contract.

Learners can enroll in courses, complete lessons to earn soulbound XP tokens, receive Metaplex Core credential NFTs, and collect achievements. The platform features an integrated content management system (CMS) for managing educational material.

## Overview

The platform is structured as a monorepo consisting of:

- **`onchain-academy/`**: The Anchor program handling all on-chain logic (deployable on devnet). Includes Rust source code, tests, and interaction scripts.
- **`onchain-academy/apps/academy`**: The Next.js frontend and admin dashboard. Built with React, Tailwind CSS, and Better Auth.

## Tech Stack

**Frontend & API**

- **Framework**: Next.js (App Router), React 19
- **Styling**: Tailwind CSS & Shadcn UI
- **Authentication**: Better Auth (GitHub, Google, Email)
- **CMS**: Payload CMS (for course and content management)
- **Database**: PostgreSQL

**Web3 Integration**

- **Smart Contracts**: Anchor Framework (Rust)
- **Solana Interaction**: `@solana/web3.js`, `@coral-xyz/anchor`
- **Wallet Connection**: Wallet Adapter React
- **Tokens**: SPL Token-2022 (XP system)
- **Credentials**: Metaplex Core NFTs (soulbound)

## Local Dev Setup

### 1. Web Application

Navigate to the frontend app directory:

```bash
cd onchain-academy/apps/academy
```

Install dependencies:

```bash
npm install
```

Set up the database. Ensure PostgreSQL is running locally and create a new database.

Initialize the structural tables and seed mock data:

```bash
npm run better:migrate
npm run seed
```

Start the local development server:

```bash
npm run dev
```

The app will be accessible at `http://localhost:3000`.

### 2. Smart Contract

Navigate to the Anchor program directory:

```bash
cd onchain-academy
```

Install dependencies and build the program:

```bash
yarn install
anchor build
```

Run tests to verify the setup:

```bash
anchor test
cargo test --manifest-path tests/rust/Cargo.toml
```

## Environment Variables

For the web application, create a `.env` file in `onchain-academy/apps/academy/.env` (copy from `.env.example`):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/superteam_academy
PAYLOAD_SECRET=your_secret_key

BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
```

## Deployment

### Frontend (Vercel)

1. Import your fork of the repository into Vercel.
2. Set the Root Directory to `onchain-academy/apps/academy`.
3. Keep the Framework Preset as Next.js.
4. Add all environment variables from your `.env` to the Vercel project settings.
5. Deploy.

### Smart Contract (Devnet)

From the `onchain-academy` directory:

```bash
anchor build
anchor deploy --provider.cluster devnet
```

Ensure your Anchor.toml is configured for the devnet cluster and you have sufficient SOL in your deployer wallet. You can then run the initialization script:

```bash
npx ts-node scripts/initialize.ts
```
