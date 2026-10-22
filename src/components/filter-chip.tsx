import React from "react";
import { Pressable, View, StyleProp, ViewStyle } from "react-native";
import { colors, radius, spacing } from "@/theme";
import { ThemedText } from "./themed-text";

export interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  activeVariant?: "lavender" | "dark" | "yellow";
  style?: StyleProp<ViewStyle>;
}

export function FilterChip({
  label,
  active = false,
  onPress,
  icon,
  activeVariant = "lavender",
  style,
}: FilterChipProps) {
  let activeBg: string = colors.lavender;
  let activeTextColor: string = colors.textPrimary;

  if (activeVariant === "dark") {
    activeBg = colors.textPrimary;
    activeTextColor = colors.surfaceWhite;
  } else if (activeVariant === "yellow") {
    activeBg = colors.primaryYellow;
    activeTextColor = colors.textPrimary;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 18,
          paddingVertical: 10,
          borderRadius: radius.full,
          backgroundColor: active ? activeBg : colors.surfaceGray,
          borderWidth: 1,
          borderColor: active ? activeBg : colors.borderGray,
          gap: 6,
          opacity: pressed ? 0.75 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        style,
      ]}
    >
      {icon && <View style={{ marginRight: 2 }}>{icon}</View>}
      <ThemedText
        variant="caption"
        style={{
          color: active ? activeTextColor : colors.textPrimary,
          fontWeight: active ? "600" : "500",
        }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}
