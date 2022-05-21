import fetchMock from 'jest-fetch-mock';
import { isNameAvailable } from '../src';

describe(isNameAvailable, () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterAll(() => {
    fetchMock.disableMocks();
  });

  it('returns true if name available and false if taken', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    expect(await isNameAvailable('tln')).toBe(true);

    fetchMock.mockResponseOnce('', { status: 200 });
    expect(await isNameAvailable('vue')).toBe(false);
  });
});
