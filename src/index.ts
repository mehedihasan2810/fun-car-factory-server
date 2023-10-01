import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./graphql";
dotenv.config();
// import { PrismaClient } from "@prisma/client";
const app = express();
const port = process.env.PORT || 4000;

// const prisma = new PrismaClient();

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

  app.get("/", async (req, res) => {
    // const cars = await prisma.cars.findMany();
    // console.log(cars);
    res.send('hello world');
  });

  app.listen(port, () => {
    console.log(`express server running at http://localhost:${port}`);
    console.log(`Graphql server running at http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
