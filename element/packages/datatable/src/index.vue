<template>
  <div class="el-datatabe" :class="{}">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <table-header :store="store"></table-header>
    <scrollbar :store="store" :maxHeight="viewHeight">
      <table-body ref="body" v-bind="$props"></table-body>
    </scrollbar>
  </div>
</template>

<script>
import Vue from 'vue';
import createStore from './store';
import tableHeader from './table-header';
import tableBody from './table-body';
import scrollbar from './scrollbar';

let uid = 1;
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
    tableBody,
    scrollbar
  },
  provide() {
    return {
      tableParent: this
    };
  },
  data() {
    return { };
  },
  watch: {
    data: {
      handler() {
        this.setData(this.data);
      },
      immediate: true
    }
  },
  beforeCreate() {
    this.tableId = 'el-datatable_' + uid++;
    this.store = createStore(this);
    this.eventBus = new Vue();
  },
  mounted() {
    this.store.calcColumnWidth();
  },
  beforeDestroy() {
    this.store = null;
    this.eventBus = null;
  },
  methods: {
    setData(data) {
      this.store.setTableData(data);
      this.$refs.body && this.$refs.body.setData(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-datatabe {
  position: relative;
  border: 1px solid #ebeef5;
  box-sizing: border-box;
  overflow: hidden;
  .hidden-columns {
    display: none;
  }
}
.el-datatabe--scrollx {
  padding-bottom: 10px;
}
.el-datatabe--scrolly {
  padding-right: 10px;
}
</style>
