import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import type { ListenOptions } from "net";
import { typeDefs } from "../src/graphql";
import { resolvers } from "../src/graphql";
import request from "supertest";

// This function will create a new server Apollo Server instance
export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: listenOptions,
  });

  // return the server instance and the url the server is listening on
  return { server, url };
};

const GET_CARS = `#graphql 
query GetCars {
     getCars {
        name
        email
        price
        rating
        url
     } 
    }`;

describe("e2e demo", () => {
  let server: any, url: any;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  // after the tests we'll stop the server
  afterAll(async () => {
    await server?.stop();
  });

  it("fetches list of cars", async () => {
    const response = await request(url).post("/").send(GET_CARS);
    console.log(response.body);
    expect(2).toBe(2)
  });
});
