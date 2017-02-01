<h2 id="app">App 类</h2>

在环境安装一节，用了一个 hello world 程序来测试环境是否正常：

```js
{{template "hello.js"}}
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

除了上述三种参数，还可以用 on 函数注册一些回调，以在某些时机执行一些代码。

例如 beforeUpdate 和 afterUpdate，可以分别在状态更新之前和之后，执行回调：

```js
{{template "app-event.js"}}
```
