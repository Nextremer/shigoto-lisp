var { 
  make_stream, read_char, peek_char,
  sl_read, sl_eval, sl_print,
} = require('./index.js');

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

test('reader test', () => {
  expect(sl_read(make_stream(''))).toBe('nil');

  // numbers
  expect(sl_read(make_stream('0'))).toBe(0);
  expect(sl_read(make_stream('0123456789'))).toBe(123456789);
  expect(sl_read(make_stream('1 '))).toBe(1);

  // symbols
  expect(sl_read(make_stream('s'))).toBe('s');
  expect(sl_read(make_stream('s12'))).toBe('s12');
  expect(sl_read(make_stream('12a'))).toBe(12);

  // lists
  expect(sl_read(make_stream('()'))).toEqual([]);
  expect(sl_read(make_stream('(1 2 3)'))).toEqual([1,2,3]);
  expect(sl_read(make_stream('(1 (2 3) 4)'))).toEqual([1,[2,3],4]);
});

test('first test!', () => {
  expect(1).toBe(1);
});
