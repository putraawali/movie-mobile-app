import { gql } from "@apollo/client";

export const GET_HOME_DATA = gql`
  query getAllData {
    movies {
      _id
      title
      poster_path
      popularity
    }
    allSeries {
      _id
      title
      poster_path
      popularity
    }
  }
`;

export const ALL_MOVIES = gql`
  query getAllMovie {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ALL_SERIES = gql`
  query getAllSeries {
    allSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const MOVIE_DETAIL = gql`
  query getMovieById($id: ID!) {
    movie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const SERIES_DETAIL = gql`
  query getSeriesById($id: ID!) {
    series(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIES = gql`
  mutation addNewMovie($inputAdd: InputMovies) {
    addMovie(add: $inputAdd) {
      title
    }
  }
`;

export const ADD_SERIES = gql`
  mutation addSeries($inputAdd: InputSeries) {
    addSeries(add: $inputAdd) {
      title
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(_id: $id) {
      message
    }
  }
`;

export const DELETE_SERIES = gql`
  mutation deleteSeries($id: ID!) {
    deleteSeries(_id: $id) {
      message
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation editMovie($inputEdit: InputMovies, $id: ID!) {
    editMovie(edit: $inputEdit, _id: $id) {
      message
    }
  }
`;

export const EDIT_SERIES = gql`
  mutation editSeries($inputEdit: InputSeries, $id: ID!) {
    editSeries(edit: $inputEdit, _id: $id) {
      message
    }
  }
`;
