import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsRestaurantAuthorization } from 'src/auth/decorators/is-restaurant.decorator';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { HomepageService } from './home.service';

@ApiTags('homepage')
@Controller('/homepage')
export class HomepageController {
    constructor(private readonly homepageService: HomepageService) {}

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Get('/consumer')
    async homeConsumers(@Query('id') id: string, @Res() res: Response) {
        try {
            await this.homepageService.homeConsumers(id);
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Get('/restaurant')
    async homeRestaurant(@Query('id') id: string, @Res() res: Response) {
        try {
            await this.homepageService.homeRestaurant(id);
        } catch (err) {
            HandleException(err);
        }
    }
}
