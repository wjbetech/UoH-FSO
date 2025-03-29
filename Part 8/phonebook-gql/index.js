import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
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
        return persons;
      }
      const byPhone = (person) => (args.phoneNumber === "YES" ? person.phoneNumber : !person.phoneNumber);
      return persons.filter(byPhone);
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
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new GraphQLError("Name must be unique!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name
          }
        });
      }
      const newPerson = { ...args, id: uuid() };
      persons = persons.concat(newPerson);
      return newPerson;
    },
    editPhoneNumber: (root, args) => {
      const person = persons.find((p) => p.name === args.name);
      console.log(`Editing the phone number of: ${person}`);

      if (!person) {
        return null;
      }

      const updatedPerson = { ...person, phoneNumber: args.phoneNumber };
      console.log(`Updated person: ${updatedPerson}`);

      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p));
      return updatedPerson;
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
