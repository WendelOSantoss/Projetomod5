import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class IsRestaurantAuthorization implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const httpRequest = context.switchToHttp().getRequest();
        const userData = httpRequest.user;

        if (userData?.role === 'restaurant') {
            return true;
        }

        throw new UnauthorizedException(
            'Este usuário não tem permissão para acessar'
        );
    }
}
