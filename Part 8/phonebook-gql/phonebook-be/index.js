// graphql, apollo server
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

// mongoose, dotenv, jwt
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import Person from "./models/person.js";
import User from "./models/user.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

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

const typeDefs = `
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phoneNumber: String
    address: Address!
    id: ID!
  }
    
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }
    
  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons(phoneNumber: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phoneNumber: String
      street: String!
      city: String!
    ): Person
    
    createUser(
      username: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
    
    editPhoneNumber(
      name: String!
      phoneNumber: String!
    ): Person
    
    addAsFriend(
      name: String!
    ): User
  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    personCount: async () => {
      return (await Person.find({})).length;
    },
    allPersons: async (root, args) => {
      if (!args.phone) {
        return await Person.find({});
      }

      return Person.find({
        phone: { $exists: args.phone === "YES" }
      });
    },
    findPerson: async (root, args) => {
      return await Person.findOne({ name: args.name });
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      };
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError("mutation createUser failed: ", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error
          }
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("mutation login failed: ", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      const userToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) };
    },

    addPerson: async (root, args, context) => {
      const newPerson = new Person({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("addPerson error - not authenticated!", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      try {
        await newPerson.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError("Saving newPerson error: ", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }

      return newPerson;
    },

    editPhoneNumber: async (root, args) => {
      const updatePerson = await Person.findOne({ name: args.name });
      updatePerson.phoneNumber = args.phoneNumber;

      try {
        await updatePerson.save();
      } catch (error) {
        throw new GraphQLError("Updating phone number failed: ", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }

      return updatePerson;
    },

    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) => currentUser.friends.map((f) => f._id.toString()).includes(person._id.toString());

      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }

      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    }
  }
};

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
