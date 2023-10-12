import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/apollo-graphql";
import { resolvers } from "../src/apollo-graphql";

export const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});
