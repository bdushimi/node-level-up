import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from "crypto";
import cors from 'cors';


const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId : any = {}


app.get('/posts/:id/comments', (req : any, res: any) => {
        res.send(commentsByPostId[req.params.id] || [])
})


app.post('/posts/:id/comments', (req: any, res: any) => {
    const postId = req.params.id

    const { content } = req.body

    const commentId = randomBytes(4).toString('hex')

    const comments = commentsByPostId[postId] || []

    comments.push({ id: commentId, content: content })
    
    commentsByPostId[postId] = comments

    res.status(201).send(commentsByPostId[postId])
})

app.listen(5050, () => {
    console.log("comments service listens on port 5050")
})