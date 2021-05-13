import { model, Model } from 'mongoose';
import { IOrderSchema } from './interfaces';
import OrderSchema from './schema';

OrderSchema.pre<IOrderSchema>('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  next();
});

const Order: Model<IOrderSchema> = model('Order', OrderSchema);

export default Order;
