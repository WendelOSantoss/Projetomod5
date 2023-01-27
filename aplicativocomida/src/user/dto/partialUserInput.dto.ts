import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './userInput.dto';

export class PartialUserDto extends PartialType(UserDto) {
    @ApiProperty()
    id: string;
    @ApiProperty()
    role?: string;
}
