const express = require('express');
const jsonServer = require('json-server');
const server = express();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

// Custom route to get a specific reply
server.get('/comments/:commentid/replies/:replyid', (req, res) => {
  const { commentid, replyid } = req.params;
  const replies = router.db.get('comments')
    .find({ id: parseInt(commentid) })
    .get('replies')
    .find({ id: parseInt(replyid) })
    .value();

  res.json(replies);
});

server.patch('/comments/:commentid/replies/:replyid', (req, res) => {
  const { commentid, replyid } = req.params;
  const updatedReplyData = req.body; 

  router.db.get('comments')
    .find({ id: parseInt(commentid) })
    .get('replies')
    .find({ id: parseInt(replyid) })
    .assign(updatedReplyData)
    .write();

  res.json(updatedReplyData);
});

server.delete('/comments/:commentid/replies/:replyid', (req, res) => {
  const { commentid, replyid } = req.params;

  router.db.get('comments')
    .find({ id: parseInt(commentid) })
    .get('replies')
    .remove({ id: parseInt(replyid) })
    .write();

  res.json({ success: true });
});

// Custom route to create a new reply to a comment
server.post('/comments/:commentid/replies', (req, res) => {
  const { commentid } = req.params;
  const newReplyData = req.body; 

  const comment = router.db.get('comments').find({ id: parseInt(commentid) }).value();
  if (comment) {
    newReplyData.id = Math.max(...comment.replies.map(reply => reply.id)) + 1;
    comment.replies.push(newReplyData);
    router.db.write();
    res.json(newReplyData);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});


server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});