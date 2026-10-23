import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { colors, spacing, fontFamilies } from "@/theme";
import {
  ThemedText,
  Button,
  Card,
  Badge,
  InputField,
  ListingCard,
} from "@/components";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    name?: string;
    email?: string;
    provider?: string;
    verified?: string;
  }>();

  const [query, setQuery] = useState("");
  const guestName = params.name || "Adrian Hajdin";
  const guestEmail = params.email || "you@example.com";

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceWhite }}>
      <StatusBar style="dark" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Math.max(insets.top, spacing.md) + spacing.xs,
          paddingBottom: Math.max(insets.bottom, spacing.xl),
          paddingHorizontal: spacing.lg,
          gap: spacing.lg,
        }}
      >
        {/* Top Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText
            variant="brandWordmark"
            style={{ fontSize: 28, lineHeight: 34, letterSpacing: -1.2 }}
          >
            roam
          </ThemedText>

          <Button
            title="Sign out"
            variant="secondary"
            size="sm"
            onPress={() => router.replace("/(auth)/sign-in")}
          />
        </View>

        {/* Signed-in Session Card */}
        <Card style={{ backgroundColor: colors.surfaceGray }}>
          <View style={{ gap: spacing.sm }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Badge
                label={
                  params.provider
                    ? `Signed in with ${params.provider}`
                    : params.verified === "true"
                      ? "Email verified"
                      : "Signed in"
                }
                variant="new"
              />
              <ThemedText variant="caption">Mocked Auth</ThemedText>
            </View>

            <ThemedText variant="title">Welcome, {guestName}</ThemedText>
            <ThemedText variant="caption" selectable>
              {guestEmail}
            </ThemedText>
          </View>
        </Card>

        {/* One-sentence Stay Search Preview */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText
            variant="heading"
            style={{ fontSize: 24, lineHeight: 30 }}
          >
            Describe your dream stay
          </ThemedText>
          <InputField
            variant="pill"
            value={query}
            onChangeText={setQuery}
            placeholder="Quiet pet-friendly cabin with a hot tub under $300"
            leftIcon={
              <Feather name="search" size={18} color={colors.textPrimary} />
            }
          />
        </View>

        {/* Sample Stay Card */}
        <View style={{ gap: spacing.sm }}>
          <ThemedText
            variant="label"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
            }}
          >
            RECOMMENDED FOR YOU
          </ThemedText>
          <ListingCard
            title="Cedar Creek A-Frame"
            location="Whistler, BC"
            pricePerNight={265}
            rating={4.96}
            reviewsCount={128}
            imageUrl="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80"
          />
        </View>
      </ScrollView>
    </View>
  );
}
