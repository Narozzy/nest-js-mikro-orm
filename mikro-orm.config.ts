import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'path';

/**
 * Configuration for MikroORM, this takes the place of passing in a config object within the .forRoot method
 * of the MikroOrmModule in app.module.ts
 */

const config: Options = {
  type: 'sqlite',
  host: 'localhost',
  port: 3001,
  dbName: 'contact-book.sqlite3',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.ts$/,
  },
};

export default config;
