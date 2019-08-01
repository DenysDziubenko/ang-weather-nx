import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.enableCors();
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });
}

bootstrap();
