import Vue from 'vue';
import scrollbar from './scrollbarMixin';
import column from './columnMixin';

const SLICE_LEN = 100000; // 将大数组切割成小数组
const MIN_COL_WIDTH = 40;
export default function createStore(vm, props) {
  return new Vue({
    mixins: [scrollbar, column],
    data: {
      tableWidth: 0, // 表格宽度
      dataSize: 0 // 数据数量
    },
    computed: {

    },
    beforeCreate() {
      // 不需要监听这个对象， 使用时去监听
      this.tableData = {};
      this.context = vm;
    },
    beforeDestroy() {
      this.context = null;
    },
    methods: {
      setTableData(data) {
        this.dataSize = data.length;
        this.tableData = {};
        let i = 0;
        do {
          this.tableData[i] = data.slice(SLICE_LEN * i, SLICE_LEN * (i + 1));
          i++;
        } while (this.tableData[i - 1].length === SLICE_LEN);
      },

      getTableData(startIndex, endInex) {
        let rangeStart = parseInt(startIndex / SLICE_LEN);
        let rangeEnd = parseInt(endInex / SLICE_LEN);
        let _startIndex = startIndex - rangeStart * SLICE_LEN;
        let _endInex = endInex - rangeEnd * SLICE_LEN;
        // 在同一区间
        if (rangeStart == rangeEnd) {
          return this.tableData[rangeStart].slice(_startIndex, _endInex);
        } else {
          return this.tableData[rangeStart].slice(_startIndex, SLICE_LEN).concat(
            this.tableData[rangeEnd].slice(0, _endInex + 1)
          );
        }
      }
    }
  });
}
