[TOC]



## 1、全局Api

### 1-1、静态api

#### 1-1-1、init()

使用： echars.init(dom， theme, opts)

dom： 实例容器，一般是一个具有宽高的div元素。

theme: 主题。

opts:  附加参数。

```js
(dom: HTMLDivElement|HTMLCanvasElement, theme?: Object|string, opts?: {
    devicePixelRatio?: number
    renderer?: string
    width?: number|string
    height? number|string
}) => ECharts
```



#### 1-1-2、connect()

多个图表的联动。

```js
// 分别设置每个实例的 group id
chart1.group = 'group1';
chart2.group = 'group1';
echarts.connect('group1');
// 或者可以直接传入需要联动的实例数组
echarts.connect([chart1, chart2]);
```



#### 1-1-3、disconnect()

解除图表实例的联动，如果只需要移除单个实例，可以将通过将该图表实例 `group` 设为空。



#### 1-1-4、dispose()

销毁实例。

#### 1-1-5、getInstanceByDom()

获取 dom 容器上的echarts实例。

#### 1-1-6、registerMap()

#### 1-1-7、registerTheme()

#### 1-1-8、graphic()

#### 1-1-9、graphic.clipPointsByRect()

#### 1-1-10、graphic.clipRectByRect()



### 1-2、echartsInstance实例api

1. **echartsInstance.group**

