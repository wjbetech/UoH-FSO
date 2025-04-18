import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
import { GraphQLError } from "graphql";

import Person from "./models/person.js";
import User from "./models/user.js";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    personCount: async () => {
      return (await Person.find({})).length;
    },
    allPersons: async (root, args) => {
      if (!args.phone) {
        return await Person.find({});
      }

      return Person.find({
        phone: { $exists: args.phone === "YES" }
      });
    },
    findPerson: async (root, args) => {
      return (await Person.findOne({ name: args.name })).populate("friendOf");
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      };
    },
     
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

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("mutation login failed: ", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      const userToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) };
    },

    addPerson: async (root, args, context) => {
      const newPerson = new Person({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("addPerson error - not authenticated!", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      try {
        await newPerson.save();
        currentUser.friends = currentUser.friends.concat(newPerson);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError("(POSSIBLE!) Saving newPerson error - empty value of phone!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name
          }
        });
      }
      pubsub.publish("PERSON_ADDED", { personAdded: newPerson });

      return newPerson;
    },

    editPhoneNumber: async (root, args) => {
      const updatePerson = await Person.findOne({ name: args.name });
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
    },

    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) => currentUser.friends.map((f) => f._id.toString()).includes(person._id.toString());

      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }

      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    }
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterableIterator("PERSON_ADDED")
    }
  }
};

export default resolvers;
