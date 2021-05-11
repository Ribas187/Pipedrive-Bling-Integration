import { Request, Response } from 'express';
import { CreateOrdersService } from '../services/CreateOrdersService';
import { GetDealsCreateProductsService } from '../services/GetDealsCreateProductsService';

class DealsOrderController {
  async create(req: Request, res: Response): Promise<Response> {
    const getDealsCreateProductsService = new GetDealsCreateProductsService();

    const { deals } = await getDealsCreateProductsService.execute();

    const createOrdersService = new CreateOrdersService();
    const pedidos = await createOrdersService.execute(deals);

    return res.json(pedidos);
  }
}

export { DealsOrderController };
