<template>
  <div class="el-datatabe" style="width:100%">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <table-header></table-header>
    <table-body ref="body" v-bind="$props"></table-body>
  </div>
</template>

<script>
import Vue from 'vue'
import createStore from '../helpers/store'
import tableHeader from './table-header'
import tableBody from './table-body'

export default {
  name: 'ElDatatable',
  props: {
    data: { // 表格数据
      type: Array,
      default: () => []
    },
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
    tableHeader,
    tableBody
  },
  provide() {
    return {
      tableParent: this
    };
  },
  data() {
    return { };
  },
  computed: {},
  watch: {
    data: {
      handler() {
        this.setData(this.data)
      },
      immediate: true
    }
  },
  beforeCreate() {
    window.t = this
    this.store = createStore({})
    this.eventBus = new Vue()
  },
  methods: {
    setData(data) {
      this.store.setTableData(data)
      this.$refs.body && this.$refs.body.setData(data)
    }
  }
};
</script>

<style lang="scss" scoped>
.el-datatabe {
  position: relative;
  padding-right: 10px;
  border: 1px solid #ebeef5;
  // .el-datatable-body {
  //   overflow: hidden;
  //   position: relative;
  //   border: 1px solid #ebeef5;
  //   .table {
  //     width: 100%;
  //   }
  // }

  .hidden-columns {
    display: none;
  }

  // .scroll-bar-wrap {
  //   position: absolute;
  //   top: -1px;
  //   right: 0;
  //   width: 10px;
  //   box-shadow: 0 0 1px 1px #e0e0e0;
  //   background: #fff;
  //   .scroll-bar {
  //     width: 17px;
  //     background: gray;
  //     border-radius: 2px;
  //   }
  // }
}
</style>
