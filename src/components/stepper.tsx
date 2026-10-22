import React from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, radius, spacing, fontFamilies } from "@/theme";
import { ThemedText } from "./themed-text";

export interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
}

export function Stepper({
  value,
  min = 1,
  max = 99,
  onChange,
  style,
}: StepperProps) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.surfaceWhite,
          borderRadius: radius.full,
          borderWidth: 1,
          borderColor: colors.borderGray,
          paddingVertical: 6,
          paddingHorizontal: 8,
          gap: 12,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrease value"
        disabled={!canDecrement}
        onPress={() => onChange(value - 1)}
        style={({ pressed }) => [
          {
            width: 32,
            height: 32,
            borderRadius: radius.full,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? colors.surfaceGray : "transparent",
            opacity: canDecrement ? 1 : 0.3,
          },
        ]}
      >
        <Feather name="minus" size={16} color={colors.textPrimary} />
      </Pressable>

      <ThemedText
        variant="label"
        style={{
          fontFamily: fontFamilies.bold,
          fontSize: 16,
          color: colors.textPrimary,
          minWidth: 20,
          textAlign: "center",
        }}
      >
        {value}
      </ThemedText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase value"
        disabled={!canIncrement}
        onPress={() => onChange(value + 1)}
        style={({ pressed }) => [
          {
            width: 32,
            height: 32,
            borderRadius: radius.full,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? colors.surfaceGray : "transparent",
            opacity: canIncrement ? 1 : 0.3,
          },
        ]}
      >
        <Feather name="plus" size={16} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}
