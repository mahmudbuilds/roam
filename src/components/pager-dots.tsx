import { View, StyleSheet } from "react-native";
import { colors, radius } from "@/theme";

interface PagerDotsProps {
  count: number;
  activeIndex: number;
}

export function PagerDots({ count, activeIndex }: PagerDotsProps) {
  return (
    <View
      style={styles.row}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: count, now: activeIndex + 1 }}
    >
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          style={[styles.dot, i === activeIndex && styles.active]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6 },
  dot: {
    width: 40,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.borderGray,
  },
  active: { backgroundColor: colors.lavender },
});
