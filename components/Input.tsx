import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { View, Text, StyleSheet, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
    label?: string;
}

export function Input({ label, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput style={[styles.input, style]} {...props} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        color: colors.primary,
        fontSize: fontSize.md,
        marginBottom: spacing.sm,
    },
    input: {
        height: 50,
        backgroundColor: colors.backgroundInput,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        color: colors.primary,
        borderWidth: 1,
        borderColor: colors.borderColor,
        fontSize: fontSize.md,
    },
});