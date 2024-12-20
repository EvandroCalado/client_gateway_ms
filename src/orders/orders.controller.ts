import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/configs/services.constant';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationOrderDto } from './dto/pagination-order.dto';
import { OrderStatus } from './enum/status.enum';
import { ParseOrderStatusPipe } from './pipes/parse-order-status.pipe';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('create_order', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAllOrders(@Query() paginationOrderDto: PaginationOrderDto) {
    return this.client.send('find_all_orders', paginationOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('find_one_order', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UsePipes(ParseOrderStatusPipe)
  @Patch(':id/:status')
  changeStatusOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('status') status: OrderStatus,
  ) {
    return this.client.send('change_status_order', { id, status }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
