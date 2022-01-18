import { RoleEntity } from './lib/Role.entity';
import { UserEntity } from './lib/user/User.entity';
import { CompanyEntity } from './lib/company/Company.entity';
import { ArticleEntity } from './lib/Article.entity';
import { OrderEntity } from './lib/order.entity';
import { ProductEntity } from './lib/product/product.entity';
import { ProductsToOrdersEntity } from './lib/ProductOrder.entity';

export * from './constants';

export * from './lib/user/User';
export * from './lib/company/Company';
export * from './lib/product/Product';

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
