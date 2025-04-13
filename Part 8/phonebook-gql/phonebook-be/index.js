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

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connecting to MongoDB phonebookgql...");
  })
  .catch((error) => {
    console.log("error connecting to phonebookgql MongoDB: ", error.message);
  });

import { v4 as uuid } from "uuid";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate("friends");
      return { currentUser };
    }
  }
}).then(({ url }) => {
  console.log(`Server online at ${url}`);
});
