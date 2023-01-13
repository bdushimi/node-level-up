import { CustomError } from "./CustomError";

export class RouteNotFoundError extends CustomError{
    statusCode: number = 404;

    constructor(){
        super('Route not found')

        Object.setPrototypeOf(this, RouteNotFoundError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: "Route  Not Found"
            }
        ]
    }
}