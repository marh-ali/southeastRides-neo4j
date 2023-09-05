import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const localIP = process.env.EXPO_PUBLIC_LOCAL_IP;
const httpLink = new HttpLink({
  // local IP address of your computer followed by the port of the server in index.js
  uri: `http://${localIP}:4000`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
