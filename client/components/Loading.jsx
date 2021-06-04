import React from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
const { height } = Dimensions.get("screen");
export default function Loading() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        height: height,
      }}
    >
      <ActivityIndicator color="#4a266a" size={80} />
    </View>
  );
}
