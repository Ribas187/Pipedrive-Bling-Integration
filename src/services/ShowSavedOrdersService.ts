import { Model } from 'mongoose';
import { IOrderSchema } from '../models/orders/interfaces';
import Order from '../models/orders/model';

class ShowSavedOrdersService {
  constructor(private ordersRepository: Model<IOrderSchema> = Order) {}

  async execute(): Promise<IOrderSchema[]> {
    const orders = await this.ordersRepository.find();

    return orders;
  }
}

export { ShowSavedOrdersService };
