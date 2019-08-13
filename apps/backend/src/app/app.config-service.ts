import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if (process.env.NODE_ENV === 'production') {
      this.envConfig = process.env;

    } else {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
  }

  get(key: string): string {
    console.log('***');
    console.log('key - ', key);
    console.log('value - ', this.envConfig[key]);
    console.log('***');
    return this.envConfig[key];
  }
}
