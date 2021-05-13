import { Schema } from 'mongoose';

const OrderSchema: Schema = new Schema({
  deals: [
    {
      data: { type: Date },
      cliente: {
        nome: { type: String, trim: true },
        email: { type: String, trim: true },
        fone: { type: String, trim: true },
      },
      itens: [
        {
          codigo: { type: String, trim: true },
          qtde: { type: Number },
          vlr_unit: { type: Number },
        },
      ],
    },
  ],

  total: { type: Number },

  date: { type: Date, required: true },

  createdAt: { type: Date },
});

export default OrderSchema;
