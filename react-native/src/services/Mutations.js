import { gql } from "@apollo/client";

export const ADD_SOME_DATA = gql`
  mutation AddSomeData($name: String!) {
    addSomeData(name: $name) {
      id
      name
    }
  }
`;
