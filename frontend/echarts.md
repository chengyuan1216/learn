## 1、全局Api

### 静态api

1. **init()**

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

   

2. **connect()**

   多个图表的联动。

   ```js
   // 分别设置每个实例的 group id
   chart1.group = 'group1';
   chart2.group = 'group1';
   echarts.connect('group1');
   // 或者可以直接传入需要联动的实例数组
   echarts.connect([chart1, chart2]);
   ```

   

3. **disconnect()**

   解除图表实例的联动，如果只需要移除单个实例，可以将通过将该图表实例 `group` 设为空。

   

4. **dispose()**

   销毁实例。

5. **getInstanceByDom()**

   获取 dom 容器上的echarts实例。

6. **registerMap()**

7. **registerTheme()**

8. **graphic()**

9. **graphic.clipPointsByRect()**

10. **graphic.clipRectByRect()**

    

### echartsInstance实例api

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

### action api

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

    



