import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { DataPipe } from '../util/data.pipe';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: DataPipe
    }]
})
export class AppModule {
}
