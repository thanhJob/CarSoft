import { Router } from 'express';
import {
    aggregateCar,
    createData,
    deleteData,
    findParams,
    getData,
    updateData
}from '../controllers/projectController';

const routerData = Router();
const projectPath = '/overview';

routerData
    .get(projectPath + '/getCarStats', aggregateCar);

// Overview
routerData
    .get(projectPath, getData)
    .post(projectPath + '/createNewCar', createData);

// :ID
routerData
    .get(projectPath + '/:id/findCar', findParams)
    .patch(projectPath + '/:id/updateCar', updateData)
    .delete(projectPath + '/:id/deleteCar', deleteData)

export default routerData;