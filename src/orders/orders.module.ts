import { Module } from '@nestjs/common';
import { NatsModule } from 'src/nats/nats.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [NatsModule],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
