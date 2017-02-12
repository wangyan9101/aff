<h2 id="updater">状态树中的更新函数</h2>

<h3>updater</h3>

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

updater 函数的第一个参数是要更新的状态的名字，查找的规则和 $ref 标志类似。updater 的其他函数，将直接传递给最终的 App.update 函数。

在初始的 MaintainRGB 状态里增加 update 函数之后，MaintainRGB 组件的第二个参数就可以去掉了。
在 MaintainRGB 组件里需要更新 rgb 的时候，调用 state.update 即可。

<h3>withState</h3>

TODO
