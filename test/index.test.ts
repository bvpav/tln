import fetchMock from 'jest-fetch-mock';
import { availableNames, isNameAvailable } from '../lib';
import { get3Chars, get3UniqueChars } from '../lib/utils';

const get3CharsMock = get3Chars as jest.MockedFunction<typeof get3Chars>;
const get3UniqueCharsMock = get3UniqueChars as jest.MockedFunction<
  typeof get3UniqueChars
>;

jest.mock('../lib/utils');

beforeAll(() => {
  fetchMock.enableMocks();
});
beforeEach(() => {
  fetchMock.resetMocks();
  get3CharsMock.mockReset();
  get3UniqueCharsMock.mockReset();
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
    // FIXME: mocked utils always return `undefined`
    get3CharsMock
      .mockReturnValueOnce('aaa')
      .mockReturnValueOnce('aab')
      .mockReturnValueOnce('abc')
      .mockReturnValueOnce('abd')
      .mockReturnValueOnce('abx')
      .mockReturnValue('acc');
    get3UniqueCharsMock
      .mockReturnValueOnce('abc')
      .mockReturnValueOnce('acb')
      .mockReturnValueOnce('abd')
      .mockReturnValueOnce('abx')
      .mockReturnValueOnce('aby')
      .mockReturnValue('aco');

    fetchMock.mockResponse('', { status: 404 });
    expect((await availableNames(1)).length).toBe(1);
    expect((await availableNames(3)).length).toBe(3);
  });

  it('errors on invalid lengths', async () => {
    fetchMock.mockResponse('', { status: 404 });
    expect(() => availableNames(-10)).rejects.toThrowError();
    expect(() => availableNames(0)).rejects.toThrowError();
    expect(() =>
      availableNames(26 * 25 * 24 + 1, { uniqueLetters: true })
    ).rejects.toThrowError();
    expect(
      availableNames(26 * 26 * 26 + 1, { uniqueLetters: false })
    ).rejects.toThrowError();
  });

  it('only returns available names', async () => {
    fetchMock.mockResponse(async (res) => {
      const pkgName = res.url.substring(res.url.lastIndexOf('/') + 1);
      if (['vue', 'ayu', 'del', 'osb', 'rwe'].includes(pkgName)) {
        return { body: '', init: { status: 200 } };
      } else {
        return { body: '', init: { status: 404 } };
      }
    });
    get3CharsMock
      .mockReturnValueOnce('vue')
      .mockReturnValueOnce('ayu')
      .mockReturnValueOnce('del')
      .mockReturnValueOnce('osb')
      .mockReturnValueOnce('rwe')
      .mockReturnValue('avl');
    get3UniqueCharsMock
      .mockReturnValueOnce('vue')
      .mockReturnValueOnce('ayu')
      .mockReturnValueOnce('del')
      .mockReturnValueOnce('osb')
      .mockReturnValueOnce('rwe')
      .mockReturnValue('avl');

    expect((await availableNames(1))[0]).toBe('avl');
    expect((await availableNames(1, { uniqueLetters: true }))[0]).toBe('avl');
  });

  it('calls the apropriate random characters generation function', async () => {
    fetchMock.mockResponse('', { status: 404 });

    // FIXME: mocked utils always return `undefined`
    get3CharsMock
      .mockReturnValueOnce('aaa')
      .mockReturnValueOnce('aab')
      .mockReturnValueOnce('abc')
      .mockReturnValueOnce('abd')
      .mockReturnValueOnce('abx')
      .mockReturnValue('acc');
    get3UniqueCharsMock.mockReset();
    get3UniqueCharsMock
      .mockReturnValueOnce('abc')
      .mockReturnValueOnce('acb')
      .mockReturnValueOnce('abd')
      .mockReturnValueOnce('abx')
      .mockReturnValueOnce('aby')
      .mockReturnValue('aco');

    await availableNames(3, { uniqueLetters: false });
    expect(get3CharsMock.mock.calls.length).toBe(3);

    await availableNames(3, { uniqueLetters: true });
    expect(get3UniqueCharsMock.mock.calls.length).toBe(3);
  });

  it('returns unique names', async () => {
    fetchMock.mockResponse('', { status: 404 });
    get3UniqueCharsMock
      .mockReturnValueOnce('asd')
      .mockReturnValueOnce('asd')
      .mockReturnValueOnce('xyz')
      .mockReturnValueOnce('ghd');

    const names = await availableNames(3);
    expect(new Set(names).size).toBe(names.length);
  });
});
