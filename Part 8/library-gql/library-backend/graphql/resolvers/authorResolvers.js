import Author from "../../models/author.js";
import Book from "../../models/book.js";
import { GraphQLError } from "graphql";

const authorResolver = {
  Query: {
    authorCount: async () => await Author.countDocuments(),
    allAuthors: async () => await Author.find({})
  },
  Author: {
    authorBookCount: async (root) => {
      const bookCount = await Book.countDocuments({ author: root._id });
      return bookCount;
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
