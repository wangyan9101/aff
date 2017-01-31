<h2 id="tags">html 标签的表示</h2>

这个框架没有用 html 模板或者 JSX，而是用函数，以及函数的参数来表示 html 的结构和样式等等。
因为是纯 js 代码，所以不需要预处理器。而且和 hyperscript 这样的表达方式也不一样。

在 hello world 示例中用到了 p 函数来表示一个 p 标签，下面将展开讲述相关的机制。

<h3>基本表示</h3>

最简单的形式，例如一个没有任何属性或子标签的 div 标签，可以这样表示：

```js
import { div } from 'affjs'

div()
```

将标签名作为函数名调用就可以了。框架已经预先定义了所有 html 和 svg 的标签，直接 import 相应的标签名就能用了。

上面的 `div()` 相当于 `<div></div>`，其他标签同理。

除了全小写的名字外，也预定义了首字母为大写、全部字母为大写的函数，可以根据喜好选择不同风格：

```js
import { div, Div, DIV } from 'affjs'

div();
Div();
DIV();
```

如果需要框架预定义之外的标签名，可以用 e 函数：

```js
import { e } from 'affjs'

e('div');
```

作用和前面的是一样的，只不过标签名字作为第一个参数传入。

<h3>id 和 class</h3>

表示标签的 id 或者 class，有两种方式。

第一种是使用选择器：

```js
import { div, $ } from 'affjs'

div($`#the-div .class-a .class-b`)
```

标签函数传入了一个参数，这个参数是一个 es6 的 tagged template literal，也就是一个带有修饰函数的字符串。
这个修饰函数是 $，模板字符串的内容是一个选择器。标签则会被加上选择器所表示的 id 以及 class。

上面的表示法相当于：
```html
<div id="the-div" class="class-a class-b"></div>
```

从代码长度也可以看出，用 js 来表示，一般是比 html 要精简一些的。

另外一种表示方式是用一个属性对象：

```js
div({ id: 'the-div', classList: 'class-a class-b' })
```

这种方式很容易理解，就是将标签的属性，表示成一个对象的属性就可以了。

另外 classList 属性，除了可以用字符串表示，还可以用数组，或者一个对象来表示。

数组方式：
```js
div({ id: 'the-div', classList: ['class-a', 'class-b'] })
```

就是将各个 class，写成数组的元素。

对象方式：
```js
div({ id: 'the-div', classList: {
  ['class-a']: true,
  ['class-b']: true,
}})
```

class 作为对象的属性名，当属性值为真时，标签将加入这个 class，非真时不加入。

数组和对象的 class 表示法，在需要动态地增减标签的 class 时，比较方便，因为不需要手工去拼接字符串。

<h3>嵌套标签</h3>

标签可以嵌套，直接将子标签作为参数，传入父标签函数就可以了：

```js
import { p, span } from 'affjs'

p(span('Hello, '), span('world!'))
```

相当于：
```html
<p><span>Hello, </span><span>world</span></p>
```

其中 span 标签函数传入的是一个字符串参数，这个参数会被解析成一个文本元素。

也可以将子标签放入一个数组，再传递：

```js
p([span('Hello, '), span('world!')])
```

上面的代码，效果和前面是一样的，数组的元素都会被视作子标签。

实际上数组里还可以嵌套数组，框架解析的时候会将嵌套的数组平坦化 (flatten)：

```js
p([[[[[[span('Hello, ')]]]]], span('world!')])
```

上面的代码，表达的仍然是同样的结构。

只有嵌套的标签，才会形成嵌套的结构：

```js
p(span('Hello, ', span('world')))
```

上面的代码表示的结构就和前面的不同，表示的是：
```html
<p><span>Hello, <span>world</span></span></p>
```

类型为 boolean 和 number 的值，也和 string 类型的值一样，会被视为文本元素：

```js
ul(
  li(42),
  li(true),
)
```

相当于：
```html
<ul>
	<li>42</li>
	<li>true</li>
</ul>
```

类型为 function 的值，会被调用，以返回值作为嵌套的值：

```js
ul(
  () => span('hello, '),
  () => 'world!',
)
```

相当于：
```js
<ul><span>hello, </span>world!</ul>
```

同样的效果，也可以用 `(() => { ... })()` 实现。但能自动调用的话，写法就简单一些。

<h3>内联 css 样式</h3>

除了可以用 class 来对标签增加样式，还可以直接使用内联的样式。方法也有两种。

第一种和表示选择器的方式类似，用一个 tagged literal 的参数表示样式：

```js
import { css, p } from 'affjs'

p(css` color: blue; font-weight: bold `, 'Hello, world!')
```

使用的 tagged 函数为 css，内容是样式定义。

第二种方式是写在属性对象内：

```js
p('Hello, world!', {
  style: `
    color: blue;
    font-weight: bold;
  `,
})
```

和前面用属性对象表示标签的 id 和 class 的方式类似。属性名是 style。

另外使用属性对象方式定义时，style 属性值还可以使用对象：

```js
p('Hello, world!', {
  style: {
    color: 'blue',
    fontWeight: 'bold',
  },
})
```

样式名作为属性名，样式值作为属性值，样式值是字符串或者数字类型。可以根据喜好选择风格。

用 tagged literal 表示样式的好处是，里面可以使用 js 表达式：

```js
const color = '#09C';
const fontSize = 24;

