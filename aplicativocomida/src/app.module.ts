import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { UserService } from './user/user.services';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { ProfileModule } from './profile/profile.module';
import { MenuModule } from './menu/menu.module';

@Module({
    imports: [DatabaseModule, ProfileModule, MenuModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class AppModule {}
