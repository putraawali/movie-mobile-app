import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SeriesFavorite from "../screen/Favorite/SeriesFavorite";
import MovieFavorite from "../screen/Favorite/MovieFavorite";
import { Platform, StatusBar } from "react-native";
const Tab = createMaterialTopTabNavigator();

export default function FavoriteTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "#ff971d",
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
        },
      }}
    >
      <Tab.Screen name="Movie" component={MovieFavorite} />
      <Tab.Screen name="Series" component={SeriesFavorite} />
    </Tab.Navigator>
  );
}
