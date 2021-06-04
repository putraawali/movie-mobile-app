import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AllDataContainer from "../../components/AllDataContainer";
import { movieFavoritesVar } from "../../store/favorite";
import { useReactiveVar } from "@apollo/client";
export default function MovieFavorite({ navigation }) {
  const favoritesMovie = useReactiveVar(movieFavoritesVar);

  if (favoritesMovie.length < 1) {
    return (
      <View style={styles.emptyList}>
        <Text>Your Favorite Movies is Empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <AllDataContainer
          navigation={navigation}
          data={favoritesMovie}
          page="FavoritesMovies"
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
