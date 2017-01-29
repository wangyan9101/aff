<h2 id="update">状态的更新</h2>

程序状态必然需要更新，而且状态更新前后，框架需要做一些额外的工作。
所以想要更新状态，不能直接对状态树进行赋值操作，而是调用 App 实例的 update 函数。

update 方法的参数，先是指定一个更新的路径，最后是要执行的操作。
更新的路径，就是从根状态对象开始，到达某个子状态所经过的属性名或者数组下标。

例如 `state.a.b.c[1][2]` 所指向的状态，它的更新路径是 `'a', 'b', 'c', 1, 2`。

示例：

```js
import { App, div } from 'affjs'

const app = new App(
  // 初始状态
  {
    n: 0,
  },
  // 不要初始元素和根组件，也可以进行状态操作
);

// 路径为 'n'，用字符串表示属性名
// 最后一个参数为 1，表示更新该路径对应的属性值为 1
app.update('n', 1);
// 输出 1
console.log(app.state.n); 
```

嵌套的对象，用多个属性名字符串表示路径：

```js
import { App, div } from 'affjs'

const app = new App(
  {
    foo: {
      bar: {
        baz: 0,
      },
    },
  },
);

// 表示 app.state.foo.bar.baz 更改为 42
app.update('foo', 'bar', 'baz', 42);
// 输出 42
console.log(app.state.foo.bar.baz); 
```

同时更新多条路径，用 updateMulti 方法：

```js
import { App, div } from 'affjs'

const app = new App(
  {
    n: 0,
    foo: {
      bar: {
        baz: 0,
      },
    },
  },
);

// 更新多条路径，各个参数列表作为 array 传入
app.updateMulti(
  ['n', 1],
  ['foo', 'bar', 'baz', 42],
);
// 输出 1 和 42
console.log(app.state.n);
console.log(app.state.foo.bar.baz); 
```

路径也可以是一个函数，这个函数的参数是属性名，返回值如果为 true，表示匹配这个属性名对应的路径，为 false 表示不匹配。示例：

```js
import { App, div, $inc } from 'affjs'

const app = new App(
  // 初始状态为数组
  [1, 2, 3, 4, 5, 6, 7, 8],
);

app.update(
  // 匹配索引大于等于 2 的路径
  index => index >= 2,
  // 自增
  $inc,
);

// 输出 [1, 2, 4, 5, 6, 7, 8, 9]
// 索引大于等于 2 的元素，都 +1 了
console.log(app.state);
```

上面 update 调用的最后一个参数不是要更新的值，而是一个操作符。
$inc 这个操作符表示的是将数值的状态更新为 +1 的值。

除了 $inc，还有 $dec，表示 -1：

```js
import { App, div, $dec } from 'affjs'

const app = new App(
  [1, 2, 3, 4, 5, 6, 7, 8],
);

app.update(
  index => index >= 2,
  $dec,
);

// 输出 [1, 2, 2, 3, 4, 5, 6, 7]
console.log(app.state);
```

$func 操作符可以接受一个函数参数，状态将作为参数传入这个函数，这个函数的输出将作为更新值：

```js
import { App, div, $func } from 'affjs'

const app = new App(
  [1, 2, 3, 4, 5, 6, 7, 8],
);

app.update(
  index => index >= 2,
  $func(x => x * x),
);

// 输出 [1, 4, 9, 16, 25, 36, 49, 64]
console.log(app.state);
```

框架还提供了 Array 的一些方法：
* $push
* $unshift
* $splice
* $fill
* $sort
* $filter
* $map

上面这些操作符的参数和同名的 Array 方法是一样的。

下面这些 Array 操作符不需要参数：
* $pop
* $shift
* $reverse

另外还有 $delete 操作符，作用和 js 的 delete 操作符一样，参数是属性名。

最后是 $merge 操作符，用于合并另一个对象的属性：

```js
import { App, $merge, $inc } from 'affjs'

const app = new App({
  foo: {
    bar: 'bar',
    baz: 'baz',
    qux: 1,
  },
});

app.update($merge({
  foo: {
    bar: 'BAR',
    baz: 'BAZ',
    qux: $inc,
  },
}));

// 上面的 update 相当于
app.updateMulti(
  ['foo', 'bar', 'BAR'],
  ['foo', 'baz', 'BAZ'],
  ['foo', 'qux', $inc],
);
```

也就是递归遍历对象，将属性名作为路径，将非对象类型的属性作为更新操作。

所以在使用 $merge 时需要注意，对象都是看作表达路径的。
如果更新操作是替换成另一个对象，需要用 `$func(_ => newObject)` 包装起来，避免将对象解构成路径。

