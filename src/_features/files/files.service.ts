import * as fs from 'fs/promises';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async getFile(path: string) {
    const file = await fs.readFile(join(process.cwd(), 'public', path));
    return file;
  }
}
