import { NewOrderDto } from '@merp/dto';
import {
  OrderEntity,
  ProductEntity,
  ProductsToOrdersEntity,
  STATE_ORDER_STATUS,
  UserEntity,
} from '@merp/entities';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private _orderRepo: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private _productRepo: Repository<ProductEntity>,
    @InjectRepository(ProductsToOrdersEntity)
    private _product_to_orderRepo: Repository<ProductsToOrdersEntity>,
    private productService: ProductService
  ) {}

  async createOrder(
    data: NewOrderDto,
    user: UserEntity
    // product: Partial<ProductEntity[]>
  ) {
    console.log('status val:', STATE_ORDER_STATUS.create);
    const order = OrderEntity.newOrderEntity({
      delivery_date: data.delivery_date,
      delivery_address: data.delivery_address,
      order_status: STATE_ORDER_STATUS.create,
      user,
    });
    console.log('The order:', order);
    console.log('The products send by user:', data.products);
    try {
      await this._orderRepo.save(order);
      const products = await this._productRepo.findByIds(data.products);
      console.log('The product found:', products);
      const productIds = products.map(({ id }) => id);
      if (products.length != data.products.length) {
        const nonExistentProducts = data.products.filter(
          (_) => !productIds.includes(_)
        );
        throw new NotFoundException({
          message: `Products not found`,
          nonExistentProducts,
        });
      }
      const productToOrdersPromise = products.map((product) => {
        let partialPTO: Partial<ProductsToOrdersEntity>;
        // Check the stock before doing the order
        if (product.stock_quantity < data.product_quantity) {
          console.log(
            'Quantité en stock inférieur à la demande. stock dipos:',
            product.stock_quantity
          );
          throw new InternalServerErrorException(
            'Not enough product in the stock!!'
          );
        }

        partialPTO = {
          product_quantity: data.product_quantity,
          order: order,
          product,
        };

        const newProductToOrder =
          ProductsToOrdersEntity.newProductsToOrders(partialPTO);
        return this._product_to_orderRepo.save(newProductToOrder);
      });
      const productToOrders = await Promise.all(productToOrdersPromise);
      productToOrders.forEach(async (productToOrder) => {
        const product = products.find(
          (_) => _.id === productToOrder.product.id
        );
        const newStockQte = product.stock_quantity - data.product_quantity;
        console.log('stock depart:', product.stock_quantity);
        console.log('the new product quantity : ', newStockQte);
        await this.productService.editProduct(product.id, {
          stock_quantity: newStockQte,
        });
        // await this.productService.editProduct(product.id, {
        //   products_to_orders: [...product.products_to_orders, productToOrder],
        // });
      });
    } catch (error) {
      console.log('error_creation_new_order:', error);
    }
  }

  async orderStateChange(id: string, change: STATE_ORDER_STATUS) {
    try {
      const { affected } = await this._orderRepo.update(id, {
        order_status: change,
      });
      if (affected) return true;
      throw new NotFoundException(id);
    } catch (error) {
      console.log('error_while_changing_order_state: ', error);
      throw new InternalServerErrorException(error);
    }
  }

  async changeOrderToPuchaseOrder(orderId: string) {
    return this.orderStateChange(orderId, STATE_ORDER_STATUS.checking);
  }

  async checkedPuchaseOrder(id: string) {
    return this.orderStateChange(id, STATE_ORDER_STATUS.checked);
  }

  async canceledPuchaseOrder(id: string) {
    return this.orderStateChange(id, STATE_ORDER_STATUS.canceled);
  }

  async changePurchaseOrderToBill(id: string) {
    return this.orderStateChange(id, STATE_ORDER_STATUS.is_billed);
  }

  async settledBill(id: string) {
    return this.orderStateChange(id, STATE_ORDER_STATUS.settled_bill);
  }

  async consignedBill(id: string) {
    return this.orderStateChange(id, STATE_ORDER_STATUS.consigned_bill);
  }

  async getOrderById(id: string): Promise<OrderEntity> {
    try {
      const orderFound = await this._orderRepo.findOne(id);
      return orderFound;
    } catch (error) {
      if (error.code === '22P02') {
        throw new InternalServerErrorException(
          `Order with ID "${id}" not found!`
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateOrder(orderId: string, data: NewOrderDto) {
    const order = await this.getOrderById(orderId);
    order.delivery_date = data.delivery_date;
    order.delivery_address = data.delivery_address;
  }

  async deleteOrder(id: string) {
    const order = await this.getOrderById(id);
    this._orderRepo.softDelete(id);
    return order;
  }
}
