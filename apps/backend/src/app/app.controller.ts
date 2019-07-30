import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigData } from '@ang-weather-nx/shared-data';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get(ConfigData.NOTIFICATIONS_URL)
  getSubscriptions(@Query('userId') userId: number) {
    return this.appService.getSubscriptions(userId);
  }

  @Post(ConfigData.NOTIFICATIONS_URL)
  addSubscription(@Body() subscription) {
    return this.appService.addSubscription(JSON.parse(subscription));
  }

  @Delete(ConfigData.NOTIFICATIONS_URL)
  deleteSubscription(@Query('userId') userId: number, @Query('cityId') cityId: number) {
    return this.appService.deleteSubscription(userId, cityId);
  }

}
