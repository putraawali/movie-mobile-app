import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ALL_MOVIES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import AllDataContainer from "../../components/AllDataContainer";
import Loading from "../../components/Loading";
import SearchBar from "../../components/Search";

export default function AllMovie({ navigation }) {
  const { loading, error, data } = useQuery(ALL_MOVIES, {
    fetchPolicy: "network-only",
  });
  const [searchValue, setSearchValue] = useState("");
  const [dataMovies, setDataMovies] = useState([]);
  useEffect(() => {
    if (!searchValue && data) {
      setDataMovies(data.movies);
    } else if (searchValue && data) {
      const items = data.movies.filter((item) =>
        item.title.toLowerCase().match(searchValue.toLowerCase())
      );
      setDataMovies(items);
    }
  }, [loading, searchValue]);

  if (loading) return <Loading />;

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <View style={{ backgroundColor: "#ffffff" }}>
        <View style={styles.itemContainer}>
          <AllDataContainer navigation={navigation} data={dataMovies} />
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
