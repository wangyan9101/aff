import {e} from './app'
import { allTags } from './all_tags'

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

module.exports = {
  ...helpers,

  none: e('div', {
    style: {
      display: 'none',
    },
  }),

  clear: e('div', {
    style: {
      clear: 'both',
    },
  }),

  checkbox: checkbox,
  Checkbox: checkbox,
  CHECKBOX: checkbox,
};
