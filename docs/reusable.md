<h2 id="reusable">代码复用</h2>

在这个框架里，可以复用的代码单元不仅仅是组件，还有其他方式的。

<h3>复用标签函数的参数</h3>

标签函数的参数，可以是嵌套的子标签、标签属性（包括 id、class 等）、事件回调、样式定义等等。
这些参数都是用 js 的表达式表示，所以可以很自然地复用。示例：

```js
import { App, div, span, on, button, $inc, css } from 'affjs'

const app = new App(
  document.getElementById('app'),
  {
    n: 0,
  },
  (state) => {
    // 共同的行为，点击 +1
    const clickToAddOne = on('click:click-to-add', () => {
      state.$update('n', $inc);
    });
    // 共同的样式定义
    const buttonStyle = css`
      border: 1px solid grey;
      background-color: white;
      border-radius: 10px;
      margin: 0 5px;
    `;
    return div(
      // 三个按钮，拥有共同的点击行为和基本样式
      button(clickToAddOne, buttonStyle, 'Button A'),
      button(clickToAddOne, buttonStyle, 'Button B'),
      button(clickToAddOne, buttonStyle, 'Button C',
        // 在共同样式之外，可以定义独特的样式
        css`
          font-weight: bold;
          color: #09C;
        `,
      ),
      // 显示计数
      span(state.n),
    );
  },
);
```

上面的例子里，clickToAddOne 和 buttonStyle 就是可复用的单元，粒度比组件要小。

标签函数的参数，如果为数组类型，数组的元素会被取出，作为参数处理 (也就是数组会被 flatten)。
所以 clickToAddOne 和 buttonStyle 也可以合而为一：

```js
import { App, div, span, on, button, $inc, css } from 'affjs'

const app = new App(
  document.getElementById('app'),
  {
    n: 0,
  },
  (state) => {
    // 合并行为和样式定义
    const buttonCommon = [
      on('click:click-to-add', () => {
        state.$update('n', $inc);
      }),
      css`
        border: 1px solid grey;
        background-color: white;
        border-radius: 10px;
        margin: 0 5px;
      `,
    ];
    return div(
      // 用 buttonCommon 替代 clickToAddOne 和 buttonStyle
      button(buttonCommon, 'Button A'),
      button(buttonCommon, 'Button B'),
      button(buttonCommon, 'Button C',
        css`
          font-weight: bold;
          color: #09C;
        `,
      ),
      span(state.n),
    );
  },
);
```

<h3>样式定义的复用</h3>

样式定义有两种方式，一种是对象式，一种是字符串式。
现代的 js 特性使得这两种方式的代码复用，都可以方便地实现。

对象式，可以用 object spread 语法：

```js
import { App, div } from 'affjs'

// 可复用的样式
const cardStyle = {
  margin: '5px',
  padding: '5px',
  border: '1px solid #CCC',
};

const app = new App(
  document.getElementById('app'),
  {},
  (state) => div(
    {
      // object spread 语法
      style: {...cardStyle,
        color: '#333',
        textAlign: 'center',
      },
    },
    'Hello, world!',
  ),
);
```

字符串式，可以用 ${...} 插入表达式：

```js
import { App, div, css } from 'affjs'

// 可复用样式，注意这里并不需要加 css 标签，因为只是作为字符串插入
const cardStyle = `
  margin: 5px;
  padding: 5px;
  border: 1px solid #CCC;
`;

const app = new App(
  document.getElementById('app'),
  {},
  (state) => div(
    // cardStyle 作为字符串直接插入
    css`
      ${cardStyle}
      text-align: center;
      color: #333;
    `,
    'Hello, world!',
  ),
);
```

注意对象式和字符串式定义不能在同一个标签函数内混用。
因为没法简单地合并。

因为这个框架讲求用纯 js 代码来表达，所以，任何 js 可以用的代码复用方式，都可以应用上。

