import { IProduct } from '@merp/entities';

export class NewProductDto {
  product_name: string;
  product_description: string;
  product_unit_price: string;
  stock_quantity: string;
  stock_alert_level: string;
}

export interface NewProductDtoIn {
  product: IProduct;
}

// export class UserDtoIn extends UserEntiry {}
// export class UserDtoIn extends UserEntity {}
export interface ProductDtoIn {
  products: IProduct[];
  count: number;
}

// export interface UserListDtoIn extends ListDtoIn<UserEntity> {

// }
