import { IProductOrder, IProduct, IUser } from '@merp/entities';

export class NewProductDto {
  product_name: string;
  product_description: string;
  product_unit_price: number;
  stock_quantity: number;
  stock_alert_level: number;
}

export interface NewProductDtoIn {
  user: IUser;
  product: IProduct;
}

// export class UserDtoIn extends UserEntiry {}
// export class UserDtoIn extends UserEntity {}
export interface ProductDtoIn {
  products: IProduct[];
  count: number;
}

export interface OrderProducDtoIn {
  order_products: IProductOrder[];
}

// export interface UserListDtoIn extends ListDtoIn<UserEntity> {

// }
