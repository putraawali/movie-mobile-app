import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_MOVIE,
  DELETE_SERIES,
  GET_HOME_DATA,
  ALL_MOVIES,
  ALL_SERIES,
} from "../graphql/queries";

export default function useDelete(id, name, typeName, type) {
  const [modalVisible, setModalVisible] = useState(false);

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    // refetchQueries: [{ query: GET_HOME_DATA }, { query: ALL_MOVIES }],
    update: (cache) => {
      cache.modify({
        fields: {
          movies() {
            const dataHome = cache.readQuery({ query: GET_HOME_DATA });
            const newDataHomeMovies = dataHome.movies.filter(
              (data) => data._id !== id
            );
            const newDataHome = { ...dataHome, movies: newDataHomeMovies };
            return cache.writeQuery({
              query: GET_HOME_DATA,
              data: { getAllData: newDataHome },
            });
          },
        },
      });
    },
    onCompleted: () => setModalVisible(true),
  });

  const [deleteSeries] = useMutation(DELETE_SERIES, {
    update: (cache) => {
      cache.modify({
        fields: {
          allSeries() {
            const dataHome = cache.readQuery({ query: GET_HOME_DATA });
            const newDataHomeSeries = dataHome.allSeries.filter(
              (data) => data._id !== id
            );
            const newDataHome = { ...dataHome, allSeries: newDataHomeSeries };
            return cache.writeQuery({
              query: GET_HOME_DATA,
              data: { getAllData: newDataHome },
            });
          },
        },
      });
    },
    onCompleted: () => {
      setModalVisible(true);
    },
  });

  function deleteData() {
    if (
      name === "All Movie" ||
      typeName === "OutputMovies" ||
      type === "Movie" ||
      name === "Movie"
    ) {
      deleteMovie({ variables: { id } });
    }

    if (
      name === "All Series" ||
      typeName === "OutputSeries" ||
      type === "Series" ||
      name === "Series"
    ) {
      deleteSeries({ variables: { id } });
    }
  }

  return { modalVisible, setModalVisible, deleteData };
}
