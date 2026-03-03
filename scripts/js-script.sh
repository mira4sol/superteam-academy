#!/bin/bash

cd onchain-academy

export ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
export ANCHOR_WALLET=../wallets/signer.json

npx ts-node scripts/check-xp.ts

# npx onchain-academy/scripts/check-xp.ts