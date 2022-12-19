import express from 'express'
import { randomBytes } from 'crypto'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())



const posts : any = {}

app.get('/posts', (_req : any, res: any) => {
    res.send(posts)
})

app.post('/posts/create', async (req : any, res: any) => {
    const id = randomBytes(4).toString("hex")
    const { title } = req.body
    posts[id] = {
        id, title
    }

    // sends events to the event bus
    await axios.post('http://event-clusterip-srv:4003/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).send(posts[id])
})

app.post('/events', (req, res)=>{
    console.log('Received event', req.body.event.type)
    res.send({})
})

app.listen(4001, () => {
    console.log('New APIs')
    console.log('bn listening on port 4001')
})
