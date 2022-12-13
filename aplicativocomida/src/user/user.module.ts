import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MenuModule } from 'src/menu/menu.module';
import { DatabaseModule } from 'src/prisma/database.module';
import { ProfileModule } from 'src/profile/profile.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.services';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