p(css`
  color: ${color};
  font-size: ${fontSize}px;
`, 'Hello, world!')
```

模板字符串内的 ${} 表示一个 js 表达式。表达式可以是变量、运算、函数调用等等。
这是相当有用的，对 less、sass 等 css 预处理器的需求也会因此降低。

内联样式是没办法表达伪类的。可以在旁边用一个 style 标签写：

```js
import { div, style } from 'affjs'

div('.foo')
style(`
  .foo:hover {
    /* ... */
  }
`)
```

渲染出来，就是一个`<style></style>`，里面是css定义。
注意这样定义的样式的优先级比较低，所以如果标签里也有相同的定义，需要用!important才能使伪类的定义生效。
如果不想使用 !important，可以将内联样式去掉，都写在 script 标签内。

<h3>事件</h3>

标签的事件，可以用 on 函数来表示：

```js
import { button, input, on } from 'affjs'

button('CLICK ME', on('click', () => {
  console.log('clicked');
}))

input(on('change', () => {
  console.log('changed');
}))
```

或者写在一个表示属性的对象内，作为参数传入：

```js
button('CLICK ME', {
  onclick() {
    console.log('clicked');
  },
  ondblclick() {
    console.log('double clicked');
  },
})
```

用上面的方法，同类型的事件，只能设置一个。例如：

```js
import { App, button, on } from 'affjs'

new App(
  document.getElementById('app'),
  {},
  () => button(
    'CLICK ME',
    on('click', () => {
      console.log('foo');
    }),
    on('click', () => {
      console.log('bar');
    }),
  ),
);
```

点击这个按钮，只会输出 'bar'。输出 'foo' 的回调被覆盖了。

要想让一个事件响应多个回调，可以给事件增加一个子类型。子类型用 `:` 或者 `$` 隔开。例如：

```js
import { App, button, on } from 'affjs'

new App(
  document.getElementById('app'),
  {},
  () => button(
    'CLICK ME',
    on('click:foo', () => {
      console.log('foo');
    }),
    on('click:bar', () => {
      console.log('bar');
    }),
    {
      onclick$baz() {
        console.log('baz');
      },
    },
  ),
);
```

这样点击按钮时，三个回调都会调用，分别输出 'foo', 'bar', 'baz'。

如果不加子类型，默认子类型为 `__default`。也就是 `on('click', ...)` 相当于 `on('click:__default', ...)`。

这样设计的原因是，让事件处理代码变成声明式的，而不是让开发者过程式地手工处理事件 handler。

on 函数还可以链式定义，这样能在一个表达式里面表示多个事件：

```js
import { App, button, on } from 'affjs'

new App(
  document.getElementById('app'),
  {},
  () => button(
    'CLICK ME',
    on('click:foo', () => {
      console.log('foo');
    }).on('click:bar', () => {
      console.log('bar');
    }).on('click:baz', () => {
        console.log('baz');
    }),
  ),
);
```

<h3>attribute 和 property</h3>

标签的 attributes 和 properties 是同时设置的，方法是将一个对象作为参数传入标签函数。
除了前面提到过的 id、classList、style、以及 onxxx 等特殊属性名之外，这个对象的属性，会作为标签的属性设置。
例如：

```js
div({
  foo: 'FOO',
  bar: 'BAR',
})
```

等价于：
```html
<div foo="FOO" bar="BAR"></div>
```

有一些标签的 attribute 有对应的 property，例如 checkbox 的 checked、及按钮的 disabled 等，为了避免无谓的不一致，所以 attribute 和 property 是同时设置的。

<h3>标签函数的参数</h3>

如上所述，标签函数的参数可以没有，也可以是多个，参数是不定长的。
每个参数，都会根据上面所讲的规则进行解析，最终定义出这个标签的属性和行为。
每个参数的效果，是按顺序叠加的。

因此，对标签函数进行包装，就很方便。例如框架自带的 checkbox 标签，是这样定义的：

```js
const checkbox = (...args) => e('input', {
  type: 'checkbox',
}, ...args);
```

checkbox 函数的参数也是不定长的，但传递给 e 函数、构造 input 标签的时候，增加了一个指定 type 属性的参数。
这样在需要一个 type 为 checkbox 的 input 标签时，就可以直接用 checkbox 函数，而无需传入 type 属性给 input 标签。

前面在嵌套标签一节提到，多个子标签可以放在 array 类型的参数里一起传递，框架会递归地将参数提取出来。
实际上 array 中的元素不仅仅可以是子标签，事件、属性、样式等类型的元素，也会被视作参数，传入标签函数。
这个机制对代码的复用和组合很有益。

有些框架也允许使用 hyperscript 或者其他方式手工构造渲染函数，但是它们的参数解析，不是基于对象属性，就是基于参数的位置。
无论在写法的简洁性，或者在封装的方便性，都有很大的缺陷。
可以是可以，但这些框架主流还是用 JSX 或者 html 模板，而不是纯 js 表达，设计者并没有花心思来让纯 js 的表达方式变好用。

<h3>skip</h3>

参数列表中，可以使用 skip 来表示忽略它后面的参数，例如：

```js
import { div, skip } from 'affjs'

div(
    div('foo'),
    div('bar'),
    skip,
    div('baz'),
);
```

相当于

```js
import { div, skip } from 'affjs'

div(
    div('foo'),
    div('bar'),
    skip,
);
```

skip 标志的主要用途是定位 bug。

