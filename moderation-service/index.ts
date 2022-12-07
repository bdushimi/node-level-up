import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'


const app = express()
app.use(bodyParser.json())


app.post('/events', async (req, res) => {

    const { type, data} = req.body.event

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved'

        await axios.post('http://localhost:4003/events', {
            type: 'CommentModerated',
            data : {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch(error=> {
            console.log("Error : ", error.message)
        })
    }
    

    res.send({status: 'OK'})

})


app.listen(4004, ()=>{
    console.log('Moderation Service listen on port, 4004')
})

