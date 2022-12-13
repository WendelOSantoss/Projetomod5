import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsRestaurantAuthorization } from 'src/auth/decorators/is-restaurant.decorator';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

@ApiTags('homepage')
@Controller('/homepage')
export class HomepageController {
    constructor(private readonly homeService: HomeService) {}

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Get('/consumer')
    async homeConsumers(@Query('id') id: string, @Res() res: Response) {
        try {
            res.status(200).send(await this.homeService.homeConsumers(id));
        } catch (err) {
            HandleException(err);
        }
    }

    @UseGuards(AuthGuard(), IsRestaurantAuthorization)
    @ApiBearerAuth()
    @Get('/restaurant')
    async homeRestaurant(@Query('id') id: string, @Res() res: Response) {
        try {
            res.status(200).send(await this.homeService.homeRestaurant(id));
        } catch (err) {
            HandleException(err);
        }
    }
}
