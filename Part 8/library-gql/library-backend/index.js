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

const resolvers = {
  // server queries
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async (root, args) => {
      return await Book.countDocuments();
    },
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      let books = await Book.find({});

      if (args.author) {
        return books.filter((book) => book.author === args.author);
      }

      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }

      return books;
    },
    allAuthors: async () => await Author.find({})
  },
  // Author sub-queries
  Author: {
    authorBookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    }
  },
  // Mutations for manipulating data on the server
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
      if (!user || args.password !== "password") {
        throw new GraphQLError("mutation login failed: ", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.password
          }
        });
      }

      const userToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("mutation addBook error - no user!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: context.currentUser,
            error
          }
        });
      }

      // check if the book already exists with the same title
      if (await Book.findOne({ title: args.title })) {
        throw new GraphQLError("A book with this title already exists!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { title: args.title }
          }
        });
      }

      // ensure book title is over 5 chars long
      if (args.title.length < 5) {
        throw new GraphQLError("Book title must be equal or greater than 5 chars long!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { title: args.title }
          }
        });
      }

      // ensure author name is over 4 chars long
      if (args.author.length < 4) {
        throw new GraphQLError("Author name must be equal or greater than 4 chars long!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { author: args.author }
          }
        });
      }

      // check if author exists
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        // if !author, add them to the authors collection
        author = new Author({ name: args.author });
        await author.save();
      }

      let newBook;

      try {
        // create and add the new book
        newBook = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres
        });

        await newBook.save();
      } catch (error) {
        throw new GraphQLError(`mutation addBook error: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error
          }
        });
      }

      return await newBook.populate("author");
    },
    updateAuthorBorn: async (root, args, { currentUser }) => {
      const updateAuthor = Author.findById({ name: args.name });
      updateAuthor.born = args.born;

      // ensure only a logged in user can update an author's born value
      if (!currentUser) {
        throw new GraphQLError("addPerson error - not authenticated!", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      try {
        await updateAuthor.save();
      } catch (error) {
        throw new GraphQLError("mutation updateAuthorBorn failed: ", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }

      return updateAuthor;
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
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
