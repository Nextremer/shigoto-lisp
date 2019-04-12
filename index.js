// Sytanx of Lisp:
// - Atom
//   - Numbers: 1, 2 => ,1, 2
//   - Symbol: 'aaa, NIL => "aaa", "NIL"
// - List
//   - () => []
//   - (LIST) => []
//   - (LIST1 LIST2 LIST3) => []

const make_stream = (str) => {
  return {
    buf: str,
    pos: 0
  };
};

const read_char = (stream) => {
  if (stream.pos >= stream.buf.length) {
    return null
  }
  const char = stream.buf[stream.pos];
  stream.pos++;
  return char;
};

const peek_char = (stream) => {
  if (stream.pos >= stream.buf.length) {
    return null
  }
  const char = stream.buf[stream.pos];
  return char;
};

const sl_read_number = (stream) => {
  let s = [];
  while (true) {
    if ('0123456789'.includes(peek_char(stream))) {
      s.push(read_char(stream));
    } else {
      return parseInt(s.join(''));
    }
  }
};

const sl_read_symbol = (stream) => {
  let s = [];
  while (true) {
    let ch = peek_char(stream);
     if (ch !== null && !' '.includes()) {
      s.push(read_char(stream));
    } else {
      return s.join('');
    }
  }
};

const sl_read_list = (stream) => {
  let list = [];
  while (true) {
    if (')' === peek_char(stream)) {
      read_char(stream);
      return list;
    }
    list.push(sl_read(stream));
  }
};

const sl_read = (stream) => {
  while (' '.includes(peek_char(stream))) {
    read_char(stream);
  }
  const char = peek_char(stream);
  if (char === null) {
    return 'nil';
  } else if (char === '(') {
    read_char(stream);
    return sl_read_list(stream);
  } else if ("0123456789".includes(char)) {
    return sl_read_number(stream);
  } else {
    return sl_read_symbol(stream);
  }
};

// TODO: またらいしゅう〜〜〜！！！！！！！
const sl_eval = (form) => {
  return form;
};

const sl_print = (form) => {
  if (typeof form === 'string') {
    return form;
  } else if (typeof form === 'number') {
    return `${form}`;
  } else if (Array.isArray(form)) {
    return '(' + form.map(sl_print).join(' ') + ')';
  }
};

const sl_repl = () => {
  while (true) {
    console.log('> ');
    let line = make_stream('(1 2 3 ( 4 5)))');
    console.log(sl_print(sl_eval(sl_read(line))));
  }
};

sl_repl();

module.exports = {
  make_stream, read_char, peek_char,
  sl_read, sl_eval, sl_print
}