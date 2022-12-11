import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { IProfileEntity } from './entities/profile.entity';


@Injectable()
export class ProfileRepository {
    private info = {
        restaurant: true,
        consumer: true,
    };
    constructor(private readonly prisma: PrismaService) {}

async createProfile({
    name,
    image,
    type,
    adress,
}: CreateProfileDto, id: string): Promise<IProfileEntity> {
    try{
        return await this.prisma.IProfileEntity 
    } catch(err)






}

