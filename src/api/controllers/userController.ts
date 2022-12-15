import { Response, Request, NextFunction } from "express";
import User from "../Models/account/usersModel";

const filterObj = (obj: any, ...allWebFields: any) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allWebFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();
    if (!users) console.log("Can not find data user");

    res.status(200).json({
      status: "SuccessfullY!",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function findUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      // throw new Error('Can not get data!');
      console.log("Can not find data with by ID!");
      // return next();
    }
    res.status(200).json({
      status: "Successfully!",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateUser) {
      console.log("Can not update data!");
      return next();
    }
    res.status(203).json({
      status: "Successfully!",
      data: {
        updateUser,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Successfully!",
      data: null,
    });
  } catch (err) {
    next(err);
  }
}

export async function getUserStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userAggregate = await User.aggregate([
      {
        $group: {
          _id: "$role",
          sumUser: { $sum: 1 },
        },
      },
      {
        $addFields: {
          nameClass: "$_id",
        },
      },
    ]);
    res.status(200).json({
      status: "Successfully!",
      data: {
        userAggregate,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = await User.findOne({ _id: req.user.id }).select(
      "+password"
    );
    res.status(200).json({
      status: "Successfully!",
      data: currentUser,
    });
  } catch (err: string | any) {
    throw new Error(err);
  }
}

export async function updateMe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body.password) {
      console.log(
        "This router is not for passwords update. Pls use /updateMyPassword!"
      );
      next();
    }

    const filterKeys: any = filterObj(req.body, "name", "email", "addres");
    const updateFieldUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      filterKeys,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(203).json({
      status: "Successfully!",
      data: updateFieldUser,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function deleteCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await User.findOneAndUpdate({ _id: req.user.id }, { active: false });
    res.status(204).json({
      status: "Successfully!",
      data: null,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
