<script>
export default {
  inject: ['tableParent'],
  props: {
    data: Object
  },
  computed: {
    tabeData() {
      return this.tableParent.data;
    },
    columns() {
      return this.tableParent.store.columns;
    }
  },
  render(h) {
    let {data, columns} = this;
    return (
      <tr class="table-row">
        {columns.map((col, index) => {
          return <td
            key={index}
            colspan="1"
            rowspan="1"
            width={col.realWidth}
            class={'el-datatable_column_' + index}>
            {this.renderCell(col, index)}
          </td>;
        })}
      </tr>
    );
  },
  methods: {
    renderCell(col, index) {
      let cell = null;
      let component = this.tableParent.store.columnComponents[index];
      if (component.$scopedSlots.default) {
        cell = component.$scopedSlots.default({
          row: this.data
        });
      } else if (component.$slots.default) {
        cell = component.$slots.default;
      }
      return <div class="cell">
        {cell || this.data[col.prop]}
      </div>;
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  td {
    height: 40px;
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    box-sizing: border-box;
    padding: 0;
    .cell {
      padding: 0 10px;
    }
  }
  td:nth-last-child(1) {
    border-right: 0;
  }
}
</style>