import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screen/HomeScreen";
import AllMovieScreen from "../screen/Movies";
import AllSeries from "../screen/Series";
import Detail from "../screen/Detail";
import EditScreen from "../screen/EditScreen";
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 40,
        cardStyle: { backgroundColor: "#ffffff" },
      }}
      initialRouteName="Home-Stack"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home-Stack"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="All Movie"
        component={AllMovieScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="All Series"
        component={AllSeries}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#333333",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="Detail"
        component={Detail}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#333333",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="Edit"
        component={EditScreen}
      />
    </Stack.Navigator>
  );
};

// export { HomeStackNavigator };
export default HomeStackNavigator;
