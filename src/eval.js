
// 1 => 1
// sym => 42
// (+ 1 2) => 3
// (+ (+ 1 2) 3) => (+ 3 3) => 6
// (if (= 1 2) (* 2 3) (+ 2 3))
// (define hoge 42)  ; hoge = 42
// (define hoge (+ 1 2))  ; hoge = 1 + 2
// ((lambda (a b c) (+ a (* b c))) 10 20 30)
// ;; -> (a, b, c) => { return (a + (b * c)); }(10, 20, 30)

//var a = 42;
//var c = 100;

//function add (a, b) {
//  return a + b + c;
//}

//add(1,2) // a=1, b=2

//a // => 42

const fn_table = {
  '+': (args) => (args[0] + args[1]),
  '-': (args) => (args[0] - args[1]),
  '*': (args) => (args[0] * args[1]),
  '/': (args) => (args[0] / args[1]),
  '=': (args) => {
    if (args[0] === args[1]) {
      return 1;
    } else {
      return 0;
    }
  },
  '.': (args) => console.log(args[0]),
  'if2': (args) => args[0] === 1 ? args[1] : args[2],
};

//function makeAdder() {
//  let n = 0;
//  return function () { n++; return n; };
//}

//var adder = makeAdder() => function
//adder() => 0;
//adder() => 1;
//...

var global_env = {
  parent: null,
  bindings: fn_table,
};

const sl_find = (name, env) => {
  if (env === undefined) {
    return undefined;
  }
  let val = env.bindings[name];
  if (val === undefined) {
    return sl_find(name, env.parent);
  }
  return val;
}

const sl_eval = (form, env=global_env) => {
  if (Array.isArray(form)) {
    const name = form[0];
    switch (name) {
      case 'if':
        if (sl_eval(form[1]) !== []) {
          return sl_eval(form[2]);
        } else {
          return sl_eval(form[3]);
        }

      case 'define':
        let name = form[1];
        let val = sl_eval(form[2]);
        env.bindings[name] = val;
        return val;

      case 'lambda':
        return { args: form[1], code: form[2] };

      default:
        let args = form.slice(1);
        let fn = sl_find(form[0], env);
        let new_env = { parent: env, bindings: {} };
        fn.args.forEach((arg, i) => { new_env.bindings[arg] = sl_eval(args[i], env) });
        return sl_eval(fn.code, new_env);
    }
  } else if (typeof form === 'number') {
    return form;
  } else if (typeof form === 'string') {
    return sl_find(form, env);
  }
};

module.exports = {
  sl_eval,
}
