import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Form from "../../components/Form";
import { dataSelect, dataType } from "../../store/dataSelectDropDown";
import useDataEdit from "../../hooks/useDataEdit";
import ModalPopUp from "../../components/ModalPopUp";
export default function EditScreen({ navigation, route }) {
  const { dataDetail, name, typeName, movieType } = route.params;
  let typeOfMovie;
  if (
    name === "All Movie" ||
    typeName === "OutputMovies" ||
    movieType === "Movie"
  ) {
    typeOfMovie = "Movie";
  } else {
    typeOfMovie = "TV Series";
  }
  const {
    dataInput,
    setDataInput,
    isValid,
    submitForm,
    cancel,
    modalVisible,
    setModalVisible,
    status,
  } = useDataEdit(navigation, dataDetail, typeOfMovie);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#4a266a" }}
            >
              Edit Movie / Series
            </Text>
          </View>
          <Form
            status={status}
            submitForm={submitForm}
            isValid={isValid}
            dataSelect={dataSelect}
            setData={setDataInput}
            data={dataInput}
            dataType={dataType}
            cancel={cancel}
            name={name}
            typeName={typeName}
            movieType={movieType}
          />
        </View>
      </ScrollView>
      <ModalPopUp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataEdit={dataInput.title}
        setData={setDataInput}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});
