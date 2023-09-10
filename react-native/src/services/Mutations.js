import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: [UserCreateInput!]!) {
    createUsers(input: $input) {
      users {
        uid
        displayName
        email
      }
    }
  }
`;

// a mutation to update user display name
export const UPDATE_USER_DISPLAY_NAME = gql`
  mutation UpdateUserDisplayName($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      users {
        displayName
      }
    }
  }
`;

// a mutation to update user bio
export const UPDATE_USER_BIO = gql`
  mutation UpdateUserBio($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      users {
        bio
      }
    }
  }
`;
