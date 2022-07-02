#!/usr/bin/env node

/**
 * The point of this script is to suppress Node warnings about experimental
 * fetch api.
 */

import { spawnSync } from 'child_process';
import { resolve } from 'path';

const { status } = spawnSync(
  'node',
  ['--no-warnings', resolve(__dirname, 'tln.js'), ...process.argv.slice(2)],
  { stdio: 'inherit' }
);
process.exit(status ?? 1);
