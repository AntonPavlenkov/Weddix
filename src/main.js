// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App'
import router from './router'
import store from './store/store'
import Carousel3d from 'vue-carousel-3d';
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false

Vue.use(VueMaterial);
Vue.use(Carousel3d);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
