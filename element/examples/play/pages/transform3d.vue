<template>
 <div style="width: 400px; height: 400px; border:1px solid red;overflow-y:scroll">
   <div style="width:100%; height: 200px;padding-top:400px; transform: translate3d(0, 0px, 0)"
   >llllllllllllllll</div>
    <!-- <div style="width: 100px; height: 100px; background: red;"></div> -->
 </div>
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
    },
    methods: {
      
    }
  }
</script>