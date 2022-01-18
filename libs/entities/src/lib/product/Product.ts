import { IUser } from '../user/User';

export class IProduct {
  id: string;
  product_name: string;
  product_description: string;
  product_unit_price: number;
  stock_quantity: number;
  stock_alert_level: number;
  user?: IUser;
  disabled: boolean;
}
