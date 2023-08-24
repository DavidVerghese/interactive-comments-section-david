import './Comment.css';
import { useState } from 'react';

function Comment({ comment, currentUser, onDelete, upvote, downvote, updateCommentContent}) {
  const { user, createdAt, score, content, replies, id } = comment;
  const [toEdit, setToEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);
  return (
    !toEdit ? (
    <div className="comment">
      <p>user: {user.username}</p>
      <img src={user.image.png} alt="avatar" />
      {currentUser && user.username === currentUser.username ? ( <div>
        <button onClick={()=>onDelete(id)}>Delete</button>
      </div>) : null}
      <div><button onClick={()=>upvote(id,score)}>Upvote</button></div>
      <div> <button onClick={() => downvote(id, score)}>Downvote</button></div>
      <div> <button onClick={()=>setToEdit(true)}>Edit</button></div>
      <p>created at: {createdAt}</p>
      <p>score: {score}</p>
      <p>content: {content}</p>
      <div className="reply">
        {replies && replies.length > 0 ? replies.map((reply, key) => (<Comment onDelete={onDelete} upvote={upvote} currentUser={currentUser} key={key} comment={reply} />)) : null}
      </div>
      
      </div>)
      : ( <div>
        <textarea
          value={newContent}
          onChange={(event) => setNewContent(event.target.value)}
        />
        <button onClick={() => { setToEdit(false);  updateCommentContent(id,newContent)}}>Update</button>
      </div>)
  )
}
export default Comment;