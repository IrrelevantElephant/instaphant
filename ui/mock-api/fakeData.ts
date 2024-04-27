import { fakerEN as faker } from "@faker-js/faker";

export type Post = {
  id: string;
  description: string;
  image: string;
  author: string;
};

export type User = {
  id: string;
  name: string;
};

export type Comment = {
  id: string;
  text: string;
  author: string;
  postId: string;
};

export type FakeData = {
  fakeUsers: User[];
  fakePosts: Post[];
  fakeComments: Comment[];
};

// Set a seed so we get the same fake data on each run.
faker.seed(12345);

const GenerateFakeData = function (
  userCount: number,
  postCount: number,
): FakeData {
  const users = [...Array(userCount).keys()].map((id): User => {
    return { id: `user-${id}`, name: faker.person.fullName() };
  });

  const posts = [...Array(postCount).keys()].map((id): Post => {
    const authorId = faker.number.int({ min: 0, max: userCount - 1 });
    const author = users[authorId];

    return {
      id: `post-${id}`,
      description: faker.lorem.sentence(),
      image: faker.image.urlPicsumPhotos({ height: 300, width: 200 }),
      author: author.id,
    };
  });

  const comments = [...Array(postCount * 10).keys()].map((id): Comment => {
    const authorId = faker.number.int({ min: 0, max: userCount - 1 });
    const author = users[authorId];

    const postId = faker.number.int({ min: 0, max: postCount - 1 });
    const post = posts[postId];

    return {
      id: `comment-${id}`,
      author: author.id,
      text: faker.lorem.sentence(),
      postId: post.id,
    };
  });

  return {
    fakeUsers: users,
    fakePosts: posts,
    fakeComments: comments,
  };
};

export { GenerateFakeData };
