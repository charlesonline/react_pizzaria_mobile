import { colors,fontSize,borderRadius,spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { StatusBar} from "expo-status-bar";
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";


export default function Dashboard() {
  const {signOut} = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.background} />
      
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={"padding"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >

          <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>

            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>
                charles<Text style={styles.logoBrand}>online</Text><Text style={styles.dotdev}>.dev</Text>
              </Text>
            </View>

            <Text style={styles.title}>Novo pedido</Text>

            <Input placeholder="Número da mesa.." style={styles.input} placeholderTextColor={colors.gray} />
            <Button title="Abrir mesa" onPress={()=>{}}/>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  signOutButton: {
    backgroundColor: colors.red,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  logoutText: {
    color: colors.primary,
    fontSize: fontSize.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
  title:{
    fontSize: fontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  input:{
    marginBottom: spacing.md,
  }
});