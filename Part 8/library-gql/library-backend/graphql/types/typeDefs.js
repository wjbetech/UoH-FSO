import gql from "graphql-tag";

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }

  type User {
    username: String!
    favoriteGenres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    authorBookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    recommendations: [Book!]!
    allGenres: [String!]!
  }

  type Mutation {
    login(username: String!, password: String!): Token
    createUser(username: String!, favoriteGenre: String!): User
    addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book!
    updateAuthorBorn(name: String, id: String, born: Int): Author!
  }
`;

export default typeDefs;
