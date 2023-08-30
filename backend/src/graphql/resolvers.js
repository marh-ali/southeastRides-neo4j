import driver from "../dbConfig.js";

const addFriend = async (_, { userId, friendId }) => {
  if (userId === friendId) {
    throw new Error("A user cannot be friends with themselves.");
  }

  const session = driver.session();

  const params = {
    userId,
    friendId,
  };

  const query = `
      MATCH (a:User {id: $userId}), (b:User {id: $friendId})
      OPTIONAL MATCH (a)-[r:FRIEND]->(b)
      RETURN a, b, r
    `;

  const result = await session.run(query, params);

  if (!result.records[0].get("a") || !result.records[0].get("b")) {
    throw new Error("One or both users not found.");
  }

  if (result.records[0].get("r")) {
    return "Friendship already exists.";
  }

  const createFriendshipQuery = `
      MATCH (a:User {id: $userId}), (b:User {id: $friendId})
      MERGE (a)-[:FRIEND]->(b)
      MERGE (b)-[:FRIEND]->(a)
      RETURN a, b
    `;

  await session.run(createFriendshipQuery, params);

  return "Friendship added successfully!";
};

const unfriend = async (_, { userId, friendId }) => {
  const session = driver.session();

  const params = {
    userId,
    friendId,
  };

  const query = `
        MATCH (a:User {id: $userId})-[r:FRIEND]-(b:User {id: $friendId})
        DELETE r
        RETURN COUNT(r) as removedCount
    `;

  try {
    const result = await session.run(query, params);
    const removedCount = result.records[0].get("removedCount").low;

    if (removedCount > 0) {
      return "Friendship removed successfully.";
    } else {
      return "Users not found or no friendship exists.";
    }
  } catch (error) {
    throw new Error(`Failed to remove the friendship: ${error}`);
  } finally {
    session.close();
  }
};

const attendRide = async (_, { userId, rideId }) => {
  const session = driver.session();

  const params = {
    userId,
    rideId,
  };

  // First, check if the ride creator and the user are friends
  const checkFriendshipQuery = `
      MATCH (u:User {id: $userId})-[:FRIEND]-(:User)-[:CREATED]-(r:Ride {id: $rideId})
      RETURN r
  `;

  const friendshipResult = await session.run(checkFriendshipQuery, params);

  if (friendshipResult.records.length === 0) {
    throw new Error("You can only attend rides created by your friends.");
  }

  // If the friendship exists, add the ATTENDING relationship
  const attendQuery = `
      MATCH (u:User {id: $userId}), (r:Ride {id: $rideId})
      MERGE (u)-[:ATTENDING]->(r)
      RETURN r
  `;

  await session.run(attendQuery, params);

  return "Successfully attending the ride!";
};

export const resolvers = {
  Mutation: {
    addFriend,
    unfriend,
    attendRide,
  },
};
