import { IProduct } from '../product/Product';
import { IOrder } from './Order';

export interface IProductOrder {
  id: string;
  product_quantity: number;
  product: IProduct;
  order: IOrder;
  disabled: boolean;
}
