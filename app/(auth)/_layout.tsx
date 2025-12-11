import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { colors } from "../../constants/theme";

export default function AuthLayout() {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
    </Stack>
    </>
  );
}