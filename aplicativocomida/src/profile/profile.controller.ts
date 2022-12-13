import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { IsRestaurantAuthorization } from 'src/auth/decorators/is-restaurant.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Post()
    async create(@Body() createProfileDto: CreateProfileDto) {
        try {
            return this.profileService.create(createProfileDto);
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Get()
    findAll() {
        try {
            return this.profileService.findAll();
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Get('/find/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.profileService.findOne(id);
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Patch('/update')
    async update(@Body() updateProfileDto: UpdateProfileDto) {
        try {
            return this.profileService.update(updateProfileDto);
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Delete('delete/:id')
    async remove(@Param('id') id: string): Promise<String> {
        try {
            return await this.profileService.remove(id);
        } catch (err) {
            HandleException(err);
        }
    }
}
