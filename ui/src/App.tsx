import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { makeServer } from "../mock-api/mirage.ts";
import Feed from "./Feed";

// TODO: Lock this behind env var when we have a real api.
makeServer();

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Feed />
    </ApolloProvider>
  );
}

export default App;
