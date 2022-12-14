import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const events: any[] = []


app.post('/events', (req, res) => {
    const event = req.body

    events.push(event)

    axios.post('http://posts-clusterip-srv:4001/events', {
        event
    }).catch(error=> {
        console.log("Error : ", error.message)
    })
    // axios.post('http://localhost:4002/events', {
    //     event
    // }).catch(error=> {
    //     console.log("Error : ", error.message)
    // })
    // axios.post('http://localhost:4005/events', {
    //     event
    // }).catch(error=> {
    //     console.log("Error : ", error.message)
    // })
    // axios.post('http://localhost:4004/events', {
    //     event
    // }).catch(error=> {
    //     console.log("Error : ", error.message)
    // })

    res.send({status: 'OK'})
})


//@ts-ingore
app.get('/events', (_req, res) => {
    res.send(events)
})




app.listen(4003, ()=>{
    console.log('Listening on 4003 port')
})
