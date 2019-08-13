import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if (process.env.NODE_ENV === 'production') {
      this.envConfig = {
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        CLIENT_EMAIL: process.env.CLIENT_EMAIL,
        VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY
      };

    } else {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
