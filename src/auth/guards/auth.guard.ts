import { CanActivate, UnauthorizedException } from '@nestjs/common';

import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    request['user'] = {
      id: 1,
      name: 'Evandro Calado',
      email: 'evandro@email.com',
    };

    request['token'] = token;

    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
