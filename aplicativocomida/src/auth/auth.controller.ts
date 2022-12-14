import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserEntity } from 'src/user/entities/user.entity';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { AuthService } from './auth.service';
import { IsRestaurantAuthorization } from './decorators/is-restaurant.decorator';
import { userLogged } from './decorators/user-logged.decorator';
import { CreateAuthEmailDto } from './dto/create-auth.email.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login/email')
    async loginEmail(@Body() data: CreateAuthEmailDto) {
        try {
            return await this.authService.validateUserEmail(data);
        } catch (err) {
            HandleException(err);
        }
    }
    @Get()
    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    async getUser(@userLogged() user: IUserEntity) {
        return user;
    }
}
