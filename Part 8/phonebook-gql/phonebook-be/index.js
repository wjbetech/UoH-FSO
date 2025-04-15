import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "dotenv/config";

import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import Person from "./models/person.js";
import User from "./models/user.js";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to mongo DB phonebookQL...");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

// Start the server
const start = async () => {
  // Create Express app and HTTP server
  const app = express();
  const httpServer = http.createServer(app);

  // Create schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Set up WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/"
  });

  // WebSocket server cleanup handler
  const serverCleanup = useServer({ schema }, wsServer);

  // Create Apollo Server
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

  // Start the Apollo Server first
  await server.start();

  // Apply middleware - the key part is to apply all middleware
  // in a single app.use call for the /graphql route
  app.use(
    "/",
    cors(),
    bodyParser.json(),
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

  // Add a redirect from root to graphql endpoint
  app.get("/", (req, res) => {
    res.redirect("/");
  });

  // Start the server
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
};

// Execute the start function
start();
