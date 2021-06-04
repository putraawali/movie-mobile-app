import React from "react";
import { StyleSheet, StatusBar, Text, View, Platform } from "react-native";

export default function TopTitle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        TI<Text style={{ color: "#ff971d" }}>K</Text> ID
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 5,
  },
  title: {
    fontSize: 30,
    color: "#333333",
    fontWeight: "bold",
  },
});
