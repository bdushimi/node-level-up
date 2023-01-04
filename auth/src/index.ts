import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/currentUser'
import { signOutRouter } from './routes/signout'
import { signInRouter } from './routes/signin'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { RouteNotFoundError } from './errors/RouteNotFoundError'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)


app.all('*', async ()=>{
    throw new RouteNotFoundError()
})


app.use(errorHandler)

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})