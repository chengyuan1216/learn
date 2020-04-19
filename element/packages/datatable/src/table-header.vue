<template>
  <table cellspacing="0" cellpadding="0" border="0" class="el-datatable__header">
    <colgroup>
      <col v-for="(col, index) in columns" 
        :key="index"
        :name="'el-datatable_column_'+index" 
        :width="col.width">
    </colgroup>
    <thead>
      <tr>
        <th v-for="(col, index) in columns" 
          :key="index" 
          colspan="1" 
          rowspan="1" 
          :class="'el-datatable_column_' + index">
          <div class="cell">{{col.label}}</div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
export default {
  inject:['tableParent'],
  data() {
    return {

    }
  },
  computed: {
    columns() {
      return this.tableParent.store.columns
    }
  }
}
</script>

<style lang="scss">
.el-datatable__header {
  table {
    table-layout:fixed;
    word-break:break-all;
  }
  th {
    height: 50px;
    border-right: 1px solid #ebeef5;
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    .cell {
      padding: 0 10px;
    }
  }
}
</style>