import { Router } from 'express';
import { getData } from '../controllers/projectController';

const routerData = Router();
const projectPath = '/'

routerData
    .get(projectPath, getData);

export default routerData;