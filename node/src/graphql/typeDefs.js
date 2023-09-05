export const typeDefs = `#graphql

type User {
    uid: ID!
    displayName: String!
    email: String!
    phoneNumber: String
    bio: String
    friends: [User!]! @relationship(type: "FRIEND", direction: OUT)
    photoURL: String
    createdAt: String!
    lastLoginAt: String!
  }

  type Ride {
    id: ID! @id 
    name: String!
    description: String
    startLocation: Point!
    endLocation: Point!
    startTime: LocalDateTime!
    endTime: LocalDateTime!
    seats: Int
    status: RideStatus
    participants: [User!]! @relationship(type: "ATTENDING", direction: IN)
    createdBy: User! @relationship(type: "CREATED", direction: IN)
  }

  type Mutation {
    addFriend(userId: ID!, friendId: ID!): String!
    unfriend(userId: ID!, friendId: ID!): String!
    attendRide(userId: ID!, rideId: ID!): String!
  }

  enum RideStatus {
    UPCOMING
    COMPLETED
    CANCELLED
    ONGOING
  }
`;
