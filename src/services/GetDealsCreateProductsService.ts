import { blingApi, pipedriveApi } from '../apis';
import { j2xParser as Parser } from 'fast-xml-parser';
import sleep from '../util/sleep';

interface IProduto {
  item: {
    codigo: string;
    qtde: number;
  };
}

interface IDeal {
  data: Date;
  cliente: {
    nome?: string;
    email?: string;
    fone?: string;
  };
  itens: IProduto[];
}

interface IResponse {
  deals: IDeal[];
}

class GetDealsCreateProductsService {
  async execute(): Promise<IResponse> {
    try {
      const { data: deals } = await pipedriveApi.get('deals', {
        params: {
          status: 'won',
        },
      });

      const dealsList: IDeal[] = (
        (await Promise.all(
          deals.data?.map(async (deal: any, i: number) => {
            const { data: products } = await pipedriveApi.get(
              `deals/${deal.id}/products`
            );

            if (!products.data) return;

            const createdProducts = await Promise.all(
              products?.data?.map(async (product: any) => {
                const produto = {
                  produto: {
                    codigo: product.id?.toString(),
                    vlr_unit: product.item_price,
                    descricao: product.name,
                  },
                };

                const parser = new Parser({});

                const xmlData = parser.parse(produto);

                const { data } = await blingApi.post('produto/json', null, {
                  params: {
                    xml: xmlData,
                  },
                });

                await sleep(334);

                return {
                  item: {
                    codigo: data.retorno?.produtos[0]?.produto?.codigo,
                    vlr_unit: product.item_price,
                    qtde: product.quantity,
                  },
                } as IProduto;
              })
            );

            return {
              data: deal.won_time,
              cliente: {
                nome: deal.person_id.name,
                email: deal.person_id.email[0]?.value,
                fone: deal.person_id.phone[0]?.value,
              },
              itens: createdProducts,
            } as IDeal;
          })
        )) as IDeal[]
      ).filter(deal => !!deal);

      return {
        deals: dealsList,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { GetDealsCreateProductsService };
