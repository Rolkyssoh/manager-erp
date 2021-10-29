import { ProductEntity } from '@merp/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
