import React from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, spacing, fontFamilies } from "@/theme";
import { ThemedText } from "./themed-text";

export interface ProfileRowProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showDivider?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ProfileRow({
  icon,
  title,
  subtitle,
  onPress,
  showDivider = true,
  style,
}: ProfileRowProps) {
  return (
    <View style={style}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 16,
            paddingHorizontal: spacing.md,
            backgroundColor: pressed ? colors.surfaceGray : colors.surfaceWhite,
            gap: spacing.md,
          },
        ]}
      >
        {icon && (
          <View
            style={{
              width: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </View>
        )}

        <View style={{ flex: 1 }}>
          <ThemedText
            variant="label"
            style={{
              fontFamily: fontFamilies.medium,
              fontSize: 16,
              color: colors.textPrimary,
            }}
          >
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              variant="caption"
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                marginTop: 2,
              }}
            >
              {subtitle}
            </ThemedText>
          )}
        </View>

        <Feather name="chevron-right" size={18} color={colors.textSecondary} />
      </Pressable>

      {showDivider && (
        <View
          style={{
            height: 1,
            backgroundColor: colors.borderGray,
            marginLeft: icon ? 56 : spacing.md,
            marginRight: spacing.md,
          }}
        />
      )}
    </View>
  );
}
