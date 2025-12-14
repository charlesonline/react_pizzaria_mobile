import { colors } from '@/constants/theme';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from "../context/AuthContext";

export default function Index() {

  const {loading, signed} = useAuth();
  //retorna os segmentos da rota atual, ex.: /login => ["login"] ou /(home)/profile => ["(home)", "profile"]
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!signed && inAuthGroup) {
      //se não esta logado e esta numa rota que exige auth, então redireciona para a tela de login
      router.replace('/login');
    } else if (signed && !inAuthGroup) {
      //esta logado, mas não em rota auth, então redireciona para a tela do dashborad
      router.replace('/(auth)/dashboard');
    } else if (!signed) {
      // não estou logado então redireciona para login
      router.replace('/login');
    }
  } , [loading, signed, router, segments]);

  if (loading) {
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.brand} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});