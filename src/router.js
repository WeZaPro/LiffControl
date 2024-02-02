import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LiffWeb from '@/views/LiffWeb.vue'
import LiffApp from '@/views/LiffApp.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/liffweb',
      component: LiffWeb,
    },
    {
      path: '/liffapp',
      component: LiffApp,
    },
  ],
})
