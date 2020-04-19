import ElDatatbleColumn from '../datatable/src/table-column.vue';

/* istanbul ignore next */
ElDatatbleColumn.install = function(Vue) {
  Vue.component(ElDatatbleColumn.name, ElDatatbleColumn);
};

export default ElDatatbleColumn;
