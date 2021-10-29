import { NewOrderDto } from '@merp/dto';
import { OrderEntity, UserEntity } from '@merp/entities';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';
import { OrderService } from './order.service';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  createOrder(@Body() data: NewOrderDto, @User() connectedUser: UserEntity) {
    return this.orderService.createOrder(data, connectedUser);
  }
}
