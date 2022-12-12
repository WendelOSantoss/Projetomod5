import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post('/create')
    async create(@Body() createMenuDto: CreateMenuDto) {
        try {
            return this.menuService.create(createMenuDto);
        } catch (err) {
            HandleException(err);
        }
    }

    @Get()
    findAll() {
        try {
            return this.menuService.findAll();
        } catch (err) {
            HandleException(err);
        }
    }

    @Get('/find/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.menuService.findOne(id);
        } catch (err) {
            HandleException(err);
        }
    }

    @Patch('/update/:id')
    async update(@Body() updateMenuDto: UpdateMenuDto) {
        try {
            return this.menuService.update(updateMenuDto);
        } catch (err) {
            HandleException(err);
        }
    }
}
