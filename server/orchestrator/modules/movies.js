const { gql } = require("apollo-server");
const fetch = require("node-fetch");
const Redis = require("ioredis");
const redis = new Redis();
const baseURLMovies = "http://18.209.51.247:4001/movies/";
const typeDefs = gql`
  type OutputMovies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MessageMovies {
    message: String
  }

  input InputMovies {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [OutputMovies]
    movie(_id: ID!): OutputMovies
  }

  extend type Mutation {
    addMovie(add: InputMovies): OutputMovies
    editMovie(edit: InputMovies, _id: ID!): MessageMovies
    deleteMovie(_id: ID!): MessageMovies
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const dataFromRedis = await redis.get("Movies");
        if (!dataFromRedis) {
          const response = await fetch(baseURLMovies);
          const data = await response.json();
          redis.set("Movies", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(dataFromRedis);
        }
      } catch (error) {
        return error;
      }
    },
    movie: async (_, args) => {
      try {
        const response = await fetch(baseURLMovies + args._id);
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args.add;
      const dataToAdd = { title, overview, poster_path, popularity, tags };
      try {
        const response = await fetch(baseURLMovies, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToAdd),
        });
        const data = await response.json();
        redis.del("Movies");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editMovie: async (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args.edit;
      const dataToEdit = { title, overview, poster_path, popularity, tags };
      const _id = args._id;
      try {
        const response = await fetch(baseURLMovies + _id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToEdit),
        });
        const message = response.json();
        redis.del("Movies");
        return message;
      } catch (error) {
        console.log(error);
      }
    },
    deleteMovie: async (_, args) => {
      const { _id } = args;
      try {
        const response = await fetch(baseURLMovies + _id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const message = await response.json();
        redis.del("Movies");
        return message;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
