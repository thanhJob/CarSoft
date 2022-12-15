class HttpException extends Error{
    public path: string
    public value: string
    public statusCode : number
    public status: string
    public message: string;
    public isOperational: boolean
    constructor(
        statusCode: number,
        message: string,
        path: string,
        value: string,
        isOperational = true
    ){
        super(message)
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error'; 
        this.statusCode = statusCode;
        this.message = message;
        this.path = path;
        this.value = value;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
};

export default HttpException;