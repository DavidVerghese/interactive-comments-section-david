import React, { useState } from 'react';

function CommentForm({ onSubmit, currentUser }) {
  const [content, setContent] = useState('');
  const [user, setUser] = useState(currentUser);
  // You can add more state for other fields like createdAt and score
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new comment object
    const newComment = {
      content,
      createdAt: new Date().toISOString(),
      score: 0, 
      user: currentUser,
      replies: []
    };
    // Call the onSubmit function to submit the new comment
    onSubmit(newComment);

    // Clear form fields
    setContent('');
    setUser('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src={currentUser? currentUser.image.png : null} alt="current user"/>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;