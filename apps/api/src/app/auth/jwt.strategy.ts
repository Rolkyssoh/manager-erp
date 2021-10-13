import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from "typeorm";
import { isBoolean } from "class-validator";
import { UserEntity } from "@merp/entities";
import { IPayload } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    })
  }

  async validate(payload: any) {
    const { id, email, role }: IPayload = payload

    const user = await this.userRepo.findOne(id)
    if (!user) throw new UnauthorizedException()

    return user
  }

}
