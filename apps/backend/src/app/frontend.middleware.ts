import * as path from 'path';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigData } from '@ang-weather-nx/shared-data';

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg',];

const resolvePath = (file: string) => path.resolve(`dist/apps/frontend/${file}`);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req, res, next: Function) {
      const { baseUrl } = req;
      if (baseUrl.indexOf(ConfigData.ROUTE_PREFIX) === 1) {
        next();
      } else if (allowedExt.filter(ext => baseUrl.indexOf(ext) > 0).length > 0) {
        res.sendFile(resolvePath(baseUrl));
      } else {
        res.sendFile(resolvePath('index.html'));
      }
    };
}
