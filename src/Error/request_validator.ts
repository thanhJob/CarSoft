import { ValidationError } from "express-validator";
import { customError } from "./customError";

// export class requestValidationError extends customError{
//     statusCode = 400;
//     constructor(public errors: ValidationError[]){
//         super('Invalid request param');
//         Object.setPrototypeOf(this, requestValidationError.prototype);
//     }
// }