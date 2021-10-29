import { ProductsToOrdersEntity } from '@merp/entities';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class NewProductsToOrdersDto {
  // @IsNumber()
  product_quantity: number;
  @IsArray()
  products: string[];
  // @IsString()
  order: string;
}

export class ProductsToOrdersDtoIn extends ProductsToOrdersEntity {}
