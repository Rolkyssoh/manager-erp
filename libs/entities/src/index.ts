import { RoleEntity } from './lib/Role.entity';
import { UserEntity } from './lib/User.entity';
import { CompanyEntity } from './lib/Company.entity';
import { ArticleEntity } from './lib/Article.entity';
import { OrderEntity } from './lib/order.entity';
import { ProductEntity } from './lib/product.entity';
import { ProductsToOrdersEntity } from './lib/ProductOrder.entity';

export * from './constants';

const ENTITIES = [
  RoleEntity,
  ArticleEntity,
  UserEntity,
  CompanyEntity,
  OrderEntity,
  ProductEntity,
  ProductsToOrdersEntity,
];

export {
  RoleEntity,
  UserEntity,
  ArticleEntity,
  CompanyEntity,
  OrderEntity,
  ProductEntity,
  ProductsToOrdersEntity,
  ENTITIES,
};
