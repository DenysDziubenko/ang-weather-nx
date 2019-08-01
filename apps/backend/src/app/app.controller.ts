import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigData } from '@ang-weather-nx/shared-data';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get(ConfigData.SUBSCRIPTIONS_URL)
  getSubscriptions(@Query('userId') userId: number) {
    return this.appService.getSubscriptions(userId);
  }

  @Post(ConfigData.SUBSCRIPTIONS_URL)
  addSubscription(@Body() subscription) {
    return this.appService.addSubscription(subscription);
  }

  @Delete(ConfigData.SUBSCRIPTIONS_URL)
  deleteSubscription(@Query('userId') userId: number, @Query('cityId') cityId: number) {
    return this.appService.deleteSubscription(userId, cityId);
  }

}
