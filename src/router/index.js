import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ScholarshipDetail from '../components/ScholarshipDetail.vue'
import News from '../components/News.vue'
import ContactPage from '../components/ContactPage.vue'
import AboutPage from '../components/AboutPage.vue'
import ScholarshipsPage from '../components/ScholarshipsPage.vue'
import Dashboard from '../components/Dashboard.vue'
import PrivacyPage from '../components/PrivacyPage.vue'
import TermsPage from '../components/TermsPage.vue'
import LoginPage from '../components/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: false, showLayout: true }
  },
  {
    path: '/scholarship/:id',
    name: 'ScholarshipDetail',
    component: ScholarshipDetail,
    props: true,
    meta: { requiresAuth: false, showLayout: true }
  },
  {
    path: '/news',
    component: News,
    meta: { requiresAuth: false, showLayout: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, showLayout: false }
  },
  {
    path: '/contact',
    component: ContactPage,
    alias: '/faq',
    meta: { requiresAuth: false, showLayout: true }
  },
  {
    path: '/about',
    component: AboutPage,
    meta: { requiresAuth: false, showLayout: true }
  },
  {
    path: '/scholarships',
    component: ScholarshipsPage,
    meta: { requiresAuth: false, showLayout: true }
  },
  {
    path: '/privacy',
    component: PrivacyPage,
    meta: { requiresAuth: false, showLayout: true }
  },
  {
    path: '/terms',
    component: TermsPage,
    meta: { requiresAuth: false, showLayout: true }
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false, showLayout: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken')
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !token) {
    // Redirect to login if trying to access protected route without token
    next('/login')
  } else if (to.path === '/login' && token) {
    // Redirect to dashboard if already logged in and trying to access login page
    next('/dashboard')
  } else {
    next()
  }
})

export default router
