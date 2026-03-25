process.loadEnvFile?.('.env');
process.env.MIKRO_ORM_ALLOW_GLOBAL_CLI ??= '1';
process.env.MIKRO_ORM_CLI_PREFER_TS ??= '0';
process.env.MIKRO_ORM_CLI_CONFIG ??= './mikro-orm.config.js';

const cliUrl = new URL('../node_modules/@mikro-orm/cli/cli.js', import.meta.url);

await import(cliUrl.href);
