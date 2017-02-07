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
        exclude: /node_modules/,
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
{{template "hello.js"}}
```

启动 webpack 开发服务器
```bash
./node_modules/.bin/webpack-dev-server  --inline --hot --watch
```

如果编译无误，打开 http://localhost:5000/ 可看到 "Hello, world!" 字样，即说明环境正常。

现在可以试试前一节的任务列表实例。先装上路由库 navigo：

```bash
npm install --save-dev navigo
```

再将 main.js 的内容替换成任务列表示例代码，重新编译刷新后，就可以看到效果了。
