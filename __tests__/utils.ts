import { ApolloServer } from "@apollo/server";
import { typeDefs, resolvers } from "../src/apollo-graphql";

export const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});
