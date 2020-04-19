<template>
  <datatable
    ref="table"
    :data="tableData"
    style="width: 100%"
    max-height="500">
    <el-table-column
      prop="id"
      label="ID">
    </el-table-column>
    <!-- <el-table-column
      label="输入">
      <template slot-scope="scope">
        <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
        <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
        <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
        <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
        <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>
        <el-date-picker type="date" placeholder="选择日期"> </el-date-picker>    
      </template>
    </el-table-column> -->
  </datatable>
</template>

<script>
import datatable from './datatable'
  export default {
    components: {
      datatable
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    data() {
      return {
        tableData: [
        ]
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let data = []
        for (let i=0; i<20; i++ ) {
          data.push({
            id: i,
            date: '2016-' + i,
          })
        }

        console.log(data.length)

        this.$refs.table.setData(data)
      }
    }
  }
</script>