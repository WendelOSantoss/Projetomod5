import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileRepository {
    private info = {
        restaurant: true,
        consumer: true,
    };

    constructor(private readonly prisma: PrismaService) {}

    async createProfile(
        { name, image, type, adress }: CreateProfileDto,
        id: string
    ): Promise<IProfileEntity> {
        try {
            return await this.prisma.IProfileEntity.create({
                data: {
                    name: name,
                    image: image,
                    type: type,
                    adress: adress,
                },
                include: this.info,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async updateProfile(
        updateProfile: UpdateProfileDto
    ): Promise<IProfileEntity> {
        try {
            const restaurantId = updateProfile.restaurantId;
            const consumerId = updateProfile.consumerId;
            delete updateProfile.restaurantId;
            delete updateProfile.consumerId;

            return await this.prisma.IProfileEntity.update({
                where: { id: updateProfile.id },
                data: {
                    restaurant: {
                        connect: restaurantId?.map((id) => ({ id: id })),
                    },
                    consumer: {
                        connect: consumerId?.map((id) => ({ id: id })),
                    },
                },
                include: this.info,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async deleteProfile(id: string): Promise<IProfileEntity> {
        try {
            return await this.prisma.IProfileEntity.delete({
                where: { id: id },
                include: this.info,
            });
        } catch (err) {
            throw new Exception(
                Exceptions.DatabaseException,
                'Id não foi encontrado, tente novamente'
            );
        }
    }

    async findProfileById(id: string): Promise<IProfileEntity> {
        try {
            return await this.prisma.IProfileEntity.findOne({
                where: { id: id },
                include: this.info,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async findAllProfiles(): Promise<IProfileEntity[]> {
        try {
            return await this.prisma.IProfileEntity.findAll({
                include: this.info,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }
}
