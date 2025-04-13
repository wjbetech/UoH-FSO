const typeDefs = `
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phoneNumber: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phoneNumber: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phoneNumber: String
      street: String!
      city: String!
    ): Person
    createUser(username: String!): User
    login(username: String!, password: String!): Token
    editPhoneNumber(name: String!, phoneNumber: String!): Person
    addAsFriend(name: String!): User
  }
`;

export default typeDefs;
