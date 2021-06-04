import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator } from "./navigation/TabNavigation";
export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
}
