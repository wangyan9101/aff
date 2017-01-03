export function Selector(str) {
  this.str = str;
}

export function Css(str) {
  this.str = str;
}

function makeTagger(constructor) {
  function tag(strings, ...values) {
    let str = '';
    for (let i = 0; i < strings.length; i++) {
      str += strings[i];
      if (values[i] !== undefined) {
        str += values[i];
      }
    }
    return new constructor(str);
  }
  return tag;
}

export const $ = makeTagger(Selector);
export const css = makeTagger(Css);
