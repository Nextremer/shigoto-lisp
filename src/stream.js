const make_stream = (str) => {
  return {
    buf: str,
    pos: 0
  };
};

// 1文字読む
const read_char = (stream) => {
  if (stream.pos >= stream.buf.length) {
    return null
  }
  const char = stream.buf[stream.pos];
  stream.pos++;
  return char;
};

// 1文字チラ見する
const peek_char = (stream) => {
  if (stream.pos >= stream.buf.length) {
    return null
  }
  const char = stream.buf[stream.pos];
  return char;
};

module.exports = {
  make_stream, read_char, peek_char,
}
