import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { typeDefs, resolvers } from "./apollo-graphql";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const httpServer = http.createServer(app);

const bootstrapServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // app.use(cors<cors.CorsRequest>());
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    express.urlencoded({ extended: true }),
    expressMiddleware(server)
  );

  app.get("/", async (_req, res) => {
    res.send("Fun Car Factory");
  });

  // app.listen(port, () => {
  //   console.log(`express server running at http://localhost:${port}`);
  //   console.log(`Graphql server running at http://localhost:${port}/graphql`);
  // });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}`);
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

bootstrapServer();
