import { IUserEntity } from './entities/user.entity';
import { UserDto } from './dto/userInput.dto';
import { randomUUID } from 'node:crypto';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { Exception } from 'src/utils/exceptions/exception';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(user: UserDto): Promise<IUserEntity> {
        const userEntity = { ...user, id: randomUUID(), role: 'user' };
        if (user.password.length <= 7) {
            throw new Exception(
                Exceptions.InvalidData,
                'Password must be at least 7 characters'
            );
        }
        const hashed = await hash(user.password, 10);
        userEntity.password = hashed;

        const createdUser = await this.userRepository.createUser(userEntity);
        delete createdUser.password;
        return createdUser;
    }

    async updateUser(userData: PartialUserDto): Promise<IUserEntity> {
        const updatedUser = await this.userRepository.updateUser(userData);
        delete updatedUser.password;
        return updatedUser;
    }

    async getAllUsers(): Promise<IUserEntity[]> {
        return await this.userRepository.findAllUsers();
    }

    async deleteUserById(userId: string): Promise<string> {
        await this.userRepository.deleteUser(userId);
        return 'Usuário excluído';
    }

    async getUserById(userId: string): Promise<IUserEntity> {
        const foundUser = await this.userRepository.findUserById(userId);
        delete foundUser.password;
        return foundUser;
    }

    async findUserByEmail(email: string): Promise<IUserEntity> {
        return await this.userRepository.findUserByEmail(email);
    }

    async homeConsumers(id: string) {
        const foundUser = await this.userRepository.homeConsumers(id);
        delete foundUser.cpf;
        delete foundUser.email;
        delete foundUser.id;
        delete foundUser.name;
        delete foundUser.password;

        delete foundUser.role;
        return foundUser;
    }

    async homeRestaurant(id: string) {
        const foundUser = await this.userRepository.homeRestaurant(id);
        delete foundUser.cpf;
        delete foundUser.email;
        delete foundUser.id;
        delete foundUser.name;
        delete foundUser.password;
        delete foundUser.role;
        return foundUser;
    }
}
