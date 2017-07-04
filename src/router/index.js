import Vue from 'vue'
import Router from 'vue-router'
import EditorWeb from '@/components/EditorWeb'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/edit',
      name: 'EditorWeb',
      component: EditorWeb
    }
  ]
})
