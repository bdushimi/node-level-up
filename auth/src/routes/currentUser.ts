import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors/BadRequestError'

const router = express.Router()

router.get('/api/users/currentuser', (req: Request, res: Response)=>{

    if(!req.session?.jwt){
        return res.send({
            currentUser: null
        })
    }

    try {
        const payload = jwt.verify(
            req.session.jwt, 
            process.env.jwt_key!
        )

        res.send({currentUser: payload})

    } catch(err){
        res.send({currentUser: null})
    }
})

export { router as currentUserRouter }