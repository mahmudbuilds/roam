import React, { useRef, useState } from "react";
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
import { ThemedText } from "./themed-text";

export interface InputFieldProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  error?: boolean;
  variant?: "rounded" | "pill";
  containerStyle?: StyleProp<ViewStyle>;
  onRightIconPress?: () => void;
}

export function InputField({
  label,
  leftIcon,
  rightIcon,
  isPassword = false,
  error = false,
  variant = "rounded",
  containerStyle,
  onRightIconPress,
  onFocus,
  onBlur,
  style,
  ...props
}: InputFieldProps) {
  const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isStacked = Boolean(label);
  const borderRadius = variant === "pill" ? radius.full : radius.lg;

  const borderColor = error
    ? colors.error
    : isFocused
      ? colors.lavender
      : isStacked
        ? colors.surfaceGray
        : colors.borderGray;

  return (
    <Pressable
      accessible={false}
      onPress={() => inputRef.current?.focus()}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isFocused ? colors.surfaceWhite : colors.surfaceGray,
          borderRadius,
          borderCurve: "continuous",
          borderWidth: 1.5,
          borderColor,
          paddingHorizontal: spacing.md,
          paddingVertical: isStacked ? spacing.mdSm : 0,
          minHeight: isStacked ? 68 : 52,
          gap: isStacked ? spacing.md : spacing.sm,
        },
        containerStyle,
      ]}
    >
      {leftIcon && (
        <View
          style={{
            width: isStacked ? 24 : undefined,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {leftIcon}
        </View>
      )}

      <View style={{ flex: 1, justifyContent: "center", gap: isStacked ? 2 : 0 }}>
        {label && (
          <ThemedText
            variant="label"
            style={{
              fontFamily: fontFamilies.semiBold,
              fontSize: 13,
              lineHeight: 18,
              color: colors.textPrimary,
            }}
          >
            {label}
          </ThemedText>
        )}

        <TextInput
          ref={inputRef}
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
              fontFamily: fontFamilies.regular,
              fontSize: isStacked ? 15 : 16,
              lineHeight: isStacked ? 20 : undefined,
              color: colors.textPrimary,
              paddingVertical: isStacked ? 0 : 12,
              paddingHorizontal: 0,
              margin: 0,
            },
            style,
          ]}
          {...props}
        />
      </View>

      {isPassword ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          onPress={() => setShowPassword((prev) => !prev)}
          hitSlop={8}
          style={{ padding: 4 }}
        >
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={isStacked ? colors.textPrimary : colors.textSecondary}
          />
        </Pressable>
      ) : rightIcon ? (
        <Pressable
          accessibilityRole={onRightIconPress ? "button" : undefined}
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
          hitSlop={8}
          style={{ padding: 4 }}
        >
          {rightIcon}
        </Pressable>
      ) : null}
    </Pressable>
  );
}
