import { mergeResolvers } from "@graphql-tools/merge";
import authorResolver from "./authorResolvers.js";
import bookResolver from "./bookResolvers.js";
import userResolver from "./userResolvers.js";
const resolvers = mergeResolvers([authorResolver, bookResolver, userResolver]);

export default resolvers;
