import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, UserEntity } from '@merp/entities';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, UserEntity]), AuthModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
