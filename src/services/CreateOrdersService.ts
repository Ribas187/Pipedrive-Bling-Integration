import { blingApi } from '../apis';
import { j2xParser as Parser } from 'fast-xml-parser';
import sleep from '../util/sleep';
import { IDeal } from '../models/deals/interfaces';

interface IResponse {
  deal: IDeal;
  pedido: any;
}

class CreateOrdersService {
  async execute(data: IDeal[]): Promise<IResponse[]> {
    try {
      const pedidos = await Promise.all(
        data.map(async deal => {
          const parser = new Parser({});

          const xmlData = parser.parse({
            pedido: deal,
          });

          const { data: pedido } = await blingApi.post('pedido/json', null, {
            params: {
              xml: xmlData,
            },
          });

          await sleep(334);

          return { pedido, deal };
        })
      );

      return pedidos;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { CreateOrdersService };
