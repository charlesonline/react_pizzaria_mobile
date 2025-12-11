import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { colors } from "../constants/theme";

export default function RootLayout() {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(auth)" />
    </Stack>
    </>
  );
}