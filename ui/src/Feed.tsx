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
      {data.posts.map((post: Post) => (
        <div key={post.id} className="post-card">
          <header className="post-header">
            <h3 className="post-author">{post.author.name}</h3>
          </header>
          <img src={post.image} alt={post.description} className="post-image" />
          <div className="post-description">
            <p>{post.description}</p>
            <div className="comment-section">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="comment">{comment.author.name}: {comment.text}</div>
                ))
              ) : (
                <p className="comment">No comments yet :(</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
