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
} from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './dto/partialuserinput.dto';
import { UserDto } from './dto/userinput.dto';
import { UserService } from './user.services';
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    async getAllUser(): Promise<IUserEntity[]> {
        return await this.service.getAllUsers();
    }

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
        @Body() { cpf, email, password, name, role }: UserDto,

        @Res() response: Response
    ) {
        try {
            const result = await this.service.createUser({
                cpf,
                email,
                password,
                name,
                role,
            });
            response.status(201).send(result);
        } catch (err) {
            HandleException(err);
        }
    }

    @Patch()
    async updateUser(@Body() userData: PartialUserDto): Promise<IUserEntity> {
        try {
            return await this.service.updateUser(userData);
        } catch (err) {
            HandleException(err);
        }
    }

    @Delete(':id')
    async deleteUserById(@Param('id') userId: string): Promise<string> {
        const userIsDeleted = await this.service.deleteUserById(userId);
        console.log(userIsDeleted);
        if (userIsDeleted) {
            return 'User deleted successfully.';
        } else {
            return 'User not found.';
        }
    }
}