2. **echartsInstance.setOption({})**

   设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过 `setOption` 完成，ECharts 会合并新的参数和数据，然后刷新图表。如果开启[动画](https://echarts.baidu.com/api.html#option.html#option.animation)的话，ECharts 找到两组数据之间的差异然后通过合适的动画去表现数据的变化。

   ```js
   chart.setOption(option, {
       notMerge: ..., // 可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。
       lazyUpdate: ...,// 可选，在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
       silent: ... // 可选，阻止调用 setOption 时抛出事件，默认为 false，即抛出事件。
   });
   ```

   

3. **echartsInstance.getWidth()**

   获取容器的宽度。

4. **echartsInstance.getHeight()**

   获取容器的高度。

5. **echartsInstance.getDom()**

   获取实例上的dom节点。

6. **echartsInstance.getOption()**

   **获取当前实例中维护的 `option` 对象，返回的 `option` 对象中包含了用户多次 `setOption` 合并得到的配置项和数据，也记录了用户交互的状态，例如图例的开关，数据区域缩放选择的范围等等。所以从这份 `option` 可以恢复或者得到一个新的一模一样的实例。**

7. **echartsInstance.resize()**

   改变图表尺寸，在容器大小发生改变时需要手动调用。

   ```
   echartsInstance.resize({
       width:  // 宽度
       height: // 高度
       silent: // 是否禁止抛出事件， 默认为false。
   })
   ```

   

8. **echartsInstance.dispatchAction()**

   触发图表行为，例如图例开关`legendToggleSelect`, 数据区域缩放`dataZoom`，显示提示框`showTip`等等，更多见 [action](https://echarts.baidu.com/api.html#action) 和 [events](https://echarts.baidu.com/api.html#events) 的文档。

   ```
   myChart.dispatchAction({
       type: 'dataZoom',
       start: 20,
       end: 30
   });
   // 可以通过 batch 参数批量分发多个 action
   myChart.dispatchAction({
       type: 'dataZoom',
       batch: [{
           // 第一个 dataZoom 组件
           start: 20,
           end: 30
       }, {
           // 第二个 dataZoom 组件
           dataZoomIndex: 1,
           start: 10,
           end: 20
       }]
   })
   ```

   

9. **echartsInstance.on()**

   绑定事件处理函数。ECharts 中的事件有两种，一种是鼠标事件，在鼠标点击某个图形上会触发，还有一种是 调用 [dispatchAction](https://echarts.baidu.com/api.html#echartsInstance.dispatchAction) 后触发的事件。每个 action 都会有对应的事件，具体见 [action](https://echarts.baidu.com/api.html#action) 和 [events](https://echarts.baidu.com/api.html#events)的文档。

   参数：

   - eventName

     小写的事件名称。

   - query

     可选的过滤条件，能够只在指定的组件或者元素上进行响应。可为 `string` 或者 `Object`。

     ```
     chart.on('click', 'series', function () {...});
       chart.on('click', 'series.line', function () {...});
       chart.on('click', 'dataZoom', function () {...});
       chart.on('click', 'xAxis.category', function () {...});
     ```

     

   - handler

   - context

10. **off()**

11. **convertToPixel** 

12. **convertFromPixel** 

13. **containPixel** 

14. **showLoading** 

    显示加载动画效果。可以在加载数据前手动调用该接口显示加载动画，在数据加载完成后调用 [hideLoading](https://echarts.baidu.com/api.html#echartsInstance.hideLoading) 隐藏加载动画。

    ```js
        // 设置动画可以在请求后台接口返回之前有个动画效果而不是空白
        myChart.showLoading('default', {
          text: 'loading', // 提示文字
          color: '#c23531', // 转圈圈的颜色
          textColor: '#000', // 提示文字的颜色
          maskColor: 'rgba(255, 255, 255, 0.8)', // 整个遮罩的背景颜色
          zlevel: 0 // ？
        })
    ```

15. **hideLoading**

    隐藏动画效果。没有参数。

16. **getDataURL** ()

    导出图表图片，返回一个 base64 的 URL，可以设置为`Image`的`src`。canvas 转成图片。

    ```js
    (opts: {
        // 导出的格式，可选 png, jpeg
        type?: string,
        // 导出的图片分辨率比例，默认为 1。
        pixelRatio?: number,
        // 导出的图片背景色，默认使用 option 里的 backgroundColor
        backgroundColor?: string,
        // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
        excludeComponents?: Array.<string>
    }) => string
    ```

    ```
       // 通过点击来将canvas转换成dataUrl
       // 如果要想实现查看图片和自动下载可以将 dataUrl 赋值给图片的 src
       myChart.on('dblclick', () => {
          const dataUrl = myChart.getDataURL({
            type: 'png',
            pixelRatio: 1,
            backgroundColor: '#fff',
            excludeComponents: []
          })
          window.console.log('dataUrl', dataUrl)
        });
    ```

    

17. **getConnectedDataURL** 

    导出联动的图片， 参数与getDataURL一致。

18. **appendData** ()

19. **clear** ()

    清空当前实例，会移除实例中所有的组件和图表。清空后调用 [getOption](https://echarts.baidu.com/api.html#echartsInstance.getOption) 方法返回一个`{}`空对象。

    ```js
        myChart.on('dblclick', () => {
          // 清空当前实例
          myChart.clear()
        });
    ```

    

20. **isDisposed** 

    当前实例是否已经被释放。

21. **dispose** 

    action api

### 1-3、action api

1. **highlight** 

   通过`seriesName`或者`seriesIndex`指定系列。如果要再指定某个数据可以再指定`dataIndex`或者`name`。

   ```
   dispatchAction({
       type: 'highlight',
       // 可选，系列 index，可以是一个数组指定多个系列
       seriesIndex?: number|Array,
       // 可选，系列名称，可以是一个数组指定多个系列
       seriesName?: string|Array,
       // 可选，数据的 index
       dataIndex?: number,
       // 可选，数据的 名称
       name?: string
   })
   ```

   ```
   // 使第二组数据高亮
   myChart.dispatchAction({
   	type: 'highlight',
   	dataIndex: 1
   })
   ```

   

2. **downplay** 

   取消高亮指定的数据图形。（取消高亮）

   通过`seriesName`或者`seriesIndex`指定系列。如果要指定某个数据可以再指定`dataIndex`或者`name`。

   ```
   dispatchAction({
       type: 'downplay',
       // 可选，系列 index，可以是一个数组指定多个系列
       seriesIndex?: number|Array,
       // 可选，系列名称，可以是一个数组指定多个系列
       seriesName?: string|Array,
       // 可选，数据的 index
       dataIndex?: number,
       // 可选，数据的 名称
       name?: string
   })
   ```

   ```
   // 高亮
   myChart.dispatchAction({
       type: 'highlight',
       // 可选，系列 index，可以是一个数组指定多个系列
       // seriesIndex?: number|Array,
       // 可选，系列名称，可以是一个数组指定多个系列
       // seriesName?: string|Array,
       // 可选，数据的 index
       dataIndex: 1,
       // 可选，数据的 名称
       // name?: string
   })
   // 取消高亮
   setTimeout(() => {
       myChart.dispatchAction({
           type: 'downplay',
           // 可选，数据的 index
           dataIndex: 1
       })
   }, 3000)
   ```

   

3. **legendSelect** 

   选中图例。

   ```
   dispatchAction({
       type: 'legendSelect',
       // 图例名称
       name: string
   })
   ```

   ```
   myChart.dispatchAction({
       type: 'legendSelect',
       // 图例名称
       name: '二月'
   })
   // 相当于手动点击了二月份对应的legend
   ```

   

4. **legendUnSelect** 

   取消选中图例。

   ```js
   myChart.dispatchAction({
       type: 'legendUnSelect',
       // 图例名称
       name: '二月'
   })
   ```

   

5. **legendToggleSelect** 

   切换图例的选中状态。如果是选中状态则切换到不选中， 不选中切换到选中。

   ```js
   // 这个例子表示每隔300ms 就会切换一次  
   setInterval(() => {
       myChart.dispatchAction({
           type: 'legendToggleSelect',
           name: '二月'
       })
   }, 300)
   ```

   

6. **legendScroll** 

7. **showTip** 

8. **hideTip** 

9. **dataZoom** 

10. **selectDataRange** 

11. **timeline** 

    [时间轴组件](https://echarts.baidu.com/option.html#timeline)相关的行为，必须引入[时间轴组件](https://echarts.baidu.com/option.html#timeline)后才能使用。

12. **restore** 

    工具栏组件](https://echarts.baidu.com/option.html#toolbox)相关的行为，必须引入[工具栏组件](https://echarts.baidu.com/option.html#toolbox)后才能使用。

13. **pieSelect** 

14. **pieUnSelect** 

15. **pieToggleSelect** 

16. **geoSelect** 

17. **geoUnSelect** 

18. **geoToggleSelect** 

19. **mapSelect** 

20. **mapUnSelect** 

21. **mapToggleSelect** 

22. **focusNodeAdjacency** 

23. **unfocusNodeAdjacency** 

24. **brush** 

25. **takeGlobalCursor** 

### 1-4、events api

在 ECharts 中主要通过 [on](https://echarts.baidu.com/api.html#echartsInstance.on) 方法添加事件处理函数，该文档描述了所有 ECharts 的事件列表。

ECharts 中的事件分为两种，一种是鼠标事件，在鼠标点击某个图形上会触发，还有一种是 调用 [dispatchAction](https://echarts.baidu.com/api.html#echartsInstance.dispatchAction) 后触发的事件。

```js
myChart.on('click', function (params) {
    console.log(params);
});

myChart.on('legendselectchanged', function (params) {
    console.log(params);
});

chart.on('click', 'series.line', function (params) {
    console.log(params);
});

chart.on('mouseover', {seriesIndex: 1, name: 'xx'}, function (params) {
    console.log(params);
});
```



#### 鼠标事件

鼠标事件的事件参数是事件对象的数据的各个属性，对于图表的点击事件，基本参数如下，其它图表诸如饼图可能会有部分附加参数。例如饼图会有`percent`属性表示百分比，具体见各个图表类型的 label formatter 回调函数的 `params`。

```
{
    // 当前点击的图形元素所属的组件名称，
    // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
    componentType: string,
    // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
    seriesType: string,
    // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
    seriesIndex: number,
    // 系列名称。当 componentType 为 'series' 时有意义。
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
    // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
    // 其他大部分图表中只有一种 data，dataType 无意义。
    dataType: string,
    // 传入的数据值
    value: number|Array,
    // 数据图形的颜色。当 componentType 为 'series' 时有意义。
    color: string,
    // 用户自定义的数据。只在 graphic component 和自定义系列（custom series）
    // 中生效，如果节点定义上设置了如：{type: 'circle', info: {some: 123}}。
    info: *
}
```

鼠标事件包括 `'click'`、`'dblclick'`、`'mousedown'`、`'mousemove'`、`'mouseup'`、`'mouseover'`、`'mouseout'`、`'globalout'`、`'contextmenu'`。

#### [dispatchAction](https://echarts.baidu.com/api.html#echartsInstance.dispatchAction) 触发的事件

1. **legendselectchanged** 
2. **legendselected** 
3. **legendunselected** 
4. **legendscroll** 
5. **datazoom** 
6. **datarangeselected** 
7. **timelinechanged** 
8. **timelineplaychanged** 
9. **restore** 
10. **dataviewchanged** 
11. **magictypechanged** 
12. **geoselectchanged** 
13. **geoselected** 
14. **geounselected** 
15. **pieselectchanged** 
16. **pieselected** 
17. **pieunselected** 
18. **mapselectchanged** 
19. **mapselected** 
20. **mapunselected** 
21. **axisareaselected** 
22. **focusnodeadjacency** 
23. **unfocusnodeadjacency** 
24. **brush** 
25. **brushselected** 
26. **globalCursorTaken** 
27. **rendered** 
28. **finished** 

## 2、配置项

### 2-1、实例全局配置

### 2-2、实例组件配置

#### 2-2-1、title组件

标题组件，包含主标题和副标题。在 ECharts 2.x 中单个 ECharts 实例最多只能拥有一个标题组件。但是在 ECharts 3 中可以存在任意多个标题组件，这在需要标题进行排版，或者单个实例中的多个图表都需要标题时会比较有用。

- **zlevel**：用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的zlevel。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。
- **z值**：组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。z相比zlevel优先级更低，而且不会创建新的 Canvas。
- **left**：grid 组件离容器左侧的距离。left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'。如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。

```
        title: {
          id: 1, // 组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。
          show: true, // 是否显示标题组件。默认true。
          textAlign: 'left', // 整体（包括 text 和 subtext）的水平对齐。
          textVerticalAlign: 'center',
          triggerEvent: true, // 是否触发事件
          padding: 100, 
          // 标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
          itemGap: 100, // 主副标题之间的间距。
          zlevel: 0, // 默认 0。
          z: 2, // 。
          left: 'center', // 
          top: 'center',
          // right: 20,
          // bottom: 20,
          backgroundColor: 'rgb(128, 128, 128)', // 背景颜色
          borderColor: '#000', // 边框颜色
          borderWidth: 10,
          borderRadius: 50,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
          shadowOffsetX: 100,
          shadowOffsetY: 100,
          
          // 主标题
          text: 'title', // 主标题文本，支持使用 \n 换行。默认 ''。
          link: 'http://www.baidu.com', 
          // 主标题文本超链接。 默认''。注意不加协议是相对地址。
          target: 'blank', // 指定窗口打开主标题超链接。默认 blank, 可选 blank | self。
          textStyle: { // 主标题
            color: '#ff0000', // 字体颜色
            fontStyle: 'italic', // 字体风格
            fontWeight: 'bold', // 文字字体的粗细
            fontFamily: 'Microsoft YaHei',
            fontSize: 20,
            align: 'left',
            verticalAlign: 'top',
            lineHeight: 50,
            width: 50,
            height: 50,
            textBorderColor: '#000',
            textShadowColor : '#00ff00',
            textShadowBlur: 5,
            textShadowOffsetX: 5,
            textShadowOffsetY: 5,
            rich: { // 富文本样式

            },
          },
          
          // 子标题
          subtext: 'sub title',
          sublink: 'www.baidu.com',
          subtarget: 'self',
          subtextStyle: {} // 副标题样式与主标题一致
        }
```



#### 2-2-1、**legend**组件

图例组件。图列整体是一个组件， 其内部包含多个项目， 每一个项目都有它的图标和文字。

所以在设置样式是要清楚是给图例设置还是给图标设置。

图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。

ECharts 3 中单个 echarts 实例中可以存在多个图例组件，会方便多个图例的布局。

当图例数量过多时，可以使用 [滚动图例（垂直）](https://echarts.baidu.com/gallery/editor.html?c=pie-legend&edit=1&reset=1) 或 [滚动图例（水平）](https://echarts.baidu.com/gallery/editor.html?c=radar2&edit=1&reset=1)，参见：[legend.type](https://echarts.baidu.com/option.html#legend.type)

```
      legend: {
        type: 'scroll', // plain | scroll 在指定 width 时， 如果宽度不够就可以滚动
        id: 'legend1',
        show: true,
        zlevel: 0,
        z: 2,
        left: 'center',
        top: -5,
        // right: 20,
        // bottom: 20,
        width: 200, // 图例的宽度， 注意和图例项目的宽度区分
        height: 200,
        orient: 'vertical', // 排列方向， vertical | horizontal
        align: 'right', // 设置文字和图标的位置， 左右互换。
        padding: 15, // 图例（整体）内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
        itemGap: 10, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
        itemWidth: 200, // 图例标记的图形宽度。
        itemHeight: 10,
        symbolKeepAspect: true, // 是否在缩放的时候保持长宽比。
        //formatter: 'Legend {name}', // 格式化显示文字，name 是二月， 格式化后变为 Legend 二月。
        formatter: function(name) {  // 也可以采用函数的形式。
          return 'function function function ' + name;
        },
        // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
        // 除此之外也可以设成 'single' 或者 'multiple' 使用单选或者多选模式。
        // single: 二月和三月只有一个系列能显示， multiple： 都能显示。
        selectedMode: 'multiple', 
        inactiveColor: '#00ff00', // 图例关闭时的颜色。包括文字的图标。
        selected: { // 设置默认打开的项目
          '二月': false,
          '三月': true
        },
        backgroundColor: '#000', // 图例背景颜色
        borderColor: '#0000ff', // 图例的边框颜色， 必须设置borderWidth
        borderWidth: 20,
        borderRadius: 5, //图例的圆角
        textStyle: { // 图例的公用文本样式。
          color: '#0000ff',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          fontSize: 10,
          lineHeight: 10,
          // 不管打开关闭背景颜色都是这里设置的颜色
          // backgroundColor: '#e0e0e0',
          // 可以支持使用图片作为背景
          // 这里可以是图片的 URL，
          // 或者图片的 dataURI，
          // 或者 HTMLImageElement 对象，
          // 或者 HTMLCanvasElement 对象。 
          backgroundColor: {
              image: document.querySelector('#canvas')
          },
          borderColor: '#000', //必须指定宽度
          borderWidth: 2,
          borderRadius: 5, // 文字父容器的圆角
          padding: [5, 10, 5, 10], // 文字父容器的padding
          shadowColor: '#00ff00', // 文字父容器的阴影颜色。
          shadowBlur: 10, 
          shadowOffsetX: -10,
          shadowOffsetY: 10,
          /* 文字块的宽度。一般不用指定，不指定则自动是文字的宽度。在想做表格项或者使用图片（参见 backgroundColor）时，可能会使用它。
          注意，文字块的 width 和 height 指定的是内容高宽，不包含 padding。
          width 也可以是百分比字符串，如 '100%'。表示的是所在文本块的 contentWidth（即不包含文本块的 padding）的百分之多少。之所以以 contentWidth 做基数，因为每个文本片段只能基于 content box 布局。如果以 outerWidth 做基数，则百分比的计算在实用中不具有意义，可能会超出。
          注意，如果不定义 rich 属性，则不能指定 width 和 height。*/
          width: 100,
          height: 30,
          rich: {},
          textBorderColor: '#ff0000', // 文字本身的边框颜色
          textBorderWidth: 2, // 文字本身的描边宽度。
          textShadowColor: '#e0e0e0e', // 文字本身的阴影颜色。
          textShadowBlur: 10, // 文字本身的阴影长度。
          textShadowOffsetX: 100,
          textShadowOffsetY: 100,
          /**图例的 tooltip 配置，配置项同 tooltip。
           * 默认不显示，可以在 legend 文字很多的时候对文字做裁剪并且开启 tooltip */
          tooltip: {
              show: true
          }
        },
        /**
         *  1、图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）。图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，特殊字符串 ''（空字符串）或者 '\n'（换行字符串）用于图例的换行。
            2、如果 data 没有被指定，会自动从当前系列中获取。多数系列会取自 series.name 或者 series.encode 的 seriesName 所指定的维度。如 饼图 and 漏斗图 等会取自 series.data 中的 name。
            3、如果要设置单独一项的样式，也可以把该项写成配置项对象。此时必须使用 name 属性对应表示系列的 name。
         */
        data: ['二月', '三月'] // 如果系列的每一项都有name, data可以省略，其实legend和系列就是通过name关联的。
      }
```



#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 2-2-1、title组件

#### 



