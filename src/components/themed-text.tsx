import { Text, TextProps, TextStyle, StyleProp } from "react-native";
import { type, TypographyVariant } from "@/theme";

export interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
}

export function ThemedText({
  variant = "body",
  style,
  children,
  ...props
}: ThemedTextProps) {
  return (
    <Text style={[type[variant], style]} {...props}>
      {children}
    </Text>
  );
}
