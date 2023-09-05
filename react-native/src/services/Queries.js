import { gql } from "@apollo/client";

// a query to check if a user exists in the db
export const CHECK_USER_IN_DB = gql`
  query Users($where: UserWhere) {
    users(where: $where) {
      uid
    }
  }
`;

export const GET_ALL_USERS = gql`
  {
    users {
      uid
      displayName
      email
      bio
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query Users($where: UserWhere) {
    users(where: $where) {
      displayName
      email
      phoneNumber
      bio
      photoURL
      createdAt
    }
  }
`;

export const GET_ALL_RIDES = gql`
  query Rides {
    rides {
      id
      name
      description
      seats
      status
      startTime
      endTime
      startLocation {
        latitude
        longitude
      }
      endLocation {
        latitude
        longitude
      }
    }
  }
`;

export const GET_RIDE_BY_ID = gql`
  query Rides($where: RideWhere) {
    rides(where: $where) {
      id
      name
      description
      seats
      status
      startTime
      endTime
      startLocation {
        latitude
        longitude
      }
      endLocation {
        latitude
        longitude
      }
    }
  }
`;
