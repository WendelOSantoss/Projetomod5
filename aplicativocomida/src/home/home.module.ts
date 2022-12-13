import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/prisma/database.module';
import { ProfileModule } from 'src/profile/profile.module';
import { UserModule } from 'src/user/user.module';
import { HomepageController } from './home.controller';
import { HomepageService } from './home.service';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        ProfileModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [HomepageController],
    providers: [HomepageService],
})
export class HomepageModule {}
