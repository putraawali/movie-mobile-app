import React from "react";
import { FlatList } from "react-native";
import CardHome from "./CardHome";
export default function HomeSliderContainer({ data, navigation }) {
  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, i) => "key" + i}
        horizontal={true}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          return <CardHome navigation={navigation} item={item} />;
        }}
      />
    </>
  );
}
