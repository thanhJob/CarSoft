import { Router } from 'express';
import {
    aggregateCar,
    createData,
    deleteData,
    findParams,
    getData,
    getTopPriceCar,
    updateData
}from '../controllers/projectController';
import { resTricto, security } from '../controllers/authController';

const routerData = Router();
const projectPath = '/cars';

routerData
    .get(projectPath + '/getCarStats', aggregateCar)
    .get(projectPath + '/topPriceCar',
    getTopPriceCar,
    getData
);

// Overview
routerData
    .get(projectPath,
        security,
        resTricto('admin'),
        getData)
    .post(projectPath + '/createNewCar', createData);

// :ID
routerData
    .get(projectPath + '/:id/findCar', findParams)
    .patch(projectPath + '/:id/updateCar', updateData)
    .delete(projectPath + '/:id/deleteCar', deleteData)

export default routerData;