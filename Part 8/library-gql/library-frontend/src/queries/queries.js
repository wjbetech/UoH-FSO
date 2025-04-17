import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      authorBookCount
    }
  }
`;

// DEADGE gql code, will not work!
// export const ALL_BOOKS = gql`
//   query {
//     allBooks {
//       title
//       published
//       author
//       id
//       genres
//     }
//   }
// `;

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      id
    }
    id
    genres
  }
`;

// the fix:
export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author {
        name
        id
      }
      genres
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const UPDATE_AUTHOR_BORN = gql`
  mutation updateAuthorBorn($name: String!, $born: Int!) {
    updateAuthorBorn(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const GET_RECOMMENDATIONS = gql`
  query {
    recommendations {
      title
      author {
        name
      }
      published
    }
  }
`;
