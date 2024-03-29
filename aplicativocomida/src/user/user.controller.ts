import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { UserDto } from './dto/userInput.dto';
import { UserService } from './user.services';
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsRestaurantAuthorization } from 'src/auth/decorators/is-restaurant.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Get()
    async getAllUser(): Promise<IUserEntity[]> {
        return await this.service.getAllUsers();
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Get(':id')
    async getUserById(@Param('id') userId: string): Promise<IUserEntity> {
        try {
            return await this.service.getUserById(userId);
        } catch (err) {
            HandleException(err);
        }
    }

    @Post()
    async createUser(
        @Body() { cpf, email, password, name }: UserDto,

        @Res() response: Response
    ) {
        try {
            const result = await this.service.createUser({
                cpf,
                email,
                password,
                name,
            });
            response.status(201).send(result);
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Patch()
    async updateUser(@Body() userData: PartialUserDto): Promise<IUserEntity> {
        try {
            return await this.service.updateUser(userData);
        } catch (err) {
            HandleException(err);
        }
    }
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Delete(':id')
    async deleteUserById(@Param('id') userId: string): Promise<string> {
        try {
            return await this.service.deleteUserById(userId);
        } catch (err) {
            HandleException(err);
        }
    }
}
