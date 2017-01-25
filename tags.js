import { e } from './nodes'
import { allTags } from './all_tags'
import { css } from './tagged'
import { CommentNode } from './nodes'

const helpers = allTags.reduce((helpers, tag) => {
  helpers[tag] = function(...args) {
    return e(tag, ...args);
  };
  helpers[tag.charAt(0).toUpperCase() + tag.slice(1)] = helpers[tag];
  helpers[tag.toUpperCase()] = helpers[tag];
  return helpers;
}, {});

const checkbox = (...args) => e('input', {
  type: 'checkbox',
}, ...args);

const none = new CommentNode();
none.text = ' none ';

const clear = e('div', css`
  clear: both;
`);

module.exports = {
  ...helpers,

  none: none,
  None: none,
  NONE: none,

  clear: clear,
  Clear: clear,
  CLEAR: clear,

  checkbox: checkbox,
  Checkbox: checkbox,
  CHECKBOX: checkbox,
};
