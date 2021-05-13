import { j2xParser as Parser } from 'fast-xml-parser';
import { Model } from 'mongoose';
import { blingApi, pipedriveApi } from '../apis';
import sleep from '../util/sleep';
import { IDeal } from '../models/deals/interfaces';
import { IProduto } from '../models/produto/interfaces';
import { IOrderSchema } from '../models/orders/interfaces';
import Order from '../models/orders/model';

class SaveOrderService {
  constructor(private ordersRepository: Model<IOrderSchema> = Order) {}

  async execute(deals: IDeal[]): Promise<IOrderSchema> {
    const total = deals
      .map(deal =>
        deal.itens.reduce((value, deal) => {
          return value + +deal.item.vlr_unit * +deal.item.qtde;
        }, 0)
      )
      .reduce((sum, value) => sum + value);

    const formattedDeals = deals.map(deal => {
      const formattedItems = deal.itens.map(item => item.item);

      return {
        ...deal,
        itens: formattedItems,
      };
    });

    const order = await this.ordersRepository.create({
      deals: formattedDeals,
      total,
      date: new Date(),
    });

    return order;
  }
}

export { SaveOrderService };
