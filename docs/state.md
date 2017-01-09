<h2 id="state">全局状态</h2>

在前面的几个示例里，已经用到了全局的状态，作为参数传递给 App 的构造函数。

虽然全局状态可以是其他的类型，但一般全局状态的类型都是对象。
对象嵌套对象，形成树状的结构，所以又可以称作全局状态树。

程序的状态统一保存在一个对象里，有几个好处：
* 方便将状态持久化及反持久化；
* 方便审查当前整个程序的状态；
* 方便记录并查看状态的变化过程；
* 方便 mock 状态，有利于排错及测试。

将源自全局状态树的值，作为组件函数的参数，就能让组件实例关联到状态树中的一个或者多个状态。