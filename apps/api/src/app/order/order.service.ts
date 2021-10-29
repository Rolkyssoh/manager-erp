import { NewOrderDto } from '@merp/dto';
import {
  OrderEntity,
  ProductEntity,
  ProductsToOrdersEntity,
  UserEntity,
} from '@merp/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private _orderRepo: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private _productRepo: Repository<ProductEntity>,
    @InjectRepository(ProductsToOrdersEntity)
    private _product_to_orderRepo: Repository<ProductsToOrdersEntity>,
    private productService: ProductService
  ) {}

  async createOrder(
    data: NewOrderDto,
    user: UserEntity
    // product: Partial<ProductEntity[]>
  ) {
    const order = OrderEntity.newOrderEntity({
      delivery_date: data.delivery_date,
      delivery_address: data.delivery_address,
      user,
    });
    console.log('The order:', order);
    console.log('The products send by user:', data.products);
    try {
      await this._orderRepo.save(order);
      const products = await this._productRepo.findByIds(data.products);
      console.log('The product found:', products);
      const productIds = products.map(({ id }) => id);
      if (products.length != data.products.length) {
        const nonExistentProducts = data.products.filter(
          (_) => !productIds.includes(_)
        );
        throw new NotFoundException({
          message: `Products not found`,
          nonExistentProducts,
        });
      }
      const productToOrdersPromise = products.map((product) => {
        let partialPTO: Partial<ProductsToOrdersEntity>;

        partialPTO = {
          product_quantity: data.product_quantity,
          order: order,
          product,
        };

        const newProductToOrder =
          ProductsToOrdersEntity.newProductsToOrders(partialPTO);
        return this._product_to_orderRepo.save(newProductToOrder);
      });
      const productToOrders = await Promise.all(productToOrdersPromise);
      productToOrders.forEach(async (productToOrder) => {
        const product = products.find(
          (_) => _.id === productToOrder.product.id
        );
        // await this.productService.editProduct(product.id, {
        //   products_to_orders: [...product.products_to_orders, productToOrder],
        // });
      });
    } catch (error) {
      console.log('error_creation_new_order:', error);
    }
  }

  async updateOrder() {}

  async deleteOrder() {}
}
