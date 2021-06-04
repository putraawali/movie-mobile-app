import React from "react";
import { useQuery } from "@apollo/client";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { client } from "../../graphql/client";
import { MOVIE_DETAIL, SERIES_DETAIL } from "../../graphql/queries";
import Loading from "../../components/Loading";
import ModalPopUp from "../../components/ModalPopUp";
import useDelete from "../../hooks/useDelete";
export default function Detail({ route, navigation }) {
  const { id, name, typeName, type } = route.params;
  /**
   * name as identifier from all movies / tv series screen OR favorite screen
   * typeName as identifier from home screen
   * type as identifier from edit screen
   */
  const { deleteData, setModalVisible, modalVisible } = useDelete(
    id,
    name,
    typeName,
    type
  );

  let dataDetail;
  if (
    name === "All Movie" ||
    typeName === "OutputMovies" ||
    type === "Movie" ||
    name === "Movie"
  ) {
    const { loading, error, data } = useQuery(MOVIE_DETAIL, {
      variables: { id },
    });
    if (loading) return <Loading />;
    dataDetail = data.movie;
  }

  if (
    name === "All Series" ||
    typeName === "OutputSeries" ||
    type === "TV Series" ||
    name === "Series"
  ) {
    const { loading, error, data } = useQuery(SERIES_DETAIL, {
      variables: { id },
    });
    if (loading) return <Loading />;
    dataDetail = data.series;
  }

  return (
    <>
      <View style={styles.container}>
        <Image
          style={{
            height: 350,
            width: 400,
            marginVertical: 9,
          }}
          source={{ uri: dataDetail.poster_path }}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <Text
            style={{ fontSize: 23, fontWeight: "bold", textAlign: "center" }}
          >
            {dataDetail.title}
          </Text>
          <Text style={{ color: "grey" }}>{dataDetail.tags.join(", ")}</Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            ✦ {dataDetail.popularity} ✦
          </Text>
          <Text style={{ textAlign: "justify" }}>{dataDetail.overview}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={deleteData}
              style={[styles.button, { backgroundColor: "#ff1100" }]}
            >
              <Text style={{ color: "#f9f6f7", fontSize: 15 }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Edit", {
                  dataDetail,
                  name,
                  typeName,
                  movieType: type,
                })
              }
              style={[styles.button, { backgroundColor: "#272343" }]}
            >
              <Text style={{ color: "#f9f6f7", fontSize: 15 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalPopUp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deletedData={dataDetail.title}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  infoContainer: {
    marginHorizontal: 15,
    flex: 2,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  button: {
    height: 30,
    width: 100,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
