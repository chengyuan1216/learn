<template>
  <div class="el-datatable__header" :style="{width: store.tableWidth + 'px'}">
      <table cellspacing="0" cellpadding="0" border="0">
      <colgroup>
        <col v-for="(col, index) in store.columns" 
          :key="index"
          :name="'el-datatable_column_'+index" 
          :width="col.realWidth">
      </colgroup>
      <thead>
        <tr>
          <th v-for="(col, index) in store.columns" 
            :key="index" 
            colspan="1" 
            rowspan="1" 
            :class="'el-datatable_column_' + index">
            <div class="cell">{{col.label}}</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    store: Object
  },
  data() {
    return {

    };
  },
  computed: {

  }
};
</script>

<style lang="scss">
.el-datatable__header {
  overflow: hidden;
  table {
    table-layout:fixed;
    word-break:break-all;
  }
  th {
    height: 50px;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    .cell {
      padding: 0 10px;
    }
  }
  th:nth-last-child(1) {
    border-right: 0;
  }
}
</style>