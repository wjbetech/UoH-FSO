import Book from "../../models/book.js";
import Author from "../../models/author.js";
import { GraphQLError } from "graphql";

const bookResolver = {
  Query: {
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author");

      if (args?.author) {
        books = books.filter((book) => book.author.name === args.author);
      }

      if (args?.genre) {
        books = books.filter((book) => book.genres.includes(args.genre));
      }

      return books;
    },
    recommendations: async (root, args, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("not authenticated");

      return Book.find({ genres: user.favoriteGenres }).populate("author");
    },
    allGenres: async () => {
      const allGenresAggregation = await Book.aggregate([
        { $unwind: "$genres" },
        { $group: { _id: null, allGenres: { $addToSet: "$genres" } } },
        { $project: { _id: 0, allGenres: 1 } }
      ]);

      return allGenresAggregation[0]?.allGenres || [];
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("mutation addBook error - no user!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: context.currentUser
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

      return newBook.populate("author");
    }
  }
};

export default bookResolver;
