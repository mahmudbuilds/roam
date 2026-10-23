# 03 · Onboarding Screen

Status: done

## Goal
Build the Roam onboarding screen (`src/app/onboarding.tsx`) matching the attached design with a 3-slide interactive Unsplash photo carousel, sloped SVG bottom sheet, location pill, and action buttons, and connect it as the initial route that progresses into the authentication flow (`src/app/(auth)/sign-in.tsx`) while keeping `/design-system` accessible.

## Decisions
- **Route Structure**:
  - `src/app/index.tsx` redirects to `/onboarding` so `/` always resolves cleanly while making `/onboarding` the initial experience.
  - `src/app/onboarding.tsx` renders the onboarding screen.
  - `src/app/design-system.tsx` preserves the interactive design system reference showcase previously at `src/app/index.tsx`.
  - `src/app/(auth)/_layout.tsx` and `src/app/(auth)/sign-in.tsx` provide the authentication flow screen reached from onboarding.
- **3-Slide Interactive Carousel**:
  - Swiping horizontally or tapping pagination indicators switches between 3 curated slides with Unsplash photography, location badges, headlines, and descriptions.
  - Slide 1 matches the reference mockup word-for-word (`"Whistler, BC"`, `"Find a stay that\nfits your story"`, `"From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip."`).
  - Tapping **Get started** advances to the next slide on slides 1–2 and navigates to `/(auth)/sign-in` on slide 3.
  - Tapping **Skip** or **Continue with Google** navigates directly to `/(auth)/sign-in` from any slide.
- **SVG Contour & Google Logo (`react-native-svg`)**:
  - Install `react-native-svg` via `bunx expo install react-native-svg` (bundled in Expo Go).
  - Render the asymmetric sloped/curved top edge of the bottom white sheet using an `<Svg>` path filled with `colors.surfaceWhite` so the top-left rounded corner slopes down smoothly toward the right edge exactly as in the mockup.
  - Create `src/components/google-logo.tsx` with the official 4-color Google "G" SVG paths (`#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`) for the "Continue with Google" button.
- **Design Tokens & Proposed Additions**:
  - **Existing tokens used**:
    - Colors (`src/theme/colors.ts`): `colors.primaryYellow` (`#FFC629`), `colors.lavender` (`#C9B4FF`), `colors.textPrimary` (`#0B0B1A`), `colors.textSecondary` (`#6B7280`), `colors.surfaceWhite` (`#FFFFFF`), `colors.surfaceGray` (`#F4F5F7`), `colors.borderGray` (`#E5E7EB`).
    - Spacing (`src/theme/spacing.ts`): `spacing.xs` (4), `spacing.sm` (8), `spacing.md` (16), `spacing.lg` (24), `spacing.xl` (32).
    - Radii (`src/theme/radius.ts`): `radius.full` (9999), `radius.xl` (24).
    - Typography (`src/theme/typography.ts`): `type.body` (16pt Regular, lineHeight 24), `type.caption` (14pt Medium, lineHeight 20), `type.button` (17pt SemiBold/Medium, lineHeight 22), `type.subhead` (15pt Medium, lineHeight 20).
  - **Proposed new tokens**:
    - `src/theme/colors.ts` & `global.css`:
      - `colors.skipPillBg`: `"rgba(255, 255, 255, 0.85)"` (`--color-skip-pill-bg`) for the top-right translucent "Skip" pill button.
      - `colors.locationPillBg`: `"rgba(11, 11, 26, 0.62)"` (`--color-location-pill-bg`) for the dark frosted location badge over the hero photo.
      - `colors.locationPillBorder`: `"rgba(255, 255, 255, 0.35)"` (`--color-location-pill-border`) for the subtle 1px border on the location badge.
    - `src/theme/spacing.ts`:
      - `spacing.mdSm`: `12` (for 12px gaps between headline/body and stacked CTA buttons).
    - `src/theme/typography.ts`:
      - `type.heroHeading`: `{ fontFamily: fontFamilies.extraBold, fontSize: 36, lineHeight: 42, letterSpacing: -0.8, color: colors.textPrimary }` for the 2-line onboarding headline.
      - `type.brandWordmark`: `{ fontFamily: fontFamilies.extraBold, fontSize: 38, lineHeight: 42, letterSpacing: -1.5, color: colors.textPrimary }` for the top-left `roam` wordmark.
