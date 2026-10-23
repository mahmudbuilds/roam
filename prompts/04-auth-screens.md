# 04 · Auth Screens (Sign Up, Verification, Sign In)

Status: done

## Goal
Build the Roam **Create your account** (`/(auth)/sign-up`), **Verify your email** (`/(auth)/verify`), and **Sign in** (`/(auth)/sign-in`) screens matching the attached design, with stacked-label form inputs, a 6-digit OTP verification input, form validation, and complete mocked navigation into a placeholder authenticated home screen (`/home`).

## Decisions
- **Route Structure & Navigation Flow**:
  - `src/app/onboarding.tsx`: Both **Get started** (on the final slide) and **Skip** navigate to `/(auth)/sign-up`. **Continue with Google** navigates to `/(auth)/sign-up?provider=google`.
  - `src/app/(auth)/sign-up.tsx`: **Create your account** screen matching the attached mockup word-for-word.
    - Submitting valid `Full name`, `Email address`, and `Password` (≥ 8 characters) navigates to `/(auth)/verify` with `{ name, email }` route params.
    - Tapping **Continue with Google** or **Continue with Apple** triggers a brief loading state and navigates to `/home` with `{ name, email, provider }`.
    - Tapping **Sign in** in the footer navigates to `/(auth)/sign-in`.
  - `src/app/(auth)/verify.tsx`: **Verify your email** screen derived from the Sign Up visual language.
    - Displays a 6-digit OTP code input with auto-advance, backspace navigation, and paste support.
    - Submitting a 6-digit code navigates to `/home` with `{ name, email }`.
    - Tapping **Resend code** shows an in-screen confirmation `AlertBanner` (`"A new 6-digit verification code has been sent."`).
  - `src/app/(auth)/sign-in.tsx`: **Welcome back** (Sign In) screen updated to match the attached Sign Up design layout:
    - Circular `<` (`chevron-left`) back button on the left and right-aligned `roam` wordmark on the right.
    - Stacked-label `InputField` cards for `Email address` and `Password`, plus a `Forgot password?` action that shows a mocked password-reset `AlertBanner`.
    - Primary yellow **Sign in** CTA with right-pinned arrow, `"or"` horizontal divider, **Continue with Google** and **Continue with Apple** secondary buttons, and bottom `Don't have an account? Create account` underlined link.
    - Submitting valid email & password or tapping Google/Apple navigates to `/home`.
  - `src/app/home.tsx`: Placeholder authenticated home screen showing the signed-in guest summary, stay search preview, and a **Sign out** button that returns to `/(auth)/sign-in`.
- **Stacked-Label `InputField` Enhancement (`src/components/input-field.tsx`)**:
  - Render the existing `label?: string` prop inside the `InputField` card above the `TextInput` so stacked-label form cards match the mockup:
    - Outer container: `backgroundColor: isFocused ? colors.surfaceWhite : colors.surfaceGray`, `borderRadius: radius.lg` (16px), `borderWidth: 1.5`, `borderColor: error ? colors.error : isFocused ? colors.lavender : colors.surfaceGray`, `paddingHorizontal: spacing.md` (16px), `paddingVertical: spacing.mdSm` (12px), `minHeight: 68`, `gap: spacing.md`.
    - Pressing anywhere on the card focuses the inner `TextInput`.
    - Left icon (`Feather` `user`, `mail`, `lock`, size `20`, `color: colors.textPrimary`) centered vertically on the left.
    - Middle column (`flex: 1`, `gap: 2`): `label` (`fontFamilies.semiBold`, `fontSize: 13`, `lineHeight: 18`, `color: colors.textPrimary`) stacked above `TextInput` (`fontFamilies.regular`, `fontSize: 15`, `lineHeight: 20`, `color: colors.textPrimary`, `placeholderTextColor: colors.textSecondary`).
    - Right icon for `isPassword`: `Feather` `eye-off` / `eye` (`size={20}`, `color={colors.textPrimary}`).
    - Optional `error?: boolean` prop to highlight invalid fields with `colors.error`.
  - Preserve single-line behavior when `label` is omitted so existing usages in `/design-system` continue to work unchanged.
- **Design Tokens Used (No New Tokens Needed)**:
  - Colors (`src/theme/colors.ts`): `colors.primaryYellow` (`#FFC629`), `colors.lavender` (`#C9B4FF`), `colors.textPrimary` (`#0B0B1A`), `colors.textSecondary` (`#6B7280`), `colors.surfaceWhite` (`#FFFFFF`), `colors.surfaceGray` (`#F4F5F7`), `colors.borderGray` (`#E5E7EB`), `colors.error` (`#EF4444`), `colors.success` (`#10B981`).
  - Spacing (`src/theme/spacing.ts`): `spacing.xs` (4), `spacing.sm` (8), `spacing.mdSm` (12), `spacing.md` (16), `spacing.lg` (24), `spacing.xl` (32).
  - Radii (`src/theme/radius.ts`): `radius.md` (12), `radius.lg` (16), `radius.full` (9999).
  - Typography (`src/theme/typography.ts`): `type.brandWordmark`, `type.heroHeading`, `type.body`, `type.subhead`, `type.label`, `type.caption`, `type.button`.

