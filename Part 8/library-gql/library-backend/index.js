// GraphQL & Apollo Client
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

// WebSocket
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

// express, cors
import express from "express";
import http from "http";
import cors from "cors";

// import gql related files
import typeDefs from "./graphql/types/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";

// mongoose/mongo/dotenv
import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";
import Author from "./models/author.js";
import Book from "./models/book.js";
import User from "./models/user.js";
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB libraryGQL!"))
  .catch((error) => {
    console.log("Error connecting to MongoDB libraryGQL DB: ", error.message);
  });

import { v4 as uuid } from "uuid";

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // build websocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/"
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            }
          };
        }
      }
    ]
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id).populate("favoriteGenres");
          return { currentUser };
        }
      }
    })
  );

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
};

start();
