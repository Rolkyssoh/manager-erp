import { ProductDtoIn } from '@merp/dto';
import { ProductEntity, UserEntity } from '@merp/entities';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private _productRep: Repository<ProductEntity>
  ) {}

  async getProducts(): Promise<ProductDtoIn> {
    const [products, count] = await this._productRep.findAndCount();
    return {
      products,
      count,
    };
  }

  async addNewProduct(data: Partial<ProductEntity>, currentUser: UserEntity) {
    let user = data.user;
    if (!Boolean(user)) {
      user = currentUser;
    }
    const product = ProductEntity.newProductEntity({
      ...data,
      user,
    });

    try {
      return this._productRep.save(product);
    } catch (error) {
      // Duplicate company_name or company_phone_number
      if (error.code === '23505') {
        throw new ConflictException('Product name already exist!');
      } else {
        console.log('Error_while_adding_new_product', error);
        throw new InternalServerErrorException();
      }
    }
  }

  async getProductById(id: string): Promise<ProductEntity> {
    try {
      const productFound = await this._productRep.findOne(id);
      return productFound;
    } catch (error) {
      if (error.code === '22P02') {
        throw new InternalServerErrorException(
          `Product with ID "${id}" not found!`
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editProduct(id: string, data: Partial<ProductEntity>) {
    const product = await this.getProductById(id);
    product.product_name = data.product_name;
    product.product_description = data.product_description;
    product.product_unit_price = data.product_unit_price;
    product.stock_quantity = data.stock_quantity;
    product.stock_alert_level = data.stock_alert_level;

    try {
      return this._productRep.save(product);
    } catch (error) {
      // Duplicate company_name or company_phone_number
      if (error.code === '23505') {
        throw new ConflictException('Product name already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteProduct(id: string): Promise<ProductEntity> {
    const product = await this.getProductById(id);
    this._productRep.softDelete(id);
    return product;
  }

  async disableProduc(id: string): Promise<ProductEntity> {
    const product = await this.getProductById(id);
    if (!product) {
      throw new InternalServerErrorException('Product Was deleted!!');
    } else {
      if (!Boolean(product.disabled)) {
        product.disabled = !product.disabled;
      }
      return this._productRep.save(product);
    }
  }

  async enableProduct(id: string) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new InternalServerErrorException('Product Was deleted!!');
    } else {
      if (Boolean(product.disabled)) {
        product.disabled = false;
      }
      return this._productRep.save(product);
    }
  }
}
