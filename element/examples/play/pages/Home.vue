<template>
  <div>
    <el-input v-model="num" style="width: 200px"></el-input>
    <el-button @click="getData(num)">确定</el-button>
    <!-- <el-button @click="showAddress = true">增加一列</el-button> -->
    <el-datatable 
      ref="table"
      style="width: 700px"
      :item-height="40" 
      :view-height="400">
      <el-datatable-column label="ID" width="200" prop="id"></el-datatable-column>
      <el-datatable-column label="名称" width="100" prop="name"></el-datatable-column>
      <el-datatable-column label="地址" width="200" prop="address" v-if="showAddress">
        <template>
           a
        </template>
      </el-datatable-column>
      <el-datatable-column label="地址1" width="200" prop="address">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-datatable-column>
      <el-datatable-column label="地址2" prop="address"></el-datatable-column>
    </el-datatable>
  </div>
</template>

<script>
  import ResizeObserver from 'resize-observer-polyfill';
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        showAddress: false,
        num: 100
      }
    },
    computed: {
 
    },
    mounted() {
      this.getData(this.num)
    },
    methods: {
      getData(num) {
       let arr = []
        for (let i = 0; i < num; i++) {
          arr.push({
            id: i,
            name: 'name-' + i,
            address: '地址'+ i
          })
        }
        // 当数据量达到很大的时候,使用setData传递数据
        // 注意也不要保存在父组件的data中， 因为这会将对象所有的属性转变成get、set
        this.$refs.table.setData(arr)
      }
    }
  }
</script>
<style lang="scss">
.item {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>