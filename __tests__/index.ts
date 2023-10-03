import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/graphql";
import { resolvers } from "../src/graphql";

export const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

