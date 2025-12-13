import { colors, fontSize, spacing } from "@/constants/theme";
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, Alert } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {useRouter} from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {signIn} = useAuth();
  const router = useRouter();

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Informe o email e a senha para continuar!");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      router.replace("/(auth)/dashboard");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível realizar o login!");
    } finally {
      setLoading(false);
    }
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            charles<Text style={styles.logoBrand}>online</Text><Text style={styles.dotdev}>.dev</Text>
          </Text>
          <Text style={styles.logoSubtitle}>Waiter</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input label="Email" placeholder="Digite seu email.." placeholderTextColor={colors.gray}
           value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Input label="Senha" placeholder="Digite sua senha.." placeholderTextColor={colors.gray} secureTextEntry 
           value={password} onChangeText={setPassword} />
          <Button title="Entrar" loading={loading} disabled={loading} onPress={handleLogin} />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    justifyContent: "center",
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
  },
  logoContainer:{
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  logoText:{
    fontSize: 34,
    fontWeight: "bold",
    color: colors.primary,
  },
  logoBrand:{
    color: colors.brand,
  },
  dotdev:{
    fontSize: 18,
  },
  logoSubtitle:{
    fontSize: fontSize.lg,
    color: colors.primary
  },
  inputContainer:{
    gap: spacing.md,
  }
});