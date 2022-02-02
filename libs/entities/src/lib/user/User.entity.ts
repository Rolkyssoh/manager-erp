import {
  Entity,
  Column,
  BeforeInsert,
  ManyToOne,
  BeforeUpdate,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsOptional, MinLength, MaxLength, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from '../abstract-entity';
import { RoleEntity } from '../..';
import * as bcrypt from 'bcryptjs';
import { CompanyEntity } from '../company/Company.entity';
import { OrderEntity } from '../order/order.entity';
import { ProductEntity } from '../product/product.entity';
import { IUser } from './User';
export enum SEX {
  male = 'M',
  female = 'F',
}

const AUDIENCE = 1;
const MAX_PASSWORD_LENGTH = 8;

@Entity('users')
export class UserEntity extends AbstractEntity implements IUser {
  static newUserEntity(partialUser: Partial<UserEntity>) {
    const user = new UserEntity();
    if (partialUser.first_name) user.first_name = partialUser.first_name;
    if (partialUser.last_name) user.last_name = partialUser.last_name;
    if (partialUser.password) user.password = partialUser.password;
    if (partialUser.email) user.email = partialUser.email;
    if (partialUser.role) user.role = partialUser.role;
    if (partialUser.company) user.company = partialUser.company;
    return user;
  }

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @ManyToOne('RoleEntity', 'users', { eager: true })
  role: RoleEntity;

  @ManyToOne('CompanyEntity', 'users', { eager: true })
  company: CompanyEntity;

  @OneToMany('OrderEntity', 'users')
  oders: OrderEntity[];

  @OneToMany('ProductEntity', 'users')
  products: ProductEntity[];

  @Column({ nullable: true })
  @Exclude()
  @MinLength(4)
  @MaxLength(MAX_PASSWORD_LENGTH)
  @IsString()
  password?: string;

  @BeforeUpdate()
  async updateUser() {
    if ((this.password ?? '').length <= MAX_PASSWORD_LENGTH) {
      this.password = bcrypt.hashSync(this.password ?? '', 10);
    }
    this.email = this.email.toLowerCase();
    this.first_name = this.first_name.toLowerCase();
    this.last_name = this.last_name.toLowerCase();
  }

  @BeforeInsert()
  async beforeInsert() {
    this.email = this.email.toLowerCase();
    this.first_name = this.first_name.toLowerCase();
    this.last_name = this.last_name.toLowerCase();
    this.password = bcrypt.hashSync(this.password ?? '', 10);
  }

  comparePassword(attemptedPassword: string): boolean {
    return bcrypt.compareSync(attemptedPassword, this.password ?? '');
  }

  liteUser() {
    delete this.password;
    delete this.created_at;
    delete this.deleted_at;
    return this;
  }
}
