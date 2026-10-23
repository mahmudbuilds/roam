import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { colors, spacing, radius, fontFamilies } from "@/theme";
import {
  ThemedText,
  Button,
  InputField,
  AlertBanner,
  GoogleLogo,
} from "@/components";

export default function SignInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { provider } = useLocalSearchParams<{ provider?: string }>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<string | null>(
    provider === "google"
      ? "Google sign-in selected. Clerk OAuth will connect here."
      : null
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceWhite }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: Math.max(insets.top, spacing.md) + spacing.sm,
          paddingBottom: Math.max(insets.bottom, spacing.lg),
          paddingHorizontal: spacing.lg,
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: spacing.lg }}>
          {/* Top Navigation Row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="icon"
              size="md"
              accessibilityLabel="Back to onboarding"
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/onboarding");
                }
              }}
            >
              <Feather
                name="arrow-left"
                size={20}
                color={colors.textPrimary}
              />
            </Button>

            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <ThemedText
                variant="brandWordmark"
                style={{ fontSize: 30, lineHeight: 34 }}
              >
                roam
              </ThemedText>
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: radius.full,
                  backgroundColor: colors.primaryYellow,
                  marginLeft: 2,
                }}
              />
            </View>

            <View style={{ width: 48 }} />
          </View>

          {/* Heading */}
          <View style={{ gap: spacing.sm, marginTop: spacing.xs }}>
            <ThemedText variant="heroHeading">Welcome back</ThemedText>
            <ThemedText variant="body">
              Sign in to save stays, ask policy questions, and book your next
              trip.
            </ThemedText>
          </View>

          {notice && (
            <AlertBanner
              type="success"
              message={notice}
              onDismiss={() => setNotice(null)}
            />
          )}

          {/* Form Fields */}
          <View style={{ gap: spacing.md }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="label">Email address</ThemedText>
              <InputField
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={
                  <Feather
                    name="mail"
                    size={18}
                    color={colors.textSecondary}
                  />
                }
              />
            </View>

            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="label">Password</ThemedText>
              <InputField
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                isPassword
                leftIcon={
                  <Feather
                    name="lock"
                    size={18}
                    color={colors.textSecondary}
                  />
                }
              />
            </View>
          </View>

          {/* Actions */}
          <View style={{ gap: spacing.mdSm, marginTop: spacing.xs }}>
            <Button
              title="Continue"
              variant="primary"
              size="lg"
              showArrow
              arrowPosition="right"
              onPress={() =>
                setNotice("Authentication flow ready for Clerk integration.")
              }
            />

            <Button
              title="Continue with Google"
              variant="secondary"
              size="lg"
              leftIcon={<GoogleLogo size={20} />}
              onPress={() =>
                setNotice(
                  "Google sign-in selected. Clerk OAuth will connect here."
                )
              }
            />
          </View>
        </View>

        {/* Footer */}
        <View
          style={{
            alignItems: "center",
            paddingTop: spacing.xl,
          }}
        >
          <ThemedText
            variant="caption"
            style={{
              textAlign: "center",
              fontFamily: fontFamilies.regular,
            }}
          >
            Don&apos;t have an account?{" "}
            <ThemedText
              variant="caption"
              style={{
                color: colors.textPrimary,
                fontFamily: fontFamilies.bold,
              }}
            >
              Create account
            </ThemedText>
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
}
