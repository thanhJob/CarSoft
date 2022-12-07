import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';


export function getData(
    req: Request,
    res: Response,
    next: NextFunction
){
    res.status(200)
    .json({
        status: 'Successfully!'
    })
};