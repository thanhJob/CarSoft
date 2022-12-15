import jwt, { decode } from "jsonwebtoken";
import { promisify } from "util";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sign, verify } from "jsonwebtoken";
import User from "../Models/account/usersModel";
import { NextFunction, Request, Response } from "express";
import { Logger } from "../../errorHandle/ultis";
import sendEmail from "../../errorHandle/ultis/email/email";
import opTranspoter from "../../errorHandle/ultis/email/interface";

// conrrect password on logIn
const conrrect = async function (elLog: string, elPass: string) {
  return await bcrypt.compare(elLog, elPass);
};

// Private_key JWT
const secretKey: string = process.env.JWT_KEY ?? "";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await User.create(req.body);
    if (!newUser) {
      console.log("Can not create new data!");
      return next();
    }
    const token = jwt.sign(newUser.toJSON(), secretKey, {
      expiresIn: process.env.EXPIRES_JWT,
      // 604800 == 1week
    });
    // console.log(token);
    res.status(201).json({
      status: "Successfully!",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function logIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("your are email or password provide!");
    }
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) throw new Error("Can not find user or user does not exist!");
    const passStr: string = user.password;

    const conrrectPass = await conrrect(password, passStr);
    if (!conrrectPass) {
      throw new Error("Login user fail! Pls try again!");
    }

    const token = jwt.sign(user.toJSON(), secretKey, {
      expiresIn: process.env.EXPIRES_JWT,
      // 604800 == 1week
    });
    res.status(200).json({
      status: "Successfully!",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function security(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token;
    if (
      Object.values(req.headers)[0] &&
      `${Object.values(req.headers)[0]}`.startsWith("Bearer")
    ) {
      const valueToken = Object.values(req.headers)[0];
      token = `${valueToken}`.split(" ")[1];
    }

    if (!token) throw new Error("You are not login! Pls try login!");

    // check expires token
    const decoded = jwt.verify(token, secretKey);
    if (!decoded)
      throw new Error(
        "Invalid token expires out of date. PLs try again later!"
      );

    const currentUser = await User.findOne({ _id: Object.values(decoded)[2] });
    if (!currentUser)
      throw new Error(
        "Can not found user or user does not exits!. Pls try again."
      );

    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
}

// $ts-ignore
export function resTricto(...roles: any[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // ! trong req.user! để khẳng định hàm ko vô giá trị
    if (!roles.includes(req.user!.role)) {
      throw new Error("You do not have permission to perform this action!");
    }
    next();
  };
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    Logger.info("User does not exits. Try again!");
    return next();
  }

  // function create reset token password
  const resetPasswordToken = (Model: any) => {
    const token = crypto.randomBytes(32).toString("hex");
    Model.passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    Model.passwordResetExpires = new Date(
      new Date().getTime() + 10 * 60 * 1000
    );

    return token;
  };

  const resetToken = resetPasswordToken(user);
  user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password! Submit a patch request with your new password in here: \n
        ${resetURL}`;

  const subject = "Send to mail reset token password! (Invalid for 10 minute)";
  try {
    await sendEmail({
      email: user.email,
      subject: subject,
      message: message,
    });

    res.status(200).json({
      status: "Successfully!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });
    Logger.info("When wrong error send to mail reset password!");
    next();
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      Logger.info("Can not found user with token!");
      next();
    }

    user.password = req.body.password;
    user.password = await bcrypt.hash(user.password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();
    res.status(201).json({
      status: "Successfully!",
      data: user,
    });
  } catch (err) {
    Logger.info(err);
    next();
  }
}

export async function updateMyPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // check user exits
    const currentUser = await User.find({ _id: req.user.id }).select(
      "+passsword"
    );
    if (!currentUser) {
      throw new Error("Not found User with ID address");
    }

    // check pass body with pass user
    const { passwordCurrent } = req.body;
    // const { password } = currentUser;

    // user.conrrectPassword(passwordCurrent);
    // const conrectPass = await conrrect(passwordCurrent, password);
  } catch (err: any) {
    throw new Error(err);
  }
}
