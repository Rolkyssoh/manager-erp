import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '..';
import { AbstractEntity } from './abstract-entity';
import { ProductsToOrdersEntity } from './ProductOrder.entity';

@Entity('product')
export class ProductEntity extends AbstractEntity {
  static newProductEntity(PartialProduct: Partial<ProductEntity>) {
    const product = new ProductEntity();
    product.product_name = PartialProduct.product_name;
    product.product_description = PartialProduct.product_description;
    product.product_unit_price = PartialProduct.product_unit_price;
    product.stock_quantity = PartialProduct.stock_quantity;
    product.stock_alert_level = PartialProduct.stock_alert_level;
    product.user = PartialProduct.user;
    return product;
  }

  @Column({ nullable: false, unique: true })
  product_name: string;

  @Column({ nullable: false })
  product_description: string;

  @Column({ type: 'float', nullable: false })
  product_unit_price: number;

  @Column({ nullable: false })
  stock_quantity: number;

  @Column({ nullable: false })
  stock_alert_level: number;

  @ManyToOne('UserEntity', 'product', { eager: true })
  user: UserEntity;

  @OneToMany('ProductsToOrdersEntity', 'product')
  products_to_orders: ProductsToOrdersEntity[];
}
