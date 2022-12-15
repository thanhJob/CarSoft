import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions";
import Logger from "../ultis/logger";


const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode: number = error.statusCode || 500;
    const message: string = error.message || 'Some thing when wrong!';
    const status: string = error.status;

    Logger.error(`[ERROR] - StatusCode: ${statusCode} - Msg: ${message} - Status: ${status}`);
    res.status(statusCode)
    .json({
        status,
        message
    });
};

export default errorMiddleware;