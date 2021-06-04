import React from "react";
import { FlatList } from "react-native";
import Card from "./Card";
export default function AllDataContainer({ data, navigation, page }) {
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, i) => "key" + i}
        renderItem={({ item }) => {
          return <Card navigation={navigation} item={item} page={page} />;
        }}
      />
    </>
  );
}
