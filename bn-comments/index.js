const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require("crypto")


const app = express()
app.use(bodyParser.json())

const commentsByPostId = {}


app.get('/posts/:id/comments', (req, res) => {
        res.send(commentsByPostId[req.params.id] || [])
})


app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id

    const { content } = req.body

    const commentId = randomBytes(4).toString('hex')

    const comments = commentsByPostId[postId] || []

    comments.push({ id: commentId, content: content })
    
    commentsByPostId[postId] = comments

    res.status(201).send(commentsByPostId[postId])
})

app.listen(5000, () => {
    console.log("comments service listens on port 5000")
})