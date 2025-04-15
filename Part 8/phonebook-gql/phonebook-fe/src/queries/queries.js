import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    name
    phoneNumber
    address {
      street
      city
    }
  }
`;

export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phoneNumber: String) {
    addPerson(name: $name, street: $street, city: $city, phoneNumber: $phoneNumber) {
      name
      phoneNumber
      address {
        street
        city
      }
    }
  }
`;

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export const EDIT_PHONENUMBER = gql`
  mutation editPhoneNumber($name: String!, $phoneNumber: String!) {
    editPhoneNumber(name: $name, phoneNumber: $phoneNumber) {
      name
      phoneNumber
      address {
        street
        city
      }
      id
    }
  }
`;
