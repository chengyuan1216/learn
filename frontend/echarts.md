## 1、全局Api

### 静态api

1. init()

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

   

2. connect()

   多个图表的联动。

   ```js
   // 分别设置每个实例的 group id
   chart1.group = 'group1';
   chart2.group = 'group1';
   echarts.connect('group1');
   // 或者可以直接传入需要联动的实例数组
   echarts.connect([chart1, chart2]);
   ```

   

3. disconnect()

   解除图表实例的联动，如果只需要移除单个实例，可以将通过将该图表实例 `group` 设为空。

   

4. dispose()

   销毁实例。

5. getInstanceByDom()

   获取 dom 容器上的echarts实例。

6. registerMap()

7. registerTheme()

8. graphic()

9. graphic.clipPointsByRect()

10. graphic.clipRectByRect()

    

### echartsInstance实例api

1. echartsInstance.group

2. echartsInstance.setOption({})

   设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过 `setOption` 完成，ECharts 会合并新的参数和数据，然后刷新图表。如果开启[动画](https://echarts.baidu.com/api.html#option.html#option.animation)的话，ECharts 找到两组数据之间的差异然后通过合适的动画去表现数据的变化。

   ```js
   chart.setOption(option, {
       notMerge: ..., // 可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。
       lazyUpdate: ...,// 可选，在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
       silent: ... // 可选，阻止调用 setOption 时抛出事件，默认为 false，即抛出事件。
   });
   ```

   

3. echartsInstance.getWidth()

   获取容器的宽度。

4. echartsInstance.getHeight()

   获取容器的高度。

5. echartsInstance.getDom()

   获取实例上的dom节点。

6. echartsInstance.getOption()

   **获取当前实例中维护的 `option` 对象，返回的 `option` 对象中包含了用户多次 `setOption` 合并得到的配置项和数据，也记录了用户交互的状态，例如图例的开关，数据区域缩放选择的范围等等。所以从这份 `option` 可以恢复或者得到一个新的一模一样的实例。**

7. echartsInstance.resize()

   改变图表尺寸，在容器大小发生改变时需要手动调用。

   ```
   echartsInstance.resize({
       width:  // 宽度
       height: // 高度
       silent: // 是否禁止抛出事件， 默认为false。
   })
   ```

   

8. echartsInstance.dispatchAction()

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

   

9. echartsInstance.on()

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

10. off()

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

    ![](D:\github\img\1.PNG)

15. **hideLoading**

16. 

17. 

18. 

19. 

20. 

21. 

22. 

23. 

24. 

25. 

26. 

27. 

28. 

29. 

30. 

31. 

32. 

33. 

34. 