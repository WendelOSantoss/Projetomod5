import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.services';

@Injectable()
export class HomepageService {
    constructor(private readonly userService: UserService) {}

    async homeConsumers(id: string) {
        return await this.userService.homeConsumers(id);
    }

    async homeRestaurant(id: string) {
        return await this.userService.homeRestaurant(id);
    }
}
