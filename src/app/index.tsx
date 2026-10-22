import React, { useState } from "react";
import {
  ScrollView,
  View,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  colors,
  spacing,
  radius,
  type,
  fontFamilies,
} from "@/theme";
import {
  ThemedText,
  Button,
  InputField,
  FilterChip,
  Badge,
  Card,
  PolicyCard,
  ProfileRow,
  SegmentedControl,
  Toggle,
  Stepper,
  AlertBanner,
  ListingCard,
  GlassTabBar,
  TabKey,
} from "@/components";

export default function DesignSystemScreen() {
  const insets = useSafeAreaInsets();

  // State for interactive showcase
  const [name, setName] = useState("Joanna Smith");
  const [password, setPassword] = useState("roampassword");
  const [searchQuery, setSearchQuery] = useState("Cabins in California");
  const [activeChip, setActiveChip] = useState("Cabins");
  const [activeCategory, setActiveCategory] = useState("All Stays");
  const [segmentValue, setSegmentValue] = useState("list");
  const [toggleActive, setToggleActive] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceGray }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Math.max(insets.top, 24),
          paddingBottom: Math.max(insets.bottom, 24) + 80,
          paddingHorizontal: spacing.md,
          gap: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header / Intro */}
        <View style={{ gap: 4 }}>
          <ThemedText
            variant="caption"
            style={{
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: colors.textSecondary,
              fontFamily: fontFamilies.bold,
            }}
          >
            Roam Mobile App
          </ThemedText>
          <ThemedText
            variant="heading"
            style={{ fontSize: 32, color: colors.textPrimary }}
          >
            Design System Reference
          </ThemedText>
        </View>

        {/* 01. Brand */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 12,
            }}
          >
            01. Brand
          </ThemedText>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <ThemedText
                style={{
                  fontFamily: fontFamilies.extraBold,
                  fontSize: 54,
                  lineHeight: 56,
                  letterSpacing: -2,
                  color: colors.textPrimary,
                }}
              >
                roam
              </ThemedText>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: radius.full,
                  backgroundColor: colors.primaryYellow,
                  marginLeft: 4,
                  marginBottom: 8,
                }}
              />
            </View>
            <ThemedText
              variant="body"
              style={{
                fontSize: 18,
                color: colors.textSecondary,
                maxWidth: 280,
              }}
            >
              Find unforgettable stays for every kind of trip.
            </ThemedText>
          </View>
        </Card>

        {/* 02. Color Palette */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            02. Color Palette
          </ThemedText>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {[
              {
                name: "Primary Yellow",
                hex: colors.primaryYellow,
                desc: "Primary actions, active states",
                textColor: colors.textPrimary,
              },
              {
                name: "Lavender",
                hex: colors.lavender,
                desc: "Secondary actions, highlights",
                textColor: colors.textPrimary,
              },
              {
                name: "Text Primary",
                hex: colors.textPrimary,
                desc: "Headings, primary text",
                textColor: colors.surfaceWhite,
              },
              {
                name: "Text Secondary",
                hex: colors.textSecondary,
                desc: "Body text, secondary text",
                textColor: colors.surfaceWhite,
              },
              {
                name: "Surface White",
                hex: colors.surfaceWhite,
                desc: "Cards, sheets, modals",
                textColor: colors.textPrimary,
                border: colors.borderGray,
              },
              {
                name: "Surface Gray",
                hex: colors.surfaceGray,
                desc: "App background, input fields",
                textColor: colors.textPrimary,
                border: colors.borderGray,
              },
              {
                name: "Border Gray",
                hex: colors.borderGray,
                desc: "Dividers, borders",
                textColor: colors.textPrimary,
              },
              {
                name: "Glass Blur",
                hex: "rgba(255, 255, 255, 0.7)",
                desc: "Tab bar, glass surfaces",
                textColor: colors.textPrimary,
                border: colors.borderGray,
              },
            ].map((c) => (
              <View
                key={c.name}
                style={{
                  width: "47%",
                  padding: 12,
                  borderRadius: radius.md,
                  borderCurve: "continuous",
                  backgroundColor: colors.surfaceGray,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    height: 52,
                    borderRadius: radius.sm,
                    backgroundColor: c.hex,
                    borderWidth: c.border ? 1 : 0,
                    borderColor: c.border || "transparent",
                  }}
                />
                <View>
                  <ThemedText
                    variant="label"
                    style={{ fontSize: 13, color: colors.textPrimary }}
                  >
                    {c.name}
                  </ThemedText>
                  <ThemedText
                    variant="caption"
                    style={{
                      fontSize: 11,
                      color: colors.textSecondary,
                      fontFamily: fontFamilies.regular,
                    }}
                  >
                    {c.hex}
                  </ThemedText>
                  <ThemedText
                    variant="caption"
                    style={{
                      fontSize: 10,
                      color: colors.textSecondary,
                      marginTop: 2,
                    }}
                  >
                    {c.desc}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* 03. Typography */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            03. Typography
          </ThemedText>

          <View style={{ gap: 18 }}>
            <View>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary, fontSize: 11 }}
              >
                Display · 56pt Bold · Line height 1.0
              </ThemedText>
              <ThemedText
                variant="display"
                style={{ fontSize: 44, lineHeight: 46 }}
              >
                Find your next stay
              </ThemedText>
            </View>

            <View>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary, fontSize: 11 }}
              >
                Heading · 28pt Bold · Line height 1.2
              </ThemedText>
              <ThemedText variant="heading">
                Modern Cabin with Hot Tub
              </ThemedText>
            </View>

            <View>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary, fontSize: 11 }}
              >
                Body · 16pt Regular · Line height 1.5
              </ThemedText>
              <ThemedText variant="body">
                From mountain cabins to oceanfront villas, roam helps you find
                unforgettable stays for every kind of trip.
              </ThemedText>
            </View>

            <View>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary, fontSize: 11 }}
              >
                Caption · 14pt Medium
              </ThemedText>
              <ThemedText variant="caption">Lake Arrowhead, CA</ThemedText>
            </View>

            <View>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary, fontSize: 11 }}
              >
                Button · 17pt Medium
              </ThemedText>
              <ThemedText variant="button">Book this stay</ThemedText>
            </View>
          </View>
        </Card>

        {/* 04. Buttons */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            04. Buttons
          </ThemedText>

          <View style={{ gap: 14 }}>
            <Button
              title="Book this stay"
              variant="primary"
              showArrow
              onPress={() => {}}
            />

            <Button
              title="Continue with Google"
              variant="secondary"
              leftIcon={
                <ThemedText style={{ fontSize: 18, marginRight: 4 }}>
                  🇬
                </ThemedText>
              }
              onPress={() => {}}
            />

            <View style={{ gap: 8, marginTop: 4 }}>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary }}
              >
                Icon buttons
              </ThemedText>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Button variant="icon" size="md">
                  <Ionicons
                    name="heart-outline"
                    size={22}
                    color={colors.textPrimary}
                  />
                </Button>
                <Button variant="icon" size="md">
                  <Feather
                    name="share"
                    size={20}
                    color={colors.textPrimary}
                  />
                </Button>
                <Button variant="icon" size="md">
                  <Feather
                    name="search"
                    size={20}
                    color={colors.textPrimary}
                  />
                </Button>
                <Button variant="icon" size="md">
                  <Feather
                    name="bookmark"
                    size={20}
                    color={colors.textPrimary}
                  />
                </Button>
              </View>
            </View>
          </View>
        </Card>

        {/* 05. Input Fields */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            05. Input Fields
          </ThemedText>

          <View style={{ gap: 14 }}>
            {/* Search field */}
            <View style={{ gap: 4 }}>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary }}
              >
                Search field
              </ThemedText>
              <InputField
                variant="pill"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search destinations"
                leftIcon={
                  <Feather
                    name="search"
                    size={18}
                    color={colors.textPrimary}
                  />
                }
                rightIcon={
                  <Feather
                    name="sliders"
                    size={18}
                    color={colors.textPrimary}
                  />
                }
              />
            </View>

            {/* Form field default */}
            <View style={{ gap: 4 }}>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary }}
              >
                Form field (default)
              </ThemedText>
              <InputField
                placeholder="Enter your name"
                leftIcon={
                  <Feather
                    name="user"
                    size={18}
                    color={colors.textSecondary}
                  />
                }
              />
            </View>

            {/* Form field focused / active */}
            <View style={{ gap: 4 }}>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary }}
              >
                Form field (focused state with lavender border)
              </ThemedText>
              <InputField
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                leftIcon={
                  <Feather
                    name="user"
                    size={18}
                    color={colors.textPrimary}
                  />
                }
              />
            </View>

            {/* Password field */}
            <View style={{ gap: 4 }}>
              <ThemedText
                variant="caption"
                style={{ color: colors.textSecondary }}
              >
                Password field (with secure entry toggle)
              </ThemedText>
              <InputField
                value={password}
                onChangeText={setPassword}
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
        </Card>

        {/* 06. Filter Chips */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            06. Filter Chips
          </ThemedText>

          <View style={{ gap: 14 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["Cabins", "Under $300", "Pet Friendly", "Quiet"].map((item) => (
                <FilterChip
                  key={item}
                  label={item}
                  active={activeChip === item}
                  onPress={() => setActiveChip(item)}
                />
              ))}
            </View>

            <ThemedText
              variant="caption"
              style={{ color: colors.textSecondary, marginTop: 4 }}
            >
              Category chips
            </ThemedText>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {[
                { label: "All Stays", icon: "home" },
                { label: "Cabins", icon: "compass" },
                { label: "Beach", icon: "sun" },
                { label: "City", icon: "grid" },
                { label: "Villas", icon: "map" },
              ].map((cat) => (
                <FilterChip
                  key={cat.label}
                  label={cat.label}
                  active={activeCategory === cat.label}
                  activeVariant="dark"
                  icon={
                    <Feather
                      name={cat.icon as any}
                      size={14}
                      color={
                        activeCategory === cat.label
                          ? colors.primaryYellow
                          : colors.textPrimary
                      }
                    />
                  }
                  onPress={() => setActiveCategory(cat.label)}
                />
              ))}
            </View>
          </View>
        </Card>

        {/* 07. Listing Card */}
        <View style={{ gap: 8 }}>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              paddingHorizontal: 4,
            }}
          >
            07. Listing Card
          </ThemedText>
          <ListingCard
            imageUrl="https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000&auto=format&fit=crop"
            title="Modern Cabin with Hot Tub"
            location="Lake Arrowhead, CA"
            rating={4.9}
            reviewsCount={342}
            amenities={["Hot Tub", "Pet Friendly"]}
            pricePerNight={280}
            isFavorite={true}
          />
        </View>

        {/* 08. Policy Card */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            08. Policy Card
          </ThemedText>

          <View style={{ gap: 12 }}>
            <PolicyCard
              icon={
                <Ionicons
                  name="chatbubble-ellipses"
                  size={22}
                  color={colors.textPrimary}
                />
              }
              title="Ask about policies"
              subtitle="Cancellation, house rules, pets, check-in and more."
              onPress={() => {}}
            />

            <PolicyCard
              icon={
                <Ionicons
                  name="document-text"
                  size={22}
                  color={colors.textPrimary}
                />
              }
              title="Free cancellation"
              subtitle="Full refund up to 7 days before check-in."
              onPress={() => {}}
            />
          </View>
        </Card>

        {/* 09. Profile Row */}
        <Card padding="xs">
          <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md }}>
            <ThemedText
              variant="caption"
              style={{
                fontFamily: fontFamilies.bold,
                color: colors.textSecondary,
                marginBottom: 8,
              }}
            >
              09. Profile Row
            </ThemedText>
          </View>

          <View>
            <ProfileRow
              icon={
                <Feather name="user" size={20} color={colors.textPrimary} />
              }
              title="Personal info"
              onPress={() => {}}
            />
            <ProfileRow
              icon={
                <Feather
                  name="credit-card"
                  size={20}
                  color={colors.textPrimary}
                />
              }
              title="Payment methods"
              onPress={() => {}}
            />
            <ProfileRow
              icon={
                <Feather
                  name="briefcase"
                  size={20}
                  color={colors.textPrimary}
                />
              }
              title="Trips"
              showDivider={false}
              onPress={() => {}}
            />
          </View>
        </Card>

        {/* 10. Bottom Navigation (Liquid Glass Tab Bar) */}
        <View style={{ gap: 10 }}>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              paddingHorizontal: 4,
            }}
          >
            10. Bottom Navigation (Liquid Glass Tab Bar)
          </ThemedText>
          <GlassTabBar
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />
        </View>

        {/* 11. Iconography */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            11. Iconography
          </ThemedText>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <Feather name="home" size={22} color={colors.textPrimary} />
            <Feather name="search" size={22} color={colors.textPrimary} />
            <Ionicons
              name="heart-outline"
              size={22}
              color={colors.textPrimary}
            />
            <Feather name="calendar" size={22} color={colors.textPrimary} />
            <Feather name="user" size={22} color={colors.textPrimary} />
            <Feather name="settings" size={22} color={colors.textPrimary} />
            <Feather name="map-pin" size={22} color={colors.textPrimary} />
            <Feather name="sliders" size={22} color={colors.textPrimary} />
          </View>
        </Card>

        {/* 12. Segmented Control */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 14,
            }}
          >
            12. Segmented Control
          </ThemedText>

          <SegmentedControl
            options={[
              {
                value: "list",
                label: "List",
                icon: (
                  <Feather
                    name="list"
                    size={16}
                    color={
                      segmentValue === "list"
                        ? colors.surfaceWhite
                        : colors.textSecondary
                    }
                  />
                ),
              },
              {
                value: "map",
                label: "Map",
                icon: (
                  <Feather
                    name="map"
                    size={16}
                    color={
                      segmentValue === "map"
                        ? colors.surfaceWhite
                        : colors.textSecondary
                    }
                  />
                ),
              },
            ]}
            value={segmentValue}
            onChange={setSegmentValue}
          />
        </Card>

        {/* 13. Toggles & Steppers */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            13. Toggles / Steppers
          </ThemedText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Toggle
                checked={toggleActive}
                onCheckedChange={setToggleActive}
              />
              <ThemedText variant="caption">
                {toggleActive ? "Active" : "Inactive"}
              </ThemedText>
            </View>

            <Stepper
              value={guestCount}
              onChange={setGuestCount}
              min={1}
              max={16}
            />
          </View>
        </Card>

        {/* 14. Status / Alerts */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            14. Status / Alerts
          </ThemedText>

          <View style={{ gap: 12 }}>
            {showSuccessAlert && (
              <AlertBanner
                type="success"
                message="Account created successfully"
                onDismiss={() => setShowSuccessAlert(false)}
              />
            )}

            {showErrorAlert && (
              <AlertBanner
                type="error"
                message="Something went wrong. Please try again."
                onDismiss={() => setShowErrorAlert(false)}
              />
            )}

            {(!showSuccessAlert || !showErrorAlert) && (
              <Button
                title="Reset Alerts"
                variant="ghost"
                size="sm"
                onPress={() => {
                  setShowSuccessAlert(true);
                  setShowErrorAlert(true);
                }}
              />
            )}
          </View>
        </Card>

        {/* 15. Tags / Badges */}
        <Card>
          <ThemedText
            variant="caption"
            style={{
              fontFamily: fontFamilies.bold,
              color: colors.textSecondary,
              marginBottom: 16,
            }}
          >
            15. Tags / Badges
          </ThemedText>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <Badge variant="guestFavorite" label="Guest favorite" />
            <Badge variant="new" label="New" />
            <Badge variant="discount" label="20% off" />
            <Badge variant="superhost" label="Superhost" />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
