export const carTypeDefs = `#graphql
type Car {
  id: ID
  name: String
  img_url: String
  added_by: String
  email: String
  category: String
  price: Int
  rating: Int
  quantity: Int
  description: String
  created_at: Date
  creator: User
  creatorId: String
}

type Query {
    getCar: Car
    getCars: [Car]
}
`;
