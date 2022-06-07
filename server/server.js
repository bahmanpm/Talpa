import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { readFile } from "fs/promises";
import { mocks } from "./mocks.js";

const PORT = 9000;
const app = express();
app.use(cors(), express.json());

const typeDefs = await readFile("./schema.graphql", "utf8");
const apolloServer = new ApolloServer({ typeDefs, mocks });
await apolloServer.start();

apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});
