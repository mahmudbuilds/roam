import React, { useState } from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, fontFamilies, shadows } from "@/theme";
import { ThemedText } from "./themed-text";
import { Badge } from "./badge";

export interface ListingCardProps {
  imageUrl: string;
  title: string;
  location: string;
  rating: number;
  reviewsCount: number;
  amenities?: string[];
  pricePerNight: number;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ListingCard({
  imageUrl,
  title,
  location,
  rating,
  reviewsCount,
  amenities = ["Hot Tub", "Pet Friendly"],
  pricePerNight,
  isFavorite = false,
  onFavoriteToggle,
  onPress,
  style,
}: ListingCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorite = () => {
    setFavorite((prev) => !prev);
    onFavoriteToggle?.();
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surfaceWhite,
          borderRadius: radius.xl,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: colors.borderGray,
          overflow: "hidden",
          boxShadow: shadows.card,
          opacity: pressed ? 0.95 : 1,
        },
        style,
      ]}
    >
      {/* Property Photo */}
      <View style={{ position: "relative", width: "100%", height: 210 }}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={250}
        />

        {/* Favorite Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={favorite ? "Remove from favorites" : "Add to favorites"}
          onPress={handleFavorite}
          style={({ pressed }) => [
            {
              position: "absolute",
              top: 14,
              right: 14,
              width: 38,
              height: 38,
              borderRadius: radius.full,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.75 : 1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            },
          ]}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={20}
            color={favorite ? "#EF4444" : colors.textPrimary}
          />
        </Pressable>
      </View>

      {/* Property Details */}
      <View style={{ padding: spacing.md, gap: 8 }}>
        <ThemedText
          variant="title"
          style={{
            fontFamily: fontFamilies.bold,
            fontSize: 20,
            lineHeight: 24,
            color: colors.textPrimary,
          }}
        >
          {title}
        </ThemedText>

        {/* Location & Rating */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Feather name="map-pin" size={14} color={colors.textSecondary} />
            <ThemedText
              variant="caption"
              style={{ color: colors.textSecondary, fontSize: 14 }}
            >
              {location}
            </ThemedText>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="star" size={14} color={colors.primaryYellow} />
            <ThemedText
              variant="caption"
              style={{
                fontFamily: fontFamilies.bold,
                color: colors.textPrimary,
                fontSize: 14,
              }}
            >
              {rating.toFixed(1)}
              <ThemedText
                variant="caption"
                style={{
                  fontFamily: fontFamilies.regular,
                  color: colors.textSecondary,
                }}
              >
                {" "}
                ({reviewsCount})
              </ThemedText>
            </ThemedText>
          </View>
        </View>

        {/* Amenity Badges */}
        {amenities.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 4,
            }}
          >
            {amenities.map((amenity, idx) => (
              <Badge
                key={idx}
                variant="neutral"
                label={amenity}
                icon={
                  amenity.toLowerCase().includes("tub") ? (
                    <ThemedText style={{ fontSize: 12 }}>🛁</ThemedText>
                  ) : amenity.toLowerCase().includes("pet") ? (
                    <ThemedText style={{ fontSize: 12 }}>🐾</ThemedText>
                  ) : undefined
                }
              />
            ))}
          </View>
        )}

        {/* Price */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: 6,
          }}
        >
          <ThemedText
            variant="heading"
            style={{
              fontFamily: fontFamilies.bold,
              fontSize: 22,
              color: colors.textPrimary,
            }}
          >
            ${pricePerNight}
          </ThemedText>
          <ThemedText
            variant="body"
            style={{
              color: colors.textSecondary,
              fontSize: 15,
              marginLeft: 4,
            }}
          >
            / night
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}
