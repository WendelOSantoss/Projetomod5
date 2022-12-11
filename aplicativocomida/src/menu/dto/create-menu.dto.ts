import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
    @ApiProperty()
    profileId: string;
    @ApiProperty()
    FoodName: string;
    @ApiProperty()
    Accompaniment;
    @ApiProperty()
    Price: string;
}
