<h2 id="routing">路由</h2>

这个框架没有实现路由功能，因为使用的是纯 js，所以集成使用第三方路由库是轻而易举的事情。
也不需要什么封装，选一个喜欢的三方库使用即可。

最开始的 任务列表 示例里，使用了 navigo 这个路由库，可以作为参考。

要点是，在路由关联的回调里，改变状态树的某些值，然后根据这些值，渲染出不同的组件。
可以将路由信息理解为，持久化了的一些子状态。
