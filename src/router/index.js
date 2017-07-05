import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import EditorWeb from '@/components/EditorWeb'
import PublishPage from '@/components/PublishPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
        {
      path: '/edit',
      name: 'EditorWeb',
      component: EditorWeb
    },
        {
      path: '/publish',
      name: 'PublishPage',
      component: PublishPage
    }
  ]
})
