import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const userResolver = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
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

    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new GraphQLError("Invalid username or password", {
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

      // bundle up the info needed to authenticate and
      // pass it to 'value' as 'token'
      const token = jwt.sign(userToken, process.env.JWT_SECRET);

      return { value: token };
    }
  }
};

export default userResolver;
