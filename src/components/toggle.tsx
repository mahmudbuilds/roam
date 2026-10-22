import React from "react";
import { Switch, SwitchProps } from "react-native";
import { colors } from "@/theme";

export interface ToggleProps extends Omit<SwitchProps, "trackColor" | "thumbColor"> {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

export function Toggle({
  checked = false,
  onCheckedChange,
  value,
  onValueChange,
  ...props
}: ToggleProps) {
  const isChecked = value !== undefined ? value : checked;
  const handleChange = onValueChange || onCheckedChange;

  return (
    <Switch
      value={isChecked}
      onValueChange={handleChange}
      trackColor={{
        false: colors.borderGray,
        true: colors.primaryYellow,
      }}
      thumbColor={colors.surfaceWhite}
      ios_backgroundColor={colors.borderGray}
      {...props}
    />
  );
}
