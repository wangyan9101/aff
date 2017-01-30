<h2 id="state-object-update">状态对象的 $update 方法</h2>

前一节介绍了 App 类的 update 方法。实际上初始状态对象的每个子对象，都设置了一个 $update 方法，用于更新这个子对象。

$update 方法的参数和 App.update 方法类似。不同之处是，路径是以该对象的路径为根路径。

示例：

```js
import { App } from 'affjs'

const app = new App({
  foo: {
    bar: {
      baz: {
        qux: 'QUX',
      },
    },
  },
});

// App 的 update 方法
app.update('foo', 'bar', 'baz', 'qux', 'new QUX');

// 子状态对象的 update 方法
const childState = app.state.foo.bar.baz;
childState.$update('qux', 'New QUX');
```

$update 方法的一个好处是，使组件代码里不出现 app 的引用，避免与具体的 app 实例耦合，从而保证组件的可复用性。

$update 方法在调用时，最终也是调用 App.update 方法，影响的是全局的状态。所以是结合了组件本地状态和全局状态两种风格的优点。

框架会将所有进入状态树的对象都加上 $update 方法。
这会带来一些开销。如果这些对象不需要更新，不需要这两个方法，可以用 readOnly 函数标记一下。
将对象作为参数传入即可，返回的对象会带上只读标记，框架不会为对象加上这两个方法。

另外，因为一个状态对象只会记录一个路径，所以一个对象的路径设定好之后，就不能变更了。
如果将一个已经设定了路径的对象，更新到状态树的其他路径，框架将会报错。
解决方法是避免在不同路径引用到同一个对象。或者在更新时使用 readOnly 函数标记该对象，这样就会跳过路径的检查。

