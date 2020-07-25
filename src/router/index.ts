import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/calendar-demo',
    name: 'CalendarDemo',
    component: () => import('../views/calendar-demo')
  },
  {
    path: '/full-calendar-demo',
    name: 'FullCalendarDemo',
    component: () => import('../views/full-calendar-demo')
  },
  {
    path: '/promise-dialog',
    name: 'PromiseDialog',
    component: () => import('../views/promise-dialog')
  }
]

const router = new VueRouter({
  routes
})

export default router
