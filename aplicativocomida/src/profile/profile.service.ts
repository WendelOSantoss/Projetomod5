import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  
 async create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  async findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

   async update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

   async remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
