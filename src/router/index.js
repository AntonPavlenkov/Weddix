import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/pages/Welcome'
import EditPage from '@/pages/EditPage'
import PublishPage from '@/pages/PublishPage'

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
      name: 'EditPage',
      component: EditPage
    },
        {
      path: '/publish',
      name: 'PublishPage',
      component: PublishPage
    }
  ],
  mode: 'history'

})
