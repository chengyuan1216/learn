<template>
  <div class="el-datatable-body" :style="{width: store.tableWidth + 'px',height: height + 'px'}"  @mousewheel.prevent="handleMousewheel">
    <table cellspacing="0" cellpadding="0" border="0" :style="{transform: transform}">
      <colgroup>
        <col v-for="(col, index) in store.columns" 
          :key="index"
          :name="'el-datatable_column_'+index"
          :width="col.width" >
      </colgroup>
      <tbody>
        <table-row  v-for="(item, index) in dataList" :key="index"
          :data="dataList[index]">
        </table-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getTableParent } from './helpers/utils'
import tableRow from './table-row'
export default {
  props: {
    itemHeight: { // 定义表格的逻辑行的高度， 跟每一次滚动的距离有关
      type: Number,
      default: 40
    },
    viewHeight: { // 表格数据视口的高度
      type: Number,
      default: 40
    },
    delta: Number // 鼠标滚动一次表格滚动的距离
  },
  components: {
    tableRow
  },
  data() {
    return {
      startIndex: 0,
      dataList: [],
      paddingTop: 0,
      paddingBottom: 0,
      scrollTop: 0,
      transform: 'translate3d(0, 0, 0)',
      dataAmount: 0
    };
  },
  computed: {
    size() {
      let size = this.viewHeight / this.itemHeight;
      return parseInt(size) === size ? size : parseInt(size);
    },

    height() {
      return Math.min(this.viewHeight, this.dataAmount * this.itemHeight);
    },

    // 最大的滚动距离
    scrollTopMax() {
      return (this.dataAmount - this.size) * this.itemHeight;
    },

    // 滚动条的高度
    // scrollbarHeight() {
    //   return Math.max(this.viewHeight / (this.dataAmount * this.itemHeight) * this.viewHeight, 10)
    // },

    // scrollbarTransform() {
    //   let dist = this.scrollTop / (this.dataAmount * this.itemHeight) * this.viewHeight
    //   if (dist + 10 > this.viewHeight) {
    //     dist =  this.viewHeight - 10
    //   }
    //   return `translate3d(0, ${dist}px, 0)`
    // }
  },
  created() {
    this.store = this.getTableParent().store
  },
  methods: {
    getTableParent,
    setData(data) {
      this.$nextTick(() => {
        this.dataAmount = data.length
        this.update(true, 0);
      })
    },
    update(isWheel, scrollTop) {
      scrollTop = scrollTop == undefined ? this.scrollTop : scrollTop
      requestAnimationFrame(() => {
        // 更新滚动条的位置
        if (this.$refs.scrollBar && isWheel) {
          this.$refs.scrollBar.scrollTop = scrollTop;
        }
        this.filter(scrollTop);
      })
    },
    filter(scrollTop) {
      let translate = scrollTop / this.itemHeight;
      this.startIndex = parseInt(translate);
      this.transform = `translate3d(0, ${-scrollTop + this.startIndex * this.itemHeight}px, 0)`;
      this.dataList = this.store.getTableData(this.startIndex, this.startIndex + this.size + 2);
    },
    handleMousewheel(ev) {
      let delta = this.delta === undefined? this.itemHeight * 1.25: this.delta;
      if (ev.wheelDelta < 0) {
        // 向下
        this.scrollTop = Math.min(this.scrollTop + delta, this.scrollTopMax);
      } else {
        this.scrollTop = Math.max(this.scrollTop - delta, 0);
      }
      this.store.setScrollTop(this.scrollTop)
      this.update(true);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-datatable-body {
  overflow: hidden;
  position: relative;
}

table {
  table-layout:fixed;
  word-break:break-all;
}

.scroll-bar-wrap {
  position: absolute;
  top: -1px;
  right: 0;
  width: 10px;
  box-shadow: 0 0 1px 1px #e0e0e0;
  background: #fff;
  .scroll-bar {
    background: gray;
    border-radius: 2px;
  }
}
</style>