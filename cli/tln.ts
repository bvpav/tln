#!/usr/bin/env node

import minimist from 'minimist';
import { availableNames, isNameAvailable } from '../lib';

function usage() {
  console.error(
    `
usage: tln
       tln -n <count>
       tln -c <name>
       tln [-h|--help]
  `.trim()
  );
  return process.exit(1);
}

const NPM_WEBSITE = 'https://npmjs.com';

async function main() {
  const argv = minimist(process.argv.slice(2), {
    default: { n: 1 },
    alias: { h: 'help', c: 'check' },
    string: ['c'],
  });

  if (argv.help) {
    usage();
  }

  if (argv.check) {
    const isAvailable = await isNameAvailable(argv.check);
    if (isAvailable) {
      console.log(`Name ${argv.check} is available.`);
      process.exit(0);
    } else {
      console.log(
        `Name ${argv.check} is taken:
${NPM_WEBSITE}/package/${argv.check}`
      );
      process.exit(1);
    }
  }

  if (typeof argv.n !== 'number') {
    argv.n = 0;
  }

  let names: string[];
  try {
    names = await availableNames(argv.n);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith('Invalid count.')) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    process.exit(1);
  }

  names.map((name) => console.log(name));
}

main();
