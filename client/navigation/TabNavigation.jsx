import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from "react-native-vector-icons/Ionicons";
import HomeStackNavigator from "./StackNavigator";
import FavoriteTab from "./TopTabNavigator";
import AddScreen from "../screen/AddScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Add Movie / Series") {
            iconName = focused ? "film" : "film-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return <Ionicon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#333333",
        inactiveTintColor: "#f9f6f7",
        activeBackgroundColor: "#ff971d",
        inactiveBackgroundColor: "#ff971d",
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Add Movie / Series" component={AddScreen} />
      <Tab.Screen name="Favorite" component={FavoriteTab} />
    </Tab.Navigator>
  );
};

export { MainTabNavigator };
