## 目录

* [环境安装配置](#1)
* [基本用例：霓虹 Hello, world](#2)
* [html标签表示法一览](#3)
* [组件](#4)
* [App类](#5)
* [状态更新操作一览](#6)
* [跟踪状态变化](#7)
* [状态回滚与重放](#8)
* [默认及衍生状态](#9)

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
  app: { App },
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

// 根组件，所有组件都表示为函数
let Main = (state) => div({
  // 样式定义，用一个object表示
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
      // 样式定义，也可以用string表示，下面使用的是es6的模板语法
      style: `
        color: ${color};
        text-shadow: 0 0 10px ${color}; 
      `,
    }, c);
  }),
]);

// 生成app
let app = new App(
  // 初始渲染的元素
  document.getElementById('app'),
  // 根组件
  Main,
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
  p('hello, world!'),
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
  app: { App },
  state: { $inc, $dec },
} = require('affjs');

// 一个按钮组件，文字和点击事件都作为参数，从外部传入
let Button = (text, onclick) => button({
  onclick: onclick,
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

// 初始化app
let app = new App(
  // 在这个元素处渲染
  document.getElementById('app'),
  // 初始状态
  {
    counter: 0,
    animation_tick: 0,
  },
);

// Main也是一个组件
// state参数是app当前的状态
let Main = (state) => {
  // 计数加一
  let inc = () => {
    app.update('counter', $inc);
  };
  // 计数减一
  let dec = () => {
    app.update('counter', $dec);
  };
  // 构造根组件
  return Layout(100, state.animation_tick % 360, [

    // 一个 Button 的 thunk
    t(Button, '＋', inc),
    // 另一个 thunk
    t(Button, '－', dec),

    // 不用thunk，直接调用Button也可以，但每次构造Main，都会直接调用
    // 而用thunk就只是生成一个对象，选择性地调用Button，可以优化渲染效率
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

// 继续初始化app，初始元素、初始状态、组件函数都设定好之后，app就开始渲染了
app.init(Main);

// 更新animation_tick，驱动动画
setInterval(() => {
  app.update('animation_tick', $inc);
}, 50);
```

![counter](images/counter.gif)

<h2 id="5">App类</h2>

App类的构造函数会根据参数类型的不同，初始化不同的成员

* 如果类型为 HTMLElement，也就是浏览器DOM元素，会作为首次渲染所使用的元素
* 如果类型为函数，会作为根组件函数，每次重新渲染都会调用
* 其他类型都作为初始状态，一般为object类型

如果构造函数的参数没有提供所有这三种参数，则推迟首次渲染。
可以使用 init 方法继续初始化过程，对参数的处理和构造函数一样。
三种参数集齐后，App将开始渲染。

App类常用的方法及属性如下：

* update(...path, operation)，用于更新状态树
* tap(function(state))，用于读写状态树，如果传入的函数有返回值，返回值将传入update方法，更新状态树
* html()，返回根组件的innerHTML
* state，当前状态

<h2 id="6">状态更新操作一览</h2>

App类关联的状态树是一个普通的对象，但更新操作不能直接用赋值进行，且为了避免失误，会递归地调用Object.freeze冻结所有子对象。
为什么不能直接更新？因为更新操作需要保证原有的状态对象不变，所以是通过path-copying算法更新并构建一个新的状态对象。
另外状态更新之后，需要触发一次或者多次的组件及元素状态的更新，以及其它关联动作如beforeUpdate、afterUpdate等。
所以更新操作是统一由App类的update方法进行。

App的update方法的参数先是要改变的状态的路径，最后是改变的操作。

各种操作的示例如下：

```js
let {
  state: { $inc, $dec, $merge, $push, 
    $reduce, $del_at, $map, $filter, $any},
  app: { App },
  tags: { div },
} = require('affjs');

let app = new App(
  document.getElementById('app'),
  () => div(),
  {},
);
let assert = console.assert;

// 赋值
app.update('number', 1);
assert(app.state.number == 1);
app.update('string', 'foo');
assert(app.state.string == 'foo');

// $inc 自增
app.update('number', $inc);
assert(app.state.number == 2);

// $dec 自减
app.update('number', $dec);
assert(app.state.number == 1);

// $merge 合并多个路径的操作
app.update($merge({
  'number': $inc,
  'string': 'FOO',
}));
assert(app.state.number == 2);
assert(app.state.string == 'FOO');

// $push array.push
app.update('array', [1, 2, 3]);
assert(app.state.array.length == 3);
app.update('array', $push(4));
assert(app.state.array.length == 4);

// $reduce object或array的reduce
app.update('array', $reduce((acc, cur, key) => {
  acc.push(cur * 2);
  return acc;
}, []));
assert(app.state.array[0] == 2);
assert(app.state.array[1] == 4);
assert(app.state.array[2] == 6);
assert(app.state.array[3] == 8);

// $del_at 删除array某个index的元素
app.update('array', $del_at(2));
assert(app.state.array.length == 3);
assert(app.state.array[0] == 2);
assert(app.state.array[1] == 4);
assert(app.state.array[2] == 8);

// $map array的map
app.update('array', $map(v => v / 2));
assert(app.state.array[0] == 1);
assert(app.state.array[1] == 2);
assert(app.state.array[2] == 4);

// $filter 对object和array，传入各个key和value，其他类型直接传入
app.update('array', $filter((value, i) => {
  return value <= 2;
}));
assert(app.state.array.length == 2);
assert(app.state.array[0] == 1);
assert(app.state.array[1] == 2);
app.update('number', $filter(n => n * 2));
assert(app.state.number, 4);

// $any 匹配所有路径，这是寻路用的，不是对状态的操作
app.update('array', $any, 42);
assert(app.state.array[0] == 42);
assert(app.state.array[1] == 42);

// 自定义操作，如果object的__is_op为真，即认为是一个操作，调用其apply成员实施操作
app.update('array', {
  __is_op: true,
  apply(obj) {
    return obj.map(x => x * 2);
  },
});
assert(app.state.array[0] == 84);
assert(app.state.array[1] == 84);
```

<h2 id="7">跟踪状态变化</h2>

继承App类，并覆盖beforeUpdate和afterUpdate方法，可以在状态更新前后，执行一些动作。
例如打印更新前后的状态，和更新操作的内容。这样可以方便地跟踪状态的变化，debug时可能用得上。

```js
let {
  app: { App },
  tags: { div },
  state: { $map },
} = require('affjs');

class StateTracingApp extends App {
  constructor(...args) {
    super(...args);
  }

  // 将在状态更新前执行
  beforeUpdate(state, ...args) {
    console.log('%cBEFORE', 'background: #888; color: white', JSON.parse(JSON.stringify(state)));
    console.log('%cUPDATE', 'background: #555; color: white', args);
  }

  // 将在状态更新后执行
  afterUpdate(state, ...args) {
    console.log('%cAFTER ', 'background: #333; color: white', JSON.parse(JSON.stringify(state)));
  }
}

let init_state = {
  foo: [1, 2, 3, 4, 5],
};

let app = new StateTracingApp(
  document.getElementById('app'),
  () => div(),
  init_state,
);

// 更新状态
app.update('foo', $map(v => v * 2));
```

![counter](images/state-trace.png)

<h2 id="8">状态回滚与重放</h2>

因为状态树都是不变的数据结构，所以可以保存下某个时刻的状态，在需要时回滚。
或者记录一系列的状态，按照时间顺序重新置入App实例内，可用于debug中。
也可以保存子状态树，它们也是保持不变的。

例子如下：

```js
let {
  app: { App },
  tags: { div, none },
  state: { $merge },
} = require('affjs');

let init_state = {
  r: 0,
  g: 0,
  b: 0,
};

// App的子类，增加snapshot方法
class AppWithSnapshot extends App {
  constructor(...args) {
    super(...args);
    this.snapshots = [];
  }

  snapshot() {
    // 将当前状态保存
    this.snapshots.push(this.state);
  }
}

// 半初始化，因为Main组件要用到app的方法，所以先生成
let app = new AppWithSnapshot(
  document.getElementById('app'),
  init_state,
);

function Main(state) {
  return div([
    // 点击时颜色随机变化的圆
    div({
      style: `
        background-color: rgb(${state.r}, ${state.g}, ${state.b});
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 0 auto;
      `,
      onclick() {
        // 更新前创建快照
        app.snapshot();
        // 随机颜色
        app.update($merge({
          r: Math.ceil(Math.random() * 255),
          g: Math.ceil(Math.random() * 255),
          b: Math.ceil(Math.random() * 255),
        }));
      },
    }),

    // 显示历史颜色，点击切换状态
    // 切换颜色时，会触发重新渲染，虽然用到的数据并不在状态树内
    // 因为第一次渲染时，app变量仍为undefined，所以用三元运算符做一个判断
    app ? div({
      style: `
        margin: 0 auto;
        text-align: center;
        margin-top: 20px;
        max-width: 150px;
      `,
    }, app.snapshots.map(snapshot => div({
      style: `
        background-color: rgb(${snapshot.r}, ${snapshot.g}, ${snapshot.b});
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-block;
        margin: 0 5px;
      `,
      onclick() {
        // 直接将app的状态更新为历史状态
        app.update(snapshot);
      },
    }))) : none,
  ]);
}

// 完成app的初始化
app.init(Main);
```

![counter](images/snapshot.gif)

这个例子的目的并不是要实现这种交互，而是说明可以如何处理状态。
不变的数据结构在实现 "时间机器" 这种功能方面是十分容易的。

<h2 id="9">默认及衍生状态</h2>

# 未完待续
## 引用浏览器元素
## 路由
## 单页多app结构
## 服务器端渲染
## 异步竞态问题
