import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AllDataContainer from "../../components/AllDataContainer";
import { seriesFavoritesVar } from "../../store/favorite";
export default function SeriesFavorite({ navigation }) {
  const favoritesSeries = useReactiveVar(seriesFavoritesVar);

  if (favoritesSeries.length < 1) {
    return (
      <View style={styles.emptyList}>
        <Text>Your Favorite TV Series is Empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <AllDataContainer
          navigation={navigation}
          data={favoritesSeries}
          page="FavoritesSeries"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  itemContainer: {
    marginHorizontal: 15,
  },
  emptyList: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
