import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { DataPipe } from '../util/data.pipe';
import { FrontendMiddleware } from './frontend.middleware';
import { ConfigModule } from './app.config-module';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: DataPipe
    }]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(FrontendMiddleware).forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
