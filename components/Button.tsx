import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export function Button({ title, variant = "primary", loading = false, disabled, style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
  text: {},
});