import Author from "../../models/author.js";
import Book from "../../models/book.js";
import { GraphQLError } from "graphql";

const authorResolver = {
  Query: {
    authorCount: () => authors.length,
    allAuthors: async () => await Author.find({})
  },
  Author: {
    authorBookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    }
  },
  Mutation: {
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

export default authorResolver;
