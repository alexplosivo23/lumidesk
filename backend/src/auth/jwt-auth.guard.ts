import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // No sobreescribimos getRequest porque rompe el body
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
