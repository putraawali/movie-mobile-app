import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width;

export default function CarouselItem({ item }) {
  return (
    <View>
      <Image style={styles.image} source={{ uri: item }} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    maxWidth: SLIDER_WIDTH,
    width: SLIDER_WIDTH,
    height: 170,
  },
});
