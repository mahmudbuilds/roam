import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Button, ThemedText } from "@/components";
import { PagerDots } from "@/components/pager-dots";
import { colors, fontFamilies, radius, spacing } from "@/theme";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const slides = [
  {
    key: "story",
    image: u("photo-1449158743715-0a90ebb6d2d8"),
    place: "Whistler, BC",
    title: "Find a stay that fits your story",
    body: "From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip.",
  },
  {
    key: "sentence",
    image: u("photo-1520250497591-112f2f40a3f4"),
    place: "Tulum, Mexico",
    title: "Describe it in one sentence",
    body: "Say what you want, like a quiet pet friendly cabin with a hot tub, and roam ranks the stays that match.",
  },
  {
    key: "book",
    image: u("photo-1464822759023-fed622ff2c3b"),
    place: "Banff, AB",
    title: "Know before you book",
    body: "Ask about check-in, pets or cancellation and get the exact answer from the stay's own policies.",
  },
] as const;

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const slide = slides[index];

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const goToAuth = () => router.push("/(auth)/sign-in");

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(s) => s.key}
        onMomentumScrollEnd={onScrollEnd}
        style={StyleSheet.absoluteFill}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={{ width, height: "75%" }}
            contentFit="cover"
            transition={200}
            accessibilityIgnoresInvertColors
          />
        )}
      />

      <View
        pointerEvents="box-none"
        style={[styles.top, { top: insets.top + spacing.sm }]}
      >
        <ThemedText style={styles.wordmark}>roam</ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip"
          onPress={() => router.replace("/home")}
          style={styles.skip}
        >
          <ThemedText variant="label">Skip</ThemedText>
        </Pressable>
      </View>

      <View style={styles.chip}>
        <Feather name="map-pin" size={16} color={colors.surfaceWhite} />
        <ThemedText variant="label" style={{ color: colors.surfaceWhite }}>
          {slide.place}
        </ThemedText>
      </View>

      <View
        style={[
          styles.sheet,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <PagerDots count={slides.length} activeIndex={index} />
        <ThemedText style={styles.title}>{slide.title}</ThemedText>
        <ThemedText style={styles.body}>{slide.body}</ThemedText>
        <View style={{ gap: 12, marginTop: spacing.sm }}>
          <Button
            title="Get started"
            size="lg"
            showArrow
            onPress={goToAuth}
          />
          <Button
            title="Continue with Google"
            variant="secondary"
            size="lg"
            leftIcon={
              <Ionicons name="logo-google" size={22} color="#4285F4" />
            }
            onPress={goToAuth}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surfaceGray },
  top: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wordmark: {
    fontFamily: fontFamilies.extraBold,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -2,
    color: colors.textPrimary,
  },
  skip: {
    backgroundColor: colors.glassBlur,
    paddingHorizontal: spacing.md + 4,
    height: 44,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  chip: {
    position: "absolute",
    left: spacing.lg,
    bottom: "40%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: spacing.md,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: "rgba(20, 20, 30, 0.55)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceWhite,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: 12,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 56,
    borderTopWidth: 0,
  },
  title: {
    fontFamily: fontFamilies.extraBold,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  body: {
    fontFamily: fontFamilies.medium,
    fontSize: 17,
    lineHeight: 24,
    color: colors.textSecondary,
  },
});
