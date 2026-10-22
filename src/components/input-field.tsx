import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Pressable,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, radius, spacing, fontFamilies } from "@/theme";

export interface InputFieldProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  variant?: "rounded" | "pill";
  containerStyle?: StyleProp<ViewStyle>;
  onRightIconPress?: () => void;
}

export function InputField({
  label,
  leftIcon,
  rightIcon,
  isPassword = false,
  variant = "rounded",
  containerStyle,
  onRightIconPress,
  onFocus,
  onBlur,
  style,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderRadius = variant === "pill" ? radius.full : radius.lg;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isFocused ? colors.surfaceWhite : colors.surfaceGray,
          borderRadius,
          borderCurve: "continuous",
          borderWidth: 1.5,
          borderColor: isFocused ? colors.lavender : colors.borderGray,
          paddingHorizontal: spacing.md,
          minHeight: 52,
          gap: spacing.sm,
        },
        containerStyle,
      ]}
    >
      {leftIcon && <View style={{ alignItems: "center", justifyContent: "center" }}>{leftIcon}</View>}

      <TextInput
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={isPassword && !showPassword}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        style={[
          {
            flex: 1,
            fontFamily: fontFamilies.regular,
            fontSize: 16,
            color: colors.textPrimary,
            paddingVertical: 12,
          },
          style,
        ]}
        {...props}
      />

      {isPassword ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          onPress={() => setShowPassword((prev) => !prev)}
          style={{ padding: 4 }}
        >
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>
      ) : rightIcon ? (
        <Pressable
          accessibilityRole={onRightIconPress ? "button" : undefined}
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
          style={{ padding: 4 }}
        >
          {rightIcon}
        </Pressable>
      ) : null}
    </View>
  );
}
