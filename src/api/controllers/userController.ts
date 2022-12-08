import{
    Response,
    Request,
    NextFunction
}from "express";
import User from "../Models/account/usersModel";

export async function getUser(
    req: Request,   
    res: Response,
    next: NextFunction
){
    try {
        const users = await User.find();
        if(!users) console.log('Can not find data user');

        res.status(200)
        .json({
            status: 'SuccessfullY!',
            data: {
                users
            }
        });
    } catch (err) {
        next(err)
    };
};

export async function findUser(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            // throw new Error('Can not get data!');
            console.log('Can not find data with by ID!');
            // return next();
        }; 
        res.status(200)
        .json({
            status: 'Successfully!',
            data: {
                user
            }
        });
        
    } catch (err) {
        next(err);
    };
};

export async function createUser(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const newUser = await User.create(req.body);
        if(!newUser){
            console.log('Can not create new data!');
            return next();
        }; 
        res.status(201)
        .json({
            status: 'Successfully!',
            data: {
                newUser
            }
        });
        
    } catch (err) {
        next(err);
    };
};

export async function updateData(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!updateUser){
            console.log('Can not update data!');
            return next();
        }; 
        res.status(203)
        .json({
            status: 'Successfully!',
            data: {
                updateUser
            }
        });
    } catch (err) {
        next(err);
    }
};

export async function deleteData(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204)
        .json({
            status: 'Successfully!',
            data: null
        });
        
    } catch (err) {
        next(err);
    };
};

export async function getUserStats(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const userAggregate = await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    sumUser: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    nameClass: '$_id'
                }
            }
        ]);
        res.status(200)
        .json({
            status: 'Successfully!',
            data: {
                userAggregate
            }
        });
    } catch (err) {
        next(err);
    };
}