export const userTypeDefs = `#graphql
type User {
    id: ID
    name: String
    email: String
    role: String
}

type Query {
    getUser: User
    getUsers: [User]
}
type Mutation {
    createUser(input: UserInput): User
}

input UserInput {
    email: String!
    name: String
    role: String
}
`;
