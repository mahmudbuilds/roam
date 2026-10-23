import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors, spacing, fontFamilies } from "@/theme";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [banner, setBanner] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const isEmailInvalid =
    submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordInvalid = submitted && password.length < 1;

  const handleSignIn = () => {
    setSubmitted(true);
    const trimmedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setBanner({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (password.length < 1) {
      setBanner({
        type: "error",
        message: "Please enter your password.",
      });
      return;
    }

    setBanner(null);
    router.replace({
      pathname: "/home",
      params: {
        name: trimmedEmail.split("@")[0] || "Roam Guest",
        email: trimmedEmail,
      },
    });
  };

  const handleForgotPassword = () => {
    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setBanner({
        type: "error",
        message:
          "Enter your email address above first so we can send a reset link.",
      });
      return;
    }
    setBanner({
      type: "success",
      message: `Password reset instructions sent to ${trimmedEmail}.`,
    });
  };

  const handleSocialSignIn = (provider: "Google" | "Apple") => {
    setBanner(null);
    router.replace({
      pathname: "/home",
      params: {
        name: `${provider} Guest`,
        email: email.trim() || `guest@${provider.toLowerCase()}.com`,
        provider,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceWhite }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={process.env.EXPO_OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: Math.max(insets.top, spacing.md) + spacing.xs,
            paddingBottom: Math.max(insets.bottom, spacing.lg),
            paddingHorizontal: spacing.lg,
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: spacing.lg }}>
            {/* Top Navigation Bar */}
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
                accessibilityLabel="Go back"
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace("/onboarding");
                  }
                }}
              >
                <Feather
                  name="chevron-left"
                  size={22}
                  color={colors.textPrimary}
                />
              </Button>

              <ThemedText
                variant="brandWordmark"
                style={{
                  fontSize: 28,
                  lineHeight: 34,
                  letterSpacing: -1.2,
                }}
              >
                roam
              </ThemedText>
            </View>

            {/* Heading & Subtitle */}
            <View style={{ gap: spacing.sm, marginTop: spacing.xs }}>
              <ThemedText
                variant="heroHeading"
                style={{ fontSize: 36, lineHeight: 42 }}
              >
                {"Welcome\nback"}
              </ThemedText>
              <ThemedText
                variant="subhead"
                style={{
                  fontFamily: fontFamilies.regular,
                  fontSize: 15,
                  lineHeight: 22,
                  color: colors.textSecondary,
                }}
              >
                Sign in to access your saved stays, ask policy questions, and
                manage your trips across all your devices.
              </ThemedText>
            </View>

            {banner && (
              <AlertBanner
                type={banner.type}
                message={banner.message}
                onDismiss={() => setBanner(null)}
              />
            )}

            {/* Stacked-Label Form Fields */}
            <View style={{ gap: spacing.mdSm }}>
              <InputField
                label="Email address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (banner?.type === "error") setBanner(null);
                }}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                returnKeyType="next"
                error={isEmailInvalid}
                leftIcon={
                  <Feather
                    name="mail"
                    size={20}
                    color={colors.textPrimary}
                  />
                }
              />

              <InputField
                label="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (banner?.type === "error") setBanner(null);
                }}
                placeholder="Enter your password"
                isPassword
                autoCapitalize="none"
                autoComplete="password"
                returnKeyType="done"
                onSubmitEditing={handleSignIn}
                error={isPasswordInvalid}
                leftIcon={
                  <Feather
                    name="lock"
                    size={20}
                    color={colors.textPrimary}
                  />
                }
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingTop: 2,
                }}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Forgot password"
                  hitSlop={8}
                  onPress={handleForgotPassword}
                >
                  <ThemedText
                    variant="caption"
                    style={{
                      color: colors.textPrimary,
                      fontFamily: fontFamilies.semiBold,
                      textDecorationLine: "underline",
                    }}
                  >
                    Forgot password?
                  </ThemedText>
                </Pressable>
              </View>
            </View>

            {/* Primary CTA + Divider + Social CTAs */}
            <View style={{ gap: spacing.md }}>
              <Button
                title="Sign in"
                variant="primary"
                size="lg"
                showArrow
                arrowPosition="right"
                onPress={handleSignIn}
              />

              {/* Horizontal "or" Divider */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.md,
                  marginVertical: 2,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: colors.borderGray,
                  }}
                />
                <ThemedText
                  variant="caption"
                  style={{
                    fontFamily: fontFamilies.regular,
                    color: colors.textSecondary,
                  }}
                >
                  or
                </ThemedText>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: colors.borderGray,
                  }}
                />
              </View>

              <View style={{ gap: spacing.mdSm }}>
                <Button
                  title="Continue with Google"
                  variant="secondary"
                  size="lg"
                  leftIcon={<GoogleLogo size={20} />}
                  onPress={() => handleSocialSignIn("Google")}
                />

                <Button
                  title="Continue with Apple"
                  variant="secondary"
                  size="lg"
                  leftIcon={
                    <Ionicons
                      name="logo-apple"
                      size={22}
                      color={colors.textPrimary}
                    />
                  }
                  onPress={() => handleSocialSignIn("Apple")}
                />
              </View>
            </View>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: spacing.lg,
            }}
          >
            <ThemedText
              variant="caption"
              style={{
                fontFamily: fontFamilies.regular,
                color: colors.textSecondary,
              }}
            >
              Don&apos;t have an account?{" "}
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create account"
              hitSlop={8}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <ThemedText
                variant="caption"
                style={{
                  color: colors.textPrimary,
                  fontFamily: fontFamilies.semiBold,
                  textDecorationLine: "underline",
                }}
              >
                Create account
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
