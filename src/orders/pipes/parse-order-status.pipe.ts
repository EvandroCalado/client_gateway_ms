import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { OrderStatus } from '../enum/status.enum';

@Injectable()
export class ParseOrderStatusPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'status') return value;

    const status = value.toUpperCase();

    if (OrderStatus[status] === undefined || !(status in OrderStatus)) {
      throw new BadRequestException(
        'Status most be PENDING, DELIVERED or CANCELLED',
      );
    }
    return status;
  }
}
