import { chmodSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = dirname(scriptsDir);
const binDir = join(rootDir, 'node_modules', '.bin');

if (!existsSync(binDir)) {
  process.exit(0);
}

const sh = `#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\\\,/,g')")

if [ -x "$basedir/node" ]; then
  exec "$basedir/node" "$basedir/../../scripts/mikro-orm-cli.mjs" "$@"
else
  exec node "$basedir/../../scripts/mikro-orm-cli.mjs" "$@"
fi
`;

const cmd = `@SETLOCAL
@IF EXIST "%~dp0\\node.exe" (
  "%~dp0\\node.exe" "%~dp0\\..\\..\\scripts\\mikro-orm-cli.mjs" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node "%~dp0\\..\\..\\scripts\\mikro-orm-cli.mjs" %*
)
`;

const ps1 = `#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$ret=0
if (Test-Path "$basedir/node.exe") {
  if ($MyInvocation.ExpectingInput) {
    $input | & "$basedir/node.exe" "$basedir/../../scripts/mikro-orm-cli.mjs" $args
  } else {
    & "$basedir/node.exe" "$basedir/../../scripts/mikro-orm-cli.mjs" $args
  }
  $ret=$LASTEXITCODE
} else {
  if ($MyInvocation.ExpectingInput) {
    $input | & "node.exe" "$basedir/../../scripts/mikro-orm-cli.mjs" $args
  } else {
    & "node.exe" "$basedir/../../scripts/mikro-orm-cli.mjs" $args
  }
  $ret=$LASTEXITCODE
}
exit $ret
`;

writeFileSync(join(binDir, 'mikro-orm'), sh, 'utf8');
writeFileSync(join(binDir, 'mikro-orm.cmd'), cmd, 'utf8');
writeFileSync(join(binDir, 'mikro-orm.ps1'), ps1, 'utf8');

chmodSync(join(binDir, 'mikro-orm'), 0o755);
