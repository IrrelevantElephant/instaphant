import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { makeServer } from "../mock-api/mirage.ts";
import Feed from "./Feed";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const getApiUrl = (): string => {
  if (process.env.NODE_ENV === "development") {
    return "/graphql";
  } else {
    return import.meta.env.VITE_API_URL;
  }
};

const client = new ApolloClient({
  uri: getApiUrl(),
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
