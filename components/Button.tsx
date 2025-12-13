import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export function Button({ title, variant = "primary", loading = false, disabled, style, ...props }: ButtonProps) {

  const backgroundColor = variant === "primary" ? colors.green : colors.brand;

  return (
    <TouchableOpacity style={[{ backgroundColor }, styles.button, (disabled || loading) && styles.buttonDisabled, style]} {...props}>
      {loading ? <ActivityIndicator color={colors.background} /> :
      <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: "bold",
  },
});