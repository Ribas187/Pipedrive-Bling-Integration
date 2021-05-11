import { Router } from 'express';
import { DealsOrderController } from '../controllers/DealsOrderController';

const routes = Router();
const dealsOrderController = new DealsOrderController();

routes.post('/deals-order', dealsOrderController.create);

export default routes;
