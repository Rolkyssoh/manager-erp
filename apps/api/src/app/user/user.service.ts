import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity, RoleEntity, UserEntity } from '@merp/entities';
import {
  COMMERCIAL_DIRECTOR,
  CUSTOMER,
  DELIVERER,
  SECTOR_DELEGATE,
} from '@merp/constants';

export type Usertype = Partial<UserEntity>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepo: Repository<UserEntity>
  ) {}

  async getUsers() {
    const users = await this._userRepo.find();
    return users;
    // const [companies, count] = await this._companyRepo.findAndCount();
  }

  saveAdmin(data: Partial<UserEntity>) {
    return this._userRepo.save(data);
  }

  async saveSectorDelegate(
    data: Partial<UserEntity>,
    commDirector: UserEntity
  ) {
    return this.saveUser(
      data,
      RoleEntity.newRole(SECTOR_DELEGATE),
      commDirector
    );
  }

  async saveUser(
    data: Partial<UserEntity>,
    role: RoleEntity,
    commDirector: UserEntity
  ) {
    const user = UserEntity.newUserEntity({
      ...data,
      role,
      company: commDirector.company,
    });

    try {
      return this._userRepo.save(user);
    } catch (error) {
      // Duplicate company_name or company_phone_number
      if (error.code === '23505') {
        throw new ConflictException('Email already exist!');
      } else {
        console.log('error_creation_user :', error, role);
        throw new InternalServerErrorException();
      }
    }
  }

  async saveDeliverer(data: Partial<UserEntity>, sectorDelegate: UserEntity) {
    return this.saveUser(data, RoleEntity.newRole(DELIVERER), sectorDelegate);
  }

  async getUserById(id: string): Promise<UserEntity> {
    try {
      const userFound = await this._userRepo.findOne(id);
      return userFound;
    } catch (error) {
      console.log('erreur de recherche : ', error.code);
      if (error.code === '22P02') {
        throw new InternalServerErrorException(
          `User with ID "${id}" not found!`
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
    // if (!userFound) {
    //   throw new NotFoundException(`User with ID ${id} not found!`);
    // }
  }

  async updateInfosUser(userId: string, data: Partial<UserEntity>) {
    const user = await this.getUserById(userId);
    user.first_name = data.first_name;
    user.last_name = data.last_name;
    // user.password = data.password;
    // console.log('the user to update: ', user);
    return this._userRepo.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    this._userRepo.softDelete(id);
    return user;
  }

  async disableUser(id: string) {
    try {
      const { affected } = await this._userRepo.update(id, { disabled: true });
      if (affected) return true;
      throw new NotFoundException(id);
    } catch (error) {
      console.log('error_disabled_user: ', error);
      throw new InternalServerErrorException(error);
    }
  }

  async enableUser(id: string) {
    const user = await this.getUserById(id);
    if (Boolean(user.disabled)) {
      user.disabled = !user.disabled;
    }
    return this._userRepo.save(user);
  }
}
