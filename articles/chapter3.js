import {button, div, p, span} from './tags'
import {render} from './render'
import {make_updater, $inc, $dec, $any} from './state'

{
  // 带状态

// 保存点击次数的变量
let click_count = 0;

// 返回一个 tag 为 button 的 Node
// 其中 button 的定义和前篇里的 div 和 p 类似，是对 e 函数的简单包装
//let Button = () => button(click_count);

// Button 增加点击事件
let Button = () => button({
  // 这是 es6 的语法糖
  // 相当于 onclick: () => { ... } 或 onclick: function() { ... }
  onclick() {
    click_count++; // 计数器自增
    render_app(); // 重新渲染
  },
}, click_count);

// 总体结构的定义，就是简单地一个 div 包一个上面定义的 Button
let App = () => div([
  Button(),
]);

// 因为要重复调用渲染函数，所以包装一下
function render_app() {
  render(
    App(),
    document.getElementById('app'),
  );
}

// 初次渲染
render_app();

}

{

let click_counts = {
  // 假设有两个按钮，key 分别为 foo 和 bar
  foo: 0,
  bar: 0,
};

let Button = (key) => {
  return button({
    onclick() {
      // key 对应的计数变量自增
      click_counts[key]++;
      render_app();
    },
  // 也是使用 key 对应的
  }, click_counts[key]);
};

let App = () => div([
  Button('foo'),
  Button('bar'),
  ResetButton(),
]);

function render_app() {
  render(
    App(),
    document.getElementById('app'),
  );
}

let ResetButton = () => button({
  onclick() {
    // 遍历所有 key，并设置计数为 0
    for (let key in click_counts) {
      click_counts[key] = 0;
    }
    // 重新渲染
    render_app();
  },
}, 'RESET');

render_app();
}

{
// 包装状态更新

let click_counts = {
  foo: 0,
  bar: 0,
};

function update_click_count(key, n) {
  click_counts[key] = n;
  render_app();
}

let Button = (key) => {
  return button({
    onclick() {
      update_click_count(key, click_counts[key] + 1);
    },
  }, click_counts[key]);
};

let ResetButton = () => button({
  onclick() {
    for (let key in click_counts) {
      update_click_count(key, 0);
    }
  },
}, 'RESET');

let App = () => div([
  Button('foo'),
  Button('bar'),
  ResetButton(),
]);

function render_app() {
  render(
    App(),
    document.getElementById('app'),
  );
}

render_app();
}

{
// 引入总计标签，说明无需手工更新

let click_counts = {
  foo: 0,
  bar: 0,
};

function update_click_count(key, n) {
  click_counts[key] = n;
  render_app();
}

let Button = (key) => {
  return button({
    onclick() {
      update_click_count(key, click_counts[key] + 1);
    },
  }, click_counts[key]);
};

let Reset = () => button({
  onclick() {
    for (let key in click_counts) {
      update_click_count(key, 0);
    }
  },
}, 'RESET');

let Sum = () => {
  let sum = 0;
  for (let key in click_counts) {
    sum += click_counts[key];
  }
  return p(sum);
};

let App = () => div([
  Button('foo'),
  Button('bar'),
  Reset(),
  Sum(),
]);

function render_app() {
  render(
    App(),
    document.getElementById('app'),
  );
}

render_app();
}

{
// 增加一个状态

let click_counts = {
  foo: 0,
  bar: 0,
};

function update_click_count(key, n) {
  click_counts[key] = n;
  render_app();
}

// 默认字体大小
let default_font_size = 14;
// 字体大小状态
let font_size = default_font_size;

// 字体大小更新函数
function update_font_size(size) {
  font_size = size;
  render_app();
}

// 字体大小控制
let FontAdjust = () => {
  return div([
    // 增大
    button({
      style: { fontSize: font_size + 'px' },
      onclick() {
        update_font_size(font_size + 1);
      },
    }, 'BIGGER'),
    // 减小
    button({
      style: { fontSize: font_size + 'px' },
      onclick() {
        // 避免 font_size 减至 0
        font_size > 1 && update_font_size(font_size - 1);
      },
    }, 'SMALLER'),
    // 当前大小
    span({
      style: { fontSize: font_size + 'px' },
    }, font_size + 'px'),
  ]);
};

let Button = (key) => {
  return button({
    // 使用 font_size
    style: { fontSize: font_size + 'px' },
    onclick() {
      update_click_count(key, click_counts[key] + 1);
    },
  }, click_counts[key]);
};

let Reset = () => button({
  // 使用 font_size
  style: { fontSize: font_size + 'px' },
  onclick() {
    for (let key in click_counts) {
      update_click_count(key, 0);
    }
    // 重置时，也重置字体大小
    update_font_size(default_font_size);
  },
}, 'RESET');

let Sum = () => {
  let sum = 0;
  for (let key in click_counts) {
    sum += click_counts[key];
  }
  return p({
    // 使用 font_size
    style: { fontSize: font_size + 'px' },
  }, sum);
};

let App = () => div([
  Button('foo'),
  Button('bar'),
  Reset(),
  Sum(),
  FontAdjust(), // 加入 App
]);

function render_app() {
  render(
    App(),
    document.getElementById('app'),
  );
}

render_app();
}

