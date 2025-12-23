import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import api from "@/services/api";

export default function Finish(){
    const router = useRouter();
    const {table, order_id} = useLocalSearchParams<{
        table: string;
        order_id: string;
    }>();
    const [customer, setCustomer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function handleFinishOrder(){
        try{
            setLoading(true);
            await api.put('/order/finish', {
                name: customer??'',
                order_id,
            });

            Alert.alert("Pedido finalizado com sucesso!");
            router.dismissAll();
            router.replace('/(auth)/dashboard');
        }catch(error){
            console.log("Erro ao finalizar pedido:", error);
        }finally{
            setLoading(false);
        }
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <View style={styles.content}>
                    <View>
                        <Text style={styles.text}>Finalizar pedido</Text>
                        <Text style={styles.table}>Mesa: {table}</Text>
                    </View>

                    <Input placeholder="Nome do cliente..." placeholderTextColor={colors.gray} value={customer} onChangeText={setCustomer} />

                    <Button loading={loading} title="Finalizar pedido" onPress={handleFinishOrder} />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    scrollView:{
        flex: 1,
    },
    scrollContent:{
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: spacing.xl
    },
    content:{
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal: spacing.lg,
        gap: spacing.lg,
    },
    text:{
        color: colors.primary,
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    table:{
        color: colors.primary,
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});