- **Button Enhancement**:
  - Extend `src/components/button.tsx` with an optional `arrowPosition?: "inline" | "right"` prop (default `"inline"`) so `"Get started"` keeps its label centered while pinning the right arrow icon (`Feather` `arrow-right`) inside the right edge (`right: spacing.lg`), and use `fontFamilies.semiBold` on `type.button` to match the button weight in the design.

## Out of scope
- Live Clerk backend authentication and OAuth token exchange (will be wired in the dedicated Clerk authentication feature).
- Persistent onboarding completion flag in storage (user can always test onboarding from `/onboarding`).

## Steps

### 1. Install `react-native-svg`
Run `bunx expo install react-native-svg` to add Expo-compatible SVG support for the sloped sheet contour and multicolor Google "G" icon.

### 2. Add proposed tokens to `src/theme/` and `global.css`
- Update `src/theme/colors.ts` and `global.css` with `skipPillBg`, `locationPillBg`, and `locationPillBorder`.
- Update `src/theme/spacing.ts` to add `mdSm: 12`.
- Update `src/theme/typography.ts` to add `heroHeading` (36pt ExtraBold, lineHeight 42, letterSpacing -0.8) and `brandWordmark` (38pt ExtraBold, lineHeight 42, letterSpacing -1.5), and update `type.button` to use `fontFamilies.semiBold`.

### 3. Create `GoogleLogo` component and update `Button` primitive
- Create `src/components/google-logo.tsx` rendering the 4-color Google "G" SVG mark (`size` prop defaulting to `20`).
- Update `src/components/button.tsx` to support `arrowPosition?: "inline" | "right"` so the primary CTA can center `"Get started"` while anchoring the right arrow at `right: spacing.lg`.
- Export `GoogleLogo` from `src/components/index.ts`.

### 4. Build the Onboarding Screen (`src/app/onboarding.tsx`)
Build `src/app/onboarding.tsx` matching the attached design:
- **Full-bleed Hero Carousel**:
  - Horizontal paging `FlatList` occupying the top ~64% of the screen (`top: 0`), rendering 3 slides with `expo-image` (`contentFit="cover"`):
    1. **Whistler, BC**: Sunset mountain & lake cabin with glowing deck (`https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85`), title `"Find a stay that\nfits your story"`, body `"From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip."`
    2. **Big Sur, CA**: Oceanfront cliffside retreat (`https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85`), title `"Describe your dream\nstay in one line"`, body `"Tell us what matters—quiet woods, ocean views, pet-friendly decks, or a private hot tub under $300 a night."`
    3. **Sedona, AZ**: Desert luxury retreat at dusk (`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85`), title `"Instant answers,\nzero surprises"`, body `"Ask anything about house rules, pet policies, or check-in details and get exact answers straight from the stay."`
- **Top Overlay Header**:
  - Positioned above the hero image (`paddingTop: insets.top + spacing.sm`, `paddingHorizontal: spacing.lg`).
  - Left: `roam` wordmark using `ThemedText` (`variant="brandWordmark"`).
  - Right: `Skip` pill button (`backgroundColor: colors.skipPillBg`, `borderRadius: radius.full`, `paddingHorizontal: spacing.md`, `paddingVertical: spacing.sm`) that navigates to `/(auth)/sign-in`.
- **Floating Location Badge**:
  - Positioned above the top-left of the sloped white sheet (`left: spacing.lg`), with `backgroundColor: colors.locationPillBg`, `borderColor: colors.locationPillBorder`, `borderWidth: 1`, `borderRadius: radius.full`, `paddingHorizontal: spacing.md`, `paddingVertical: spacing.sm`.
  - Contains `Ionicons` `location-sharp` (`size={16}`, `color={colors.surfaceWhite}`) + slide location text (`variant="caption"`, `color: colors.surfaceWhite`).
