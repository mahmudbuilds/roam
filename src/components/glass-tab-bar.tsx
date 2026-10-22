import React from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors, radius, shadows, fontFamilies } from "@/theme";
import { ThemedText } from "./themed-text";

export type TabKey = "home" | "search" | "trips" | "profile";

export interface TabItem {
  key: TabKey;
  label: string;
  icon: (color: string, focused: boolean) => React.ReactNode;
}

export interface GlassTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  style?: StyleProp<ViewStyle>;
}

const tabs: TabItem[] = [
  {
    key: "home",
    label: "Home",
    icon: (color, focused) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={22}
        color={color}
      />
    ),
  },
  {
    key: "search",
    label: "Search",
    icon: (color, focused) => (
      <Feather name="search" size={22} color={color} />
    ),
  },
  {
    key: "trips",
    label: "Trips",
    icon: (color, focused) => (
      <Feather name="calendar" size={22} color={color} />
    ),
  },
  {
    key: "profile",
    label: "Profile",
    icon: (color, focused) => (
      <Feather name="user" size={22} color={color} />
    ),
  },
];

export function GlassTabBar({
  activeTab,
  onTabChange,
  style,
}: GlassTabBarProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: 36,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.6)",
          paddingVertical: 8,
          paddingHorizontal: 12,
          boxShadow: shadows.glass,
          backdropFilter: "blur(20px)",
        },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onTabChange(tab.key)}
            style={({ pressed }) => [
              {
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 4,
                paddingHorizontal: 12,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            {isActive ? (
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: radius.full,
                  backgroundColor: colors.primaryYellow,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 2,
                  boxShadow: "0 2px 10px rgba(255, 198, 41, 0.4)",
                }}
              >
                {tab.icon(colors.textPrimary, true)}
              </View>
            ) : (
              <View
                style={{
                  width: 44,
                  height: 44,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                {tab.icon(colors.textSecondary, false)}
              </View>
            )}

            <ThemedText
              variant="caption"
              style={{
                fontFamily: isActive ? fontFamilies.bold : fontFamilies.medium,
                fontSize: 11,
                color: isActive ? colors.textPrimary : colors.textSecondary,
              }}
            >
              {tab.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}
