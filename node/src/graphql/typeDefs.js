export const typeDefs = `#graphql

type User {
    id: ID! @id
    name: String!
    email: String
    bio: String
    friends: [User!]! @relationship(type: "FRIEND", direction: OUT)
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
