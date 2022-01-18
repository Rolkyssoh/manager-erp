import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { OrderEntity, UserEntity } from '..';
import { AbstractEntity } from './abstract-entity';
import { ProductEntity } from '../index';

@Entity('products_to_orders')
export class ProductsToOrdersEntity extends AbstractEntity {
  static newProductsToOrders(PartialOrder: Partial<ProductsToOrdersEntity>) {
    const products_orders = new ProductsToOrdersEntity();
    if (PartialOrder.product_quantity)
      products_orders.product_quantity = PartialOrder.product_quantity;
    if (PartialOrder.productId)
      products_orders.productId = PartialOrder.productId;
    if (PartialOrder.orderId) products_orders.orderId = PartialOrder.orderId;
    if (PartialOrder.product) products_orders.product = PartialOrder.product;
    if (PartialOrder.order) products_orders.order = PartialOrder.order;
    return products_orders;
  }

  @Column({ nullable: false })
  product_quantity: number;

  @Column({ nullable: false })
  productId: string;

  @Column({ nullable: false })
  orderId: string;

  @ManyToOne('ProductEntity', 'products_to_orders', { eager: true })
  product: ProductEntity;

  @ManyToOne('OrderEntity', 'products_to_orders', { eager: true })
  order: OrderEntity;
}
