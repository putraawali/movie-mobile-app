import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DataCarousel from "../../store/dataCarousel";
import CarouselContainer from "./components/CarouselContainer";
import HomeSliderContainer from "./components/HomeSliderContainer";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { useQuery } from "@apollo/client";
import { GET_HOME_DATA } from "../../graphql/queries";
import TopTitle from "../../components/TopTitle";
import Loading from "../../components/Loading";
export default function HomePage({ navigation }) {
  const { loading, error, data } = useQuery(GET_HOME_DATA, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const filteredMovies = data.movies.filter((el) => el.popularity > 7.0);
  const filteredSeries = data.allSeries.filter((el) => el.popularity > 7.0);
  return (
    <>
      <TopTitle />
      <ScrollView style={{ backgroundColor: "#ffffff" }}>
        <View style={styles.container}>
          <View style={styles.bannerContainer}>
            <CarouselContainer data={DataCarousel} />
          </View>
          <View
            style={{
              borderBottomColor: "grey",
              marginVertical: 14,
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Top Movies</Text>
            <TouchableOpacity onPress={() => navigation.navigate("All Movie")}>
              <Text style={{ marginVertical: 10 }}>
                All Movies{" "}
                <FontAwesomeIcon
                  style={{ marginLeft: 50 }}
                  name="chevron-circle-right"
                />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainContentContainer}>
            <HomeSliderContainer
              navigation={navigation}
              data={filteredMovies}
            />
          </View>
          <View
            style={{
              borderBottomColor: "grey",
              marginVertical: 14,
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Top Series</Text>
            <TouchableOpacity onPress={() => navigation.navigate("All Series")}>
              <Text style={{ marginVertical: 10 }}>
                All Series{" "}
                <FontAwesomeIcon
                  style={{ marginLeft: 50 }}
                  name="chevron-circle-right"
                />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainContentContainer}>
            <HomeSliderContainer
              navigation={navigation}
              data={filteredSeries}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
  },
  bannerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  titleContainer: {
    justifyContent: "space-between",
    marginHorizontal: 25,
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  mainContentContainer: {
    flex: 2,
    marginBottom: 25,
  },
});
