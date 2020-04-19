<template>
  <div>
    <el-button @click="getData(1)">改变数据</el-button>
    <el-datatable 
      ref="table"
      :item-height="40" 
      :view-height="400">
      <!-- <div slot-scope="scope" class="item">
        {{scope.item}}
        <el-input style="width:50px"></el-input>
        <el-input style="width:50px"></el-input>
        <el-input style="width:50px"></el-input>
      </div> -->
      <el-datatable-column label="ID" width="200" prop="id"></el-datatable-column>
      <el-datatable-column label="名称" width="100" prop="name"></el-datatable-column>
      <el-datatable-column label="地址" width="200" prop="address">
        <template>
           jjjj
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
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        arrData:[]
      }
    },
    computed: {
 
    },
    mounted() {
      this.getData(15)
    },
    methods: {
      getData(num) {
        console.time('111')
       let arr = []
        for (let i = 0; i < num; i++) {
          arr.push({
            id: i,
            name: 'name-' + i,
            address: '地址'+ i
          })
        }
        console.timeEnd('111')
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