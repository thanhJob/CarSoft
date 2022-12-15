import { HttpException } from "../../errorHandle/exceptions";
import { NextFunction, Request, Response } from "express";
import { Logger } from "../../errorHandle/ultis";
import { errorMiddleware } from "../../errorHandle/middleware";

const handleCastErrorDB = (err: HttpException) => {
    const message: string = `Invalid ${Object.values(err.message)}: ${err.value}` || '';
    console.log(message)
    const statusCode = 404;
    const status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
    // return new HttpException(message, 404);
    // return new HttpException(message, statusCode, status);
}

const sendError = function(
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
){
    res.status(err.statusCode)
    .json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
};

export default (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = Object.assign(err);
}