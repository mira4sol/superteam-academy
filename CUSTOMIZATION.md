# Platform Customization

Onchain Academy is built for flexibility. You can adjust the visual theme, add languages, and expand the gamified elements.

## Theme Customization

The platform follows an earthy, premium, and nature-forward design language defined by strict color tokens.

To change the design, open `apps/academy/app/globals.css` (or `index.css`) and update the CSS variables. Ensure any new colors align with the existing tokens:

- **Background:** Warm Cream (`#f7eacb`)
- **Primary CTA:** Emerald Green (`#008c4c`)
- **Secondary UI:** Forest Green (`#2f6b3f`)
- **Accent:** Amber Yellow (`#ffd23f`)
- **Text:** Dark Charcoal (`#1b231d`)

If replacing fonts, update the Next.js font configuration in your `layout.tsx` file and adjust the Tailwind config to reference the new font family name. Keep designs clean and avoid unnecessary noise outside of the core 60/30/10 color rules (60% background, 30% primary/secondary greens, 10% accents/text).

## Adding Languages

The platform uses Next-Intl for internationalization. Expanding to a new language involves:

1. **Update Payload CMS Locales**
   In `apps/academy/payload.config.ts`, locate the `localization` block. Add your new language code to the `locales` array (e.g., `'fr'` for French).

2. **Create Translation Files**
   In `apps/academy/messages/`, duplicate an existing language JSON file (like `en.json`) and rename it to your new language code (e.g., `fr.json`). Translate all strings within the file.

3. **Update Frontend Config**
   Modify `apps/academy/i18n/routing.ts` (or the equivalent i18n config file) to include the new locale code in the supported locales array.

## Extending Gamification

Gamification is managed both on-chain and off-chain.

**Modifying XP Rewards:**

- **On-chain**: Update the XP reward logic in the Anchor program within `programs/academy/src/instructions/complete_lesson.rs` or `finalize_course.rs`. Deploy the updated program.
- **Off-chain**: Update the frontend variables indicating exactly how much XP a lesson grants, so users have visual confirmation before completing tasks.

**Adding New Achievements:**

1. Use the `create_achievement_type` instruction on the smart contract to define a new Metaplex Core achievement structure.
2. In the Next.js service layer, construct custom rules (e.g., "7-day login streak") that listen to database events.
3. Once the rule condition is met, use the `award_achievement` contract instruction (via the backend minter role) to mint the NFT to the user.
