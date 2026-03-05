# Platform Customization

The Superteam Academy platform emphasizes an earthy, premium, and nature-forward design.

## Theme Customization

To modify the visual language without breaking the design system, adjust the CSS tokens in `onchain-academy/apps/academy/app/globals.css`.

Maintain these design token rules:

- **Background**: Warm Cream (`#f7eacb`)
- **Primary CTA**: Emerald Green (`#008c4c`)
- **Secondary UI**: Forest Green (`#2f6b3f`)
- **Accent Highlight**: Amber Yellow (`#ffd23f`)
- **Text & Dark Mode**: Dark Charcoal (`#1b231d`)

Adhere to the 60/30/10 spatial distribution for colors to maintain the premium feel.

## Adding Languages (i18n)

The academy is multi-lingual out of the box (Next-Intl).

1. Update `onchain-academy/apps/academy/payload.config.ts` to add the locale code to Payload's config.
2. Add a new translation file in `onchain-academy/apps/academy/messages/` (e.g., `es.json` for Spanish).
3. Translate all dictionary values.
4. Update the frontend routing config to recognize the new path locale.

## Extending Gamification

- **XP Rewards**: Can be tweaked in the Anchor program logic or in the Next.js service parameters before signing the state up to the Solana chain.
- **Achievements**: Add new rules in the backend (e.g., perfect course score) and issue Metaplex Core NFTs using the specific `award_achievement` program instruction.
