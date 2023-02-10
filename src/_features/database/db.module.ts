import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { Pool } from 'pg';

import { DbOptions } from './interfaces';

@Global()
@Module({})
export class DbModule {
  static forRoot(options: DbOptions): DynamicModule {
    const provider: Provider = {
      provide: 'DB',
      useFactory: async () => {
        const pool = new Pool(options);

        await pool.connect();
        return pool;
      },
    };
    return {
      module: DbModule,
      providers: [provider],
      exports: [provider],
      global: true,
    };
  }
}
