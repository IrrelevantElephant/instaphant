import { Model, belongsTo, createServer } from "miragejs";
import { createGraphQLHandler } from "@miragejs/graphql"

const gqlSchema = `
type User {
  id: ID!
  name: String!
}

type Post {
  id: String!
  author: User!
  description: String!
  image: String!
}

type Query {
  posts: [Post!]!
  users: [User!]!
}

schema {
  query: Query
}
`;

const makeServer = () => {
  createServer({
    models: {
      post: Model.extend({
        author: belongsTo("user")
      }),
      user: Model
    },

    seeds(server) {
      server.create('user', { id: "1", name: 'John' });
      server.create('user', { id: "2", name: 'Jane' });
      server.create('user', { id: "3", name: 'Bob' });
      server.create('user', { id: "4", name: 'Bridgitte' });

      server.create("post", {
        id: "1",
        author: server.schema.find("user", "1"),
        description: "a beach",
        image: "https://fastly.picsum.photos/id/675/200/300.jpg?hmac=c2gHO4_1hIFBRijtOhz09icBTxsdGCsMSYSs2XIDdAk"
      });
      server.create("post", {
        id: "2",
        author: server.schema.find("user", "2"),
        description: "new shoes",
        image: "https://fastly.picsum.photos/id/604/200/300.jpg?hmac=6ceMKS8u7easDoKzWSaIiSTpRlTPn1OUOdfSJWou3uQ"
      });
      server.create("post", {
        id: "3",
        author: server.schema.find("user", "3"),
        description: "MOSS",
        image: "https://fastly.picsum.photos/id/340/200/300.jpg?hmac=JIWzQMzudGQJ5ZI2GIRg4NTwRI4fwA8k8xcnMvEmwcQ"
      });
      server.create("post", {
        id: "4",
        author: server.schema.find("user", "4"),
        description: "too much light",
        image: "https://fastly.picsum.photos/id/602/200/300.jpg?hmac=TkzlF12MtJomcmqzsOc-CR43gSl3xnotDQRPBvM7Avw"
      });
    },

    routes() {
      const graphQLHandler = createGraphQLHandler(gqlSchema, this.schema);

      this.post("/graphql", graphQLHandler);
    },
  });
};

export { makeServer };
