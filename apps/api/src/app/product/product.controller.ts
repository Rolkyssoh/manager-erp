import { COMMERCIAL_DIRECTOR } from '@merp/constants';
import { ProductEntity, UserEntity } from '@merp/entities';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleValidationGuard } from '../auth/role-validation.guard';
import { User } from '../auth/user.decorator';
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard(), new RoleValidationGuard([COMMERCIAL_DIRECTOR]))
  @Post('add')
  addNewProduct(
    @Body() data: Partial<ProductEntity>,
    @User() currentUser: UserEntity
  ) {
    return this.productService.addNewProduct(data, currentUser);
  }

  @Patch(':id/edit')
  editProduct(
    @Param('id') productId: string,
    @Body() data: Partial<ProductEntity>
  ) {
    return this.productService.editProduct(productId, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.deleteProduct(id);
  }

  @Patch(':id/disable')
  disableProduct(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.disableProduc(id);
  }

  @Patch(':id/enable')
  enableCompany(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.enableProduct(id);
  }
}