<h2 id="default-and-derived-state">默认状态及衍生状态</h2>

设置默认状态，最简单的方法是写在初始状态里：

```js
const init_state = {
  sort_by: 'timestamp',
};
```

或者写在组件函数里：

```js
const List = (state) => {
  if (!state.sort_by) {
    state.$update('sort_by', 'timestamp');
  }
  return div();
};
```

衍生状态，指将某些状态通过一定运算得出的状态，可以在初始状态里用getter实现：

```js
const init_state = {
  r: 0,
  g: 0,
  b: 0,
  // 在组件里可以用 state.rgb 获得计算出来的值
  get rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  },
};
```

但上面的方法只适合计算量少的，如果计算量很大，应该用下面的方法：

```js
{{template "derived-state.js"}}
```

上面的示例，在第一次渲染时，会更新 rgb 这个状态。
以后只在 r、g、b 这三个状态更新的时候，才更新 rgb。

MaintainRGB 这个组件并没有视觉上的作用，而是用于观察 r、g、b 这三个状态。
当被观察的状态改变时，执行一些动作，这里是更新另一个状态，使其保持一致。

用这种模式可以实现很复杂的关联计算，衍生的状态本身也可以被其他衍生状态观察，而这些都是定义好，就不需要操心的了，框架会自动计算好。

