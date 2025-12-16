import { Stack, useRouter } from "expo-router";
import {useAuth} from '../../context/AuthContext';
import { StatusBar } from "react-native";
import { colors } from "../../constants/theme";
import { useEffect } from "react";

export default function AuthLayout() {

  const { loading, signed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !signed) {
      router.replace('/login');
    }
  }, [loading, signed]);

  if (loading || !signed) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="dashboard" options={{headerShown: false}} />
      <Stack.Screen name="order" options={{headerShown: false}} />
    </Stack>
  );
}