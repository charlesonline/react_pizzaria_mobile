import { colors, fontSize, spacing } from "@/constants/theme";
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Login() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            charles<Text style={styles.logoBrand}>online</Text>
          </Text>
          <Text style={styles.logoSubtitle}>Garçon</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input label="Email" placeholder="Digite seu email.." placeholderTextColor={colors.gray} />
          <Input label="Senha" placeholder="Digite sua senha.." placeholderTextColor={colors.gray} secureTextEntry />
          <Button title="Entrar" />
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
  logoSubtitle:{
    fontSize: fontSize.lg,
    color: colors.primary
  },
  inputContainer:{
    gap: spacing.md,
  }
});