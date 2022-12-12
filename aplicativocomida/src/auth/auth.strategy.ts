import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.Secret_KEY,
        });
    }

    async validateUser(payload: any) {
        return await this.authService.getUserEmail(payload.email);
    }

    async validateCpf(payload: any) {
        return await this.authService;
        getUserCpf(payload.cpf);
    }
}
