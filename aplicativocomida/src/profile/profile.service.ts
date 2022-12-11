import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IProfileEntity } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepository: ProfileRepository) {}

    async create(createProfileDto: CreateProfileDto): Promise<IProfileEntity> {
        const id = randomUUID();
        return await this.profileRepository.createProfile(createProfileDto, id);
    }

    async findAll(): Promise<IProfileEntity[]> {
        return await this.profileRepository.findAllProfiles();
    }

    async findOne(id: string): Promise<IProfileEntity> {
        return await this.profileRepository.findProfileById(id);
    }

    async update(updateProfileDto: UpdateProfileDto): Promise<IProfileEntity> {
        if (!updateProfileDto.consumerId && !updateProfileDto.restaurantId) {
            throw new Exception(
                Exceptions.InvalidData,
                'Conexão sem referência'
            );
        }
        return await this.profileRepository.updateProfile(updateProfileDto);
    }

    async remove(id: string): Promise<string> {
        await this.profileRepository.deleteProfile(id);
        return 'Perfil devidamente excluído';
    }
}
