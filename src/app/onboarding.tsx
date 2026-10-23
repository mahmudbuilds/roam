import React, { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { colors, spacing, radius, fontFamilies } from "@/theme";
import { ThemedText, Button, GoogleLogo } from "@/components";

interface OnboardingSlide {
  id: string;
  location: string;
  title: string;
  description: string;
  imageUrl: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: "whistler",
    location: "Whistler, BC",
    title: "Find a stay that\nfits your story",
    description:
      "From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip.",
    imageUrl:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "big-sur",
    location: "Big Sur, CA",
    title: "Dream stays in\njust one line",
    description:
      "Tell us what matters—quiet woods, ocean views, pet-friendly decks, or a private hot tub under $300 a night.",
    imageUrl:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "sedona",
    location: "Sedona, AZ",
    title: "Instant answers,\nzero surprises",
    description:
      "Ask anything about house rules, pet policies, or check-in details and get exact answers straight from the stay.",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
  },
];

const CURVE_HEIGHT = 96;

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Make hero image tall enough to extend well below the entire sloped SVG curve on the right side
  const heroHeight = Math.round(screenHeight * 0.72);
  const currentSlide = SLIDES[activeIndex] ?? SLIDES[0];

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(offsetX / screenWidth);
    if (nextIndex >= 0 && nextIndex < SLIDES.length) {
      setActiveIndex(nextIndex);
    }
  };

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  const touchStartXRef = useRef<number | null>(null);

  const handleSkip = () => {
    router.push("/(auth)/sign-in");
  };

  const handleGetStarted = () => {
    router.push("/(auth)/sign-in");
  };

  const handleContinueWithGoogle = () => {
    router.push({
      pathname: "/(auth)/sign-in",
      params: { provider: "google" },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.textPrimary }}>
      <StatusBar style="dark" />

      {/* Full-bleed Hero Image Carousel extending behind the entire sloped curve */}
      <View style={{ width: screenWidth, height: heroHeight }}>
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth, height: heroHeight }}>
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                transition={250}
              />
              {/* Subtle top dawn sky gradient so dark status bar and roam wordmark stay crisp */}
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 140,
                }}
              >
                <Svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 390 140"
                  preserveAspectRatio="none"
                >
                  <Defs>
                    <LinearGradient id="topSkyGlow" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0%" stopColor="#EBE6F2" stopOpacity="0.65" />
                      <Stop offset="65%" stopColor="#EBE6F2" stopOpacity="0.2" />
                      <Stop offset="100%" stopColor="#EBE6F2" stopOpacity="0" />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    x="0"
                    y="0"
                    width="390"
                    height="140"
                    fill="url(#topSkyGlow)"
                  />
                </Svg>
              </View>
            </View>
          )}
        />

        {/* Top Bar: roam wordmark + Skip pill */}
        <View
          style={{
            position: "absolute",
            top: Math.max(insets.top, spacing.md) + spacing.xs,
            left: 0,
            right: 0,
            paddingHorizontal: spacing.lg,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText variant="brandWordmark">roam</ThemedText>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Skip onboarding"
            onPress={handleSkip}
            style={({ pressed }) => ({
              backgroundColor: colors.skipPillBg,
              borderRadius: radius.full,
              paddingHorizontal: 18,
              paddingVertical: spacing.sm,
              minHeight: 38,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <ThemedText
              variant="subhead"
              style={{
                fontFamily: fontFamilies.semiBold,
                color: colors.textPrimary,
              }}
            >
              Skip
            </ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Bottom Sheet anchored to bottom: 0 with transparent upper slope over the hero image */}
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* Floating Location Pill anchored above the top-left plateau of the curve */}
        <View
          style={{
            position: "absolute",
            top: -50,
            left: spacing.lg,
            zIndex: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.locationPillBg,
            borderWidth: 1,
            borderColor: colors.locationPillBorder,
            borderRadius: radius.full,
            paddingHorizontal: 14,
            paddingVertical: spacing.sm,
          }}
        >
          <Ionicons
            name="location-sharp"
            size={16}
            color={colors.surfaceWhite}
          />
          <ThemedText
            variant="caption"
            style={{
              color: colors.surfaceWhite,
              fontFamily: fontFamilies.medium,
            }}
          >
            {currentSlide.location}
          </ThemedText>
        </View>

        {/* Background Layer: Sloped SVG top + solid white lower fill (no white above CURVE_HEIGHT) */}
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Svg
            width="100%"
            height={CURVE_HEIGHT}
            viewBox={`0 0 390 ${CURVE_HEIGHT}`}
            preserveAspectRatio="none"
          >
            <Path
              d={`M 0 ${CURVE_HEIGHT} L 0 46 C 0 14, 24 0, 64 0 L 148 0 C 210 0, 316 28, 354 44 C 378 54, 390 72, 390 ${CURVE_HEIGHT} Z`}
              fill={colors.surfaceWhite}
            />
          </Svg>
          <View
            style={{
              flex: 1,
              marginTop: -1,
              backgroundColor: colors.surfaceWhite,
            }}
          />
        </View>

        {/* Foreground Content Layer (also supports horizontal swipe to change slides) */}
        <View
          onTouchStart={(e) => {
            touchStartXRef.current = e.nativeEvent.pageX;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current === null) return;
            const deltaX = e.nativeEvent.pageX - touchStartXRef.current;
            touchStartXRef.current = null;
            if (deltaX < -40 && activeIndex < SLIDES.length - 1) {
              goToSlide(activeIndex + 1);
            } else if (deltaX > 40 && activeIndex > 0) {
              goToSlide(activeIndex - 1);
            }
          }}
          style={{
            paddingTop: 34,
            paddingHorizontal: spacing.lg,
            paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.sm,
          }}
        >
          {/* 3 Pagination Indicator Bars */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.sm,
              marginBottom: spacing.md,
            }}
          >
            {SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <Pressable
                  key={slide.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Go to slide ${idx + 1}`}
                  accessibilityState={{ selected: isActive }}
                  onPress={() => goToSlide(idx)}
                  hitSlop={8}
                >
                  <View
                    style={{
                      width: 28,
                      height: 5,
                      borderRadius: radius.full,
                      backgroundColor: isActive
                        ? colors.lavender
                        : colors.borderGray,
                    }}
                  />
                </Pressable>
              );
            })}
          </View>

          {/* Headline (locked 2-line height with descender clearance so sheet never jumps) */}
          <View style={{ height: 84, justifyContent: "center" }}>
            <ThemedText
              variant="heroHeading"
              style={{ includeFontPadding: false }}
            >
              {currentSlide.title}
            </ThemedText>
          </View>

          {/* Description (locked 3-line height with descender clearance and no ellipsis cutoff) */}
          <View style={{ height: 78, marginTop: spacing.xs }}>
            <ThemedText
              variant="subhead"
              style={{
                lineHeight: 23,
                includeFontPadding: false,
              }}
            >
              {currentSlide.description}
            </ThemedText>
          </View>

          {/* Bottom Action Buttons */}
          <View style={{ gap: spacing.mdSm, marginTop: spacing.md }}>
            <Button
              title="Get started"
              variant="primary"
              size="lg"
              showArrow
              arrowPosition="right"
              onPress={handleGetStarted}
            />

            <Button
              title="Continue with Google"
              variant="secondary"
              size="lg"
              leftIcon={<GoogleLogo size={20} />}
              onPress={handleContinueWithGoogle}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
