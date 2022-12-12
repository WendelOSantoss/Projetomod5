import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { DatabaseModule } from 'src/prisma/database.module';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileRepository } from 'src/profile/profile.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [MenuController],
    providers: [
        UserRepository,
        ProfileService,
        ProfileRepository,
        MenuService,
        MenuRepository,
    ],
})
export class MenuModule {}
