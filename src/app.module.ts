import { Module } from '@nestjs/common';
import { NatsModule } from './nats/nats.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
