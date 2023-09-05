import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { typeDefs } from "./graphql/typeDefs.js";
import driver from "./dbConfig.js";
import { resolvers } from "./graphql/resolvers.js";

const neoSchema = new Neo4jGraphQL({ typeDefs, driver, resolvers });

const server = new ApolloServer({
  schema: await neoSchema.getSchema(),
  cors: {
    origin: "*",
    credentials: true,
  },
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ req }),
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
