import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ScholarshipDetail from '../components/ScholarshipDetail.vue'
import News from '../components/News.vue'
import ContactPage from '../components/ContactPage.vue'
import AboutPage from '../components/AboutPage.vue'
import ScholarshipsPage from '../components/ScholarshipsPage.vue'
import AppFooter from '../components/AppFooter.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/scholarship/:id',
    name: 'ScholarshipDetail',
    component: ScholarshipDetail,
    props: true
  },
  {
    path:'/news',
    component:News
  },
  {
    path:'/contact',
    component:ContactPage
  },
  {
    path:'/about',
    component:AboutPage
  },
  {
    path:'/scholarships',
    component:ScholarshipsPage
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
