export type Post = {
  id: string;
  description: string;
  image: string;
  author: User;
  comments: Comment[];
};

export type User = {
  id: string;
  name: string;
};

export type Comment = {
  id: string;
  text: string;
  author: User;
};
