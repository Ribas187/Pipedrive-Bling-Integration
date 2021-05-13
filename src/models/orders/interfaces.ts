import { Document } from 'mongoose';
import { IDeal } from '../deals/interfaces';

export interface IOrderSchema extends Document {
  deals: IDeal[];
  total: number;
  date: string;

  createdAt: Date;
}
