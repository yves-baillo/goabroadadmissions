import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import router from './router'
import './style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(MotionPlugin)
app.use(router)

app.mount('#app')
