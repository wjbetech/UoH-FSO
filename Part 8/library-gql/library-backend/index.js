// GraphQL & Apollo Client
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

// mongoose/mongo/dotenv
import mongoose from "mongoose";
import "dotenv/config";
import PersonSchema from "./models/person.js"; // double check this import on errors
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB libraryGQL!"))
  .catch((error) => {
    console.log("Error c onnecting to MongoDB libraryGQL DB: ", error.message);
  });

import { v4 as uuid } from "uuid";

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e"
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e"
  }
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"]
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"]
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"]
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"]
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"]
  }
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Author {
    name: String!
    id: String
    born: Int
    authorBookCount: Int!
  }
    
  type Book {
    title: String!
    published: Int!
    author: String!
    id: String!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
    
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    updateAuthorBorn(
      name: String
      id: String
      born: Int
    ): Author!
  }
`;

const resolvers = {
  // server queries
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = [...books];

      if (args.author) {
        filteredBooks = filteredBooks.filter((book) => book.author === args.author);
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) => book.genres.includes(args.genre));
      }
      return filteredBooks;
    },
    allAuthors: () => authors
  },
  // Author sub-queries
  Author: {
    authorBookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    }
  },
  // Mutations for manipulating data on the server
  Mutation: {
    addBook: (root, args) => {
      // check if the book already exists with the same title and author
      if (books.find((book) => book.title === args.title && book.author === args.author)) {
        throw new GraphQLError("Books should have either a unique author or title!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { title: args.title, author: args.author }
          }
        });
      }

      // check if author exists
      let author = authors.find((a) => a.name === args.author);

      if (!author) {
        // if !author, add them to the authors list
        author = { name: args.author, id: uuid() };
        authors = authors.concat(author);
      }

      // create and add the new book
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);

      return newBook;
    },
    updateAuthorBorn: (root, args) => {
      const author = authors.find((a) => a.name === args.name);

      // handle errors
      // - we just want to make sure that an author exists
      if (!author) {
        throw new GraphQLError(`That author does not exist!`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { name: args.name }
          }
        });
      }

      const updatedAuthor = { ...author, born: args.born };
      authors = authors.map((author) => (author.name === args.name ? updatedAuthor : author));
      return updatedAuthor;
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
  console.log(`Server ready at ${url}`);
});
