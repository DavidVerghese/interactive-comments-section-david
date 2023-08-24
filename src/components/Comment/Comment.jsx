import './Comment.css';
import { useState } from 'react';
import Reply from '../Replies/Reply';

function Comment({ comment, currentUser, onDelete, upvote, downvote, updateCommentContent, deleteReply}) {
  const { user, createdAt, score, content, replies, id } = comment;
  const [toEdit, setToEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);

  
  return (
    !toEdit ? (
    <div className="comment">

        
      

        <div className="left-toolbar">
        <img onClick={() => upvote(id, score)} src="./images/icon-plus.svg" alt="Upvote" />
        <p>{score}</p>
          <img onClick={() => downvote(id, score)} src="./images/icon-minus.svg" alt="Downvote" />
        </div>

        <div className="content"> 
          <div className="header">
          <div>
            <img src={user.image.png} alt="avatar" />
          </div>

          {currentUser && user.username === currentUser.username ? ( <div>
          <div> <button onClick={() => setToEdit(true)}>Edit</button></div>
          <button onClick={() => onDelete(id)}>Delete</button>
      </div>) : null}

          <p><b>{user.username}</b></p>
          <p>{createdAt}</p>

            <img src="./images/icon-reply.svg" alt="reply" />
          </div>
          <p>content: {content}</p>
        </div>
        

      
     
  
      
      
     
      {/* <div className="reply">
          {replies && replies.length > 0 ? replies.map((reply, key) => (<Comment onDelete={onDelete} upvote={upvote} currentUser={currentUser} key={key} comment={reply} />)) : null}
      </div> */}
        
        <div className="reply">
          {replies && replies.length > 0 ? replies.map((reply, key) => (<Reply deleteReply={deleteReply} key={key} parentComment={id} comment={reply} currentUser={currentUser} />)) : null}
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