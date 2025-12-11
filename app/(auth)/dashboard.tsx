import { View, Text } from "react-native";

export default function Dashboard() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Text style={{ fontSize: 24, color: "#333333" }}>Dashboard</Text>
    </View>
  );
}