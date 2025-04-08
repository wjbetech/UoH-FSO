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
      // ensure only a logged in user can update an author's born value
      if (!currentUser) {
        throw new GraphQLError("addPerson error - not authenticated!", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      const updateAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.born },
        { new: true, runValidators: true, context: "query" }
      );

      if (!updateAuthor) {
        throw new GraphQLError("Author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name
          }
        });
      }

      updateAuthor.born = args.born;

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
