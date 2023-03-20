import { NewOrderDto } from '@merp/dto';
import { OrderEntity, UserEntity } from '@merp/entities';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/order')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  createOrder(@Body() data: NewOrderDto, @User() connectedUser: UserEntity) {
    return this.orderService.createOrder(data, connectedUser);
  }

  @Patch(':id/order_to_purchase_order')
  @UseGuards(AuthGuard())
  changeOrderToPuchaseOrder(@Param('id') id: string) {
    return this.orderService.changeOrderToPuchaseOrder(id);
  }

  @Patch(':id/checked_purchase_order')
  @UseGuards(AuthGuard())
  checkedPuchaseOrder(@Param('id') id: string) {
    return this.orderService.checkedPuchaseOrder(id);
  }

  @Patch(':id/canceled_purchase_order')
  @UseGuards(AuthGuard())
  canceledPuchaseOrder(@Param('id') id: string) {
    return this.orderService.canceledPuchaseOrder(id);
  }

  @Patch(':id/purchase_order_to_bill')
  @UseGuards(AuthGuard())
  changePurchaseOrderToBill(@Param('id') id: string) {
    return this.orderService.changePurchaseOrderToBill(id);
  }

  @Patch(':id/settled_bill')
  @UseGuards(AuthGuard())
  settledBill(@Param('id') id: string) {
    return this.orderService.settledBill(id);
  }

  @Patch(':id/consigned_bill')
  @UseGuards(AuthGuard())
  consignedBill(@Param('id') id: string) {
    return this.orderService.consignedBill(id);
  }

  @Patch(':id/edit')
  updateOrder(@Param('id') id: string) {}

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {}
}
