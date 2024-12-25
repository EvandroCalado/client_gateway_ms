import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [NatsModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
