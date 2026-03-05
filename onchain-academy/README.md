# Superteam Onchain Academy

Onchain Academy is a premium web3 learning platform. It combines a modern web interface with Solana smart contracts to offer courses, gamified learning, and soulbound on-chain credentials.

## Overview

The platform allows users to enroll in courses, complete lessons, and earn experience points (XP) and achievement badges on-chain. It is built to be fast, localized, and easily manageable through a built-in content management system (CMS).

## Tech Stack

**Frontend & API**

- Next.js (App Router)
- React 19
- Tailwind CSS & Shadcn UI
- Better Auth (Authentication)
- Payload CMS (for course management)
- PostgreSQL (Database)

**Web3 Integration**

- Solana Web3.js & Wallet Adapter
- Anchor Framework (Smart Contracts)
- Metaplex Core (Credentials & Achievements)
- SPL Token-2022 (XP system)

## Local Dev Setup

1. **Install Dependencies**
   Navigate to the web app folder and install the required packages:

   ```bash
   cd apps/academy
   npm install
   ```

2. **Set up the Database**
   Ensure you have PostgreSQL running locally. Create a new database to use for the project.

3. **Configure Environment Variables**
   Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   Fill in the required database and auth values (see the Environment Variables section below).

4. **Initialize Database**
   Run the authentication schema migration and optionally seed initial data:

   ```bash
   npm run better:migrate
   npm run seed
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Environment Variables

These variables need to be set in `apps/academy/.env`:

- `DATABASE_URL`: Your PostgreSQL connection string.
- `PAYLOAD_SECRET`: A string for Payload CMS security.
- `BETTER_AUTH_SECRET`: A string for Better Auth sessions.
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL`: Your app's base URL (e.g., `http://localhost:3000`).
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: Keys for Google login.
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: Keys for GitHub login.
- `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST`: PostHog analytics configuration.
- `SENTRY_AUTH_TOKEN`: Token for error tracking.

## Deployment

1. **Web Application (Vercel)**

   - Import the repository into Vercel.
   - Set the Framework Preset to Next.js.
   - Set the Root Directory to `apps/academy`.
   - Add all environment variables to the Vercel project settings.
   - Trigger a deployment.

2. **Smart Contract**
   - Head to the root directory where the Anchor setup exists.
   - Build and deploy to the Solana network of your choice:
     ```bash
     anchor build
     anchor deploy
     ```
