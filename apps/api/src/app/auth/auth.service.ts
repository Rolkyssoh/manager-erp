import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity, UserEntity } from '@merp/entities';
import { JwtService } from '@nestjs/jwt';
import { CUSTOMER } from '@merp/constants';
import { LoginDtoOut } from '@merp/dto';

export class LoginInfo {
  email: string;
  password: string;
}

export interface IPayload {
  email: string;
  id: string;
  role: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepo: Repository<UserEntity>,
    private _jwt: JwtService
  ) {}

  getData() {
    return this._userRepo.find();
  }

  async login(data: LoginInfo) : Promise<LoginDtoOut> {
    const user = await this._userRepo.findOne({
      where: { email: data.email.toLowerCase() },
    });
    if (!user)
      throw new NotFoundException({
        message: `user with email: ${data.email} and password: ${data.password} not found.`,
      });

    const validPassword = user.comparePassword(data.password);

    if (!validPassword)
      throw new NotFoundException({
        message: `user with email: ${data.email} and password: ${data.password} not found.`,
      });

    const payload: IPayload = {
      email: user.email,
      role: user.role.id,
      id: user.id,
    };

    const token = await this._jwt.sign(payload);

    const returnData = {
      user: user.liteUser(),
      token,
    } as unknown as LoginDtoOut;

    return returnData;
  }

  async signUp(data: Partial<UserEntity>) {
    let role = data.role;
    if (!Boolean(role)) {
      role = RoleEntity.newRole(CUSTOMER);
    }

    const user = UserEntity.newUserEntity({
      ...data,
      role,
    });

    try {
      const customerCreated = await this._userRepo.save(user);
      return customerCreated;
    } catch (error) {
      // Duplicate company_name or company_phone_number
      if (error.code === '23505') {
        throw new ConflictException('Email already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