## Out of scope
- Live Clerk SDK integration, session persistence, and real OAuth / OTP network requests (kept mocked for now per request).
- Real property search on the placeholder `/home` screen.

## Steps

### 1. Enhance `InputField` for stacked interior labels (`src/components/input-field.tsx`)
- Update `src/components/input-field.tsx` to render `label` when provided as a stacked 2-line interior layout (`minHeight: 68`, `paddingHorizontal: spacing.md`, `paddingVertical: spacing.mdSm`, `gap: spacing.md`, soft `colors.surfaceGray` fill with `colors.lavender` focus ring and optional `error?: boolean` border).
- Add an internal `TextInput` ref so tapping anywhere on the stacked card focuses the input.
- Update the password visibility toggle icon color to `colors.textPrimary` when `label` is present to match the mockup.

### 2. Build the Sign Up screen (`src/app/(auth)/sign-up.tsx`)
- Create `src/app/(auth)/sign-up.tsx` matching the attached design:
  - **Top bar**: Circular back button (`Button` `variant="icon"`, `size="md"`, `Feather` `chevron-left` size `20`, `color={colors.textPrimary}`) on the left; `roam` wordmark (`variant="brandWordmark"`, `fontSize: 28`, `lineHeight: 34`) on the right.
  - **Header**:
    - Title: `"Create\nyour account"` (`variant="heroHeading"`, `fontSize: 36`, `lineHeight: 42`).
    - Subtitle: `"Join roam to save your stays, get personalized recommendations and access them across all your devices."` (`variant="subhead"`, `fontSize: 15.5`, `lineHeight: 22`, `color: colors.textSecondary`).
  - **Stacked-label form fields** (`gap: spacing.mdSm`):
    - `Full name` (`placeholder="e.g. Adrian Hajdin"`, left icon `Feather` `user` size `20`, `autoCapitalize="words"`).
    - `Email address` (`placeholder="you@example.com"`, left icon `Feather` `mail` size `20`, `keyboardType="email-address"`, `autoCapitalize="none"`).
    - `Password` (`placeholder="At least 8 characters"`, left icon `Feather` `lock` size `20`, `isPassword`).
  - **Primary CTA**: `Button` (`title="Create account"`, `variant="primary"`, `size="lg"`, `showArrow`, `arrowPosition="right"`). Validates that name is non-empty, email contains `@`, and password is at least 8 characters; shows an `AlertBanner` (`type="error"`) if invalid, or navigates to `/(auth)/verify` with `{ name, email }`.
  - **Divider**: Horizontal rule (`height: 1`, `backgroundColor: colors.borderGray`) with centered `"or"` (`variant="caption"`, `color: colors.textSecondary`).
  - **Social buttons** (`gap: spacing.mdSm`):
    - `Continue with Google` (`variant="secondary"`, `size="lg"`, `leftIcon={<GoogleLogo size={20} />}`).
    - `Continue with Apple` (`variant="secondary"`, `size="lg"`, `leftIcon={<Ionicons name="logo-apple" size={22} color={colors.textPrimary} />}`).
  - **Footer**: Centered `"Already have an account? "` + tappable `"Sign in"` (`color: colors.textPrimary`, `fontFamily: fontFamilies.semiBold`, `textDecorationLine: "underline"`) navigating to `/(auth)/sign-in`.

### 3. Build the Signup Verification screen (`src/app/(auth)/verify.tsx`)
- Create `src/app/(auth)/verify.tsx` matching the same header, typography, and surface tokens:
  - **Top bar**: Circular `<` (`chevron-left`) back button on the left; `roam` wordmark on the right.
  - **Header**:
    - Title: `"Verify your\nemail"` (`variant="heroHeading"`, `fontSize: 36`, `lineHeight: 42`).
    - Subtitle: `"We sent a 6-digit verification code to "` + bold email (`params.email || "you@example.com"`) + `". Enter it below to verify your account."`
  - **6-Digit OTP Input**:
    - 6 rounded input cells (`flex: 1`, `height: 62`, `borderRadius: radius.lg`, `backgroundColor: colors.surfaceGray`, `borderWidth: 1.5`, `borderColor: isFocused ? colors.lavender : colors.surfaceGray` or `colors.surfaceWhite` when focused) displaying each digit in `fontFamilies.bold` (`fontSize: 22`, `color: colors.textPrimary`).
    - Supports typing digits (auto-advances to next box), Backspace (moves to previous box), and pasting a multi-digit code.
    - Quick-fill helper hint (`"Tip: Enter any 6-digit code (e.g. 123456) to test verification."`) in `variant="caption"`.
  - **Primary CTA**: `Button` (`title="Verify account"`, `variant="primary"`, `size="lg"`, `showArrow`, `arrowPosition="right"`). Validates all 6 digits are entered, then navigates to `/home` with `{ name, email }`.
  - **Resend Footer**: `"Didn't receive the code? "` + underlined `"Resend code"` link that clears inputs and shows a success `AlertBanner`.

