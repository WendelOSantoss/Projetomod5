import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
    restaurantId?: string[];
    @ApiProperty()
    consumerId?: string[];
}
