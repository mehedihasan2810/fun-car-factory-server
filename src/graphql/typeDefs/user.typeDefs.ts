export const userTypeDefs = `#graphql
type User {
    id: ID
    name: String
    email: String
    role: String
    car: [Car]
}

type Query {
    getUser: User
    getUsers: [User]
}
`;
