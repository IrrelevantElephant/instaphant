import { Post as TPost } from "./Types";
import Comments from "./Comments";

const Post = ({ post }: { post: TPost }) => {
  return (
    <div key={post.id} className="post-card">
      <header className="post-header">
        <h3 className="post-author">{post.author.name}</h3>
      </header>
      <img src={post.image} alt={post.description} className="post-image" />
      <div className="post-description">
        <p>{post.description}</p>
        <Comments comments={post.comments} />
      </div>
    </div>
  );
};

export default Post;
