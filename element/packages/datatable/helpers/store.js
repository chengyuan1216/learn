import Vue from 'vue';

const SLICE_LEN = 100000 // 将大数组切割成小数组
export default function createStore(options) {
  return new Vue({
    data: {
      columns: []
    },
    computed: {
      tableWidth() {
        let tableWidth = 0
        this.columns.forEach(col => {
          tableWidth += Number(col.width)
        })
        if (tableWidth) {

        }
      }
    },
    brforeCreate() {
      // 不需要监听这个对象， 使用时去监听
      this.tableData = {}
    },
    methods: {
      addColumn(col) {
        this.columnComponents = this.columnComponents || []
        this.columnComponents.push(col)
        this.columns.push(col.$props)
      },

      setTableData(data) {
        this.tableData = {}
        let i = 0
        do {
          this.tableData[i] = data.slice(SLICE_LEN * i, SLICE_LEN * (i+1))
          i++
        } while (this.tableData[i-1].length === SLICE_LEN)
      },

      getTableData(startIndex, endInex) {
        debugger
        let rangeStart = parseInt(startIndex / SLICE_LEN)
        let rangeEnd = parseInt(endInex / SLICE_LEN)
        let _startIndex = startIndex - rangeStart * SLICE_LEN
        let _endInex = endInex - rangeEnd * SLICE_LEN
        // 在同一区间
        if (rangeStart == rangeEnd) {
          return this.tableData[rangeStart].slice(_startIndex, _endInex)
        } else {
          return this.tableData[rangeStart].slice(_startIndex, SLICE_LEN).concat(
            this.tableData[rangeEnd].slice(0, _endInex + 1)
          )
        }
      }
    }
  });
}
