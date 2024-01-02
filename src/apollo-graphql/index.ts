import { carResolver } from "./resolvers/car.resolver";
import { userResolver } from "./resolvers/user.resolver";
import { carTypeDefs } from "./typeDefs/car.typeDefs";
import { userTypeDefs } from "./typeDefs/user.typeDefs";

/*
 * Combined type definitions for the GraphQL schema.
 */
export const typeDefs = `
${carTypeDefs}
${userTypeDefs}
`;

/*
 * Combined resolvers for handling queries and mutations in the GraphQL schema.
 */
export const resolvers = {
  Query: {
    ...carResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...carResolver.Mutation,
    ...userResolver.Mutation,
  },
};
