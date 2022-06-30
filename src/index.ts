import 'isomorphic-fetch';
import { get3Chars, get3UniqueChars } from './utils';

const REGISTRY_URL = 'https://registry.npmjs.org';

let namesMemo = new Map<string, boolean>();

export async function isNameAvailable(name: string): Promise<boolean> {
  if (!namesMemo.has(name)) {
    const response = await fetch(`${REGISTRY_URL}/${name}`);
    const available = response.status === 404;
    namesMemo.set(name, available);
  }
  return namesMemo.get(name)!;
}

type AvailableNamesOptions = {
  uniqueLetters: boolean;
};

export async function availableNames(
  count: number,
  options: AvailableNamesOptions = { uniqueLetters: true }
) {
  const maxLen = options.uniqueLetters ? 26 * 25 * 24 : 26 ** 3;
  if (count < 0 || count > maxLen) {
    throw new Error(`Invalid count. Must be a number from 0 to ${maxLen}`);
  }

  const names = new Set<string>();
  for (let i = 0; i < count; i++) {
    let name: string;
    let isAvailable = false;
    do {
      name = options.uniqueLetters ? get3UniqueChars() : get3Chars();
      if (names.has(name)) continue;
      isAvailable = await isNameAvailable(name);
    } while (!isAvailable);
    names.add(name);
  }
  return [...names];
}
