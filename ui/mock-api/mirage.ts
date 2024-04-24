import { Model, belongsTo, createServer, hasMany } from "miragejs";
import { createGraphQLHandler } from "@miragejs/graphql";
import { GenerateFakeData } from "./fakeData";

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

const { fakeUsers, fakeComments, fakePosts } = GenerateFakeData(40, 40);

const makeServer = () => {
  createServer({
    models: {
      post: Model.extend({
        author: belongsTo("user"),
        comments: hasMany(),
      }),
      user: Model,
      comment: Model.extend({
        author: belongsTo("user"),
      }),
    },

    seeds(server) {
      fakeUsers.forEach((user) => {
        server.create("user", { id: user.id, name: user.name });
      });

      fakeComments.forEach((comment) => {
        server.create("comment", {
          id: comment.id,
          text: comment.text,
          author: server.schema.find("user", comment.author),
        });
      });

      fakePosts.forEach((post) =>
        server.create("post", {
          id: post.id,
          author: server.schema.find("user", post.author),
          description: post.description,
          image: post.image,
          comments: server.schema.find("comment", fakeComments.filter(c => c.postId === post.id).map(c => c.id)),
        })
      );
    },

    routes() {
      const graphQLHandler = createGraphQLHandler(gqlSchema, this.schema);

      this.post("/graphql", graphQLHandler);
    },
  });
};

export { makeServer };
