import { Comment } from "./Types";

const Comments = ({ comments }: { comments: Comment[] }) => (
  <div className="comment-section">
    {comments && comments.length > 0 ? (
      comments.map((comment, index) => (
        <div key={index} className="comment-container">
          <strong className="comment-author">{comment.author.name}:</strong>
          <p className="comment-text">{comment.text}</p>
        </div>
      ))
    ) : (
      <p className="comment">No comments yet :(</p>
    )}
  </div>
);

export default Comments;
