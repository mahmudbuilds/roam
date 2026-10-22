# 01 · Set up NativeWind V5

Status: approved

## Goal
Configure NativeWind V5 (v5.0.0-rc.0 with Tailwind CSS v4 and react-native-css v3.1.0-rc.0) in the Expo React Native app, enabling universal Tailwind CSS styling via `className` across components.

## Decisions
- Use exact versions specified in the NativeWind v5 documentation: `nativewind@5.0.0-rc.0`, `react-native-css@3.1.0-rc.0`, `tailwindcss@4.1.12`, `@tailwindcss/postcss@4.1.12`, `postcss`, and `lightningcss@1.30.1`.
- Pin `lightningcss: "1.30.1"` in `package.json` overrides to prevent deserialization errors during build.
- Place `global.css` at the project root and import it once in `src/app/_layout.tsx`.
- Use unlayered utilities in `global.css` (`@import "tailwindcss/utilities.css";`) as prescribed by NativeWind v5 for correct cascade precedence over React Native Web defaults.
- Create `postcss.config.mjs` exporting the `@tailwindcss/postcss` plugin.
- Create `metro.config.js` wrapping Expo's default config with `withNativewind(config)`.
- Create `nativewind-env.d.ts` referencing `react-native-css/types` and include it in `tsconfig.json`.
- Verify with `className` styling in `src/app/index.tsx`, type checking via `bun check`, and linting via `bunx expo lint`.

## Out of scope
- Custom theme token definitions (will be added as features require them).
- Third-party component wrappers (`styled()`).
- Production native builds / EAS pipelines.

## Steps
### 1. Install dependencies and set package overrides
Add the exact NativeWind v5 RC and Tailwind CSS v4 packages using `bun`:
- Dependencies: `nativewind@5.0.0-rc.0`, `react-native-css@3.1.0-rc.0`.
- Dev dependencies: `tailwindcss@4.1.12`, `@tailwindcss/postcss@4.1.12`, `postcss`, `lightningcss@1.30.1`.
- Add `"overrides": { "lightningcss": "1.30.1" }` to `package.json`.

### 2. Configure PostCSS and Tailwind directives
- Create `postcss.config.mjs` with `@tailwindcss/postcss` plugin.
- Create `global.css` at the workspace root importing Tailwind theme, preflight, unlayered utilities, and `nativewind/theme`.

### 3. Configure Metro bundler
- Create `metro.config.js` using `getDefaultConfig` from `expo/metro-config` and wrap with `withNativewind` from `nativewind/metro`.

### 4. Configure TypeScript environment
- Create `nativewind-env.d.ts` containing `/// <reference types="react-native-css/types" />`.
- Verify `tsconfig.json` includes `nativewind-env.d.ts`.

### 5. Wire up app root layout and test component
- Import `../../global.css` in `src/app/_layout.tsx`.
- Update `src/app/index.tsx` to verify `className` utilities (e.g., `flex-1 items-center justify-center bg-white dark:bg-black`, styled text).

## Verification
1. Run `bun check` to confirm no TypeScript errors.
2. Run `bunx expo lint` to confirm no ESLint errors.
3. Test bundling / clear cache with `bunx expo start --clear` check if needed.

## AGENTS.md updates
Add a Styling bullet to "Who owns what" or "Expo" section documenting NativeWind v5 + Tailwind v4 configuration.
