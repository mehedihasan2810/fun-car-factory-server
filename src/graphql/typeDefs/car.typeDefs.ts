export const carTypeDefs = `#graphql
type Car {
  id: ID
  name: String
  email: String
  category: String
  price: String
  rating: String
  quantity: String
  description: String
}

type Query {
    getCars: [Car]
}
`;
