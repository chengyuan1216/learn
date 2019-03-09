## Vue 的响应式系统是什么？

先从源码里的 initState 讲起。initState 是在_init方法中调用的，主要做了以下几件事情。

1. initProps()
2. initMethods()
3. initdata(vm) ，入口。
4. initWatch()



initdata() 会先获得 $options.data, 如果 data是一个函数则会先执行这个函数得到返回值作为

响应式系统的数据来源。同时vm._data指向这个对象。

在转换成响应式对象之前会遍历判断data对象是否有与prop、method重名的属性。如果有重复将会提出警告。



最后将会执行 observer(data,  true)，返回一个Observer 对象， 在这个方法里面逻辑很简单：

1. 先判断 data是否是对象， 并且不能是vNode对象。
2. 判断 ``data.__ob__``是否是一个 Observer对象， 如果是的话表示已将将该对象转化成了响应式对象，不需要重复转换了，直接返回 `data.__ob__`
3. 在经过上面的判断之后， return new Observer(data)。



new Observer(data) 将一个普通对象转化成响应式对象。