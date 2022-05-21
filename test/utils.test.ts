import { get3Chars, get3UniqueChars } from '../src/utils';

describe(get3UniqueChars, () => {
  it('generates exactly 3 chars', () => {
    expect(get3UniqueChars().length).toBe(3);
  });

  it('returns unique chars', () => {
    const chars = get3UniqueChars();
    expect(chars[0] === chars[1] && chars[1] === chars[2]).toBe(false);
  });
});

describe(get3Chars, () => {
  it('generates exactly 3 chars', () => {
    expect(get3Chars().length).toBe(3);
  });
});
