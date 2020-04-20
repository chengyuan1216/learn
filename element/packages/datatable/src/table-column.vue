<script>
import {getTableParent} from './helpers/utils';
export default {
  name: 'ElDatatableColumn',

  props: {
    prop: String,
    label: String,
    width: [String, Number]
  },

  created() {
    let tableParent = this.getTableParent()
    if (!tableParent) {
      throw new Error('未找到el-datatable父组件');
      return;
    }
    tableParent.store.addColumn(this);
  },

  render(h) {
    // slots 也要渲染，需要计算合并表头
    return h('div', this.$slots.default);
  },

  methods: {
    getTableParent
  }
};
</script>

<style lang="scss" scoped>

</style>
