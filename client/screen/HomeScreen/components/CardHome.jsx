import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width - 50;

export default function CardHome({ item, navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Detail", {
            id: item._id,
            typeName: item.__typename,
          })
        }
      >
        <Image
          style={styles.image}
          source={{ uri: item.poster_path }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    borderColor: "black",
  },
  image: {
    maxWidth: SLIDER_WIDTH,
    width: 250,
    height: 300,
    borderRadius: 5,
  },
});
