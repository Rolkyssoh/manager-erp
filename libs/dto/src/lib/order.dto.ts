import { OrderEntity, UserEntity } from '@merp/entities';
import { IsString } from 'class-validator';
import { NewProductsToOrdersDto } from './produts_to_orders.dto';

export class NewOrderDto extends NewProductsToOrdersDto {
  delivery_date: Date;
  @IsString()
  delivery_address: string;
  // @IsString()
  products_to_orders: string;
}

export class OrderDtoIn extends OrderEntity {}
