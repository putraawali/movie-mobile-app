const { gql } = require("apollo-server");
const fetch = require("node-fetch");
const Redis = require("ioredis");
const redis = new Redis();
const baseURLSeries = "http://54.83.111.11:4002/series/";
module.exports = typeDefs = gql`
  type OutputSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MessageSeries {
    message: String
  }

  input InputSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    allSeries: [OutputSeries]
    series(_id: ID!): OutputSeries
  }

  extend type Mutation {
    addSeries(add: InputSeries): OutputSeries
    editSeries(edit: InputSeries, _id: ID!): MessageSeries
    deleteSeries(_id: ID!): MessageSeries
  }
`;

const resolvers = {
  Query: {
    allSeries: async () => {
      try {
        const dataFromRedis = await redis.get("TV_Series");
        if (!dataFromRedis) {
          const response = await fetch(baseURLSeries);
          const data = await response.json();
          redis.set("TV_Series", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(dataFromRedis);
        }
      } catch (error) {
        return error;
      }
    },
    series: async (_, args) => {
      try {
        const response = await fetch(baseURLSeries + args._id);
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addSeries: async (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args.add;
      const dataToAdd = { title, overview, poster_path, popularity, tags };
      try {
        const response = await fetch(baseURLSeries, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToAdd),
        });
        const data = await response.json();
        redis.del("TV_Series");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editSeries: async (_, args) => {
      const { title, overview, poster_path, popularity, tags } = args.edit;
      const dataToEdit = { title, overview, poster_path, popularity, tags };
      const _id = args._id;
      try {
        const response = await fetch(baseURLSeries + _id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToEdit),
        });
        const message = response.json();
        redis.del("TV_Series");
        return message;
      } catch (error) {
        console.log(error);
      }
    },
    deleteSeries: async (_, args) => {
      const { _id } = args;
      try {
        const response = await fetch(baseURLSeries + _id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const message = await response.json();
        redis.del("TV_Series");
        return message;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
