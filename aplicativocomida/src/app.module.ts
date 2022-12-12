import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { ProfileModule } from './profile/profile.module';
import { MenuModule } from './menu/menu.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [DatabaseModule, UserModule, ProfileModule, MenuModule],
})
export class AppModule {}
