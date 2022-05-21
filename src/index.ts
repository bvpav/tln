import 'isomorphic-fetch';

const REGISTRY_URL = 'https://registry.npmjs.org';

export async function isNameAvailable(name: string) {
  const response = await fetch(`${REGISTRY_URL}/${name}`);
  return response.status === 404;
}
