import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [NatsModule],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
