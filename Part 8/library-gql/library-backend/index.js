// GraphQL & Apollo Client
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

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
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
