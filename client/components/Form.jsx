import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
export default function Form(props) {
  const {
    submitForm,
    isValid,
    dataSelect,
    setData,
    data,
    type,
    setType,
    dataType,
    cancel,
    status,
  } = props;

  function renderFormButton() {
    return (
      <>
        <RadioForm formHorizontal={true} animation={true}>
          {dataType.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={type}
                onPress={(value) => {
                  setType(value);
                }}
                borderWidth={1}
                buttonInnerColor={obj.value === type ? "#333" : "transparent"}
                buttonOuterColor={obj.value === type ? "#333" : "#000"}
                buttonSize={10}
                buttonOuterSize={15}
                buttonWrapStyle={{ marginLeft: 10 }}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={(value) => {
                  setType(value);
                }}
                labelStyle={{ fontSize: 17, color: "#333" }}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>
        <Text
          style={{
            color: isValid.type ? "transparent" : "red",
            fontSize: 12,
          }}
        >
          {"     "}Movie or TV Series is required!
        </Text>
      </>
    );
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={[styles.form, { borderColor: isValid.title ? "black" : "red" }]}
        value={data.title}
        onChangeText={(target) =>
          setData((state) => ({ ...state, title: target }))
        }
        placeholder="Movie / Series Title"
      />
      <Text
        style={{
          color: isValid.title ? "transparent" : "red",
          fontSize: 12,
        }}
      >
        Title is required!
      </Text>
      <Text style={styles.label}>Overview</Text>
      <TextInput
        style={[
          styles.form,
          { borderColor: isValid.overview ? "black" : "red" },
        ]}
        value={data.overview}
        onChangeText={(target) =>
          setData((state) => ({ ...state, overview: target }))
        }
        multiline={true}
        numberOfLines={6}
        placeholder="Movie / Series Overview"
      />
      <Text
        style={{
          color: isValid.overview ? "transparent" : "red",
          fontSize: 12,
        }}
      >
        Overview is required!
      </Text>
      <Text style={styles.label}>Poster Path</Text>
      <TextInput
        style={[
          styles.form,
          { borderColor: isValid.poster_path ? "black" : "red" },
        ]}
        value={data.poster_path}
        onChangeText={(target) =>
          setData((state) => ({ ...state, poster_path: target }))
        }
        multiline={true}
        numberOfLines={2}
        placeholder="Movie / Series Poster Path"
      />
      <Text
        style={{
          color: isValid.poster_path ? "transparent" : "red",
          fontSize: 12,
        }}
      >
        Poster Path is URL only!
      </Text>
      <Text style={styles.label}>Popularity</Text>
      <TextInput
        style={[
          styles.form,
          { borderColor: isValid.popularity ? "black" : "red" },
        ]}
        value={data.popularity}
        onChangeText={(target) =>
          setData((state) => ({
            ...state,
            popularity: target.toString(),
          }))
        }
        keyboardType="decimal-pad"
        placeholder="Movie / Series Popularity"
      />
      <Text
        style={{
          color: isValid.popularity ? "transparent" : "red",
          fontSize: 12,
        }}
      >
        Popularity must be between 0 - 10, and use " . " for comma!
      </Text>
      <Text style={styles.label}>Tags</Text>
      <SectionedMultiSelect
        styles={{
          selectToggleText: {
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: isValid.tags ? "black" : "red",
            marginBottom: 8,
          },
          selectToggle: {
            marginHorizontal: 2,
          },
        }}
        hideSearch={true}
        items={dataSelect}
        uniqueKey="id"
        IconRenderer={Icon}
        selectText="Choose Categories"
        showDropDowns={true}
        readOnlyHeadings={false}
        onSelectedItemsChange={(selectedItem) =>
          setData((state) => ({ ...state, tags: selectedItem }))
        }
        selectedItems={data.tags}
        showChips={true}
      />
      <Text
        style={{
          color: isValid.tags ? "transparent" : "red",
          fontSize: 12,
          marginBottom: 10,
        }}
      >
        Tags is required!
      </Text>
      {status === "Add" ? renderFormButton() : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#272343",
            },
          ]}
          onPress={submitForm}
        >
          <Text style={{ color: "#ffffff" }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ff1100" }]}
          onPress={cancel}
        >
          <Text style={{ color: "#ffffff" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 0.8,
    marginHorizontal: 35,
    marginTop: 10,
  },
  form: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 9,
    height: 30,
    width: 80,
  },
});
