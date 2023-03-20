import { IProductOrder } from '../order/ProductOrder';
import { IUser } from '../user/User';

export interface IProduct {
  id: string;
  product_name: string;
  product_description: string;
  product_unit_price: number;
  stock_quantity: number;
  stock_alert_level: number;
  user?: IUser;
  disabled: boolean;
  products_to_orders?: IProductOrder[];
  // product_image: File;
}
