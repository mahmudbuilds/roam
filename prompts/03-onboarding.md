# 03 · Onboarding

Status: done

## Goal
First launch opens a 3-slide onboarding carousel matching the attached design. "Get started" and "Continue with Google" lead into the auth flow; "Skip" goes to the home screen.

## Decisions
- Carousel with 3 slides, each with its own Unsplash photo, location chip, title and body. Slide 1 is the design: "Whistler, BC", "Find a stay that fits your story", "From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip."
- Slides 2 and 3 copy is mine (proposed): "Describe it in one sentence" / "Know before you book". Edit before approving if you want different text.
- Progress dots (3) reflect the active slide; active dot is the purple accent, others are neutral.
- Always shown on launch (no persistence flag yet, no new dependency).
- Routes: onboarding is `src/app/index.tsx`. The current design-system showcase in `index.tsx` moves to `src/app/home.tsx` as the temporary home.
- Auth: placeholder `src/app/(auth)/sign-in.tsx` (title + back). "Get started" and "Continue with Google" both route there. Clerk wiring is a later plan.
- "Get started" on slides 1 and 2 still goes to sign-in (not next slide); swiping moves slides.
- Images: remote `images.unsplash.com` URLs via `expo-image` (check it is installed; if not, ask before adding). Photos are placeholders, not brand assets.
- Google "G" logo and the arrow icon come from the existing icon library in the project; if no Google logo asset exists, ask for one and use a marked placeholder.

## Out of scope
Clerk auth, Google OAuth, persistence of onboarding completion, real home screen.

## Steps
### 1. Move showcase and add routes
Move current `src/app/index.tsx` to `src/app/home.tsx`. Add `src/app/(auth)/_layout.tsx` (Stack, no header) and `sign-in.tsx` placeholder. App still runs.

### 2. Tokens check
Read `src/theme/` and `src/components/button.tsx`. Map: amber primary button, white secondary button with border, purple accent dot, sheet radius, Plus Jakarta Sans ExtraBold for the "roam" wordmark and title. List any value with no token here as a proposed new token and ask before adding.

### 3. Build the screen
New `src/components/onboarding-slide.tsx` and `src/components/pager-dots.tsx`; the screen in `src/app/index.tsx`.
- Full-bleed photo behind; "roam" wordmark top-left (text, ExtraBold), "Skip" glass pill top-right, location chip (glass, pin icon) bottom-left of the photo.
- Bottom white sheet with large top-left curve and a rounded top-right: dots, 2-line title, gray body, "Get started →" button (amber, full width), "Continue with Google" outlined button.
- Horizontal paging `FlatList` (or ScrollView paging) over photo + copy; safe-area insets respected; loading placeholder color while images load.
- Use the shared `Button` where it fits; otherwise extend it with a variant.

### 4. Wire navigation
`router.push('/(auth)/sign-in')` for Get started and Google; `router.replace('/home')` for Skip. Light press haptics optional via expo-haptics only if installed.

## Verification
- `bunx expo lint` and `bun check` pass.
- Screenshot on the iOS simulator compared with the design; list differences and fix.
- Swipe through 3 slides, dots update; each button lands on the right route; back from sign-in returns to onboarding.
- Offline/slow image: placeholder color shows, no crash.

## AGENTS.md updates
None beyond a line noting the route layout (onboarding at `/`, showcase at `/home`) at close-out.

## Result
Built the 3-slide onboarding at / (showcase moved to /home, placeholder /(auth)/sign-in). bun check and lint pass. Not checked against a simulator (Windows host). Unmapped values hardcoded, proposed tokens: sheet radii 44/56, wordmark 48, title 36, dark glass chip rgba(20,20,30,.55), Google blue #4285F4 (Ionicons logo-google is a placeholder for the real colored G asset). Unsplash photo content not viewed.

