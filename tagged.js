export function Selector(str) {
  this.str = str;
}

export function $(strings, ...values) {
  let str = '';
  for (let i = 0; i < strings.length; i++) {
    str += strings[i];
    if (values[i] !== undefined) {
      str += values[i];
    }
  }
  return new Selector(str);
}

export function Css(str) {
  this.str = str;
}

export function css(strings, ...values) {
  let str = '';
  for (let i = 0; i < strings.length; i++) {
    str += strings[i];
    if (values[i] !== undefined) {
      str += values[i];
    }
  }
  return new Css(str);
}

