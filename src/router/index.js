import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/pages/Welcome'
import EditPage from '@/pages/EditPage'
import PublishPage from '@/pages/PublishPage'
import GeneralPage from '@/pages/GeneralPage'
import PreviewPage from '@/pages/PreviewPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/page',
      name: 'GeneralPage',
      component: GeneralPage,
      children: [
        {
          path: 'edit',
          name: 'EditPage',
          component: EditPage
        },
        {
          path: 'preview',
          name: 'PreviewPage',
          component: PreviewPage
        }
      ]
    },
    {
      path: '/publish/:id',
      name: 'Publish',
      component: PublishPage
    }
  ],
  mode: 'history'

})


