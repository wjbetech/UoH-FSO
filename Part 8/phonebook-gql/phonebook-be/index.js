// graphql, apollo server
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

// mongoose, dotenv
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import PersonSchema from "./models/person.js";
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

// the data for our GraphQL server
let persons = [
  {
    name: "Arto Hellas",
    phoneNumber: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phoneNumber: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431"
  }
];

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

  type Query {
    personCount: Int!
    allPersons(phoneNumber: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phoneNumber: String
      street: String!
      city: String!
    ): Person
    
    editPhoneNumber(
      name: String!
      phoneNumber: String!
    ): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons.find({});
      }

      return Person.find({
        phone: { $exists: args.phone === "YES" }
      });
    },
    findPerson: (root, args) => persons.find((p) => p.name === args.name)
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
    addPerson: async (root, args) => {
      const newPerson = new Person({ ...args });

      try {
        await newPerson.save();
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
      const updatePerson = persons.find((p) => p.name === args.name);
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
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server online at ${url}`);
});
