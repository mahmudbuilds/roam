import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
  TextInputKeyPressEvent,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { colors, radius, spacing, fontFamilies } from "@/theme";
import { ThemedText, Button, AlertBanner } from "@/components";

const OTP_LENGTH = 6;

export default function VerifyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ name?: string; email?: string }>();

  const targetEmail = params.email || "you@example.com";
  const targetName = params.name || "Roam Guest";

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const [banner, setBanner] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const inputRefs = useRef<(React.ComponentRef<typeof TextInput> | null)[]>([]);

  const handleDigitChange = (text: string, index: number) => {
    const cleaned = text.replace(/\D/g, "");
    if (banner?.type === "error") {
      setBanner(null);
    }

    if (cleaned.length > 1) {
      // Handle pasted or autofilled multi-digit code
      const nextDigits = [...digits];
      for (let i = 0; i < cleaned.length && index + i < OTP_LENGTH; i++) {
        nextDigits[index + i] = cleaned[i]!;
      }
      setDigits(nextDigits);
      const nextFocus = Math.min(index + cleaned.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = cleaned;
    setDigits(nextDigits);

    if (cleaned && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!digits[index] && index > 0) {
        const nextDigits = [...digits];
        nextDigits[index - 1] = "";
        setDigits(nextDigits);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setBanner({
        type: "error",
        message: "Please enter all 6 digits of your verification code.",
      });
      return;
    }

    setBanner(null);
    router.replace({
      pathname: "/home",
      params: {
        name: targetName,
        email: targetEmail,
        verified: "true",
      },
    });
  };

  const handleResend = () => {
    setDigits(Array(OTP_LENGTH).fill(""));
    setBanner({
      type: "success",
      message: `A new 6-digit verification code was sent to ${targetEmail}.`,
    });
    inputRefs.current[0]?.focus();
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
                accessibilityLabel="Back to sign up"
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace("/(auth)/sign-up");
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
                {"Verify your\nemail"}
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
                We sent a 6-digit verification code to{" "}
                <ThemedText
                  variant="subhead"
                  selectable
                  style={{
                    fontFamily: fontFamilies.semiBold,
                    fontSize: 15,
                    lineHeight: 22,
                    color: colors.textPrimary,
                  }}
                >
                  {targetEmail}
                </ThemedText>
                . Enter it below to verify your account.
              </ThemedText>
            </View>

            {banner && (
              <AlertBanner
                type={banner.type}
                message={banner.message}
                onDismiss={() => setBanner(null)}
              />
            )}

            {/* 6-Digit OTP Input Row */}
            <View style={{ gap: spacing.md }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: spacing.sm,
                }}
              >
                {digits.map((digit, index) => {
                  const isFocused = focusedIndex === index;
                  const isError = banner?.type === "error" && !digit;
                  return (
                    <Pressable
                      key={index}
                      accessible={false}
                      onPress={() => inputRefs.current[index]?.focus()}
                      style={{
                        flex: 1,
                        height: 64,
                        borderRadius: radius.lg,
                        borderCurve: "continuous",
                        backgroundColor: isFocused
                          ? colors.surfaceWhite
                          : colors.surfaceGray,
                        borderWidth: 1.5,
                        borderColor: isError
                          ? colors.error
                          : isFocused
                            ? colors.lavender
                            : digit
                              ? colors.borderGray
                              : colors.surfaceGray,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TextInput
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        value={digit}
                        onChangeText={(text) => handleDigitChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() =>
                          setFocusedIndex((prev) =>
                            prev === index ? null : prev
                          )
                        }
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete="one-time-code"
                        maxLength={OTP_LENGTH}
                        selectTextOnFocus
                        accessibilityLabel={`Verification digit ${index + 1}`}
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontFamily: fontFamilies.bold,
                          fontSize: 22,
                          color: colors.textPrimary,
                          padding: 0,
                        }}
                      />
                    </Pressable>
                  );
                })}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ThemedText
                    variant="caption"
                    style={{
                      fontFamily: fontFamilies.regular,
                      color: colors.textSecondary,
                    }}
                  >
                    Didn&apos;t receive the code?{" "}
                  </ThemedText>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Resend verification code"
                    hitSlop={8}
                    onPress={handleResend}
                  >
                    <ThemedText
                      variant="caption"
                      style={{
                        color: colors.textPrimary,
                        fontFamily: fontFamilies.semiBold,
                        textDecorationLine: "underline",
                      }}
                    >
                      Resend code
                    </ThemedText>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Primary CTA */}
            <View style={{ gap: spacing.mdSm, marginTop: spacing.xs }}>
              <Button
                title="Verify account"
                variant="primary"
                size="lg"
                showArrow
                arrowPosition="right"
                onPress={handleVerify}
              />
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
              Entered the wrong email?{" "}
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Change email"
              hitSlop={8}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/(auth)/sign-up");
                }
              }}
            >
              <ThemedText
                variant="caption"
                style={{
                  color: colors.textPrimary,
                  fontFamily: fontFamilies.semiBold,
                  textDecorationLine: "underline",
                }}
              >
                Change email
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
