import React from "react";
import {
  Pressable,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/theme";
import { ThemedText } from "./themed-text";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  showArrow?: boolean;
  arrowPosition?: "inline" | "right";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const variantStyles: Record<
  ButtonVariant,
  {
    container: ViewStyle;
    textColor: string;
    spinnerColor: string;
  }
> = {
  primary: {
    container: {
      backgroundColor: colors.primaryYellow,
      borderWidth: 0,
    },
    textColor: colors.textPrimary,
    spinnerColor: colors.textPrimary,
  },
  secondary: {
    container: {
      backgroundColor: colors.surfaceWhite,
      borderWidth: 1,
      borderColor: colors.borderGray,
    },
    textColor: colors.textPrimary,
    spinnerColor: colors.textPrimary,
  },
  ghost: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    textColor: colors.textPrimary,
    spinnerColor: colors.textPrimary,
  },
  icon: {
    container: {
      backgroundColor: colors.surfaceWhite,
      borderWidth: 1,
      borderColor: colors.borderGray,
      paddingHorizontal: 0,
      paddingVertical: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    textColor: colors.textPrimary,
    spinnerColor: colors.textPrimary,
  },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 38,
  },
  md: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 52,
  },
  lg: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    minHeight: 54,
  },
};

const iconSizes: Record<ButtonSize, { width: number; height: number; borderRadius: number }> = {
  sm: { width: 36, height: 36, borderRadius: radius.full },
  md: { width: 48, height: 48, borderRadius: radius.full },
  lg: { width: 56, height: 56, borderRadius: radius.full },
};

export function Button({
  title,
  variant = "primary",
  size = "md",
  onPress,
  disabled,
  loading,
  showArrow = false,
  arrowPosition = "inline",
  leftIcon,
  rightIcon,
  children,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const currentVariant = variantStyles[variant];
  const isIconButton = variant === "icon";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: !!(disabled || loading), busy: !!loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        {
          borderRadius: radius.full,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        currentVariant.container,
        isIconButton ? iconSizes[size] : sizeStyles[size],
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={currentVariant.spinnerColor} />
      ) : isIconButton ? (
        children
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.mdSm }}>
            {leftIcon}
            {title && (
              <ThemedText
                variant="button"
                style={{
                  color: currentVariant.textColor,
                  textAlign: "center",
                }}
              >
                {title}
              </ThemedText>
            )}
            {children}
            {showArrow && arrowPosition === "inline" && (
              <Feather
                name="arrow-right"
                size={20}
                color={currentVariant.textColor}
                style={{ marginLeft: 4 }}
              />
            )}
            {rightIcon}
          </View>
          {showArrow && arrowPosition === "right" && (
            <View
              style={{
                position: "absolute",
                right: spacing.lg,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather
                name="arrow-right"
                size={20}
                color={currentVariant.textColor}
              />
            </View>
          )}
        </>
      )}
    </Pressable>
  );
}
