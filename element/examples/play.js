import Vue from 'vue';
import Element from 'main/index.js';
import App from './play/index.vue';
import 'packages/theme-chalk/src/index.scss';
import router from './play/router';

console.log(router, router);
Vue.use(Element);

new Vue({ // eslint-disable-line
  router,
  render: h => h(App)
}).$mount('#app');
