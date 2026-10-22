import React from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { colors, radius, spacing, shadows } from "@/theme";

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: keyof typeof spacing;
  onPress?: () => void;
}

export function Card({
  children,
  style,
  padding = "md",
  onPress,
}: CardProps) {
  const content = (
    <View
      style={[
        {
          backgroundColor: colors.surfaceWhite,
          borderRadius: radius.xl,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: colors.borderGray,
          padding: spacing[padding],
          boxShadow: shadows.card,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
