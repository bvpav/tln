const asciiChars = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode('a'.charCodeAt(0) + i)
);

export function get3UniqueChars() {
  const chars = [...asciiChars].sort(() => Math.random() - 0.5);
  return chars.slice(0, 3).join('');
}

export function get3Chars() {
  return Array.from(
    { length: 3 },
    () => asciiChars[Math.floor(Math.random() * asciiChars.length)]
  ).join('');
}
