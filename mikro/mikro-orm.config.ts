import 'dotenv/config';
import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  extensions: [Migrator],
  migrations: {
    path: 'dist/src/migrations',
    pathTs: 'src/migrations',
    emit: 'ts',
  },
});
