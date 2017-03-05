import { App, ref } from 'affjs'

const app = new App(
    {
      foo: 'foo',
      Sub: {
        foo: ref('foo'),
      },
    },
);

// 直接对 Sub.foo 赋值
app.state.Sub.foo = 'FOO';
// 更新的是外层的 foo 状态
console.log(app.state.foo);
