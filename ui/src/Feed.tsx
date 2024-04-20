import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      description
      image
      user
    }
  }
`;

type Post = {
  id: string;
  user: string;
  description: string;
  image: string;
};

const Feed = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.posts.map((post: Post) => (
        <div key={post.id}>
          <h3>{post.user}</h3>
          <img src={post.image} alt={post.description} />
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
