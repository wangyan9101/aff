## 目录

* [环境安装配置](#1)
* [基本用例：霓虹 Hello, world](#2)
* [html标签表示法一览](#3)
* [组件](#4)
* [app结构](#5)
* [状态更新操作一览](#6)
* [跟踪状态变化](#7)

<h2 id="1">环境安装配置</h2>

```bash
# 创建目录
mkdir guide
cd guide

# npm 初始化
npm init -y

# 安装模块
npm install --save-dev babel-core babel-loader babel-plugin-transform-object-rest-spread babel-preset-latest webpack webpack-dev-server affjs
```

webpack.config.js 配置文件
```js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
  },
  devtool: "source-map",
  devServer: {
    contentBase: __dirname,
    port: 5000,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
```

.babelrc 配置文件
```json
{
 "presets": ["latest"], 
 "plugins": ["transform-object-rest-spread"],
}
```

index.html 入口 html
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

main.js 入口js
```js
let {patch} = require('affjs').dom;
let {p} = require('affjs').tags;

patch(
  document.getElementById('app'),
  p('Hello, world!')
);
```

启动 webpack 开发服务器
```bash
./node_modules/.bin/webpack-dev-server  --inline --hot --watch
```

如果编译无误，打开 http://localhost:5000/ 可看到 Hello, world!

<h2 id="2">基本用例：霓虹helloworld</h2>

```js
let {
  tags: { div, span },
  app: { make_app },
  state: { $inc },
} = require('affjs');

let colors = [
  '#f26522',
  '#7fb80e',
  '#33a3dc',
  '#8552a1',
  '#ffe600',
  '#426ab3',
  '#d71345',
  '#00ae9d',
  '#ef5b9c',
];

// 初始状态，一个app使用唯一的对象保存所有状态
let init_state = {
  animation_tick: 0,
};

// App组件，所有组件都表示为函数
let App = (state) => div({
  // 样式定义
  style: {
    fontSize: '32px',
  },
}, [
  // 字符串分解成单个字符，并构造span
  'Hello, world!'.split('').map((c, i) => {
    let color_index = state.animation_tick - i;
    let color = color_index < 0 ? 'transparent' : colors[color_index % colors.length];
    // 返回的span作为div的子元素
    return span({
      style: {
        color: color,
        textShadow: `0 0 10px ${color}`, // 使用es6的模版字符串语法
      },
    }, c);
  }),
]);

// 生成app
let app = make_app(
  // 初始渲染的元素
  document.getElementById('app'),
  // 根组件
  App,
  // 初始状态
  init_state,
);

setInterval(() => {
  // 更新状态，触发app重新渲染
  app.update('animation_tick', $inc);
}, 100);
```

![colorful helloworld](images/colorful-helloworld.gif)

<h2 id="3">html标签表示法一览</h2>

```js
let {
  tags: { div, p, button },
} = require('affjs');

// 单个空标签
// <div></div>
div();
// <p></p>
p();

// 选择器
// <div id="main"></div>
div('#main'); 
// <div class="foo"></div>
div('.foo'); 
// <div class="foo bar baz"></div>
div('.foo .bar .baz'); 
// <div id="main" class="foo bar baz"></div>
div('#main .foo .bar. baz');

// 嵌套标签
// 使用 array 表示
// <div>
//   <div></div>
//   <div id="foo"></div>
//   <div>
//     <div class="bar"></div>
//   </div>
// </div>
div([
  div(),
  div('#foo'),
  div([
    div('.bar'),
  ]),
]);
// 如果只有一个子元素，可以直接嵌套
// <div>
//   <div>
//     <p></p>
//   </div>
// </div>
div(div(p()));
// 文本子元素，直接用字符串或数字表示，注意#或.开头的字符串会被认为是选择器
// <p>Hello, world!</p>
p('Hello, world!');
// <div><p>Hello, world!</p></div>
div(p('Hello, world!'));

// 属性
// id 和 class 的第二种表示法
// <div id="main" class="foo bar baz"></div>
div({
  id: 'main',
  class: 'foo bar baz',
});
// innerHTML
// <div><p>hello</p></div>
div({
  innerHTML: '<p>hello</p>',
});
// 样式
// <div style="color: black; font-size: 16px;"></div>
div({
  style: {
    color: 'black',
    fontSize: '16px',
  },
});
// 事件
button({
  onclick: () => {
    // ...
  },
});
button({
  onclick() {
    // ...
  }
});
// 其他key，都表示attr
// <div foo="FOO" bar="BAR"></div>
div({
  foo: 'FOO',
  bar: 'BAR',
});

// 两个参数，有几种组合
// 选择器 + 子元素
div('#main', [
  p('hello, world!');
]);
// 选择器 + 属性
div('#main', {
  class: 'foo bar baz',
  style: {
    position: 'fixed',
  },
});
// 属性 + 子元素
div({
  id: 'main',
  onclick() {
    // ...
  },
}, [
  p('hello, world!'),
]);

// 三个参数，代表选择器 + 属性 + 子元素
div('#main', {
  class: 'container',
}, [
  p('hello'),
]);
```

<h2 id="4">组件</h2>

组件是一个函数，这个函数构造一个标签并返回。
组件可以从外部传入状态，也就是外部状态可以作为函数的参数传入，返回的内容可以根据参数的不同而不同。

组件函数是一个纯函数，它的输出取决于它的输入。
一个组件函数，和它的输入，也就是一个实参列表，可以称为一个thunk（不知道这个术语有没有好的翻译？）。
thunk是渲染优化的基本单位，因为框架如果发现参数不变，那它的输出就不变，那就可以重新使用上一次函数的返回值，而不需要重新调用。
同理，如果发现参数改变了，组件函数会被重新调用，根据返回值再重新渲染界面。

组件函数也可以返回一个thunk。thunk可以作为标签的子元素。thunk就像一种自定义标签。

thunk 用 dom.t 函数构造。示例：

```js
let {
  dom: { t },
  tags: { button, div, img },
  app: { make_app },
  state: { $inc, $dec },
} = require('affjs');

// 一个按钮组件
let Button = (text, onclick) => button({
  onclick: onclick,
  // 样式也可以用字符串来表达，模板字符串支持多行
  style: `
    border: 3px solid #666;
    border-radius: 10px;
    background-color: white;
    width: 50px;
    height: 50px;
  `,
}, text);

// 一个布局组件，在圆周上均匀分布所有子元素
let Layout = (radius, base_degree, elems) => {
  return div({
    style: `
      width: ${radius * 2}px;
      height: ${radius * 2}px;
      border: 1px dotted #09C;
      border-radius: 50%;
      margin: ${radius / 2}px auto;
      position: relative;
    `,
  }, elems.map((elem, i) => {
    let degree = (i / elems.length * 360 + base_degree) % 360;
    let theta = 2 * 3.14 * (degree / 360);
    let x = radius * Math.cos(theta) + radius;
    let y = radius * Math.sin(theta) + radius;
    return div({
      style: `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%) rotate(${degree}deg);
      `,
    }, elem);
  }));
};

// App也是一个组件，它将被传入make_app函数并调用
// 调用的参数是内部的state，以及app的update函数
let App = (state, update) => {
  // 计数加一
  let inc = () => {
    update('counter', $inc);
  };
  // 计数减一
  let dec = () => {
    update('counter', $dec);
  };
  // 构造App
  return Layout(100, state.animation_tick % 360, [
    // 一个 Button 的 thunk
    t(Button, '＋', inc),
    // 另一个 thunk
    t(Button, '－', dec),

    // 不用thunk，直接调用Button也可以，但App每次调用，都会调用Button，
    // 而用thunk就只是生成一个对象，可以优化渲染效率
    Button('＋＋', inc),
    Button('－－', dec),

    // 显示计数状态
    div({
      style: `
        border: 3px solid #666;
        display: inline-block;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        text-align: center;
        background-color: white;
      `,
    }, state.counter),

    // 凑够6个元素
    img({src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/doge_thumb.gif'}),
  ]);
};

let app = make_app(
  document.getElementById('app'),
  App,
  {
    counter: 0,
    animation_tick: 0,
  },
);

setInterval(() => {
  app.update('animation_tick', $inc);
}, 50);
```

![counter](images/counter.gif)

<h2 id="5">app结构</h2>

前面已经用过 make_app 来构造一个app了。make_app 的参数也反映了一个app结构的组成部分：

一个用于初次渲染的浏览器元素，这个元素会被初次渲染替换掉，是一次性的，替换的元素不会保留这个初始元素的任何属性，包括id；

根组件，将组件函数直接传入。每次重渲染都会调用它，参数是当前状态和update函数；

初始状态树，一个object。

make_app返回一个app对象，它的成员如下：

update，用于更新状态树；

tap，用于读写状态树，参数是一个function(state)，如果有返回值，将传入update，更新状态树；

state，当前状态；

html，当前app元素的innerHTML

<h2 id="6">状态更新操作一览</h2>

app的update函数用于更新状态树，它的参数先是要改变的状态的路径，最后是改变的操作。

状态树是一个不变的结构，更新使用 path-copying 方式生成新的状态树，以提高组件重渲染检测的效率。
状态树的读操作和普通object一样，写操作需要用包装出来的函数。

各种操作的示例如下：

```js
let {
  state: { $inc, $dec, $merge, $push, 
    $reduce, $del_at, $map, $filter, $any},
  app: { make_app },
  tags: { div },
} = require('affjs');

// 创建 app
let app = make_app(
  document.getElementById('app'),
  () => div(),
  {},
);

// 辅助
let update = app.update;
let state = () => {
  let s;
  app.tap(state => {
    s = state;
  });
  return s;
};
let assert = console.assert;

// 赋值
update('number', 1);
assert(state().number == 1);
update('string', 'foo');
assert(state().string == 'foo');

// $inc 自增
update('number', $inc);
assert(state().number == 2);

// $dec 自减
update('number', $dec);
assert(state().number == 1);

// $merge 合并多个路径的操作
update($merge({
  'number': $inc,
  'string': 'FOO',
}));
assert(state().number == 2);
assert(state().string == 'FOO');

// $push array.push
update('array', [1, 2, 3]);
assert(state().array.length == 3);
update('array', $push(4));
assert(state().array.length == 4);

// $reduce object或array的reduce
update('array', $reduce((acc, cur, key) => {
  acc.push(cur * 2);
  return acc;
}, []));
assert(state().array[0] == 2);
assert(state().array[1] == 4);
assert(state().array[2] == 6);
assert(state().array[3] == 8);

// $del_at 删除array某个index的元素
update('array', $del_at(2));
assert(state().array.length == 3);
assert(state().array[0] == 2);
assert(state().array[1] == 4);
assert(state().array[2] == 8);

// $map array的map
update('array', $map(v => v / 2));
assert(state().array[0] == 1);
assert(state().array[1] == 2);
assert(state().array[2] == 4);

// $filter 对object和array，传入各个key和value，其他类型直接传入
update('array', $filter((value, i) => {
  return value <= 2;
}));
assert(state().array.length == 2);
assert(state().array[0] == 1);
assert(state().array[1] == 2);
update('number', $filter(n => n * 2));
assert(state().number, 4);

// $any 匹配所有路径，这是寻路用的，不是对状态的操作
update('array', $any, 42);
assert(state().array[0] == 42);
assert(state().array[1] == 42);

// 自定义操作，如果object的__is_op为真，即认为是一个操作，调用其apply成员实施操作
update('array', {
  __is_op: true,
  apply(obj) {
    return obj.map(x => x * 2);
  },
});
assert(state().array[0] == 84);
assert(state().array[1] == 84);
```

<h2 id="7">跟踪状态变化</h2>

make_app 的第四和第五个参数是两个回调，可以在状态更新前和更新后执行一些操作。

例如可以在console打印出更新前的状态、更新的操作、更新后的状态。有时对debug很有用。

```js
let {
  app: { make_app },
  tags: { div },
  state: { $map },
} = require('affjs');

let init_state = {
  foo: [1, 2, 3, 4, 5],
};

let App = (state) => {
  return div();
}

let app = make_app(
  document.getElementById('app'),
  App,
  init_state,
  // before update
  (state, ...args) => {
    console.log('%cBEFORE', 'background: #888; color: white', JSON.parse(JSON.stringify(state)));
    console.log('%cUPDATE', 'background: #555; color: white', args);
  },
  // after update
  (state, ...args) => {
    console.log('%cAFTER ', 'background: #333; color: white', JSON.parse(JSON.stringify(state)));
  },
);

app.update('foo', $map(v => v * 2));
```

![counter](images/state-trace.png)

这两个回调也可以通过继承 affjs.app.App 类并覆盖 beforeUpdate 和 afterUpdate 方法实现。不过代码就多一些。

# 未完待续
## 状态回滚与重放
## 默认状态
## 衍生状态
## 引用浏览器元素
## 样式表示方法及技巧
## 拖放
## 路由
## 单页多app结构
## 服务器端渲染
## 异步竞态问题
## 组件库
## 整合JSX