{
// 通用的 button，和 style 统一

let click_counts = {
  foo: 0,
  bar: 0,
};

function update_click_count(key, n) {
  click_counts[key] = n;
  render_app();
}

let default_font_size = 14;
let font_size = default_font_size;

function update_font_size(size) {
  font_size = size;
  render_app();
}

let common_style = () => ({
  fontSize: font_size + 'px',
  color: '#333',
});

// 共用的 button 实现，第一个参数是显示的文本，第二个参数是点击后的回调
let CommonButton = (text, onclick) => {
  return button({
    // 使用 common_style
    // 用了 object spread 语法，前面环境搭建篇里安装了相应的 babel 插件了
    style: {...common_style(),
      // 按钮共用的样式，和 font_size 关联起来，达到一种响应式的样式效果
      border: font_size / 5 + 'px solid #09C',
      backgroundColor: 'white',
      marginRight: font_size + 'px',
    },
    // 如果传入了点击回调，则设入
    onclick: () => onclick && onclick(),
  // 显示传入的 text 文本
  }, text);
}

let FontAdjust = () => div([
  // 按钮
  CommonButton('BIGGER', () => {
    update_font_size(font_size + 1);
  }),
  // 按钮
  CommonButton('SMALLER', () => {
    font_size > 1 && update_font_size(font_size - 1);
  }),
  span({
    // 使用 common_style
    style: common_style(),
  }, font_size + 'px'),
]);

// 按钮
let Button = (key) => CommonButton(click_counts[key], () => {
  update_click_count(key, click_counts[key] + 1);
});

// 按钮
let Reset = () => CommonButton('RESET', () => {
  for (let key in click_counts) {
    update_click_count(key, 0);
  }
  update_font_size(default_font_size);
});

let Sum = () => {
  let sum = 0;
  for (let key in click_counts) {
    sum += click_counts[key];
  }
  return p({
    // 使用 common_style
    style: common_style(),
  }, sum);
};

let App = () => div([
  Button('foo'),
  Button('bar'),
  Reset(),
  Sum(),
  FontAdjust(),
]);

function render_app() {
  render(
    App(),
    document.getElementById('app'),
  );
}

render_app();
}

{
let default_font_size = 14;

let state = {
  click_counts: {},
  font_size: default_font_size,
};

let update = make_updater(state, render_app);

let common_style = () => ({
  fontSize: state.font_size + 'px',
  color: '#333',
});

let CommonButton = (text, onclick) => {
  return button({
    style: {...common_style(),
      border: state.font_size / 5 + 'px solid #09C',
      backgroundColor: 'white',
      marginRight: state.font_size + 'px',
    },
    onclick: () => onclick && onclick(),
  }, text);
}

let FontAdjust = () => div([
  CommonButton('BIGGER', () => {
    update('font_size', $inc);
  }),
  CommonButton('SMALLER', () => {
    state.font_size > 1 && update('font_size', $dec);
  }),
  span({
    style: common_style(),
  }, state.font_size + 'px'),
]);

let Button = (key) => {
  if (state.click_counts[key] === undefined) {
    update('click_counts', key, 0);
  }
  return CommonButton(state.click_counts[key], () => {
    update('click_counts', key, $inc);
  });
};

let Reset = () => CommonButton('RESET', () => {
  update('click_counts', $any, 0);
  update('font_size', default_font_size);
});

let Sum = () => {
  let sum = 0;
  for (let key in state.click_counts) {
    sum += state.click_counts[key];
  }
  return p({
    style: common_style(),
  }, sum);
};

let App = () => div([
  Button('foo'),
  Button('bar'),
  Reset(),
  Sum(),
  FontAdjust(),
]);

let last_node;

function render_app() {
  let node = App();
  render(
    node,
    document.getElementById('app'),
    last_node,
  );
  last_node = node;
}

render_app();

}

