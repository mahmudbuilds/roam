# 02 · Design System Implementation

Status: done

## Goal
Implement Roam's complete design system from the reference board in code, providing design tokens (colors, typography, spacing, radii, shadows, motion) in both TypeScript (`src/theme/`) and Tailwind CSS v4 (`global.css`), a suite of accessible reusable primitives (`src/components/`), and an interactive showcase in `src/app/index.tsx` demonstrating all 15 reference sections.

## Decisions
- **Design Tokens Organization**: Store TypeScript design tokens under `src/theme/` (`colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, `motion.ts`, `index.ts`) as recommended by the `expo-design-system` skill.
- **NativeWind & Tailwind v4 Integration**: Mirror all tokens into `global.css` via `@theme` variables (`--color-primary-yellow`, `--color-lavender`, `--color-text-primary`, `--color-text-secondary`, `--color-surface-white`, `--color-surface-gray`, `--color-border-gray`, `--radius-*`, etc.) so they are usable as Tailwind utility classes (`bg-primary-yellow`, `text-lavender`, etc.).
- **Typography & Font**: Use Plus Jakarta Sans via `@expo-google-fonts/plus-jakarta-sans` with `expo-font` to match the geometric sans-serif type in the design reference (Bold, Medium, Regular), with system geometric sans fallback.
- **Iconography**: Use `@expo/vector-icons` (Ionicons / Feather / MaterialIcons) cross-platform for consistent icons (search, sliders, heart, share, bookmark, pin, star, check, xmark, lock, eye, bag, card, list, map, etc.) and `expo-symbols` on iOS where native SF Symbols enhance the feel.
- **Component Primitives**: Implement in `src/components/` following the component contract (variants, sizes, states, style override, accessibility):
  - `ThemedText`: Display, Heading, Title, Body, Caption, Button variants.
  - `Button`: Primary (Yellow pill with arrow), Secondary (White pill with border/icon), Ghost, and Icon button (circular).
  - `InputField` & `SearchField`: Search with filter trigger, form field with left icon and lavender focus border, password field with visibility toggle.
  - `FilterChip` & `CategoryChip`: Pill chips with active/inactive states and icon + label support.
  - `Badge`: Guest favorite (yellow/star), New (mint), Discount (pink), Superhost (blue), and amenity tags.
  - `Card`: Base card with surface-white, continuous radius, and shadow.
  - `PolicyCard`: Card with lavender icon square, title, subtitle, and chevron.
  - `ProfileRow`: Grouped list row with icon, label, chevron, and separator.
  - `SegmentedControl`: Pill segmented control with dark active pill (e.g. List / Map).
  - `Toggle`: Primary yellow switch toggle.
  - `Stepper`: Pill counter with minus, count, and plus buttons.
  - `AlertBanner`: Success and Error banners with icon, text, and dismiss action.
  - `ListingCard`: Property card with image, floating favorite heart, title, rating, tags, and price per night.
  - `GlassTabBar`: Floating liquid glass bottom navigation bar with yellow circular active indicator.
- **Interactive Showcase**: Wire up `src/app/index.tsx` to display an organized, interactive catalog of all 15 sections from the reference image.

## Out of scope
- Backend Sanity data fetching (handled in upcoming stay catalog features).
- Navigation routing between separate screens (only the showcase on the root index for verification).
- Clerk authentication logic (handled in auth feature).

## Steps
### 1. Install font and icon dependencies
Install `@expo-google-fonts/plus-jakarta-sans` and `@expo/vector-icons` via `bunx expo install`:
- `bunx expo install @expo-google-fonts/plus-jakarta-sans @expo/vector-icons`

### 2. Configure Tailwind CSS v4 Theme Tokens in `global.css`
Update `global.css` with `@theme` block defining:
- Palette: `--color-primary-yellow: #FFC629;`, `--color-lavender: #C9B4FF;`, `--color-text-primary: #0B0B1A;`, `--color-text-secondary: #6B7280;`, `--color-surface-white: #FFFFFF;`, `--color-surface-gray: #F4F5F7;`, `--color-border-gray: #E5E7EB;`, `--color-glass-blur: rgba(255, 255, 255, 0.7);`
- Alert colors: `--color-success: #10B981;`, `--color-success-bg: #E8F5E9;`, `--color-error: #EF4444;`, `--color-error-bg: #FEE2E2;`
- Radii: `--radius-sm: 8px;`, `--radius-md: 12px;`, `--radius-lg: 16px;`, `--radius-xl: 24px;`, `--radius-full: 9999px;`
- Font families: `--font-sans: 'PlusJakartaSans_400Regular', sans-serif;`, `--font-display: 'PlusJakartaSans_700Bold', sans-serif;`

### 3. Create TypeScript Design System Tokens (`src/theme/`)
Create token modules:
- `src/theme/colors.ts`: Palette colors, semantic platform mapping, and badge colors.
- `src/theme/spacing.ts`: 4-point grid (`xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48`).
- `src/theme/typography.ts`: Type scale matching the reference (display: 56-64, heading: 28-32, body: 16, caption: 14, button: 17-18).
- `src/theme/radius.ts`: `sm: 8, md: 12, lg: 16, xl: 24, full: 9999`.
- `src/theme/shadows.ts`: `card`, `raised`, `overlay`, `tabBar`.
- `src/theme/motion.ts`: `fast: 150, base: 250, slow: 400`.
- `src/theme/index.ts`: Unified re-export.

### 4. Build Typography & Base Components (`src/components/`)
Create core primitives:
- `src/components/themed-text.tsx`: Responsive typography supporting variants with Plus Jakarta Sans.
- `src/components/button.tsx`: Primary yellow, secondary white with border, ghost, and icon variants with touch feedback.
- `src/components/input-field.tsx`: Search field, standard text input with lavender focus border, and password field.
- `src/components/badge.tsx`: Guest favorite, new, discount, superhost, and amenity badge tags.
- `src/components/filter-chip.tsx`: Filter chips and category chips with icon and active states.
- `src/components/card.tsx`: Surface-white continuous rounded card container with elevation.

### 5. Build Specialized Controls & Composite Components
- `src/components/segmented-control.tsx`: List / Map pill selector.
- `src/components/stepper.tsx`: Numeric stepper control (- / +).
- `src/components/toggle.tsx`: Roam yellow switch component.
- `src/components/alert-banner.tsx`: Success / error message bars with dismiss buttons.
- `src/components/policy-card.tsx`: Card with lavender icon square, title, subtitle, chevron.
- `src/components/profile-row.tsx`: Settings/profile row with icon, title, chevron, and separator.
- `src/components/listing-card.tsx`: Cabin listing card matching Section 07 with image, rating, badge, and price.
- `src/components/glass-tab-bar.tsx`: Liquid glass floating navigation bar matching Section 10.

### 6. Wire Font Loading in Root Layout and Create Interactive Showcase
- In `src/app/_layout.tsx`: Load Plus Jakarta Sans fonts with `useFonts` from `@expo-google-fonts/plus-jakarta-sans` and prevent splash screen hide until fonts are ready.
- In `src/app/index.tsx`: Build an interactive showcase featuring sections 01 through 15 with interactive controls (clicking chips, toggling switches, adjusting stepper, typing in inputs, alert dismissals).

## Verification
1. Run `bun check` to verify 0 TypeScript type errors.
2. Run `bunx expo lint` to ensure 0 lint errors.
3. Test bundling and render in web / simulator to confirm visual fidelity with the reference board:
   - Palette colors match hex codes exactly.
   - Typography scales and font weights match.
   - Interactive components respond to press and touch.

## AGENTS.md updates
Add Design System section to AGENTS.md documenting:
- Font: Plus Jakarta Sans via `@expo-google-fonts/plus-jakarta-sans`.
- Tokens: `src/theme/` and `@theme` in `global.css`.
- Core primitives in `src/components/` and their variant conventions.

## Result
Complete design system implemented with high visual fidelity against the reference image. All tokens are available via `@/theme` (TypeScript) and `@theme` in `global.css` (Tailwind classes). Reusable primitives for all 15 sections are built under `src/components/` and interactively demonstrated in `src/app/index.tsx`. Type checks (`bun check`), linter (`bunx expo lint`), and web bundle export verified with zero errors.
