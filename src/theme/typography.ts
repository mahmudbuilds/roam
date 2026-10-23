import { TextStyle } from "react-native";
import { colors } from "./colors";

export const fontFamilies = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semiBold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extraBold: "PlusJakartaSans_800ExtraBold",
} as const;

export const type = {
  display: {
    fontFamily: fontFamilies.bold,
    fontSize: 56,
    lineHeight: 56,
    color: colors.textPrimary,
  },
  brandWordmark: {
    fontFamily: fontFamilies.extraBold,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -1.5,
    color: colors.textPrimary,
  },
  heroHeading: {
    fontFamily: fontFamilies.extraBold,
    fontSize: 33,
    lineHeight: 39,
    letterSpacing: -0.8,
    color: colors.textPrimary,
  },
  heading: {
    fontFamily: fontFamilies.bold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
  },
  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  caption: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  button: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  label: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  subhead: {
    fontFamily: fontFamilies.medium,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textSecondary,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof type;
