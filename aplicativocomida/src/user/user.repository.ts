import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IUserEntity } from "./entities/user.entity";
import { PartialUserDto } from "./services/dto/partialuserinput.dto";
import { UserDto } from "./services/dto/userinput.dto";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService,) {}
    
    async createUser(user: UserDto):Promise<IUserEntity> {
      const CreatedUser = await this.prisma.user.create({data: user});
      return CreatedUser;
    }
    async updateUser(user: PartialUserDto):Promise<IUserEntity> {
        const UpdatedUser = await this.prisma.user.update({ 
            where: {
                id: user.id},
                data: user,
        })
        return updatedUser;
    }
    async deleteUser(user: string):Promise<IUserEntity> {
        const deletedUser = await this.prisma.user.delete({
            where: {id: id},
        });
        return deletedUser;;
    }

    async findAllUsers():Promise<IUserEntity> {
        const allUsers = await this.prisma.user.findMany();
        return allUsers;
    }

    async findUserById(user: string):Promise<IUserEntity> {
        const foundUser = await this.prisma.user.findUniqueOrThrow({
            where: {id: id},
        })
        return foundUser;
    }


}