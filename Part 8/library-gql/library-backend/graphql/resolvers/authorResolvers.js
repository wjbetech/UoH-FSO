import Author from "../../models/author.js";
import Book from "../../models/book.js";
import { GraphQLError } from "graphql";

const authorResolver = {
  Query: {
    authorCount: async () => await Author.countDocuments(),
    allAuthors: async () => {
      return Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books"
          }
        },
        {
          $addFields: {
            authorBookCount: { $size: "$books" }
          }
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            born: 1,
            authorBookCount: 1
          }
        }
      ]);
    }
  },
  Mutation: {
    updateAuthorBorn: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("addPerson error - not authenticated!", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }

      const updateAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.born },
        { new: true, runValidators: true, context: "query" }
      );

      if (!updateAuthor) {
        throw new GraphQLError("Author not found", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name }
        });
      }

      return updateAuthor;
    }
  }
};

export default authorResolver;
