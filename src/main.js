// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App'
import router from './router'
import store from './store/store'
import Carousel3d from 'vue-carousel-3d';
import 'vue-material/dist/vue-material.css'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDCry_PLFjoDuWFTJp-4ecimkVkkeMmcPU',
    libraries: 'places',
  }
});

Vue.use(VueMaterial);
Vue.use(Carousel3d);

// definition of a directive to allow change position of element by dragging it
Vue.directive('draggable-touch', {
  bind: function (el) {
    el.style.position = 'absolute';
    var startX, startY, initialMouseX, initialMouseY;
    console.log('Started')
    function mousemove(e) {
      var dx = e.clientX - initialMouseX;
      var dy = e.clientY - initialMouseY;
      var dx = e.changedTouches[0].clientX - initialMouseX;
      var dy = e.changedTouches[0].clientY - initialMouseY;
      el.style.top = startY + dy + 'px';
      el.style.left = startX + dx + 'px';
      return false;
    }
    function mouseup() {
      document.removeEventListener('touchmove', mousemove);
      document.removeEventListener('touchend', mouseup);
      
    }

    el.addEventListener('touchstart', function (e) {
      e.stopPropagation();
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.changedTouches[0].clientX;
      initialMouseY = e.changedTouches[0].clientY;
      document.addEventListener('touchmove', mousemove);
      document.addEventListener('touchend', mouseup);
      console.log('ended',el)
      return false;
    });
  }
})

Vue.directive('draggable', {
  bind: function (el) {
    el.style.position = 'absolute';
    var startX, startY, initialMouseX, initialMouseY;

    function mousemove(e) {
      var dx = e.clientX - initialMouseX;
      var dy = e.clientY - initialMouseY;
      el.style.top = startY + dy + 'px';
      el.style.left = startX + dx + 'px';
      return false;
    }

    function mouseup() {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    }

    el.addEventListener('mousedown', function (e) {
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
      return false;
    });
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
