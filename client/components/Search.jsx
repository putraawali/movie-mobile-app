import React from "react";
import {
  StyleSheet,
  StatusBar,
  TextInput,
  View,
  Platform,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function SearchBar(props) {
  const { searchValue, setSearchValue } = props;
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons
          style={{ marginLeft: 10, marginRight: 5 }}
          name="search"
          color="#333333"
          size={25}
        />
        <TextInput
          value={searchValue}
          onChangeText={(target) => setSearchValue(target)}
          style={styles.searchBar}
          placeholder="Search"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 15,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#333333",
    borderWidth: 1,
    width: Dimensions.get("window").width - 40,
    height: 50,
    borderRadius: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 0,
    paddingRight: 20,
  },
});
