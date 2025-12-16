import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Order} from "@/types";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const {signOut} = useAuth();
  const insets = useSafeAreaInsets();
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleOpenTable(){
    if(!tableNumber){
      Alert.alert("Atenção","Por favor, informe o número da mesa.");
      return;
    }

    const tableNum = parseInt(tableNumber);

    if(isNaN(tableNum) || tableNum <= 0){
      Alert.alert("Atenção","Por favor, informe um número de mesa válido.");
      return;
    }

    try {
      setLoading(true);

      const response =  await api.post<Order>("/order",{
        table: tableNum.toString(),
        name: "mesa "+tableNum
      });

      router.push({
        pathname: "/(auth)/order",
        params: {
          table: response.data.table,
          order_id: response.data.id
        }
      });
      setTableNumber("");
    }catch(error: any){
      console.log("Erro completo:", error);
      console.log("Status:", error.response?.status);
      console.log("Dados do erro:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Não foi possível abrir a mesa. Tente novamente mais tarde.";
      
      Alert.alert("Erro",errorMessage);
    }finally{
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.background} />
      
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={"padding"}>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">

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

            <Input
              placeholder="Número da mesa.."
              style={styles.input}
              placeholderTextColor={colors.gray}
              value={tableNumber}
              onChangeText={setTableNumber}
              keyboardType="numeric"
            />

            <Button
              title="Abrir mesa"
              onPress={handleOpenTable}
            />

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