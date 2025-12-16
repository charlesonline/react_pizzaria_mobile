import { View,Text, ActivityIndicator, StyleSheet, Pressable, ScrollView } from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import { useState, useEffect } from 'react';
import { Category } from "@/types";
import api from "@/services/api";
import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Select } from "@/components/Select";

export default function Order(){
    const router = useRouter();
    const {table, order_id} = useLocalSearchParams<{
        table: string;
        order_id: string;
    }>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        async function fetchData(){
            await loadCategories();
        }
        fetchData();
    }, []);

    async function loadCategories(){
        try{
            setLoadingCategories(true);
            const response = await api.get<Category[]>('/categories');
            setCategories(response.data);
        }catch(error){
            console.log("Erro ao carregar categorias:", error);
        }finally{
            setLoadingCategories(false);
        }
    }

    if(loadingCategories){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.brand} />
            </View>
        );
    }

    return(
        <View style={styles.container}>

            <View style={[styles.header, {paddingTop: insets.top+ spacing.sm}]}>
                <View style={styles.headerContent}>
                    <Text style={styles.tableText}>Mesa {table}</Text>

                    <Pressable style={styles.trashButton} onPress={() => router.back()}>
                        <Ionicons name="trash" size={20} color={colors.primary} />
                    </Pressable>
                </View>
            </View>

            <ScrollView style={styles.scrollContent}>
                <Select
                    label="Categorias"
                    options={categories.map(category => ({
                        label: category.name,
                        value: category.id
                    }))}
                    selectedValue={selectedCategory || ""}
                    onValueChange={(value) => {
                        setSelectedCategory(value);
                    }}
                    placeholder="Selecione uma categoria"
                />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.background
    },
    container:{
        flex:1,
        backgroundColor: colors.background,
    },
    header:{
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.sm,
    },
    headerContent:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    tableText:{
        fontSize: fontSize.lg,
        fontWeight:'600',
        color: colors.primary
    },
    trashButton:{
        backgroundColor: colors.red,
        padding: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    scrollContent:{
        // flex:1,
        padding: spacing.lg,
    }
});