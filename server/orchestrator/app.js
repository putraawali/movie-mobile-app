const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs,
  modules: [require("./modules/series"), require("./modules/movies")],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
