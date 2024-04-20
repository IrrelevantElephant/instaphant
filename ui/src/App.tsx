import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import {makeServer} from '../mirage.ts';
import Feed from "./Feed";

if (process.env.NODE_ENV === "development") {
  makeServer();
}


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
