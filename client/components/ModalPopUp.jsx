import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function ModalPopUp(props) {
  const {
    modalVisible,
    setModalVisible,
    dataAddMovie,
    dataAddSeries,
    navigation,
    deletedData,
    dataEdit,
    setData,
    setDataInput,
  } = props;
  let movieOrSeriesTitle;
  let status;
  if (dataAddMovie) {
    movieOrSeriesTitle = dataAddMovie.addMovie.title;
    status = "Added";
  }
  if (dataAddSeries) {
    movieOrSeriesTitle = dataAddSeries.addSeries.title;
    status = "Added";
  }
  if (deletedData) {
    movieOrSeriesTitle = deletedData;
    status = "Deleted";
  }
  if (dataEdit) {
    movieOrSeriesTitle = dataEdit;
    status = "Edited";
  }

  function hideModal() {
    setModalVisible(false);
    if (status === "Added") {
      navigation.navigate("Home-Stack");
      setDataInput((state) => ({
        ...state,
        title: "",
        overview: "",
        poster_path: "",
        popularity: "",
        tags: [],
      }));
    }
    if (status === "Deleted") {
      navigation.navigate("Home-Stack");
    }
    if (status === "Edited") {
      navigation.goBack();
      setData((state) => ({
        ...state,
        title: "",
        overview: "",
        poster_path: "",
        popularity: "",
        tags: [],
      }));
    }
  }

  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.container}>
        <Ionicons
          name="md-checkmark-done-circle-outline"
          size={70}
          color="#ffffff"
        />
        <Text style={styles.text}>{movieOrSeriesTitle}</Text>
        <Text style={styles.text}>{status} Successfully</Text>
        <TouchableOpacity style={styles.button} onPress={hideModal}>
          <Ionicons name="finger-print-outline" color="#ffffff" size={30} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4a266a",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 9,
    height: 40,
    width: 80,
    backgroundColor: "#7f4a88",
  },
});
