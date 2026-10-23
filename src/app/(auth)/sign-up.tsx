import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { provider } = useLocalSearchParams<{ provider?: string }>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (provider === "google") {
      router.replace({
        pathname: "/home",
        params: {
          name: "Google Guest",
          email: "guest@gmail.com",
          provider: "Google",
        },
      });
    }
  }, [provider, router]);

  const isNameInvalid = submitted && fullName.trim().length < 2;
  const isEmailInvalid =
    submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordInvalid = submitted && password.length < 8;

  const handleCreateAccount = () => {
    setSubmitted(true);
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Your password must be at least 8 characters long.");
      return;
    }

    setErrorMessage(null);
    router.push({
      pathname: "/(auth)/verify",
      params: {
        name: trimmedName,
        email: trimmedEmail,
      },
    });
  };

  const handleSocialSignIn = (socialProvider: "Google" | "Apple") => {
    setErrorMessage(null);
    router.replace({
      pathname: "/home",
      params: {
        name: fullName.trim() || `${socialProvider} Guest`,
        email:
          email.trim() ||
          `guest@${socialProvider.toLowerCase()}.com`,
        provider: socialProvider,
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
                {"Create\nyour account"}
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
                Join roam to save your stays, get personalized recommendations
                and access them across all your devices.
              </ThemedText>
            </View>

            {errorMessage && (
              <AlertBanner
                type="error"
                message={errorMessage}
                onDismiss={() => setErrorMessage(null)}
              />
            )}

            {/* Stacked-Label Form Fields */}
            <View style={{ gap: spacing.mdSm }}>
              <InputField
                label="Full name"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="e.g. Adrian Hajdin"
                autoCapitalize="words"
                autoComplete="name"
                returnKeyType="next"
                error={isNameInvalid}
                leftIcon={
                  <Feather
                    name="user"
                    size={20}
                    color={colors.textPrimary}
                  />
                }
              />

              <InputField
                label="Email address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errorMessage) setErrorMessage(null);
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
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="At least 8 characters"
                isPassword
                autoCapitalize="none"
                autoComplete="password-new"
                returnKeyType="done"
                onSubmitEditing={handleCreateAccount}
                error={isPasswordInvalid}
                leftIcon={
                  <Feather
                    name="lock"
                    size={20}
                    color={colors.textPrimary}
                  />
                }
              />
            </View>

            {/* Primary CTA + Divider + Social CTAs */}
            <View style={{ gap: spacing.md }}>
              <Button
                title="Create account"
                variant="primary"
                size="lg"
                showArrow
                arrowPosition="right"
                onPress={handleCreateAccount}
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
              Already have an account?{" "}
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sign in"
              hitSlop={8}
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <ThemedText
                variant="caption"
                style={{
                  color: colors.textPrimary,
                  fontFamily: fontFamilies.semiBold,
                  textDecorationLine: "underline",
                }}
              >
                Sign in
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
