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
  process.stdout.write('> ');
});

reader.on('close', () => {
  console.log('bye!');
});

process.stdout.write('> ');
