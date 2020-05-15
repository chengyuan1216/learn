###### 1、用法

第一个参数是一个组件option对象， 第二个参数是传给组件的props对象。

返回的是一个app对象

```js
Vue.createApp({
  components: {
    TreeItem
  },
  setup() {
    let a = Vue.ref('hello world')
    let htmlStr = Vue.ref(`<div>hhhhh</div>`)
    return {
      a,
      htmlStr,
      setHtml: (str) => {
        htmlStr.value = str
      }
    }
  },
  beforeMount() {
    Vue.onMounted((vm) => {
      console.log('vm1', vm)
    })
  },
  mounted() {
    console.log(this)
  },
  data: () => ({
    treeData
  }),
  render(vm) {
    let {createVNode, createStaticVNode, openBlock, createBlock, Fragment} = Vue
    return openBlock(), createBlock(Fragment, null, [
      createStaticVNode(this.htmlStr),
      createVNode('div', {
        style: {
          color: 'red'
        }
      }, this.htmlStr)
    ])
  },
  methods: {
    handleToggle() {
    }
  }
}).mount('#demo')
```



###### 2、代码

该方法是在runtime-dom内定义的。

在createApp内部做了两件事情， 创建app对象和重写app对象的mount方法。

创建app的代码如下。

```js
const app = ensureHydrationRenderer().createApp(...args)
```

ensureRenderer

```js
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions))
}
```

这个方法的目的是创建出renderer对象，参数rendererOptions是一个包含createElement、insert、remove等操作dom的方法。这样做的好处是将运行环境特有的底层方法从renderder中抽离出来了。

createRenderer

```

```

