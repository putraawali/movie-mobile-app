import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { movieFavoritesVar, seriesFavoritesVar } from "../store/favorite";
export default function AllCard({ item, navigation }) {
  const route = useRoute();
  let routeName = null;
  route.name === "Movie" ? (routeName = "favorites") : null;
  route.name === "Series" ? (routeName = "favorites") : null;
  function addFavorite() {
    if (item.__typename === "OutputSeries") {
      const currentFavoritesSeries = seriesFavoritesVar();
      const newFavoritesSeries = [...currentFavoritesSeries, item];
      return seriesFavoritesVar(newFavoritesSeries);
    }

    if (item.__typename === "OutputMovies") {
      const currentFavoritesMovies = movieFavoritesVar();
      const newFavoritesMovies = [...currentFavoritesMovies, item];
      return movieFavoritesVar(newFavoritesMovies);
    }
  }

  function removeFavorite() {
    if (item.__typename === "OutputSeries") {
      const currentFavoritesSeries = seriesFavoritesVar();
      const newFavoritesSeries = currentFavoritesSeries.filter(
        (series) => series._id !== item._id
      );
      return seriesFavoritesVar(newFavoritesSeries);
    }

    if (item.__typename === "OutputMovies") {
      const currentFavoritesMovies = movieFavoritesVar();
      const newFavoritesMovies = currentFavoritesMovies.filter(
        (movies) => movies._id !== item._id
      );
      return movieFavoritesVar(newFavoritesMovies);
    }
  }

  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.image}
        source={{
          uri: item.poster_path,
        }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.wrap}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, color: "grey" }}>
              {item.tags.join(", ")}
            </Text>
          </View>
          <Text style={{ fontSize: 13 }}>Rating: {item.popularity} ✦</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Detail", {
                id: item._id,
                name: route.name,
              })
            }
            style={styles.buttonDetail}
          >
            <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "400" }}>
              Detail
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={routeName ? removeFavorite : addFavorite}
            style={styles.buttonFavorite}
          >
            <Ionicon
              name={routeName ? "heart" : "heart-outline"}
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginVertical: 9,
    maxWidth: 280,
  },
  image: {
    height: 180,
    width: 120,
    borderRadius: 8,
  },
  wrap: {
    flexShrink: 1,
    flexWrap: "wrap",
    flexGrow: 1,
  },
  infoContainer: {
    marginLeft: 10,
  },
  buttonDetail: {
    width: 100,
    height: 40,
    backgroundColor: "#272343",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonFavorite: {
    width: 40,
    height: 40,
    backgroundColor: "#d22780",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});
