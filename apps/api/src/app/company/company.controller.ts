import { CompanyEntity, UserEntity } from '@merp/entities';
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
import { CompanyService } from './company.service';
import { NewCompanyDto } from '@merp/dto';
import { COMMERCIAL_DIRECTOR, SUPER_ADMIN } from '@merp/constants';

@Controller('/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('add')
  @UseGuards(AuthGuard(), new RoleValidationGuard())
  newCompany(@Body() data: NewCompanyDto, @User() commDirector: UserEntity) {
    // console.log(commDirector);
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
