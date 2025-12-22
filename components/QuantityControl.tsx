import { colors, fontSize, spacing } from "@/constants/theme";
import { StyleSheet, Text, View, Pressable } from "react-native";

interface QuantityControlProps{
    qtde: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export function QuantityControl({ qtde, onIncrease, onDecrease }: QuantityControlProps){
    return(
        <View style={styles.container}>

            <Pressable onPress={onDecrease} style={[styles.button, qtde<=1 && {backgroundColor: colors.gray}]}>
                <Text style={styles.buttonText}>-</Text>
            </Pressable>

            <View>
                <Text style={styles.quantityText}>{qtde}</Text>
            </View>

            <Pressable onPress={onIncrease} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:spacing.md
    },
    button:{
        backgroundColor:colors.red,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 8,
    },
    buttonText:{
        color: colors.primary,
        fontSize: fontSize.xl,
        fontWeight: 'bold',
    },
    quantityText:{
        fontSize: 18,
        fontWeight: '500',
        color: colors.primary,
    },
});