import 'isomorphic-fetch';

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
