import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './userinput.dto';

export class PartialUserDto extends PartialType(UserDto) {
    @ApiProperty()
    id: string;
}
