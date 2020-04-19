import ELDatatable from './src';

/* istanbul ignore next */
ELDatatable.install = function(Vue) {
  Vue.component(ELDatatable.name, ELDatatable);
};

export default ELDatatable;
