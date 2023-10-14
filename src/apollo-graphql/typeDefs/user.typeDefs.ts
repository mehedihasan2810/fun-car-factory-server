export const userTypeDefs = `#graphql

type User {
    id: ID!
    name: String!
    email: String!
    role: String!
}

type CreateUserResponse implements MutationResponse {
  code: Int!
  success: Boolean!
  message: String!
  user: User
}

type Query {
    getUser(email: String!): User!
    getUsers: [User!]!
}

input UserInput {
    email: String!
    name: String!
    role: String!
}

type Mutation {
    createUser(input: UserInput!): CreateUserResponse!
    deleteUser(email: String!): User!
}
`;
