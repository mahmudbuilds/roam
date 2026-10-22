import React from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, radius, spacing, fontFamilies } from "@/theme";
import { ThemedText } from "./themed-text";

export interface PolicyCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function PolicyCard({
  icon,
  title,
  subtitle,
  onPress,
  style,
}: PolicyCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F8F6FF", // Soft lavender-tinted white surface
          borderRadius: radius.lg,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: "#EADFFF",
          padding: spacing.md,
          gap: spacing.md,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: radius.md,
          borderCurve: "continuous",
          backgroundColor: colors.lavender,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon || <Feather name="shield" size={22} color={colors.textPrimary} />}
      </View>

      <View style={{ flex: 1 }}>
        <ThemedText
          variant="label"
          style={{
            fontFamily: fontFamilies.bold,
            color: colors.textPrimary,
            fontSize: 16,
            marginBottom: 2,
          }}
        >
          {title}
        </ThemedText>
        <ThemedText
          variant="caption"
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            lineHeight: 18,
          }}
        >
          {subtitle}
        </ThemedText>
      </View>

      <Feather name="chevron-right" size={20} color="#7C3AED" />
    </Pressable>
  );
}
