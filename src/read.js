var { 
  make_stream, read_char, peek_char,
} = require('./stream.js');

// Sytanx of Lisp:
// - Atom
//   - Numbers: 1, 2 => ,1, 2
//   - Symbol: 'aaa, NIL => "aaa", "NIL"
// - List
//   - () => []
//   - (LIST) => []
//   - (LIST1 LIST2 LIST3) => []

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
    if (ch !== null && !' '.includes(ch)) {
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

const sl_print = (form) => {
  if (typeof form === 'string') {
    return form;
  } else if (typeof form === 'number') {
    return `${form}`;
  } else if (Array.isArray(form)) {
    return '(' + form.map(sl_print).join(' ') + ')';
  }
};

module.exports = {
  sl_read, sl_print,
}
