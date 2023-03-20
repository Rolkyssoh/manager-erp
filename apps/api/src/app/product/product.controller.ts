import { COMMERCIAL_DIRECTOR } from '@merp/constants';
import { ProductDtoIn } from '@merp/dto';
import { ProductEntity, UserEntity } from '@merp/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleValidationGuard } from '../auth/role-validation.guard';
import { User } from '../auth/user.decorator';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/product')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  // @UseGuards(AuthGuard(), new RoleValidationGuard())
  getProducts(): Promise<ProductDtoIn> {
    return this.productService.getProducts();
  }

  @Get(':companyId/products')
  getProductsByCompany(@Param('companyId') companyId: string) {
    return this.productService.getProductsByCompany(companyId);
  }

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
