import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import { RequestValidationError } from '../errors/RequestValidationError'
import { User } from '../models/user'

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
    .isEmail()
    .withMessage("Email must be valid"),

   body('password')
   .trim()
   .isLength({min: 4, max:20})
   .withMessage('Password must be between 4 and 20 characters') 

], async (req: Request, res: Response)=>{

    const errors = validationResult(req)

    // Check if there are validation errors and send responses back to users
    if (!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
    }

    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser){
        return res.send('Email already used')
    }

    const user = User.build({email, password})

     await user.save()

    res.status(201).send(user)

})

export { router as signUpRouter }