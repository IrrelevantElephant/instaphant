import { useQuery, gql } from "@apollo/client";
import { Post } from './Types';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      description
      image
      author {
        name
      }
    }
  }
`;

const Feed = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.posts.map((post: Post) => (
        <div key={post.id}>
          <h3>{post.author.name}</h3>
          <img src={post.image} alt={post.description} />
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
