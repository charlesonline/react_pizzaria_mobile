import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { colors } from "../constants/theme";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </AuthProvider>
  );
}