import './Comment.css';

function Comment({ comment }) {
  const { user, createdAt, score, content, replies } = comment;
  return (
    <div className="comment">
      <p>user: {user.username}</p>
      <img src={user.image.png} alt="avatar" />
      <p>created at: {createdAt}</p>
      <p>score: {score}</p>
      <p>content: {content}</p>
      <div className="reply">
        {replies && replies.length > 0 ? replies.map((reply, key) => (<Comment comment={reply} />)) : null}
      </div>
      
    </div>
  )
}
export default Comment;