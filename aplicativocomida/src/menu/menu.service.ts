import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ProfileService } from 'src/profile/profile.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {
    constructor(
        private readonly profileService: ProfileService,
        private readonly menuRepository: MenuRepository
    ) {}

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        await this.profileService.findOne(createMenuDto.profileId);
        const createdMenu: Menu = {
            ...createMenuDto,
            id: randomUUID(),
        };
        return await this.menuRepository.createMenu(createdMenu);
    }

    async findAll(): Promise<Menu[]> {
        return await this.menuRepository.findAllMenu();
    }

    async findOne(id: string): Promise<Menu> {
        return await this.menuRepository.findMenuById(id);
    }

    async update(updateMenuDto: UpdateMenuDto): Promise<Menu> {
        return await this.menuRepository.updateMenu(updateMenuDto);
    }

    async remove(id: string): Promise<string> {
        await this.menuRepository.deleteMenu(id);
        return 'Perfil devidamente excluído';
    }
}
