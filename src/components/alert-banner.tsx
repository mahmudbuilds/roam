import React from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { radius, spacing, fontFamilies } from "@/theme";
import { ThemedText } from "./themed-text";

export type AlertType = "success" | "error";

export interface AlertBannerProps {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

const alertConfig: Record<
  AlertType,
  {
    bg: string;
    border: string;
    textColor: string;
    icon: React.ReactNode;
    dismissColor: string;
  }
> = {
  success: {
    bg: "#ECFDF5",
    border: "#A7F3D0",
    textColor: "#065F46",
    icon: <Ionicons name="checkmark-circle" size={22} color="#059669" />,
    dismissColor: "#059669",
  },
  error: {
    bg: "#FEF2F2",
    border: "#FECACA",
    textColor: "#991B1B",
    icon: <Ionicons name="alert-circle" size={22} color="#DC2626" />,
    dismissColor: "#DC2626",
  },
};

export function AlertBanner({
  type,
  message,
  onDismiss,
  style,
}: AlertBannerProps) {
  const config = alertConfig[type];

  return (
    <View
      accessibilityRole="alert"
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: config.bg,
          borderWidth: 1,
          borderColor: config.border,
          borderRadius: radius.md,
          borderCurve: "continuous",
          paddingVertical: 12,
          paddingHorizontal: spacing.md,
          gap: 12,
        },
        style,
      ]}
    >
      {config.icon}

      <ThemedText
        variant="caption"
        style={{
          flex: 1,
          fontFamily: fontFamilies.medium,
          fontSize: 14,
          color: config.textColor,
        }}
      >
        {message}
      </ThemedText>

      {onDismiss && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
          onPress={onDismiss}
          style={{ padding: 4 }}
        >
          <Feather name="x" size={18} color={config.dismissColor} />
        </Pressable>
      )}
    </View>
  );
}
