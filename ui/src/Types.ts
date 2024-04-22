export type Post = {
  id: string;
  description: string;
  image: string;
  author: User;
};

export type User = {
  id: string;
  name: string;
}