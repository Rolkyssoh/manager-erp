import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { STATE_ORDER_STATUS, UserEntity } from '..';
import { AbstractEntity } from './abstract-entity';
import { ProductsToOrdersEntity } from './ProductOrder.entity';

@Entity('order')
export class OrderEntity extends AbstractEntity {
  static newOrderEntity(PartialOrder: Partial<OrderEntity>) {
    const order = new OrderEntity();
    order.order_status = PartialOrder.order_status;
    order.delivery_date = PartialOrder.delivery_date;
    order.delivery_address = PartialOrder.delivery_address;
    order.products_to_orders = PartialOrder.products_to_orders;
    order.user = PartialOrder.user;
    return order;
  }

  @Column({ type: 'timestamptz', nullable: false })
  delivery_date: Date;

  @Column({ nullable: false })
  delivery_address: string;

  @Column({ type: 'varchar', enum: STATE_ORDER_STATUS })
  order_status: STATE_ORDER_STATUS;

  @ManyToOne('UserEntity', 'order', { eager: true })
  user: UserEntity;

  @OneToMany('ProductsToOrdersEntity', 'order')
  products_to_orders: ProductsToOrdersEntity[];
}
