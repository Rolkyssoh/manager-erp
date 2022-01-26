import { UserEntity } from '@merp/entities';
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
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';
import { RoleValidationGuard } from '../auth/role-validation.guard';
import {
  COMMERCIAL_DIRECTOR,
  SECTOR_DELEGATE,
  SUPER_ADMIN,
} from '@merp/constants';
import { ApiTags } from '@nestjs/swagger';

@Controller('/user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard([SUPER_ADMIN, COMMERCIAL_DIRECTOR])
  )
  getUsers(@User() user: UserEntity) {
    return this.userService.getUsers();
  }

  @Post()
  saveUser(@Body() data: Partial<UserEntity>) {
    return this.userService.saveAdmin(data);
  }

  @Post('delegate')
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard([SUPER_ADMIN, COMMERCIAL_DIRECTOR])
  )
  createSectorDelegate(
    @Body() data: Partial<UserEntity>,
    @User() commDirector: UserEntity
  ) {
    return this.userService.saveSectorDelegate(data, commDirector);
  }

  @Post('deliverer')
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard([SECTOR_DELEGATE, COMMERCIAL_DIRECTOR, SUPER_ADMIN])
  )
  createDeliverer(
    @Body() data: Partial<UserEntity>,
    @User() sectorDelegate: UserEntity
  ) {
    return this.userService.saveDeliverer(data, sectorDelegate);
  }

  @Post('customer')
  @Patch(':id/edit')
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard([SUPER_ADMIN, COMMERCIAL_DIRECTOR, SECTOR_DELEGATE])
  )
  updateInfosUser(
    @Param('id') userId: string,
    @Body() data: Partial<UserEntity>
  ) {
    console.log('the id : ', userId);
    return this.userService.updateInfosUser(userId, data);
  }

  @Delete(':id')
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard([SUPER_ADMIN, COMMERCIAL_DIRECTOR, SECTOR_DELEGATE])
  )
  deleteUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.deleteUser(id);
  }

  @Patch(':id/disable')
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard([SUPER_ADMIN, COMMERCIAL_DIRECTOR, SECTOR_DELEGATE])
  )
  disableUser(@Param('id') id: string) {
    return this.userService.disableUser(id);
  }

  @Patch(':id/enable')
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard([SUPER_ADMIN, COMMERCIAL_DIRECTOR, SECTOR_DELEGATE])
  )
  enableUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.enableUser(id);
  }
}
