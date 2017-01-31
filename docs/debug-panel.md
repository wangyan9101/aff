<h2 id="debug-panel">调试面板</h2>

框架自带了一个简易的信息面板，可以显示当前状态树，以及状态树的变更历史。使用方法：

```js
{{template "debug-panel.js"}}
```

![debug-panel](images/debug-panel.png)

![debug-panel](images/debug-panel2.png)

按 ctrl + q 可以切换显示与隐藏状态。

当前状态，在 state 标签页；更新记录，在 updates 标签页。左下角的按钮用于调整位置。

