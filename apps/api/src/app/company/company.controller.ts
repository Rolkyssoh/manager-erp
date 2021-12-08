import { CompanyEntity, UserEntity } from '@merp/entities';
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
import { CompanyService } from './company.service';
import { CompaniesDtoIn, NewCompanyDto } from '@merp/dto';
import { COMMERCIAL_DIRECTOR, SUPER_ADMIN } from '@merp/constants';
import { ApiTags } from '@nestjs/swagger';

@Controller('/company')
@ApiTags('Companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Get('')
  @UseGuards(AuthGuard(), new RoleValidationGuard())
  getCompanies(): Promise<CompaniesDtoIn> {
    return this.companyService.getCompanies()
  }

  @Post('add')
  @UseGuards(AuthGuard(), new RoleValidationGuard())
  newCompany(@Body() data: NewCompanyDto, @User() commDirector: UserEntity) {
    return this.companyService.newCompany(data, commDirector);
  }

  @Patch(':id/edit')
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard([SUPER_ADMIN, COMMERCIAL_DIRECTOR])
  )
  updateCompany(
    @Param('id') companyId: string,
    @Body() data: NewCompanyDto
  ): Promise<CompanyEntity> {
    return this.companyService.updateCompany(companyId, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), new RoleValidationGuard())
  deleteCompany(@Param('id') id: string): Promise<CompanyEntity> {
    return this.companyService.deleteCompany(id);
  }

  @Patch(':id/disable')
  @UseGuards(AuthGuard(), new RoleValidationGuard())
  disableCompany(@Param('id') id: string): Promise<CompanyEntity> {
    return this.companyService.disableCompany(id);
  }

  @Patch(':id/enable')
  @UseGuards(AuthGuard(), new RoleValidationGuard())
  enableCompany(@Param('id') id: string): Promise<CompanyEntity> {
    return this.companyService.enableCompany(id);
  }
}
