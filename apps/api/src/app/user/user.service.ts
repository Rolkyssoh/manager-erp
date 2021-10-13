import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@merp/entities';

export type Usertype = Partial<UserEntity>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepo: Repository<UserEntity>
  ) { }

  getUsers() {
    return this._userRepo.find();
  }

  saveUser(data: Partial<UserEntity>) {
    const user = UserEntity.newUserEntity(data);
    return this._userRepo.save(user);
  }
}
