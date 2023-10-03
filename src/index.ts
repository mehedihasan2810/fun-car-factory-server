import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./graphql";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const bootstrapServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/graphql", expressMiddleware(server));

  app.get("/", async (_req, res) => {
    res.send("Fun Car Factory");
  });

  app.listen(port, () => {
    console.log(`express server running at http://localhost:${port}`);
    console.log(`Graphql server running at http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
