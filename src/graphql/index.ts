// import { userTypeDefs } from "./typeDefs/user.typeDefs";

import { carResolver } from "./resolvers/car.resolver";
import { carTypeDefs } from "./typeDefs/car.typeDefs";
import { userTypeDefs } from "./typeDefs/user.typeDefs";


export const typeDefs = `
${carTypeDefs}
${userTypeDefs}
`;

export const resolvers = {
  Query: {
    ...carResolver.Query,
  },
};
