// express
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";

// WebSocket
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

// graphql, apollo server
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

// mongoose, dotenv, jwt
import Person from "./models/person.js";
import User from "./models/user.js";

import { GraphQLError } from "graphql";
import resolvers from "./resolvers.js";
import typeDefs from "./schema.js";

import "dotenv/config";
import { v4 as uuid } from "uuid";

const MONGODB_URI = process.env.MONGODB_URI;

// mongoose server connection to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to phonebookQL MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

// setup is now within a function
const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

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

  // Apply CORS and JSON parsing at the app level
  app.use(cors());
  app.use(express.json());

  // Mount Apollo Server middleware
  app.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id).populate("friends");
          return { currentUser };
        }
      }
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));
};

start();
