import express, {Request, Response} from 'express'
import { verifyCurrentUser, requireAuth } from '@dushberd/common'

const router = express.Router()

router.get('/api/users/currentuser', verifyCurrentUser, (req: Request, res: Response) => {
    res.send({
        currentUser: req.currentUser || null
    })
})

export { router as currentUserRouter }