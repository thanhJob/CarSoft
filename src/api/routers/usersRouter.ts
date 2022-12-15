import { Router } from "express";
import {
  deleteCurrentUser,
  deleteData,
  findUser,
  getMe,
  getUser,
  getUserStats,
  updateData,
  updateMe,
} from "../controllers/userController";

import {
  logIn,
  signUp,
  security,
  resTricto,
  forgotPassword,
  resetPassword,
  updateMyPassword,
} from "../controllers/authController";

const routerData = Router();
const userpath = "/users";

// AUTH CONTROLLER
routerData
  .post(userpath + "/signUp", signUp)
  .post(userpath + "/logIn", logIn)
  .post(userpath + "/forgotPassword", forgotPassword)
  .post(userpath + "/resetPassword/:token", resetPassword)
  .patch(userpath + "/updateMyPassword", security, updateMyPassword);

// USER CONTROLLER
routerData
  .get(userpath + "/getUserStats", getUserStats)
  .get(userpath + "/getMe", security, getMe)
  .patch(userpath + "/updateFieldUser", security, updateMe)
  .delete(userpath + "/deleteCurrentUser", security, deleteCurrentUser);

// Overview
routerData.get(userpath, security, resTricto("admin"), getUser);

// /:id
routerData
  .get(userpath + "/:id", findUser)
  .patch(userpath + "/:id", updateData)
  .delete(userpath + "/:id", deleteData);

export default routerData;
