import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileRepository {
    private info = {
        restaurant: true,
        consumers: true,
    };

    constructor(private readonly prisma: PrismaService) {}

    async createProfile(
        { name, image, type, adress }: CreateProfileDto,
        id: string
    ): Promise<Profile> {
        try {
            return await this.prisma.profile.create({
                data: {
                    id: id,
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

    async updateProfile(updateProfile: UpdateProfileDto): Promise<Profile> {
        try {
            const restaurantId = updateProfile.restaurantId;
            const consumerId = updateProfile.consumerId;
            delete updateProfile.restaurantId;
            delete updateProfile.consumerId;

            return await this.prisma.profile.update({
                where: { id: updateProfile.id },
                data: {
                    ...updateProfile,
                    restaurant: {
                        connect: restaurantId?.map((id) => ({ id: id })),
                    },
                    consumers: {
                        connect: consumerId?.map((id) => ({ id: id })),
                    },
                },
                include: this.info,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async deleteProfile(id: string): Promise<Profile> {
        try {
            return await this.prisma.profile.delete({
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

    async findProfileById(id: string): Promise<Profile> {
        try {
            return await this.prisma.profile.findUnique({
                where: { id: id },
                include: this.info,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async findAllProfiles(): Promise<Profile[]> {
        try {
            return await this.prisma.profile.findMany({
                include: this.info,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }
}
