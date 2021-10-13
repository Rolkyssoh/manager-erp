import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@merp/entities';
import { JwtService } from '@nestjs/jwt';

export class LoginInfo {
  email: string
  password: string
};

export interface IPayload {
  email: string,
  id: string,
  role: number,
}


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepo: Repository<UserEntity>,
    private _jwt: JwtService,

  ) { }

  getData() {
    return this._userRepo.find();
  }

  async login(data: LoginInfo) {
    const user = await this._userRepo.findOne({ where: { email: data.email.toLowerCase() } })
    if (!user) throw new NotFoundException({ message: `user with email: ${data.email} and password: ${data.password} not found.` })

    const validPassword = user.comparePassword(data.password)

    if (!validPassword) throw new NotFoundException({ message: `user with email: ${data.email} and password: ${data.password} not found.` })

    const payload: IPayload = {
      email: user.email,
      role: user.role.id,
      id: user.id
    }

    const token = await this._jwt.sign(payload)

    const returnData = {
      ...user.liteUser(),
      token
    }

    return returnData;
  }
}
