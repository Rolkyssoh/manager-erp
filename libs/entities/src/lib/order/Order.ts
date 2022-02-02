import { IUser } from '../user/User';
import { IProductOrder } from './ProductOrder';

export interface IOrder {
  id: string;
  delivery_date: Date;
  delivery_address: string;
  order_status: string;
  user?: IUser;
}
