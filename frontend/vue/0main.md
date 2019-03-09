## 这里主要分析 new Vue() 的执行主线。

- new Vue() 内部只做了一件事情， 执行 this._init()， 这是原型上的一个方法。
- 在_init() 内部做了以下几件事
  1. 通过合并策略的到最终的`$option`对象。
  2. 初始化生命周期 initLifecyle(vm)。
  3. 初始化事件 initEvents(vm)。
  4. 初始化渲染 initRender(vm)。
  5. 调用 beforeCreate 钩子函数， 注意此时是不能访问到data上的数据的，因为初始化data数据是在后面进行的。
  6. 初始化inject, initInjection(vm)，获取从父组件注入的数据。
  7. initState(vm),  初始化data。
  8. initProvide, 初始化用于注入子组件的数据。
  9. 执行 created 钩子函数。
  10. $mount(vm.$option.el)，开始进行模板编译。
- 