import 'normalize.css'
import 'animate.css'
import Navigo from 'navigo'

import { App, css, t, on, key, $, ref, weakRef, h, op, DebugPanel } from 'affjs'

// 读保存在 local storage 里的状态
const saved = JSON.parse(window.localStorage.getItem('todos-data')) || {};
// 初始状态树
const initState = {
  // 任务信息
  todos: saved.todos || {},
  // 过滤器
  filter: saved.filter || 'all',
  // 过滤后的任务ID列表
  filtered: [],

  // 下面都是传递给组件的状态，属性名和组件名一样

  NewTodo: {
    todos: weakRef('todos'),
  },

  MaintainFiltered: {
    // 引用 todos 和 filter 状态
    todos: ref('todos'),
    filter: ref('filter'),
    filtered: weakRef('filtered'),
  },

  Filter: {
    todos: ref('todos'),
    filter: ref('filter'),
  },

  List: {
    todos: ref('todos'),
    ids: ref('filtered'),
    hovering: '',

    // 嵌套的组件，对应有一个嵌套的状态
    Item: {
      hovering: weakRef('hovering'),
      todos: weakRef('todos'),

      ItemControl: {
        // 这个组件没有初始状态，但也留着这个备用
        // 在需要增加初始状态的时候，可以直接添加
      },
    },
  },

  DebugPanel: {
    show: true,
    left: '50%',
  },

};

// 根组件，传入的 state 就是上面定义的对象
function Main(state, app) {
  // div 标签，用 h.div 函数表示，标签的各种属性和子标签，用函数参数表示
  return h.div(
    // 表示样式，使用 es6 的模板字符串，加上 css 这个模板标签函数来表示
    css`
      width: 40vw;
      margin: 8px;
      padding: 8px;
      border: 1px solid #EEE;
      border-radius: 4px;
      color: #777;
      text-align: center;
    `,

    // 一个子标签
    h.p('TodoList', css`
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      margin: 8px;
    `),

    // 下面是嵌套的子组件，t 函数表示一个 thunk，thunk 是渲染优化的基本单位

    t(NewTodo, state.NewTodo),

    t(MaintainFiltered, state.MaintainFiltered),

    // 因为组件本身就是一个函数，所以可以直接调用，而不需要 t 函数包装
    // 但是就会失去渲染优化，每次渲染根组件，都会重新渲染 Filter 组件
    Filter(state.Filter),

    t(List, state.List),

    // 调试面板，DebugPanel 返回的不是组件，而是参数列表
    DebugPanel(app, state.DebugPanel),

  );
}

// 新建任务组件
function NewTodo(state) {

  // 新建任务，因为有两个地方要用到，所以写成函数
  function addTodo() {
    if (!state.userInput) {
      return
    }
    const id = Math.random().toString().substr(2);
    const content = state.userInput;
    // 更新组件状态，使用状态的 $update 函数，合并一个对象
    state.$update(op.merge({
      updating: true, // 过渡状态
    }));
    // 模拟异步新建操作
    setTimeout(() => {
      // addTodo 是在状态树定义的更新函数
      state.todos.$update(id, {
        id: id,
        time: new Date().getTime(),
        content: content,
        done: false,
      });
      state.$update(op.merge({
        updating: false,
        userInput: '', // 清空输入
      }));
    }, 300);
  }

  return h.div(

    h.input(
      // 标签的属性，用一个 object 表示
      {
        value: state.userInput || '',
        disabled: state.updating,
      }, 
      // 注册 keyup 事件，同步用户输入到 userInput 这个状态
      on('keyup: update input', function() {
        state.$update('userInput', this.element.value);
      }), 
      // 注册 keydown 事件，按下回车时，新建任务
      on('keydown: add todo', (ev) => {
        if (ev.keyCode == 13) {
          addTodo();
        }
      }),
      css`
        width: 64%;
        border-radius: 4px 0 0 4px;
        border: 1px solid #CCC;
        padding: 4px 8px;
      `,
    ),

    // 一个按钮，点击时新建任务
    h.button(
      state.updating ? '...' : 'Add',
      on('click', addTodo),
      css`
        width: 64px;
        border: 1px solid #CCC;
        border-radius: 0 4px 4px 0;
        padding: 4px 8px;
      `,
    ),

    css`
      margin: 8px;
    `,
  );
}

// 维护过滤后的任务ID
function MaintainFiltered(state) {
  // 生成 ID 列表
  const filtered = [];
  for (const id in state.todos) {
    if (state.filter == 'all') {
      filtered.push(id);
    } else if (state.filter == 'done') {
      if (state.todos[id].done) {
        filtered.push(id);
      }
    } else if (state.filter == 'todo') {
      if (!state.todos[id].done) {
        filtered.push(id);
      }
    }
  }

  // 排序
  filtered.sort((a, b) => {
    return state.todos[b].time - state.todos[a].time;
  })
  // 更新状态
  state.filtered = filtered;
  // 这个是功能性组件，没有视觉元素，所以返回 null
  return null;
}

