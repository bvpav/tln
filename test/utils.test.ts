import { get3Chars, get3UniqueChars } from '../lib/utils';

describe(get3UniqueChars, () => {
  it('generates exactly 3 chars', () => {
    expect(get3UniqueChars().length).toBe(3);
  });

  it('returns unique chars', () => {
    const chars = get3UniqueChars();
    expect(new Set(chars).size).toBe(chars.length);
  });

  it('only returns lowercase alphabet characters', () => {
    expect(
      get3UniqueChars()
        .split('')
        .find((c) => c.match(/[^a-z]/))
    ).toBeUndefined();
  });
});

describe(get3Chars, () => {
  it('generates exactly 3 chars', () => {
    expect(get3Chars().length).toBe(3);
  });

  it('only returns lowercase alphabet characters', () => {
    expect(
      get3UniqueChars()
        .split('')
        .find((c) => c.match(/[^a-z]/))
    ).toBeUndefined();
  });
});
