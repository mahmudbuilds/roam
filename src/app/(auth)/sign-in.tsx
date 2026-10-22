import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { Button, ThemedText } from "@/components";
import { colors, spacing } from "@/theme";

export default function SignInScreen() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surfaceWhite,
        padding: spacing.lg,
        justifyContent: "center",
        gap: spacing.md,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedText variant="heading">Sign in</ThemedText>
      <ThemedText>Authentication arrives in the next plan.</ThemedText>
      <Button title="Back" variant="secondary" onPress={() => router.back()} />
    </View>
  );
}
