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

app.post('/posts', async (req : any, res: any) => {
    const id = randomBytes(4).toString("hex")
    const { title } = req.body
    posts[id] = {
        id, title
    }

    await axios.post('http://localhost:6060/events', {
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

app.listen(4040, () => {
    console.log('bn listening on port 4040')
})
