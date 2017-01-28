[![npm version](https://badge.fury.io/js/affjs.svg)](https://badge.fury.io/js/affjs)
[![Build Status](https://travis-ci.org/reusee/aff.svg?branch=master)](https://travis-ci.org/reusee/aff)
[![Coverage Status](https://coveralls.io/repos/github/reusee/aff/badge.svg?branch=master)](https://coveralls.io/github/reusee/aff?branch=master)

## 目录

* [代码示例](#demo)
* [环境安装与配置](#installation)
* [App 类](#app)

<h2 id="demo">代码示例</h2>

介绍一个框架，用实际的实例代码，应该是最直观的。

这个示例要实现的是，一个任务列表。
可以增加、展示、编辑、删除任务，以及标记为完成或未完成、按照完成状态过滤列表等等。

这个框架提供的绝大部分特性，都会使用到，以达到示例的目的。
代码只做简单的注释，各种机制将会在后续的章节里讲述。

```js
import 'normalize.css'
import 'animate.css'
import Navigo from 'navigo'

import {
  App, css, t, on, updater, key, $, skip,
  div, p, input, button, span, a, none, checkbox,
  $merge, $func, $del,
  DebugPanel,
} from '../index'

// 读保存在 local storage 里的状态
const saved = JSON.parse(window.localStorage.getItem('todos-data')) || {};
// 初始状态树
const initState = {
  // 任务信息
  todos: saved.todos || {},
  // 过滤器
  filter: saved.filter || 'all',
  // 过滤后的任务ID列表
  filtered: [],

  // 下面都是传递给组件的状态，属性名和组件名一样

  NewTodo: {
    // 更新 todos 状态的函数
    updateTodos: updater('todos'),
  },

  MaintainFiltered: {
    // 引用 todos 和 filter 状态
    $ref: ['todos', 'filter'],
    updateFiltered: updater('filtered'),
  },

  Filter: {
    $ref: ['filter', 'todos'],
  },

  List: {
    $ref: {
      todos: 'todos',
      ids: 'filtered',
    },
    hovering: '',

    // 嵌套的组件，对应有一个嵌套的状态
    Item: {
      updateHovering: updater('hovering'),
      updateTodos: updater('todos'),

      ItemControl: {
        updateTodos: updater('todos'),
      },
    },
  },

  DebugPanel: {
    show: true,
    left: '50%',
  },

};

// 根组件，传入的 state 就是上面定义的对象
function Main(state, app) {
  // div 标签，用 div 函数表示，标签的各种属性和子标签，用函数参数表示
  return div(
    // 表示样式，使用 es6 的模板字符串，加上 css 这个模板标签函数来表示
    css`
      width: 40vw;
      margin: 8px;
      padding: 8px;
      border: 1px solid #EEE;
      border-radius: 4px;
      color: #777;
      text-align: center;
    `,

    // 一个子标签
    p('TodoList', css`
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      margin: 8px;
    `),

    // 下面是嵌套的子组件，t 函数表示一个 thunk，thunk 是渲染优化的基本单位

    t(NewTodo, state.NewTodo),

    t(MaintainFiltered, state.MaintainFiltered),

    // 因为组件本身就是一个函数，所以可以直接调用，而不需要 t 函数包装
    // 但是就会失去渲染优化，每次渲染根组件，都会重新渲染 Filter 组件
    Filter(state.Filter),

    t(List, state.List),

    // 调试面板，DebugPanel 返回的不是组件，而是参数列表
    DebugPanel(app, state.DebugPanel),

    // 性能计数
    skip,
    div(
      () => {
        const counters = app.counters;
        const ret = [];
        for (const key in counters) {
          ret.push(p(key, ' => ', counters[key]));
        }
        return ret;
      },
    ),

  );
}

// 新建任务组件
function NewTodo(state) {

  // 新建任务，因为有两个地方要用到，所以写成函数
  function addTodo() {
    if (!state.userInput) {
      return
    }
    const id = Math.random().toString().substr(2);
    const content = state.userInput;
    // 更新组件状态，使用状态的 $update 函数，合并一个对象
    state.$update($merge({
      updating: true, // 过渡状态
    }));
    // 模拟异步新建操作
    setTimeout(() => {
      // updateTodos 是在状态树定义的更新函数
      state.updateTodos(id, {
        id: id,
        time: new Date().getTime(),
        content: content,
        done: false,
      });
      state.$update($merge({
        updating: false,
        userInput: '', // 清空输入
      }));
    }, 300);
  }

  return div(

    input(
      // 标签的属性，用一个 object 表示
      {
        value: state.userInput || '',
        disabled: state.updating,
      }, 
      // 注册 keyup 事件，同步用户输入到 userInput 这个状态
      on('keyup: update input', function() {
        state.$update('userInput', this.element.value);
      }), 
      // 注册 keydown 事件，按下回车时，新建任务
      on('keydown: add todo', (ev) => {
        if (ev.keyCode == 13) {
          addTodo();
        }
      }),
      css`
        width: 64%;
        border-radius: 4px 0 0 4px;
        border: 1px solid #CCC;
        padding: 4px 8px;
      `,
    ),

    // 一个按钮，点击时新建任务
    button(
      state.updating ? '...' : 'Add',
      on('click', addTodo),
      css`
        width: 64px;
        border: 1px solid #CCC;
        border-radius: 0 4px 4px 0;
        padding: 4px 8px;
      `,
    ),

    css`
      margin: 8px;
    `,
  );
}

// 维护过滤后的任务ID
function MaintainFiltered(state) {
  // 生成 ID 列表
  const filtered = [];
  for (const id in state.todos) {
    if (state.filter == 'all') {
      filtered.push(id);
    } else if (state.filter == 'done') {
      if (state.todos[id].done) {
        filtered.push(id);
      }
    } else if (state.filter == 'todo') {
      if (!state.todos[id].done) {
        filtered.push(id);
      }
    }
  }

  // 排序
  filtered.sort((a, b) => {
    return state.todos[b].time - state.todos[a].time;
  })
  // 更新状态
  state.updateFiltered(filtered);
  // 这个是功能性组件，没有视觉元素，所以返回 null
  return null;
}

// 任务列表
function List(state) {
  return div(
    css`
      margin: 8px;
    `,
    // 遍历 ID 列表，生成各个任务组件
    state.ids.map(id => t(Item, 
      key`item-${id}`,
      state.Item,
      state.todos[id], 
      // hovering
      id == state.hovering,
    )),
  );
}

// 任务组件
function Item(state, info, hovering) { 
  // 更新任务内容的函数
  const saveContent = () => {
    // 模拟异步保存操作
    info.$update('status', 'saving');
    setTimeout(() => {
      info.$update('status', '');
    }, 1000);
  }

  return div(
    $`.animated .slideInRight`,
    css`
      text-align: left;
      background-color: ${hovering ? '#EEE' : 'transparent'};
      border-radius: 4px;
      padding: 8px;
    `,
    on('mouseenter', () => {
      state.updateHovering(info.id);
    }),
    on('mouseleave', () => {
      state.updateHovering('');
    }),

    // 一般状态下，显示一个 checkbox 和任务内容
    !info.status || info.status == 'finish-removing' ? [
      checkbox({
        checked: info.done,
      }, on('click', () => {
        info.$update('done', $func(v => !v));
      })),
      span(info.content, css`
        margin-left: 8px;
        color: ${info.done ? '#AAA' : 'inherit'};
        text-decoration: ${info.done ? 'line-through' : 'none'};
      `),
    ] : null,

    // 编辑时，显示输入框
    info.status == 'editing' ? [
      input({
        value: info.content,
      }, on('keyup: update content', function() {
        info.$update('content', this.element.value);
      }), on('keydown: update content and done editing', function(ev) {
        if (ev.keyCode == 13) {
          saveContent();
        }
      }), css`
        border: 0;
        width: 80%;
        background-color: #EFE;
        border-radius: 5px;
        padding: 0 8px;
      `),
    ] : null,

    // 保存或删除过程中，显示提示状态
    info.status == 'saving' || info.status == 'removing' ? div(info.status, css`
      width: 100%;
      color: #88F;
      text-align: center;
    `) : null,

    // 删除动画
    info.status == 'finish-removing' ? [
      {
        classList: ['animated', 'slideOutRight'],
      },
      // 动画完成后，删除条目
      on('animationend', () => {
        state.updateTodos($del(info.id));
      }),
    ] : null,

    // 鼠标指向任务时，显示控制按钮
    hovering ? ItemControl(state.ItemControl, info, saveContent) : null,

  );
}

// 任务条目控制按钮
function ItemControl(state, info, saveContent) {
  // 按钮的共用样式
  const buttonStyle = css`
    display: inline-block;
    margin-left: 8px;
    border: 0;
    background-color: transparent;
    user-select: none;
    cursor: pointer;
    padding: 0 8px;
    border-radius: 4px;
    color: #666;
  `;

  return span(
    css`
      float: right;
    `,

    // 一般情况下，显示删除和编辑按钮
    !info.status ? [
      button(buttonStyle, 'Remove', on('click', () => {
        // 模拟异步操作
        info.$update('status', 'removing');
        setTimeout(() => {
          // 进入删除动画，动画完成后，才删除条目
          info.$update('status', 'finish-removing');
        }, 1000);
      })),
      button(buttonStyle, 'Edit', on('click', () => {
        info.$update('status', 'editing');
      })),
    ] : null,

    // 编辑状态时，显示保存按钮
    info.status == 'editing' ? [
      button(buttonStyle, 'Done', on('click', () => {
        saveContent();
      })),
    ] : null,

  );
}

// 过滤条件选择组件
function Filter(state) {
  return div(
    css`
      margin: 8px;
    `,

    'Filter: ',

    // 每个条件生成一个按钮
    [
      { name: 'all', filter: _ => true, },
      { name: 'todo', filter: i => !i.done },
      { name: 'done', filter: i => i.done },
    ].map(info => div(
      info.name, 
      // 显示符合该过滤条件的条目数量
      () => {
        const count = Object.keys(state.todos).reduce((acc, cur) => 
          acc + (info.filter(state.todos[cur]) ? 1 : 0), 0);
        if (count > 0) {
          return ` (${count}) `;
        }
        return null;
      },
      css`
        display: inline-block;
        border: 1px solid #CCC;
        padding: 4px 8px;
        border-radius: 4px;
        margin-left: 8px;
        background-color: ${info.name == state.filter ? '#EEE' : 'transparent'};
        user-select: none;
        cursor: pointer;
      `, 
      // 点击时，设定过滤条件
      on('click', () => {
        router.navigate(`/filter/${info.name}`);
      }),
    )),

  );
}

// 启动一个 app
const app = new App(
  // 初始渲染的元素
  document.getElementById('app'),
  // 初始状态
  initState,
  // 根组件
  Main,

  // 状态更新后，保存一些状态到 local storage
  on('afterUpdate', (state) => {
    window.localStorage.setItem('todos-data', JSON.stringify({
      todos: state.todos,
      filter: state.filter,
    }));
  }),
);

// 路由
const router = new Navigo('/');
router
  .on('/filter/:filter', (params) => {
    // 选择过滤器
    app.update('filter', params.filter);
  })
  .resolve();

```

<h2 id="installation">环境安装与配置</h2>

推荐使用的开发环境是 babel + webpack，下面将简单介绍安装及配置方法。
如果已经熟悉，可以跳过这部分。

如果不喜欢转译器或者构建工具，也可以直接用`<script>`标签引入，lib 目录下是 UMD 格式的库文件。

```bash
# 创建目录
mkdir project
cd project

# npm 初始化
npm init -y

# 安装 babel
npm install --save-dev babel-core babel-loader babel-plugin-transform-object-rest-spread babel-preset-latest 
# 安装 webpack
npm install --save-dev webpack webpack-dev-server 
# 安装 affjs，也就是这个框架
npm install --save-dev affjs
# 示例里用到了 normalize.css 和 animate.css，一并装上
npm install --save-dev css-loader style-loader normalize.css animate.css
```

创建 webpack.config.js 配置文件
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
        exclude: /node_modules(?!\/affjs)/,
        loader: 'babel-loader',
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ],
  },
}
```

创建 .babelrc 配置文件
```json
{
 "presets": ["latest"], 
 "plugins": ["transform-object-rest-spread"],
}
```

基本的环境就安装配置完成了，下面试一试 hello world。

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
import { App, p } from 'affjs'

new App(
  document.getElementById('app'),
  {},
  () => p('Hello, world!'),
);


```

启动 webpack 开发服务器
```bash
./node_modules/.bin/webpack-dev-server  --inline --hot --watch
```

如果编译无误，打开 http://localhost:5000/ 可看到 "Hello, world!" 字样，即说明环境正常。

<h2 id="app">App 类</h2>

在环境安装一节，用了一个 hello world 程序来测试环境是否正常：

```js
import { App, p } from 'affjs'

new App(
  document.getElementById('app'),
  {},
  () => p('Hello, world!'),
);


```

App 类的构造函数有三种参数：

* `document.getElementById('app')` 表示将 id 为 app 的元素作为初次渲染的元素
* `{}` 表示初始状态，这里是一个空对象
* `() => p('Hello, world!')` 表示根组件，p 函数表示一个 p 标签，后面会有专门章节讲到

这三种参数可以是任意顺序，构造函数会根据参数类型来判断意义。
HTMLElement 类型的是初始渲染元素，typeof 运算结果为 'function' 的参数是根组件，还有事件定义等等，后面会讲到。
其他类型的参数，如对象、数值、数组、字符串等都看作全局状态。当然实际开发中，全局状态一般是一个对象。

参数个数也可以少于三。后续可以用 App.init 方法继续指定初始化参数：

```js
const app = new App('Hello, world'); // 只指定全局状态
app.init(
  document.getElementById('app'), // 继续指定参数
  (state) => p(state), // 根组件定义，相当于 `<p>Hello, world</p>`
);
```

三种类型的参数都有了之后，才开始渲染。

这个框架里的 App 类，和其他一些框架里的有状态组件类似。
但因为这个框架里的组件指一个函数，比这个要轻量很多，所以将这个有状态和关联浏览器元素的称作 App。

一个 html 页面可以有多个 App，根据功能和规模来适当划分即可。
如果两个功能组件之间不需要共享状态，就可以各用一个 App。



