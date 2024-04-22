import { Model, belongsTo, createServer, hasMany } from "miragejs";
import { createGraphQLHandler } from "@miragejs/graphql";

const gqlSchema = `
type User {
  id: ID!
  name: String!
}

type Post {
  id: ID!
  author: User!
  description: String!
  image: String!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  author: User!
  text: String!
}

type Query {
  posts: [Post!]!
  users: [User!]!
  comments: [Comment!]!
}

schema {
  query: Query
}
`;

const makeServer = () => {
  createServer({
    models: {
      post: Model.extend({
        author: belongsTo("user"),
        comments: hasMany()
      }),
      user: Model,
      comment: Model.extend({
        author: belongsTo("user")
      })
    },

    seeds(server) {
      server.create("user", { id: "1", name: "John" });
      server.create("user", { id: "2", name: "Jane" });
      server.create("user", { id: "3", name: "Bob" });
      server.create("user", { id: "4", name: "Bridgitte" });

      server.create("comment", {id: "1", text: "Amazing!", author: server.schema.find("user", "1"),});
      server.create("comment", {id: "2", text: "Awful :(", author: server.schema.find("user", "2"),});
      server.create("comment", {id: "3", text: "Great!", author: server.schema.find("user", "3"),});
      server.create("comment", {id: "4", text: "Stunning!", author: server.schema.find("user", "4"),});
      server.create("comment", {id: "5", text: "Horrible", author: server.schema.find("user", "1"),});
      server.create("comment", {id: "6", text: "Lovely!", author: server.schema.find("user", "2"),});
      server.create("comment", {id: "7", text: "Atrocious!", author: server.schema.find("user", "3"),});
      server.create("comment", {id: "8", text: "Terrible!", author: server.schema.find("user", "4"),});
      server.create("comment", {id: "9", text: "Wonderful!", author: server.schema.find("user", "1"),});

      server.create("post", {
        id: "1",
        author: server.schema.find("user", "1"),
        description: "a beach",
        comments: server.schema.find("comment", ["1", "2", "3"]),
        image:
          "https://fastly.picsum.photos/id/675/200/300.jpg?hmac=c2gHO4_1hIFBRijtOhz09icBTxsdGCsMSYSs2XIDdAk",
      });
      server.create("post", {
        id: "2",
        author: server.schema.find("user", "2"),
        description: "new shoes",
        comments: server.schema.find("comment", ["4", "5"]),
        image:
          "https://fastly.picsum.photos/id/604/200/300.jpg?hmac=6ceMKS8u7easDoKzWSaIiSTpRlTPn1OUOdfSJWou3uQ",
      });
      server.create("post", {
        id: "3",
        author: server.schema.find("user", "3"),
        description: "MOSS",
        comments: server.schema.find("comment", ["6", "7"]),
        image:
          "https://fastly.picsum.photos/id/340/200/300.jpg?hmac=JIWzQMzudGQJ5ZI2GIRg4NTwRI4fwA8k8xcnMvEmwcQ",
      });
      server.create("post", {
        id: "4",
        author: server.schema.find("user", "4"),
        description: "too much light",
        comments: server.schema.find("comment", ["8", "9"]),
        image:
          "https://fastly.picsum.photos/id/602/200/300.jpg?hmac=TkzlF12MtJomcmqzsOc-CR43gSl3xnotDQRPBvM7Avw",
      });
    },

    routes() {
      const graphQLHandler = createGraphQLHandler(gqlSchema, this.schema);

      this.post("/graphql", graphQLHandler);
    },
  });
};

export { makeServer };
