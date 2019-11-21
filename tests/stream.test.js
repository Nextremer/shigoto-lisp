var { make_stream, read_char, peek_char } = require('../src/stream.js');

test('streams access', () => {
  let s = make_stream('123456');
  expect(s.pos).toBe(0);
  expect(s.buf).toBe('123456');

  // read_char test
  s = make_stream('123456');
  expect(read_char(s)).toBe('1')
  expect(s.pos).toBe(1);
  expect(read_char(s)).toBe('2')
  expect(s.pos).toBe(2);

  // peek_char test
  s = make_stream('123456');
  expect(peek_char(s)).toBe('1')
  expect(s.pos).toBe(0);
  expect(peek_char(s)).toBe('1')
  expect(s.pos).toBe(0);

  // combine peek_char and read_char
  s = make_stream('123456');
  expect(read_char(s)).toBe('1')
  expect(s.pos).toBe(1);
  expect(peek_char(s)).toBe('2')
  expect(s.pos).toBe(1);
  expect(read_char(s)).toBe('2')
  expect(s.pos).toBe(2);

  // boudary test
  s = make_stream('12');
  read_char(s); read_char(s);
  expect(peek_char(s)).toBe(null);
  expect(read_char(s)).toBe(null);
});
