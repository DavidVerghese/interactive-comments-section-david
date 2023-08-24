import './App.css';
import Comment from './components/Comment/Comment';
import { useState, useEffect } from 'react';
import data from './data/data.json';

function App() {
  console.log(data);
  const [comments, setComments] = useState(data.comments);
  return (
    <div >
      {comments.map((comment,key) => (
        <Comment key={key} comment={comment} />
      ))}
    </div>
  );
}

export default App;
