const { Migrator } = require('@mikro-orm/migrations');
const { PostgreSqlDriver } = require('@mikro-orm/postgresql');
const { TsMorphMetadataProvider } = require('@mikro-orm/reflection');

module.exports = {
  driver: PostgreSqlDriver,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  extensions: [Migrator],
  migrations: {
    path: 'dist/src/migrations',
    pathTs: 'src/migrations',
    emit: 'ts',
  },
};
