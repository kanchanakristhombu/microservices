const express = require('express');

const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const commentsByPosts = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPosts[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const comID = randomBytes(4).toString('hex');
    const {content} = req.body;

    const commments = commentsByPosts[req.params.id] || [];
    
    commments.push({ id: comID, content });

    commentsByPosts[req.params.id] = commments;

    res.status(201).send(commments);
});

app.listen(4001, () => {
    console.log('listening at port 4001');
});