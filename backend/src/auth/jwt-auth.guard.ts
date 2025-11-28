import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Buscar token en cookie si no viene en Authorization
    let token = request.headers.authorization;

    if (!token && request.cookies?.token) {
      request.headers.authorization = `Bearer ${request.cookies.token}`;
    }

    return request;
  }

  canActivate(context: ExecutionContext) {
    // Permitir rutas públicas
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
