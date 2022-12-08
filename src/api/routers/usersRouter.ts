import { Router } from "express";
import {
    createUser, 
    deleteData, 
    findUser, 
    getUser, 
    getUserStats, 
    updateData 
} from "../controllers/userController";

const routerData = Router();
const userpath = '/overview';

routerData
    .get(userpath + '/getUserStats', getUserStats)

// Overview
routerData
    .get(userpath, getUser)
    .post(userpath, createUser)

// /:id
routerData
    .get(userpath + '/:id', findUser)
    .patch(userpath + '/:id', updateData)
    .delete(userpath + '/:id', deleteData)

export default routerData;