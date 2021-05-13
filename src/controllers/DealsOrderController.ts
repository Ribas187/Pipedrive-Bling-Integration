import { Request, Response } from 'express';
import { CreateOrdersService } from '../services/CreateOrdersService';
import { GetDealsCreateProductsService } from '../services/GetDealsCreateProductsService';
import { SaveOrderService } from '../services/SaveOrderService';
import { ShowSavedOrdersService } from '../services/ShowSavedOrdersService';

class DealsOrderController {
  async create(_: Request, res: Response): Promise<Response> {
    const getDealsCreateProductsService = new GetDealsCreateProductsService();

    const { deals } = await getDealsCreateProductsService.execute();

    const createOrdersService = new CreateOrdersService();
    const pedidos = await createOrdersService.execute(deals);

    const saveOrderService = new SaveOrderService();
    const order = await saveOrderService.execute(deals);

    return res.json({
      pedidos,
      order,
    });
  }

  async index(_: Request, res: Response): Promise<Response> {
    const showSavedOrdersService = new ShowSavedOrdersService();

    const orders = await showSavedOrdersService.execute();

    return res.json(orders);
  }
}

export { DealsOrderController };
