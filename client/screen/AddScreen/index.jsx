import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Form from "../../components/Form";
import TopTitle from "../../components/TopTitle";
import { dataSelect, dataType } from "../../store/dataSelectDropDown";
import useDataAdd from "../../hooks/useDataAdd";
import Loading from "../../components/Loading";
import Modal from "../../components/ModalPopUp";
export default function AddScreen({ navigation }) {
  const {
    dataInput,
    setDataInput,
    isValid,
    type,
    setType,
    submitForm,
    loadingSeries,
    loadingMovie,
    cancel,
    modalVisible,
    setModalVisible,
    dataAddMovie,
    dataAddSeries,
    status,
  } = useDataAdd(navigation);

  if (loadingMovie || loadingSeries) return <Loading />;

  return (
    <>
      <TopTitle />
      <ScrollView
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#333333" }}
            >
              Add New Movie / Series
            </Text>
          </View>
          <Form
            status={status}
            submitForm={submitForm}
            isValid={isValid}
            dataSelect={dataSelect}
            setData={setDataInput}
            data={dataInput}
            type={type}
            setType={setType}
            dataType={dataType}
            cancel={cancel}
          />
        </View>
      </ScrollView>
      <Modal
        dataAddMovie={dataAddMovie}
        dataAddSeries={dataAddSeries}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        setDataInput={setDataInput}
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
