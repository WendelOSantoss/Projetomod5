import { Module } from '@nestjs/commom';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DatabaseModule {}
