import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './dto/partialuserinput.dto';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(user: IUserEntity): Promise<IUserEntity> {
        try {
            const CreatedUser = await this.prisma.user.create({ data: user });
            return CreatedUser;
        } catch (err) {
            throw new Exception(
                Exceptions.DatabaseException,
                'Erro ao criar email ou Cpf já cadastrados'
            );
        }
    }

    async updateUser(user: PartialUserDto): Promise<IUserEntity> {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: user,
            });
            return updatedUser;
        } catch (err) {
            throw new Exception(
                Exceptions.DatabaseException,
                'Erro ao atualizar usuário'
            );
        }
    }
    async deleteUser(id: string): Promise<IUserEntity> {
        try {
            const deletedUser = await this.prisma.user.delete({
                where: { id: id },
            });
            return deletedUser;
        } catch (err) {
            throw new Exception(
                Exceptions.DatabaseException,
                'Erro ao deletar, usuário não encontrado'
            );
        }
    }

    async findAllUsers(): Promise<IUserEntity[]> {
        try {
            const allUsers = await this.prisma.user.findMany();
            return allUsers;
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async findUserById(id: string): Promise<IUserEntity> {
        try {
            const foundUser = await this.prisma.user.findUniqueOrThrow({
                where: { id: id },
            });
            return foundUser;
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }
    async findUserByEmail(email: string): Promise<IUserEntity> {
        try {
            return await this.prisma.user.findUniqueOrThrow({
                where: { email: email },
            });
        } catch (err) {
            throw new Exception(
                Exceptions.DatabaseException,
                'Não há usuários com este email'
            );
        }
    }
}
