var { make_stream, read_char, peek_char } = require('../src/stream.js');
var { sl_read, sl_print } = require('../src/read.js');

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
