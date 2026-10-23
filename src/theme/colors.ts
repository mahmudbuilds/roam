import { Platform } from "react-native";
import { Color } from "expo-router";

export const colors = {
  // Brand palette from Roam reference board
  primaryYellow: "#FFC629",
  lavender: "#C9B4FF",
  textPrimary: "#0B0B1A",
  textSecondary: "#6B7280",
  surfaceWhite: "#FFFFFF",
  surfaceGray: "#F4F5F7",
  borderGray: "#E5E7EB",
  glassBlur: "rgba(255, 255, 255, 0.7)",
  skipPillBg: "rgba(255, 255, 255, 0.85)",
  locationPillBg: "rgba(11, 11, 26, 0.62)",
  locationPillBorder: "rgba(255, 255, 255, 0.35)",

  // Status & Alerts
  success: "#10B981",
  successBg: "#E8F5E9",
  error: "#EF4444",
  errorBg: "#FEE2E2",

  // Badges & Tags
  badgeYellow: "#FEF3C7",
  badgeYellowText: "#92400E",
  badgeMint: "#E6F4EA",
  badgeMintText: "#137333",
  badgePink: "#FCE8E6",
  badgePinkText: "#C5221F",
  badgeBlue: "#E8F0FE",
  badgeBlueText: "#1A73E8",

  // Semantic platform adaptors
  label: Platform.select({
    ios: Color.ios.label,
    android: Color.android.dynamic.onSurface,
    default: "#0B0B1A",
  })!,
  secondaryLabel: Platform.select({
    ios: Color.ios.secondaryLabel,
    android: Color.android.dynamic.onSurfaceVariant,
    default: "#6B7280",
  })!,
  separator: Platform.select({
    ios: Color.ios.separator,
    android: Color.android.dynamic.outlineVariant,
    default: "#E5E7EB",
  })!,
  systemBackground: Platform.select({
    ios: Color.ios.systemBackground,
    android: Color.android.dynamic.surface,
    default: "#FFFFFF",
  })!,
  surface: Platform.select({
    ios: Color.ios.secondarySystemBackground,
    android: Color.android.dynamic.surfaceContainer,
    default: "#F4F5F7",
  })!,
  onTint: "#0B0B1A", // Dark text on primary yellow
} as const;

export type ColorToken = keyof typeof colors;
