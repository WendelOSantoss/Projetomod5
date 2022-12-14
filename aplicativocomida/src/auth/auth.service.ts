import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IUserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.services';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateAuthEmailDto } from './dto/create-auth.email.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUserEmail({ email, password }: CreateAuthEmailDto) {
        const user = await this.userService.findUserByEmail(email);
        const passwordIsValid = await compare(password, user.password);
        if (!passwordIsValid) {
            throw new Exception(
                Exceptions.UnauthorizedException,
                'Senha Inválida'
            );
        }

        delete user.password;
        return {
            token: this.jwtService.sign({
                email: user.email,
                id: user.id,
                name: user.name,
                role: user.role,
            }),
            user,
        };
    }

    async getUserEmail(email: string): Promise<IUserEntity> {
        return await this.userService.findUserByEmail(email);
    }
}
