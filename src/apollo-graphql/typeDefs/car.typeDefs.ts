export const carTypeDefs = `#graphql

interface MutationResponse{
  code: Int!
  success: Boolean!
  message: String!
}

type Car {
  id: ID!
  category: String!
  description: String!
  email: String!
  name: String!
  price: Int!
  quantity: Int!
  rating: Int!
  sellerName: String!
  url: String!
}

type CreateCarResponse implements MutationResponse {
  code: Int!
  success: Boolean!
  message: String!
  car: Car!
}

input CarInput {
  category: String!
  description: String!
  email: String!
  name: String!
  price: Int!
  quantity: Int!
  rating: Int!
  sellerName: String!
  url: String!
}

input UpdateCarInput {
  id: ID!
  category: String!
  description: String!
  email: String!
  name: String!
  price: Int!
  quantity: Int!
  rating: Int!
  sellerName: String!
  url: String!
}

type Query {
    getCars: [Car!]!
    getCar(id: String!): Car!
    getCartCar(cartIds: [String!]!): [Car!]!
}

type Mutation {
  createCar(carInput: CarInput!): CreateCarResponse!
  updateCar(updateInput: UpdateCarInput!): Car!
  deleteCar(id: String!): Car!
}
`;
