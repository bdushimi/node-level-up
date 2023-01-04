import { CustomError } from "./CustomError";
export class DatabaseConnectionError extends CustomError {

    message = "Connection to the DB failed";
    statusCode = 500

  constructor() {
    super("Connection to the DB failed");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(){
    return [
        {
            message: this.message, 
            field: "N/A"
        }
    ]
  }
}
