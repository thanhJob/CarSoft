import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import Cars from '../Models/cars/carsModel';


export async function getData(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {

        class APIFeatures{
            public query : String;
            public queryString : String;
            constructor(
                query: String,
                queryString: String
            ){
                this.query = query;
                this.queryString = queryString
            };

            filter(){
                const queryObj = {...this.queryString};
                const removeField = ['limit', 'sort', 'fields', 'page'];
                removeField.forEach(el => {
                    const typedata: string = el;
                    delete queryObj[el];
                });
        
                let queryStr = JSON.stringify(queryObj);
                queryStr = queryStr.replace(
                    /\b(gte|gt|lte|lt)\b/g, match => `$${match}`
                );
                let query = Cars.find(JSON.parse(queryStr));
            }
        }

        const queryObj = {...req.query};
        const removeField = ['limit', 'sort', 'fields', 'page'];
        removeField.forEach(el => {
            delete queryObj[el];
        });

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g, match => `$${match}`
        );
        let query = Cars.find(JSON.parse(queryStr));
        
        if(req.query.sort){
            const sortBy = `${req.query.sort}`.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query = query.sort('-price');
        };

        if(req.query.fields){
            const fieldsBy = `${req.query.fields}`.split(',').join(' ');
            query = query.select(fieldsBy);
        }else{
            query = query.select('-__v');
        };

        const page = parseInt(req.query.page as string) * 1;
        const limit = parseInt(req.query.limit as string) * 1;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);


        const cars = await query;
        if(!cars){
            console.log('Can not get data!');
            return next();
        }; 
        res.status(200)
        .json({
            status: 'Successfully!',
            length: cars.length,
            data: {
                cars
            }
        });
        
    } catch (err) {
        res.status(404)
        .json({
            status: 'Fail!',
            message: err
        });
    };
};

export async function findParams(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const car = await Cars.findById(req.params.id);
        if(!car){
            // throw new Error('Can not get data!');
            console.log('Can not find data with by ID!');
            // return next();
        }; 
        res.status(200)
        .json({
            status: 'Successfully!',
            data: {
                car
            }
        });
        
    } catch (err) {
        res.status(404)
        .json({
            status: 'Fail!',
            message: err
        });
    };
};

export async function createData(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const newCar = await Cars.create(req.body);
        if(!newCar){
            console.log('Can not create new data!');
            return next();
        }; 
        res.status(201)
        .json({
            status: 'Successfully!',
            data: {
                newCar
            }
        });
        
    } catch (err) {
        res.status(404)
        .json({
            status: 'Fail!',
            message: err
        });
    };
};

export async function updateData(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const updateCar = await Cars.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!updateCar){
            console.log('Can not update data!');
            return next();
        }; 
        res.status(203)
        .json({
            status: 'Successfully!',
            data: {
                updateCar
            }
        });
    } catch (err) {
        res.status(404)
        .json({
            status: 'Fail!',
            message: err
        });
    }
};

export async function deleteData(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        await Cars.findByIdAndDelete(req.params.id);
        res.status(204)
        .json({
            status: 'Successfully!',
            data: null
        });
        
    } catch (err) {
        res.status(404)
        .json({
            status: 'Fail!',
            message: err
        });
    };
};

export async function aggregateCar(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const carAggregate = await Cars.aggregate([
            {
                $group: {
                    _id: '$classify',
                    sumPrice: { $sum: '$price' },
                    avgPrice: { $avg: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            {
                $addFields: {
                    nameClass: '$_id'
                }
            }, 
            {
                $sort: {
                    sumPrice: -1
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);
        res.status(200)
        .json({
            status: 'Successfully!',
            data: {
                carAggregate
            }
        });
    } catch (err) {
        next(err);
    };
}