// 任务列表
function List(state) {
  return h.div(
    css`
      margin: 8px;
    `,
    // 遍历 ID 列表，生成各个任务组件
    state.ids.map(id => t(Item, 
      key`item-${id}`,
      state.Item,
      state.todos[id], 
      // hovering
      id == state.hovering,
    )),
  );
}

// 任务组件
function Item(state, info, hovering) { 
  // 更新任务内容的函数
  const saveContent = () => {
    // 模拟异步保存操作
    info.$update('status', 'saving');
    setTimeout(() => {
      info.$update('status', '');
    }, 1000);
  }

  return h.div(
    $`.animated .slideInRight`,
    css`
      text-align: left;
      background-color: ${hovering ? '#EEE' : 'transparent'};
      border-radius: 4px;
      padding: 8px;
      position: relative;
    `,
    on('mouseenter', () => {
      state.hovering = info.id;
    }),
    on('mouseleave', () => {
      state.hovering = '';
    }),

    // 一般状态下，显示一个 checkbox 和任务内容
    info.status != 'editing' ? [
      h.checkbox({
        checked: info.done,
      }, on('click', () => {
        info.$update('done', op.func(v => !v));
      })),
      h.span(info.content, css`
        margin-left: 8px;
        color: ${info.done ? '#AAA' : 'inherit'};
        text-decoration: ${info.done ? 'line-through' : 'none'};
      `),
    ] : null,

    // 编辑时，显示输入框
    info.status == 'editing' ? [
      h.input({
        value: info.content,
      }, on('keyup: update content', function() {
        info.$update('content', this.element.value);
      }), on('keydown: update content and done editing', function(ev) {
        if (ev.keyCode == 13) {
          saveContent();
        }
      }), css`
        border: 0;
        width: 75%;
        background-color: #EFE;
        border-radius: 5px;
        padding: 0 8px;
      `),
    ] : null,

    // 保存或删除过程中，显示提示状态
    info.status == 'saving' || info.status == 'removing' ? h.div(info.status, css`
      width: 100%;
      color: #88F;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.8);
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      padding: 8px;
    `) : null,

    // 删除动画
    info.status == 'finish-removing' ? [
      {
        classList: ['animated', 'slideOutRight'],
      },
      // 动画完成后，删除条目
      on('animationend', () => {
        state.todos.$update(op.del(info.id));
      }),
    ] : null,

    // 鼠标指向任务时，显示控制按钮
    hovering ? ItemControl(state.ItemControl, info, saveContent) : null,

  );
}

// 任务条目控制按钮
function ItemControl(state, info, saveContent) {
  // 按钮的共用样式
  const buttonStyle = css`
    display: inline-block;
    margin-left: 8px;
    border: 0;
    background-color: transparent;
    user-select: none;
    cursor: pointer;
    padding: 0 8px;
    border-radius: 4px;
    color: #666;
  `;

  return h.span(
    css`
      float: right;
    `,

    // 一般情况下，显示删除和编辑按钮
    !info.status ? [
      h.button(buttonStyle, 'Remove', on('click', () => {
        // 模拟异步操作
        info.$update('status', 'removing');
        setTimeout(() => {
          // 进入删除动画，动画完成后，才删除条目
          info.$update('status', 'finish-removing');
        }, 1000);
      })),
      h.button(buttonStyle, 'Edit', on('click', () => {
        info.$update('status', 'editing');
      })),
    ] : null,

    // 编辑状态时，显示保存按钮
    info.status == 'editing' ? [
      h.button(buttonStyle, 'Done', on('click', () => {
        saveContent();
      })),
    ] : null,

  );
}

// 过滤条件选择组件
function Filter(state) {
  return h.div(
    css`
      margin: 8px;
    `,

    'Filter: ',

    // 每个条件生成一个按钮
    [
      { name: 'all', filter: _ => true, },
      { name: 'todo', filter: i => !i.done },
      { name: 'done', filter: i => i.done },
    ].map(info => h.div(
      info.name, 
      // 显示符合该过滤条件的条目数量
      () => {
        const count = Object.keys(state.todos).reduce((acc, cur) => 
          acc + (info.filter(state.todos[cur]) ? 1 : 0), 0);
        if (count > 0) {
          return ` (${count}) `;
        }
        return null;
      },
      css`
        display: inline-block;
        border: 1px solid #CCC;
        padding: 4px 8px;
        border-radius: 4px;
        margin-left: 8px;
        background-color: ${info.name == state.filter ? '#EEE' : 'transparent'};
        user-select: none;
        cursor: pointer;
      `, 
      // 点击时，设定过滤条件
      on('click', () => {
        router.navigate(`/filter/${info.name}`);
      }),
    )),

  );
}

// 启动一个 app
const app = new App(
  // 初始渲染的元素
  document.getElementById('app'),
  // 初始状态
  initState,
  // 根组件
  Main,

  // 状态更新后，保存一些状态到 local storage
  on('afterUpdate', (state) => {
    window.localStorage.setItem('todos-data', JSON.stringify({
      todos: state.todos,
      filter: state.filter,
    }));
  }),
);

// 路由
const router = new Navigo('/');
router
  .on('/filter/:filter', (params) => {
    // 选择过滤器
    app.update('filter', params.filter);
  })
  .resolve();
