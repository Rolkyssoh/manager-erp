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
import { AbstractEntity } from './abstract-entity';
// import { RoleEntity } from '../user/Role.entity';
// var bcrypt = require('bcryptjs');

export enum SEX {
  male = 'M',
  female = 'F',
}

const AUDIENCE = 1;
const MAX_PASSWORD_LENGTH = 8;

@Entity('users')
export class UserEntity extends AbstractEntity {
  static newUserEntity(partialUser: Partial<UserEntity>) {
    const user = new UserEntity();
    user.first_name = partialUser.first_name;
    user.last_name = partialUser.last_name;
    // user.email = partialUser.email;
    // user.adress = partialUser.adress;
    // user.phonenumber = partialUser.phonenumber;
    // user.is_retailer = partialUser.is_retailer;
    // user.password = partialUser.password;
    // user.deleted = false;
    // if(partialUser.company_name)
    // user.company_name = partialUser.company_name;
    return user;
  }

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  // @Column({
  //   nullable: true,
  //   type: 'enum',
  //   enum: SEX,
  // })
  // sex: SEX;


  // @Column({ nullable: true })
  // email: string;

  // @Column()
  // adress: string;

  // @Column()
  // phonenumber: string;

  // @Column({ default: 'fr' })
  // language: 'en' | 'fr';

  // @ManyToOne('RoleEntity', 'users', { eager: true })
  // role: RoleEntity;

  // @Column({ nullable: true })
  // is_retailer: boolean;

  // @Column({ nullable: true })
  // company_name?: string;

  // @Column({ nullable: true })
  // @Exclude()
  // @MinLength(4)
  // @MaxLength(MAX_PASSWORD_LENGTH)
  // @IsString()
  // password: string;

  // @Column({ nullable: true })
  // @Exclude()
  // @IsString()
  // @IsOptional()
  // otp?: string;


  // @Column({ default: false })
  // @IsOptional()
  // deleted?: boolean;
  /*
  @BeforeUpdate()
  async updatePassword() {
    if (this.role.id !== AUDIENCE)
      if (this.password.length <= MAX_PASSWORD_LENGTH) {
        // this.password = bcrypt.hashSync(this.password, 10)
        this.password = this.password
      }
  }

  @BeforeInsert()
  async hashPassword() {
    if (this.role.id !== AUDIENCE)
      // this.password = bcrypt.hashSync(this.password, 10)
      this.password = this.password
  }

  comparePassword(attemptedPassword: string): boolean {
    // return bcrypt.compareSync(attemptedPassword, this.password)
    return true;
  } */
}
