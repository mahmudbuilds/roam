import React from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { colors, radius, fontFamilies } from "@/theme";
import { ThemedText } from "./themed-text";

export interface SegmentOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  style,
}: SegmentedControlProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          backgroundColor: colors.surfaceWhite,
          borderRadius: radius.full,
          borderWidth: 1,
          borderColor: colors.borderGray,
          padding: 4,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              {
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 18,
                borderRadius: radius.full,
                backgroundColor: isSelected ? colors.textPrimary : "transparent",
                gap: 6,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            {option.icon && (
              <View style={{ marginRight: 2 }}>{option.icon}</View>
            )}
            <ThemedText
              variant="caption"
              style={{
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                color: isSelected ? colors.surfaceWhite : colors.textSecondary,
              }}
            >
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}
