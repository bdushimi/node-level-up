import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/RequestValidationError";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import jwt from 'jsonwebtoken'


interface UserPayload {
    id: string
    email: string
}

// Reach existing definition of Express, then Request interface and then 
// make a modification on it i.e add an optional Key which is "currentUser"
// and define it's type. This allows us to access and assign values to req.currentUser
declare global{
    namespace Express{
        interface Request{
            currentUser?: UserPayload
        }
    }
}


export const validateRequest = (
    req: Request, 
    res: Response, 
    next: NextFunction) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()){
            throw new RequestValidationError(errors.array())
        }
        next()
}

export const verifyCurrentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.session?.jwt){
        return next()
    }

    try {

        const payload = jwt.verify(req.session.jwt, process.env.jwt_key!) as UserPayload
        req.currentUser = payload
        
    } catch(err) {
        res.send({
            currentUser: null
        })
    }

    next()
}


export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.currentUser){
        throw new NotAuthorizedError()
    }

    next()
}