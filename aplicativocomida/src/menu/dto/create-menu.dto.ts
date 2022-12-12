import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateMenuDto {
    @ApiProperty()
    @IsString()
    profileId: string;
    @ApiProperty()
    @IsString()
    foodName: string;
    @ApiProperty()
    @IsArray()
    accompaniment: string[];
    @ApiProperty()
    @IsNumber()
    price: number;
}
