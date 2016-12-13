## 环境安装配置

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

## 基本用例：霓虹 Hello, world
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
        textShadow: '0 0 10px ' + color,
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
