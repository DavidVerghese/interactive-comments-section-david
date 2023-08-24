import { useState } from 'react';

function Reply({ comment, currentUser, parentComment, deleteReply }) {
  const { user, createdAt, score, content, replies, id } = comment;
  const [toEdit, setToEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);

 


  return (
    !toEdit ? (
      <div className="reply">
        {/* <div className="left-toolbar">
          <p>score: {score}</p>
          <div><button>Upvote</button></div>
          <div> <button>Downvote</button></div>
        </div> */}
        <div className="content">
          <div className="header">
            <p>user: {user.username}</p>
            <img src={user.image.png} alt="avatar" />

            {/* {currentUser && currentUser.username === user.username ? (
           <div>
            <div> <button onClick={() => setToEdit(true)}>Edit</button></div>
            <button onClick={()=>deleteReply(parentComment,id)}>Delete</button>
          </div> 
        ) : null} */}
      
      
            {/* <button>Reply</button> */}
            <p>{createdAt}</p>
          </div>
        </div>
      
        
      
     
      <p>content: {content}</p>
      
      </div>)
      : ( <div>
        <textarea
          value={newContent}
          onChange={(event) => setNewContent(event.target.value)}
        />
        <button onClick={() => { setToEdit(false) }}>Update</button>
      </div>)
  )
}
export default Reply;