import { useState } from "react";
import {
  GET_HOME_DATA,
  ALL_MOVIES,
  ALL_SERIES,
  EDIT_MOVIE,
  EDIT_SERIES,
  MOVIE_DETAIL,
  SERIES_DETAIL,
} from "../graphql/queries";
import { useMutation } from "@apollo/client";

export default function useDataEdit(navigation, dataDetail, typeOfMovie) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editMovie] = useMutation(EDIT_MOVIE, {
    refetchQueries: [
      { query: GET_HOME_DATA },
      { query: ALL_MOVIES },
      { query: MOVIE_DETAIL, variables: { id: dataDetail._id } },
    ],
    onCompleted: () => setModalVisible(true),
  });
  const [editSeries] = useMutation(EDIT_SERIES, {
    refetchQueries: [
      { query: GET_HOME_DATA },
      { query: ALL_SERIES },
      { query: SERIES_DETAIL, variables: { id: dataDetail._id } },
    ],
    onCompleted: () => setModalVisible(true),
  });
  const [dataInput, setDataInput] = useState({
    title: dataDetail.title,
    overview: dataDetail.overview,
    poster_path: dataDetail.poster_path,
    popularity: dataDetail.popularity.toString(),
    tags: dataDetail.tags,
  });

  const [isValid, setIsValid] = useState({
    title: true,
    overview: true,
    poster_path: true,
    popularity: true,
    tags: true,
    type: true,
  });
  const [type, setType] = useState(typeOfMovie);

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
      if (type === "Movie") {
        editMovie({
          variables: {
            inputEdit: {
              title: dataInput.title,
              overview: dataInput.overview,
              poster_path: dataInput.poster_path,
              popularity: +dataInput.popularity,
              tags: dataInput.tags,
            },
            id: dataDetail._id,
          },
        });
      }
      if (type === "TV Series") {
        editSeries({
          variables: {
            inputEdit: {
              title: dataInput.title,
              overview: dataInput.overview,
              poster_path: dataInput.poster_path,
              popularity: +dataInput.popularity,
              tags: dataInput.tags,
            },
            id: dataDetail._id,
          },
        });
      }
      setIsValid((state) => ({
        ...state,
        title: true,
        overview: true,
        popularity: true,
        poster_path: true,
        tags: true,
      }));
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
    navigation.goBack();
  }

  return {
    dataInput,
    setDataInput,
    isValid,
    submitForm,
    cancel,
    modalVisible,
    setModalVisible,
    status: "Edit",
  };
}
