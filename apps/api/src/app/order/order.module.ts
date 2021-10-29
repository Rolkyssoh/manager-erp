import {
  OrderEntity,
  ProductEntity,
  ProductsToOrdersEntity,
} from '@merp/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductService } from '../product/product.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      ProductsToOrdersEntity,
      ProductEntity,
    ]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductService],
})
export class OrderModule {}
