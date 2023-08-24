import './App.css';
import Comment from './components/Comment/Comment';
import CommentForm from './components/CommentForm/CommentForm';
import { useState, useEffect } from 'react';

function App() {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/comments')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comment:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/currentUser')
      .then(response => response.json())
      .then(data => setCurrentUser(data))
      .catch(error => console.error('Error fetching current user:', error));
  }, []);

  const handleCommentSubmit = async (newComment) => {
    try {
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      });

      if (response.ok) {
        const createdComment = await response.json();
        setComments([...comments, createdComment]);
        console.log('Comment created successfully:', createdComment);
      } else {
        console.error('Failed to create comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId));
        console.log('Comment deleted successfully');
      } else {
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const upvote = (commentId, commentScore) => {
    console.log('clicked!')
    fetch(`http://localhost:3001/comments/${commentId}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score: commentScore+1 }) 
    })
      .then(response => response.json())
      .then(updatedComment => {
        const updatedComments = comments.map(comment =>
          comment.id === updatedComment.id ? updatedComment : comment
        );
        setComments(updatedComments);
        console.log('Comment upvoted successfully:', updatedComment);
      })
      .catch(error => console.error('Error upvoting comment:', error));
  };

  const downvote = (commentId,commentScore) => {
    fetch(`http://localhost:3001/comments/${commentId}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score: commentScore-1 }) 
    })
      .then(response => response.json())
      .then(updatedComment => {
        const updatedComments = comments.map(comment =>
          comment.id === updatedComment.id ? updatedComment : comment
        );
        setComments(updatedComments);
        console.log('Comment downvoted successfully:', updatedComment);
      })
      .catch(error => console.error('Error downvoting comment:', error));
  };

  const updateCommentContent = (commentId, newContent) => {
    fetch(`http://localhost:3001/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newContent })
    })
      .then(response => response.json())
      .then(updatedComment => {
        const updatedComments = comments.map(comment =>
          comment.id === updatedComment.id ? updatedComment : comment
        );
        setComments(updatedComments);
        console.log('Comment content updated successfully:', updatedComment);
      })
      .catch(error => console.error('Error updating comment content:', error));
  };

  const deleteReply = async (commentId, replyId) => {
    try {
      const response = await fetch(`http://localhost:3001/comments/${commentId}/replies/${replyId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedComments = comments.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
            : comment
        );
        setComments(updatedComments);
        console.log('Reply deleted successfully');
      } else {
        console.error('Failed to delete reply:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  

  return (
    <div >
      {comments.map((comment, key) => (
        <Comment deleteReply={deleteReply} isReply={false} upvote={upvote} downvote={downvote} updateCommentContent={updateCommentContent} key={key} comment={comment} currentUser={currentUser} onDelete={handleDeleteComment} />
      ))}
      <CommentForm currentUser={currentUser} onSubmit={handleCommentSubmit}/>
    </div>
  );
}

export default App;
