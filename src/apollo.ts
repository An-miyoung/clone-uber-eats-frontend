import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://192.168.0.6:4000/graphql",
  cache: new InMemoryCache(),
});
