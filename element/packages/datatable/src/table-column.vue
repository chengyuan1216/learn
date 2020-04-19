<script>
export default {
  name: 'ElDatatableColumn',

  props: {
    prop: String,
    label: String,
    width: [String, Number]
  },

  inject: ['tableParent'],

  created() {
    if (!this.tableParent) {
      throw new Error('未找到el-datatable父组件');
      return;
    }
    this.tableParent.store.addColumn(this);
  },

  render(h) {
    // console.log(this.tableParent, this.$props );
    // slots 也要渲染，需要计算合并表头
    return h('div', this.$slots.default);
  }
};
</script>

<style lang="scss" scoped>

</style>
