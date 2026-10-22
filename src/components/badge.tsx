import React from "react";
import { View, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, fontFamilies } from "@/theme";
import { ThemedText } from "./themed-text";

export type BadgeVariant =
  | "guestFavorite"
  | "new"
  | "discount"
  | "superhost"
  | "neutral";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const badgeStyles: Record<
  BadgeVariant,
  {
    bg: string;
    textColor: string;
    border: string;
  }
> = {
  guestFavorite: {
    bg: colors.badgeYellow,
    textColor: colors.badgeYellowText,
    border: "#FDE68A",
  },
  new: {
    bg: colors.badgeMint,
    textColor: colors.badgeMintText,
    border: "#BBF7D0",
  },
  discount: {
    bg: colors.badgePink,
    textColor: colors.badgePinkText,
    border: "#FECDD3",
  },
  superhost: {
    bg: colors.badgeBlue,
    textColor: colors.badgeBlueText,
    border: "#BFDBFE",
  },
  neutral: {
    bg: colors.surfaceGray,
    textColor: colors.textPrimary,
    border: colors.borderGray,
  },
};

export function Badge({
  label,
  variant = "neutral",
  icon,
  style,
  textStyle,
}: BadgeProps) {
  const current = badgeStyles[variant];

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          backgroundColor: current.bg,
          borderColor: current.border,
          borderWidth: 1,
          borderRadius: radius.full,
          paddingHorizontal: 12,
          paddingVertical: 5,
          gap: 5,
        },
        style,
      ]}
    >
      {icon ? (
        icon
      ) : variant === "guestFavorite" ? (
        <Ionicons name="star" size={13} color={colors.badgeYellowText} />
      ) : null}
      <ThemedText
        variant="caption"
        style={[
          {
            color: current.textColor,
            fontFamily: fontFamilies.semiBold,
            fontSize: 12,
            lineHeight: 16,
          },
          textStyle,
        ]}
      >
        {label}
      </ThemedText>
    </View>
  );
}
