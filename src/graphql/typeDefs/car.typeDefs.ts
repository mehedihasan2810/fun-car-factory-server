export const carTypeDefs = `#graphql

interface MutationResponse{
  code: String!
  success: Boolean!
  message: String!
}

type Car {
  id: ID!
  name: String!
  email: String!
  category: String!
  price: String!
  rating: String!
  quantity: String!
  description: String!
}

type CreateCarResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  car: Car!
}

input CarInput {
  id: ID!
  name: String!
  email: String!
  category: String!
  price: String!
  rating: String!
  quantity: String!
  description: String!
}

type Query {
    getCars: [Car!]!
    getCar(id: String!): Car
}

type Mutation {
  createCar(carInput: CarInput!): CreateCarResponse
}
`;
