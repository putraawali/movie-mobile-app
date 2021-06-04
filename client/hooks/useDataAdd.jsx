import { useState } from "react";
import {
  ADD_MOVIES,
  GET_HOME_DATA,
  ALL_MOVIES,
  ALL_SERIES,
  ADD_SERIES,
} from "../graphql/queries";
import { useMutation } from "@apollo/client";

export default function useDataAdd(navigation) {
  const [modalVisible, setModalVisible] = useState(false);
  const [addNewMovie, { data: dataAddMovie, _, loading: loadingMovie }] =
    useMutation(ADD_MOVIES, {
      refetchQueries: [{ query: GET_HOME_DATA }, { query: ALL_MOVIES }],
      onCompleted: () => setModalVisible(true),
    });
  const [addNewSeries, { data: dataAddSeries, __, loading: loadingSeries }] =
    useMutation(ADD_SERIES, {
      refetchQueries: [{ query: GET_HOME_DATA }, { query: ALL_SERIES }],
      onCompleted: () => setModalVisible(true),
    });
  const [dataInput, setDataInput] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: [],
  });
  const [type, setType] = useState("");
  const [isValid, setIsValid] = useState({
    title: true,
    overview: true,
    poster_path: true,
    popularity: true,
    tags: true,
    type: true,
  });

  function submitForm() {
    const url_pattern =
      /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#]+\.?)+(\/[^\s]*)?$/i;
    if (
      dataInput.title &&
      dataInput.overview &&
      dataInput.poster_path.match(url_pattern) &&
      !isNaN(+dataInput.popularity) &&
      +dataInput.popularity <= 10 &&
      +dataInput.popularity >= 0 &&
      dataInput.tags.length > 0 &&
      type
    ) {
      setIsValid((state) => ({
        ...state,
        title: true,
        overview: true,
        popularity: true,
        poster_path: true,
        tags: true,
        type: true,
      }));
      if (type === "Movie") {
        addNewMovie({
          variables: {
            inputAdd: {
              title: dataInput.title,
              overview: dataInput.overview,
              poster_path: dataInput.poster_path,
              popularity: +dataInput.popularity,
              tags: dataInput.tags,
            },
          },
        });
      }

      if (type === "TV Series") {
        addNewSeries({
          variables: {
            inputAdd: {
              title: dataInput.title,
              overview: dataInput.overview,
              poster_path: dataInput.poster_path,
              popularity: +dataInput.popularity,
              tags: dataInput.tags,
            },
          },
        });
      }
      setType("");
    } else {
      dataInput.title
        ? setIsValid((state) => ({ ...state, title: true }))
        : setIsValid((state) => ({ ...state, title: false }));
      dataInput.overview
        ? setIsValid((state) => ({ ...state, overview: true }))
        : setIsValid((state) => ({ ...state, overview: false }));
      dataInput.popularity &&
      !isNaN(+dataInput.popularity) &&
      +dataInput.popularity >= 0 &&
      +dataInput.popularity <= 10
        ? setIsValid((state) => ({ ...state, popularity: true }))
        : setIsValid((state) => ({ ...state, popularity: false }));
      dataInput.poster_path.match(url_pattern)
        ? setIsValid((state) => ({ ...state, poster_path: true }))
        : setIsValid((state) => ({ ...state, poster_path: false }));
      dataInput.tags.length > 0
        ? setIsValid((state) => ({ ...state, tags: true }))
        : setIsValid((state) => ({ ...state, tags: false }));
      type
        ? setIsValid((state) => ({ ...state, type: true }))
        : setIsValid((state) => ({ ...state, type: false }));
    }
  }

  function cancel() {
    setDataInput((state) => ({
      ...state,
      title: "",
      overview: "",
      poster_path: "",
      popularity: "",
      tags: [],
    }));
    setType("");
    navigation.navigate("Home-Stack");
  }

  return {
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
    status: "Add",
  };
}
