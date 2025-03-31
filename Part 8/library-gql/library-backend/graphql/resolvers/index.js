import { mergeResolvers } from "@graphql-tools/merge";
import authorResolver from "./graphql/resolvers/authorResolvers.js";
import bookResolver from "./graphql/resolvers/bookResolvers.js";
import userResolver from "./graphql/resolvers/userResolvers.js";
const resolvers = mergeResolvers([authorResolver, bookResolver, userResolver]);

export default resolvers;


