export default {
  data() {
    return {
      columns: [], // 所有列
    }
  },
  beforeCreate() {
    this.columnComponents = []
  },
  methods: {
    addColumn(col) {
      this.columnComponents.push(col)
      this.columns.push({
        ...col.$props
      })
      // this.calcColumnWidth()
    },

    removeColumn() {
      
    },

    calcColumnWidth() {
      if (this.context.$el) {
        let tableWidth = this.context.$el.clientWidth 
        
        // 如果出现滚动条则减去滚动条的宽度
        // if (this.scrolly) {
        //   tableWidth =  tableWidth - this.scrollbarWidth
        // }

        console.log('tableWidth', tableWidth)
        let totalWidth = 0
        let notSetWidthNum = []
        this.columns.forEach(col => {
          // if (isNaN(col.width) || col.width == undefined) {
          //   col.width =  MIN_COL_WIDTH
          // } else {
          //   col.width = Number(col.width)
          // }
          // totalWidth += col.width
          // col.realWidth = col.width? Number(col.width)
          // console.log(col.width)
          if (!isNaN(col.width)) {
            totalWidth += (col.realWidth = Number(col.width))
          } else {
            notSetWidthNum.push(col)
          }
        })

        let diff = 0, averageValue = 0
        if (tableWidth <= totalWidth) {
          // 如果表格宽度比容器大，则未设置宽度的列设置最小宽度
          if (notSetWidthNum.length) {
            notSetWidthNum.forEach((col, index) => {
              col.realWidth = MIN_COL_WIDTH
            })
          }
          this.tableWidth = totalWidth
        } else {
          // 如果表格宽度比容器小，则通过未设置宽度的列撑开宽度
          if (notSetWidthNum.length) {
            diff = tableWidth - totalWidth
            averageValue = parseInt(diff / notSetWidthNum.length)
            notSetWidthNum.forEach((col, index) => {
              if (index == 0) {
                col.realWidth = averageValue
              } else {
                col.realWidth = averageValue
              }
            })
          }
          this.tableWidth = tableWidth
        }

        console.log('totalWidth', totalWidth)
      }
    }
  }
}