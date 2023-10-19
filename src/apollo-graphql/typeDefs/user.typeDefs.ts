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
  token: String!
  user: User
}

type Token {
    token: String!
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
    getToken(email: String!): Token!
}
`;
