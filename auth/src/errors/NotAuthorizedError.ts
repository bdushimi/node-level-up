import { CustomError} from "./CustomError";



export class NotAuthorizedError extends CustomError{

constructor(){
    super('You are not Authorized')

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
}



    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{
            message: 'You are not Authorized!'
        }]
    }
    statusCode: number = 401

}