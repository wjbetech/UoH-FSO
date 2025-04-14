// WebSocket
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/lib/use/ws"

// graphql, apollo server
import { ApolloServer } from "@apollo/server";
import { GraphQLError } from "graphql";
import resolvers from "./resolvers.js";
import typeDefs from "./schema.js";

// express
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import cors from "cors";
import http from "http";

// mongoose, dotenv, jwt
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import Person from "./models/person.js";
import User from "./models/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

import { v4 as uuid } from "uuid";

// mongoose server connection to MongoDB
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MongoDB PhonebookQL App!")
}).catch((error) => {
  console.log("Error connecting to MongoDB PhonebookQL App: ", error.message)
})

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema}, wsServer)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ],
  })

  await server.start()

  app.use("/", cors(), express.json(), expressMiddleware(server, {
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id).populate("friends");
        return { currentUser };
      }
    }
  }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running @ http://localhost:${PORT}`)
  })
}



