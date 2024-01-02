import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { typeDefs, resolvers } from "./apollo-graphql";
import { MyContext } from "types";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Create an HTTP server and integrate it with Apollo Server
const httpServer = http.createServer(app);

// Bootstrap the Apollo Server
const bootstrapServer = async () => {

  // Create an instance of Apollo Server
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start Apollo Server
  await server.start();

  // Set up middleware for handling GraphQL requests
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    express.urlencoded({ extended: true }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { authorization: req.headers.authorization };
      },
    })
  );

  // Simple endpoint to verify server is running
  app.get("/", async (_req, res) => {
    res.send("Fun Car Factory");
  });

  // app.listen(port, () => {
  //   console.log(`express server running at http://localhost:${port}`);
  //   console.log(`Graphql server running at http://localhost:${port}/graphql`);
  // });

  // Start the HTTP server
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}`);
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

// Execute the bootstrapServer function
bootstrapServer();
