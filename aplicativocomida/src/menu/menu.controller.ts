import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
    Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { AuthGuard } from '@nestjs/passport';
import { IsRestaurantAuthorization } from 'src/auth/decorators/is-restaurant.decorator';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Post('/create')
    async create(@Body() createMenuDto: CreateMenuDto) {
        try {
            return this.menuService.create(createMenuDto);
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Get()
    findAll() {
        try {
            return this.menuService.findAll();
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Get('/find/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.menuService.findOne(id);
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Patch('/update/:id')
    async update(@Body() updateMenuDto: UpdateMenuDto) {
        try {
            return this.menuService.update(updateMenuDto);
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Delete('delete/:id')
    async remove(@Param('id') id: string): Promise<String> {
        try {
            return await this.menuService.remove(id);
        } catch (err) {
            HandleException(err);
        }
    }
}
