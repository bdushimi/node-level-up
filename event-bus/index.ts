import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())


app.post('/events', (req, res) => {
    const event = req.body

    axios.post('http://localhost:4040/events', {
        event
    })
    axios.post('http://localhost:5050/events', {
        event
    })
    axios.post('http://localhost:7070/events', {
        event
    })

    res.send({status: 'OK'})
})


app.listen(6060, ()=>{
    console.log('Listening on 6060 port')
})
