import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
  uri: "http://35.173.136.112:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          movies: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          allSeries: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
