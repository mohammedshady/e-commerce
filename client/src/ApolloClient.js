// ApolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";
// change to local host if you want to test locally
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default client;
