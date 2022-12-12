import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createMenu(menu: Menu): Promise<Menu> {
        try {
            return await this.prisma.menu.create({
                data: menu,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async updateMenu(menu: Menu): Promise<Menu> {
        try {
            return await this.prisma.menu.update({
                where: { id: menu.id },
                data: menu,
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async findAllMenu(): Promise<Menu[]> {
        try {
            return await this.prisma.menu.findMany();
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }

    async findMenuById(id: string): Promise<Menu> {
        try {
            return await this.prisma.menu.findUniqueOrThrow({
                where: { id: id },
            });
        } catch (err) {
            throw new Exception(Exceptions.DatabaseException);
        }
    }
}