### 4. Update the Sign In screen (`src/app/(auth)/sign-in.tsx`)
- Update `src/app/(auth)/sign-in.tsx` to match the attached Sign Up design system and layout:
  - **Top bar**: Circular `<` (`chevron-left`) back button on the left; right-aligned `roam` wordmark on the right.
  - **Header**:
    - Title: `"Welcome\nback"` (`variant="heroHeading"`, `fontSize: 36`, `lineHeight: 42`).
    - Subtitle: `"Sign in to access your saved stays, ask policy questions, and manage your trips across all your devices."`
  - **Stacked-label form fields**:
    - `Email address` (`label="Email address"`, `placeholder="you@example.com"`, left icon `Feather` `mail` size `20`).
    - `Password` (`label="Password"`, `placeholder="Enter your password"`, left icon `Feather` `lock` size `20`, `isPassword`).
    - Right-aligned `"Forgot password?"` link (`variant="caption"`, `color: colors.textPrimary`, `fontFamily: fontFamilies.semiBold`, `textDecorationLine: "underline"`) that displays an info/success `AlertBanner` with reset instructions.
  - **Primary CTA**: `Button` (`title="Sign in"`, `variant="primary"`, `size="lg"`, `showArrow`, `arrowPosition="right"`). Validates email and password, then navigates to `/home` with `{ email }`.
  - **Divider & Social Buttons**: `"or"` horizontal divider + **Continue with Google** and **Continue with Apple** secondary buttons navigating to `/home`.
  - **Footer**: `"Don't have an account? "` + underlined `"Create account"` navigating to `/(auth)/sign-up`.

### 5. Create Placeholder Home Screen (`src/app/home.tsx`) and Wire Onboarding & Layout
- Create `src/app/home.tsx` displaying a clean mocked authenticated home state:
  - Top bar with `roam` wordmark and a **Sign out** secondary/ghost pill button returning to `/(auth)/sign-in`.
  - Welcome card showing the authenticated user (`name` / `email` / `provider`) with a verified badge, sample stay prompt card, and link to `/design-system`.
- Update `src/app/onboarding.tsx` so **Skip**, **Get started** (on slide 3), and **Continue with Google** navigate to `/(auth)/sign-up`.
- Register `home` in `src/app/_layout.tsx` and `sign-up`, `verify`, `sign-in` in `src/app/(auth)/_layout.tsx`.

## Verification
1. Run `bun check` to verify zero TypeScript errors.
2. Run `bunx expo lint` to verify zero ESLint warnings or errors.
3. Inspect `/onboarding` → `/(auth)/sign-up` → `/(auth)/verify` → `/home` and `/(auth)/sign-in`:
   - Verify `/(auth)/sign-up` matches the attached screenshot: top-left `<` icon button, top-right `roam` wordmark, 2-line `Create\nyour account` title, 3-line subtitle, 3 stacked-label gray input cards (`Full name`, `Email address`, `Password` with eye-off icon), yellow `Create account` button with right arrow, `or` divider line, `Continue with Google` and `Continue with Apple` buttons, and `Already have an account? Sign in` underlined footer.
   - Verify form validation errors when submitting empty/short fields on Sign Up, Sign In, and Verify.
   - Verify completing Sign Up → 6-digit OTP on Verify → `/home`, and Sign Out → Sign In → `/home`.

## AGENTS.md updates
Update the `Expo` section in `AGENTS.md` to note the auth routes (`/(auth)/sign-up`, `/(auth)/verify`, `/(auth)/sign-in`) and placeholder `/home` route.

## Result
Built the Sign Up (`src/app/(auth)/sign-up.tsx`), Signup OTP Verification (`src/app/(auth)/verify.tsx`), and Sign In (`src/app/(auth)/sign-in.tsx`) screens matching the attached design, enhanced `InputField` (`src/components/input-field.tsx`) to support stacked interior labels and error states, connected onboarding buttons (`src/app/onboarding.tsx`) to `/(auth)/sign-up`, and added the mocked authenticated `/home` screen (`src/app/home.tsx`). Verified with `bun check` and `bunx expo lint` (0 errors).
