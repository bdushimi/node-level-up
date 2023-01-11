import { CustomError } from "./CustomError";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {

    statusCode = 400

    constructor(public errors: ValidationError[]){
        super("Invalid Request Parameters")

        // In ts, this is necessary when 
        // you extend a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)

    }


    serializeErrors(){
        const formattedErrors = this.errors.map(error => {
            return {
                message: error.msg,
                field: error.param
            }
        })

        return formattedErrors
    }
}