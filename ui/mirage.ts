import { Model, createServer } from "miragejs";

const makeServer = () => {
  createServer({
    models: {
      post: Model,
    },

    seeds(server) {
      server.create("post", {
        id: "1",
        user: "John",
        description: "a beach",
        image: "https://fastly.picsum.photos/id/675/200/300.jpg?hmac=c2gHO4_1hIFBRijtOhz09icBTxsdGCsMSYSs2XIDdAk"
      });
      server.create("post", {
        id: "2",
        user: "Jane",
        description: "new shoes",
        image: "https://fastly.picsum.photos/id/604/200/300.jpg?hmac=6ceMKS8u7easDoKzWSaIiSTpRlTPn1OUOdfSJWou3uQ"
      });
      server.create("post", {
        id: "3",
        user: "Bob",
        description: "MOSS",
        image: "https://fastly.picsum.photos/id/340/200/300.jpg?hmac=JIWzQMzudGQJ5ZI2GIRg4NTwRI4fwA8k8xcnMvEmwcQ"
      });
      server.create("post", {
        id: "4",
        user: "Bridgitte",
        description: "too much light",
        image: "https://fastly.picsum.photos/id/602/200/300.jpg?hmac=TkzlF12MtJomcmqzsOc-CR43gSl3xnotDQRPBvM7Avw"
      });
    },

    routes() {
      this.get("/api/posts"),
        (schema: any) => {
          return schema.posts.all();
        };
    },
  });
};

export { makeServer };
