import { IUserEntity } from 'src/user/entities/user.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';

export class IProfileEntity extends CreateProfileDto {
    id: string;
    restaurant: IUserEntity[];
    consumers: IUserEntity[];
}
