import Vue from 'vue'
import Router from 'vue-router'
 
import Index from '../page/index' 
import makeAnAppointment from '../page/makeAnAppointment'  

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [ 
        {
          path: '/',
          name: 'makeAnAppointment',
          component: makeAnAppointment,
          // meta: {
          //   keepAlive: true
          // }
        } 
      ]
    }, 
  ],
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
