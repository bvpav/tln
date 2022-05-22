import fetchMock from 'jest-fetch-mock';
import { availableNames, isNameAvailable } from '../src';

beforeAll(() => {
  fetchMock.enableMocks();
});
beforeEach(() => {
  fetchMock.resetMocks();
});
afterAll(() => {
  fetchMock.disableMocks();
});

describe(isNameAvailable, () => {
  it('returns true if name available and false if taken', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    expect(await isNameAvailable('tln')).toBe(true);

    fetchMock.mockResponseOnce('', { status: 200 });
    expect(await isNameAvailable('vue')).toBe(false);
  });

  it('memoizes query results', async () => {
    fetchMock.mockResponse('', { status: 404 });

    await isNameAvailable('tln');
    await isNameAvailable('tln');

    expect(fetchMock.mock.calls.length).toBeLessThanOrEqual(1);
  });
});

describe(availableNames, () => {
  it('obeys given length', async () => {
    fetchMock.mockResponse('', { status: 404 });
    expect((await availableNames(1)).length).toBe(1);
    expect((await availableNames(3)).length).toBe(3);
  });

  it('errors on invalid lengths', async () => {
    fetchMock.mockResponse('', { status: 404 });
    expect(() => availableNames(-10)).rejects.toThrowError();
    expect(() =>
      availableNames(26 * 25 * 24 + 1, { uniqueLetters: true })
    ).rejects.toThrowError();
    expect(
      availableNames(26 * 26 * 26 + 1, { uniqueLetters: false })
    ).rejects.toThrowError();
  });
});
