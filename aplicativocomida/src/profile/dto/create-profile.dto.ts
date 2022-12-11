import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IProfileEntity } from '../entities/profile.entity';

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    image: string;
    @ApiProperty()
    @IsString()
    type: string;
    @ApiProperty()
    @IsString()
    adress: string;
    @ApiProperty()
    restaurantId: IProfileEntity[];
    @ApiProperty()
    consumerId: IProfileEntity[];
}
