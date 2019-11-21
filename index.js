var { make_stream } = require('./src/stream.js');
var { sl_read, sl_print } = require('./src/read.js');
var { sl_eval } = require('./src/eval.js');

var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on('line', (line) => {
  let s = make_stream(line);
  console.log(sl_print(sl_eval(sl_read(s))));
  console.log('> ');
});

reader.on('close', () => {
  console.log('bye!');
});

console.log('> ');

module.exports = {
  make_stream, read_char, peek_char,
  sl_read, sl_eval, sl_print
}