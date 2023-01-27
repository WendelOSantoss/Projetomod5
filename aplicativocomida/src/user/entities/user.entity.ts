import { UserDto } from '../dto/userInput.dto';

export interface IUserEntity extends UserDto {
    id: string;
    role?: string;
}
