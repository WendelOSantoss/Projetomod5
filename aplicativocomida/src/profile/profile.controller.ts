import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post()
    async create(@Body() createProfileDto: CreateProfileDto) {
        try {
            return this.profileService.create(createProfileDto);
        } catch (err) {
            HandleException(err);
        }
    }

    @Get()
    findAll() {
        try {
            return this.profileService.findAll();
        } catch (err) {
            HandleException(err);
        }
    }

    @Get('/find/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.profileService.findOne(id);
        } catch (err) {
            HandleException(err);
        }
    }

    @Patch('/update')
    async update(@Body() updateProfileDto: UpdateProfileDto) {
        try {
            return this.profileService.update(updateProfileDto);
        } catch (err) {
            HandleException(err);
        }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string): Promise<String> {
        try {
            return await this.profileService.remove(id);
        } catch (err) {
            HandleException(err);
        }
    }
}
