import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ALL_SERIES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import AllDataContainer from "../../components/AllDataContainer";
import Loading from "../../components/Loading";
import SearchBar from "../../components/Search";
export default function AllSeries({ navigation }) {
  const { loading, error, data } = useQuery(ALL_SERIES, {
    fetchPolicy: "network-only",
  });
  const [searchValue, setSearchValue] = useState("");
  const [dataSeries, setDataSeries] = useState([]);
  useEffect(() => {
    if (!searchValue && data) {
      setDataSeries(data.allSeries);
    } else if (searchValue && data) {
      const items = data.allSeries.filter((item) =>
        item.title.toLowerCase().match(searchValue.toLowerCase())
      );
      setDataSeries(items);
    }
  }, [loading, searchValue]);

  if (loading) return <Loading />;

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <View style={{ backgroundColor: "#ffffff" }}>
        <View style={styles.itemContainer}>
          <AllDataContainer navigation={navigation} data={dataSeries} />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 15,
    marginBottom: 120,
  },
});
