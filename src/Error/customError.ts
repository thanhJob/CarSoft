export class customError extends Error{
    public status: string
    public statusCode : Number
    public isOperational: Boolean
    constructor(
        message: string,
        statusCode: Number,
        isOperational = true
    ){
        super(message)
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
};