import express, {Request, Response, NextFunction} from 'express'
import {body, validationResult} from 'express-validator'
import { RequestValidationError } from '../errors/RequestValidationError'
import { validateRequest } from '../middlewares/validate-request'
import { Password } from '../services/password'
import { User } from '../models/user'
import { BadRequestError } from '../errors/BadRequestError'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signin',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),

    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], 
validateRequest,
async (req: Request, res: Response)=>{

  const {email, password} = req.body

  const existingUser = await User.findOne({email})

  if (!existingUser){
    throw new BadRequestError('Invalid credentials')
  }

  const passwordsMatch = await Password.compare(existingUser.password, password)

  if (!passwordsMatch){
    throw new BadRequestError('Invalid Credentials')
  }

  // Generate jwt
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
 }, process.env.jwt_key!)

 //store the jwt on the session
 req.session = {
    jwt : userJwt
 }

 res.status(200).send(existingUser)

})

export { router as signInRouter }