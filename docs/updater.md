<h2 id="updater">状态树中的更新函数</h2>

在上一节里，MaintainRGB 组件的第二个参数是一个更新函数。
这个函数用于更新 rgb 状态。
因为 MaintainRGB 的 state 参数只包含 r, g, b，不包含 rgb，所以需要传递额外的函数用于更新。

MaintainRGB 的 state 参数不可以包含 rgb 参数，因为这个组件本身会改变 rgb，改变 rgb 又会触发它的重新计算，导致死循环，框架会抛出异常。

对于这种常用的场景，框架提供了一个方便的机制，用于定义更新函数。

示例：

```js
{{template "derived-state-updater.js"}}
```

MaintainRGB 的状态增加了一个 update 属性，它的属性值是 `updater('rgb')`，表示调用 update 即可更新名为 rgb 的状态。

updater 函数的第一个参数是要更新的状态的名字，查找的规则和解析引用类似。updater 的其他函数，将直接传递给最终的 App.update 函数。

在初始的 MaintainRGB 状态里增加 update 函数之后，MaintainRGB 组件的第二个参数就可以去掉了。
在 MaintainRGB 组件里需要更新 rgb 的时候，调用 state.update 即可。

updater 函数还可以有第二个参数，这个参数是一个函数。
在调用 updater 返回的函数时，将参数再传递给这个参数函数，相当于再做一次包装：

```js
{{template "derived-state-updater-func.js"}}
```

MaintainRGB 的 update 函数，现在的参数变成了 r, g, b 三个。
这是在 updater 的第二个参数里定义的。
传递给 updater 函数的第二个函数参数，它的第一个参数是 rgb 状态的 $update 方法，其余参数代表返回的函数的参数列表。

也就是说，调用 MaintainRGB.update 的时候，rgb.$update 并不是直接调用，而只是传递给了这个函数，让开发者决定何时调用，以何参数调用。

这个机制的作用是，对 $update 方法的参数做一些调整，例如上面是构造 'rgb(40, 50, 60)' 这个字符串。
单单用 updater 是表达不了这个逻辑的，只能在组件代码里构造字符串。

当然，滥用这个机制，在初始状态树里定义过于复杂的 updater，也是不好的。
