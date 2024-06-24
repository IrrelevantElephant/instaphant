import { useQuery, gql } from "@apollo/client";
import { Post as TPost } from "./Types";
import Post from "./Post";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      description
      image
      author {
        name
      }
      comments {
        text
        author {
          name
        }
      }
    }
  }
`;

const Feed = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p className="feed-container">Loading...</p>;
  if (error) return <p className="feed-container">Error :(</p>;

  return (
    <div className="feed-container">
      {data.posts.map((post: TPost) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Feed;
