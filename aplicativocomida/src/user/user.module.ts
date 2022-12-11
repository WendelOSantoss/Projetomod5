import { Module } from '@nestjs/common';
import { MenuModule } from 'src/menu/menu.module';
import { DatabaseModule } from 'src/prisma/database.module';
import { ProfileModule } from 'src/profile/profile.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.services';

@Module({
    imports: [DatabaseModule, ProfileModule, MenuModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