- **Sloped White Bottom Sheet**:
  - Uses an `<Svg>` header contour (`viewBox="0 0 390 76"`) that rounds the top-left corner (`Q 0,0 52,4`), slopes down toward the right (`L 346,38`), and rounds into the right edge (`Q 390,44 390,76`), seamlessly connected to the `colors.surfaceWhite` content container below.
  - **Pagination Indicators**: 3 pill bars (`width: 28`, `height: 5`, `borderRadius: radius.full`, `gap: spacing.sm`), active bar in `colors.lavender`, inactive bars in `colors.surfaceGray`.
  - **Copy**: Slide headline (`variant="heroHeading"`) and description (`variant="body"`).
  - **Buttons**:
    - Primary `Button` (`title="Get started"`, `variant="primary"`, `size="lg"`, `showArrow`, `arrowPosition="right"`) that advances slides or enters `/(auth)/sign-in` on the final slide.
    - Secondary `Button` (`title="Continue with Google"`, `variant="secondary"`, `size="lg"`, `leftIcon={<GoogleLogo size={20} />}`) that navigates to `/(auth)/sign-in?provider=google`.

### 5. Connect Navigation Routes (`src/app/`)
- Move the existing design system showcase from `src/app/index.tsx` to `src/app/design-system.tsx` (updating the showcase's Google button to use `<GoogleLogo />` as well).
- Update `src/app/index.tsx` to `<Redirect href="/onboarding" />`.
- Create `src/app/(auth)/_layout.tsx` and `src/app/(auth)/sign-in.tsx` with a cohesive Roam sign-in screen (email & password `InputField`s, primary Sign In `Button`, `Continue with Google` button, and a back button to return to `/onboarding`) so progressing from onboarding into the authentication flow works end-to-end.
- Register the routes in `src/app/_layout.tsx`.

## Verification
1. Run `bun check` to verify zero TypeScript errors.
2. Run `bunx expo lint` to verify zero ESLint warnings or errors.
3. Render `/onboarding` and verify visual fidelity against the attached design:
   - `roam` wordmark and `Skip` pill placement at the top.
   - Full-bleed Unsplash cabin image and dark translucent `Whistler, BC` location badge.
   - Sloped white card top contour, 3 pagination bars (first bar lavender, next two light gray), 2-line ExtraBold headline, body copy, yellow `Get started` pill with right-pinned arrow, and `Continue with Google` pill with 4-color Google logo.
4. Test interactive flows:
   - Swiping the carousel and tapping `Get started` through all 3 slides until navigating to `/(auth)/sign-in`.
   - Tapping `Skip` and `Continue with Google` to navigate directly to `/(auth)/sign-in`.
   - Navigating back to `/onboarding` and visiting `/design-system`.

## AGENTS.md updates
Update the `Expo` / `Design System & Styling` section in `AGENTS.md` to note:
- Routes: `/` redirects to `/onboarding`, `/onboarding` hosts the 3-slide welcome carousel, `/(auth)/sign-in` hosts the authentication entry screen, and `/design-system` hosts the component showcase.
- `react-native-svg` is used for custom vector contours and brand icons (`GoogleLogo`).

## Result
Implemented the 3-slide interactive onboarding screen (`src/app/onboarding.tsx`) matching the design mockup, with Unsplash photography, floating location badge (`Whistler, BC`, `Big Sur, CA`, `Sedona, AZ`), `react-native-svg` sloped white sheet contour, 3-bar pagination indicator, right-pinned arrow `Button`, and 4-color `GoogleLogo` SVG (`src/components/google-logo.tsx`). Connected `/` (`src/app/index.tsx`) to redirect to `/onboarding`, preserved the design system showcase at `/design-system` (`src/app/design-system.tsx`), and wired progression into the authentication flow at `src/app/(auth)/sign-in.tsx`. Verified with `bun check` and `bunx expo lint` (0 errors).

