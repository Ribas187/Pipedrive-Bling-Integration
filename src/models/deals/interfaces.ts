import { IProduto } from '../produto/interfaces';

export interface IDeal {
  data: Date;
  cliente: {
    nome?: string;
    email?: string;
    fone?: string;
  };
  itens: IProduto[];
}
