import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const localIP = process.env.EXPO_PUBLIC_LOCAL_IP;
const httpLink = new HttpLink({
  uri: `http://${localIP}:4000`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
