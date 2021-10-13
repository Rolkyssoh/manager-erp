import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '@merp/entities'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


const HOURS_24 = 99360

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: HOURS_24,
      }
    }),
  ],
  exports: [
    PassportModule,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,]

})
export class AuthModule { }
