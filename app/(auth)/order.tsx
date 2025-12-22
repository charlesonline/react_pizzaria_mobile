import { Button } from "@/components/Button";
import OrderItem from "@/components/OrderItem";
import { QuantityControl } from "@/components/QuantityControl";
import { Select } from "@/components/Select";
import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import api from "@/services/api";
import { Category, Item, Product } from "@/types";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loadingAddItem, setLoadingAddItem] = useState(false);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function fetchData(){
            await loadCategories();
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(selectedCategory){
            setSelectedProduct(null);
            loadProducts(selectedCategory);
        }
    }, [selectedCategory]);

    async function loadCategories(){
        try{
            setLoadingCategories(true);
            const response = await api.get<Category[]>('/categories');
            setCategories(response.data);
            // setProducts([]);
        }catch(error){
            console.log("Erro ao carregar categorias:", error);
        }finally{
            setLoadingCategories(false);
        }
    }

    async function loadProducts(categoryId: string) {
        try {
            setLoadingProducts(true);
            const response = await api.get<Product[]>(`/products/category`,{
                params: { category_id: categoryId }
            });
            setProducts(response.data);
        } catch (error) {
            console.log("Erro ao carregar produtos:", error);
        } finally {
            setLoadingProducts(false);
        }
    }

    async function handleAddItem(){
        try{
            setLoadingAddItem(true);

            const response = await api.post<Item>('/order/add', {
                order_id,
                product_id: selectedProduct,
                amount: quantity
            });

            const product = products.find(p => p.id === selectedProduct);
            const itemWithProduct = {
                ...response.data,
                product: product!
            };

            setItems([...items, itemWithProduct]);

            setSelectedCategory('');
            setSelectedProduct('');
            setQuantity(1);
        }catch(error){
            console.log("Erro ao adicionar item ao pedido:", error);
        } finally {
            setLoadingAddItem(false);
        }
    }

    async function handleRemoveItem(itemId: string){
        try{
            await api.delete('/order/remove', {
                params: {
                    item_id: itemId,
                    order_id
                }
            });

            setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        }catch(error){
            console.log("Erro ao remover item do pedido:", error);
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

                {loadingProducts ? (
                    <ActivityIndicator size="large" color={colors.brand} style={{marginTop: spacing.lg}} />
                ) : (
                    selectedCategory && (
                        <Select
                            options={products.map(product => ({
                                label: product.name,
                                value: product.id
                            }))}
                            selectedValue={selectedProduct || ""}
                            onValueChange={(value) => {
                                setSelectedProduct(value);
                            }}
                            placeholder={selectedCategory ? "Selecione um produto" : "Selecione uma categoria primeiro"}
                        />
                    )
                )}

                {selectedProduct && (
                    <View style={styles.quantitySection}>
                        <Text style={styles.quantityText}>Quantidade</Text>
                        <QuantityControl
                            qtde={quantity}
                            onIncrease={() => setQuantity(quantity + 1)}
                            onDecrease={() => {
                                if(quantity <= 1){
                                    setQuantity(1);
                                    return;
                                }

                                setQuantity(quantity - 1);
                            }}
                        />
                    </View>
                )}

                {selectedProduct && (
                    <Button 
                        title="Adicionar"
                        onPress={handleAddItem}
                        variant="secondary"
                    />
                )}

                {items.length > 0 && (
                    <View style={styles.itemsSection}>
                        <Text style={styles.itemsTitle}>Produtos</Text>

                        {items.map(item => (
                            <OrderItem key={item.id} item={item} onRemove={() => handleRemoveItem(item.id)} />
                        ))}
                    </View>
                )}

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
        gap:14
    },
    quantitySection:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical: spacing.md
    },
    quantityText:{
        fontSize: fontSize.xl,
        fontWeight:'500',
        color: colors.primary
    },
    itemsSection:{
        marginTop: spacing.xl,
        gap: spacing.md
    },
    itemsTitle:{
        color: colors.primary,
        fontSize: fontSize.lg,
        fontWeight: 'bold',
    }
});