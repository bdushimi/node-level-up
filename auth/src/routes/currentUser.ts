import express, {Request, Response} from 'express'
import { BadRequestError } from '../errors/BadRequestError'
import { verifyCurrentUser, requireAuth } from '../middlewares/validate-request'

const router = express.Router()

router.get('/api/users/currentuser', verifyCurrentUser, requireAuth, (req: Request, res: Response) => {
    res.send({
        currentUser: req.currentUser || null
    })
})

export { router as currentUserRouter }