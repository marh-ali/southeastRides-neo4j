import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  {
    users {
      id
      name
      email
      bio
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query Users($where: UserWhere) {
    users(where: $where) {
      id
      name
      email
      bio
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
