import { Module } from '@nestjs/common';
import { UserService } from './user/services/user.services';
import { UserController } from './user/user.controller';

@Module({
    controllers: [UserController],
    providers: [UserService],
    
})
export class AppModule {}
