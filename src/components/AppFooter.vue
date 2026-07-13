<template>
  <footer class="bg-black text-white relative overflow-hidden border-t border-white/10">
    <!-- Animated background accents -->
    <div class="absolute inset-0 opacity-30 pointer-events-none">
      <div class="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-r from-[#F9A825]/20 to-[#F57F17]/20 rounded-full filter blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-0 -right-40 w-80 h-80 bg-gradient-to-r from-[#F57F17]/20 to-[#F9A825]/20 rounded-full filter blur-3xl animate-float-delayed animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F9A825]/5 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
      <div class="absolute top-20 right-[20%] w-40 h-40 bg-[#F9A825]/10 rounded-full filter blur-3xl animate-drift animation-delay-3000"></div>
      <div class="absolute bottom-20 left-[15%] w-56 h-56 bg-[#F57F17]/10 rounded-full filter blur-3xl animate-float-medium animation-delay-1500"></div>
    </div>

    <!-- Main Footer -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        <!-- Brand Section - No animations -->
        <div class="space-y-3">
          <div class="relative inline-block group">
            <div class="absolute -inset-2 bg-gradient-to-r from-[#F9A825]/20 to-[#F57F17]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
              alt="GoAbroad Admissions" 
              class="h-14 w-auto object-contain brightness-110 hover:scale-105 transition-all duration-500 relative z-10"
            />
          </div>
          
          <!-- Static Text (no typewriter) -->
          <div class="text-sm leading-relaxed text-gray-400 max-w-xs">
            Your trusted partner in transforming 
            <span class="text-[#F9A825] font-semibold">international education</span>
            dreams into reality.
          </div>
          
          <div class="pt-2">
            <div class="flex flex-wrap gap-2">
              <a
                v-for="(social, index) in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                v-motion
                :initial="{ opacity: 0, scale: 0 }"
                :visible="{ opacity: 1, scale: 1 }"
                :delay="200 + index * 50"
                :duration="400"
                class="w-9 h-9 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-[#F9A825] hover:to-[#F57F17] flex items-center justify-center text-gray-300 hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#F9A825]/30 group animate-bounce-on-hover"
                :title="social.name"
              >
                <component :is="social.icon" class="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links - Animated -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0 }"
          :delay="200"
          :duration="600"
        >
          <h3 class="text-base font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#F9A825] to-[#F57F17] flex items-center gap-2">
            <div class="w-1 h-5 bg-gradient-to-b from-[#F9A825] to-[#F57F17] rounded-full animate-pulse-gentle"></div>
            Quick Links
          </h3>
          <ul class="space-y-2">
            <li v-for="(link, index) in quickLinks" :key="link.to">
              <router-link 
                :to="link.to" 
                v-motion
                :initial="{ opacity: 0, x: -20 }"
                :visible="{ opacity: 1, x: 0 }"
                :delay="250 + index * 50"
                :duration="400"
                class="group flex items-center gap-2 text-sm text-gray-400 hover:text-[#F9A825] transition-all duration-200"
              >
                <svg class="w-2.5 h-2.5 text-gray-600 group-hover:translate-x-1 group-hover:text-[#F9A825] transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span class="group-hover:translate-x-0.5 transition-transform duration-300">{{ link.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources - Animated -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0 }"
          :delay="300"
          :duration="600"
        >
          <h3 class="text-base font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#F9A825] to-[#F57F17] flex items-center gap-2">
            <div class="w-1 h-5 bg-gradient-to-b from-[#F9A825] to-[#F57F17] rounded-full animate-pulse-gentle animation-delay-500"></div>
            Resources
          </h3>
          <ul class="space-y-2">
            <li v-for="(resource, index) in resources" :key="resource.name">
              <div 
                v-motion
                :initial="{ opacity: 0, x: -20 }"
                :visible="{ opacity: 1, x: 0 }"
                :delay="350 + index * 50"
                :duration="400"
                class="flex items-center gap-2 text-sm text-gray-400 hover:text-[#F9A825] transition-colors cursor-pointer group"
              >
                <div class="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#F9A825] to-[#F57F17] group-hover:scale-125 group-hover:rotate-45 transition-all duration-300"></div>
                <span class="group-hover:translate-x-1 transition-transform duration-300">{{ resource.name }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Newsletter Section - Animated -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0 }"
          :delay="400"
          :duration="600"
        >
          <h3 class="text-base font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#F9A825] to-[#F57F17] flex items-center gap-2">
            <div class="w-1 h-5 bg-gradient-to-b from-[#F9A825] to-[#F57F17] rounded-full animate-pulse-gentle animation-delay-1000"></div>
            Stay Updated
          </h3>
          <p class="text-sm text-gray-400 mb-4 animate-fade-in">
            Get latest scholarships & opportunities delivered to your inbox.
          </p>
          
          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <div class="relative group">
              <input 
                v-model="email"
                type="email" 
                placeholder="Enter your email"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825]/30 transition-all duration-300 text-white placeholder-gray-500 disabled:opacity-50 text-sm group-hover:border-white/40"
              />
              <Mail class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#F9A825] transition-colors animate-shake-on-focus" />
            </div>

            <button 
              type="submit"
              :disabled="isSubmitting"
              class="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-[#F9A825] to-[#F57F17] px-4 py-3 font-semibold text-black shadow-lg hover:shadow-xl hover:shadow-[#F9A825]/30 transition-all duration-300 disabled:opacity-50 text-sm"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-[#FBC02D] to-[#F57F17] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span class="relative flex items-center justify-center gap-2">
                <svg v-if="isSubmitting" class="w-4 h-4 animate-spin text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <Send v-else class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span>{{ isSubmitting ? 'Subscribing...' : 'Subscribe Now' }}</span>
              </span>
            </button>
          </form>
          
          <div class="mt-4 space-y-2">
            <div class="flex items-center gap-2 text-[11px] text-gray-500 group cursor-pointer hover:text-[#F9A825] transition-colors">
              <svg class="w-3 h-3 text-[#F9A825] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="group-hover:translate-x-0.5 transition-transform duration-300">Weekly scholarship alerts</span>
            </div>
            <div class="flex items-center gap-2 text-[11px] text-gray-500 group cursor-pointer hover:text-[#F9A825] transition-colors">
              <svg class="w-3 h-3 text-[#F9A825] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="group-hover:translate-x-0.5 transition-transform duration-300">Application tips & guides</span>
            </div>
          </div>
          
          <div v-if="errorMessage" class="mt-3 text-xs text-red-400 flex items-center gap-2 bg-red-500/10 p-2 rounded-xl animate-shake">
            <AlertCircle class="w-3.5 h-3.5 flex-shrink-0 animate-pulse" />
            <span>{{ errorMessage }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar - Animated -->
    <div 
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0 }"
      :delay="500"
      :duration="600"
      class="border-t border-white/10 relative z-10 bg-black/30 backdrop-blur-sm"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <div class="flex items-center gap-3">
            <p class="text-gray-500 animate-fade-in-up">
              &copy; {{ currentYear }} GoAbroad Admissions. All rights reserved.
            </p>
            <span class="w-1 h-1 rounded-full bg-[#F9A825]/50 hidden sm:block animate-pulse-gentle"></span>
            <p class="text-gray-500 animate-fade-in-up animation-delay-300">Kigali, Rwanda</p>
          </div>
          
          <div class="flex gap-6">
            <router-link 
              v-for="(link, index) in bottomLinks" 
              :key="link.to"
              v-motion
              :initial="{ opacity: 0, y: 10 }"
              :visible="{ opacity: 1, y: 0 }"
              :delay="600 + index * 50"
              :duration="400"
              :to="link.to" 
              class="text-gray-500 hover:text-[#F9A825] transition-all duration-300 hover:translate-y-[-1px]"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modern Toast Notification -->
    <Transition name="toast">
      <div 
        v-if="showToast"
        class="fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-black text-sm font-medium animate-slide-in-right"
      >
        <div class="w-1 h-8 bg-white/50 rounded-full animate-pulse-gentle"></div>
        <div>
          <p class="font-semibold">Success!</p>
          <p class="text-xs opacity-90">{{ toastMessage }}</p>
        </div>
        <button @click="showToast = false" class="ml-2 hover:opacity-70 transition-opacity hover:rotate-90 duration-300">
          <X class="w-4 h-4" />
        </button>
      </div>
    </Transition>

    <!-- Scroll to Top Button with Animations -->
    <Transition name="fade">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        v-motion
        :initial="{ scale: 0, rotate: -180 }"
        :visible="{ scale: 1, rotate: 0 }"
        :duration="400"
        while-hover="{ scale: 1.1, rotate: 360 }"
        class="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-black shadow-lg hover:shadow-xl hover:shadow-[#F9A825]/30 transition-all duration-300 flex items-center justify-center group"
      >
        <svg class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </Transition>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Music,
  Mail,
  Send,
  AlertCircle,
  X
} from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
const email = ref('')
const isSubmitting = ref(false)
const showToast = ref(false)
const showScrollTop = ref(false)
const toastMessage = ref('Successfully subscribed!')
const errorMessage = ref('')

const API_URL = 'https://newbackend-gamma.vercel.app'

const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Scholarships', to: '/scholarships' },
  { name: 'News & Updates', to: '/news' },
  { name: 'Contact Us', to: '/contact' }
]

const resources = [
  { name: 'Study Abroad Guide' },
  { name: 'Scholarship Tips' },
  { name: 'Visa Assistance' },
  { name: 'University Rankings' }
]

const bottomLinks = [
  { name: 'Privacy Policy', to: '/privacy' },
  { name: 'Terms of Service', to: '/terms' },
  { name: 'FAQ', to: '/faq' }
]

const socialLinks = [
  { name: 'YouTube', url: 'https://youtube.com/@xmaopportunitiesportal?si=d1hFYNlUMgBmqc-J', icon: Youtube },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/goabroad-admissions-361873399/', icon: Linkedin },
  { name: 'Facebook', url: 'https://www.facebook.com/share/1JYd3mLj5X/?mibextid=wwXIfr', icon: Facebook },
  { name: 'Instagram', url: 'https://www.instagram.com/goabroad_admissions?igsh=MXBtejh5c2Z1c3Uwdw%3D%3D&utm_source=qr', icon: Instagram },
  { name: 'Twitter', url: 'https://x.com/GoAbroad_Go', icon: Twitter },
  { name: 'TikTok', url: 'https://www.tiktok.com/@xmaopportunitiesportal?_r=1&_t=ZP-928v4nvs5z5', icon: Music }
]

const handleSubscribe = async () => {
  errorMessage.value = ''
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address'
    return
  }
  
  isSubmitting.value = true
  
  try {
    const response = await axios.post(`${API_URL}/api/subscribe`, {
      email: email.value
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000
    })
    
    if (response.data.success) {
      toastMessage.value = response.data.message || 'Successfully subscribed!'
      showToast.value = true
      email.value = ''
      setTimeout(() => { showToast.value = false }, 4000)
    } else {
      errorMessage.value = response.data.message || 'Subscription failed. Please try again.'
      setTimeout(() => { errorMessage.value = '' }, 5000)
    }
  } catch (error) {
    console.error('Subscription error:', error)
    if (error.code === 'ERR_NETWORK') {
      errorMessage.value = 'Cannot connect to server. Please try again later.'
    } else if (error.response) {
      errorMessage.value = error.response.data?.message || 'Server error. Please try again.'
    } else {
      errorMessage.value = 'Connection error. Please try again.'
    }
    setTimeout(() => { errorMessage.value = '' }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Animation Keyframes */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
  50% { transform: translate(30px, -20px) scale(1.1); opacity: 0.25; }
}

@keyframes float-medium {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
  50% { transform: translate(-20px, 15px) scale(1.15); opacity: 0.2; }
}

@keyframes float-delayed {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
  50% { transform: translate(-25px, -15px) scale(1.08); opacity: 0.22; }
}

@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.08; }
  33% { transform: translate(40px, -10px) scale(1.12); opacity: 0.15; }
  66% { transform: translate(-20px, 20px) scale(0.95); opacity: 0.1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes pulse-gentle {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes bounce-on-hover {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Animation Classes */
.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 10s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 14s ease-in-out infinite;
}

.animate-drift {
  animation: drift 18s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}

.animate-bounce-on-hover:hover {
  animation: bounce-on-hover 0.3s ease-in-out;
}

.animate-shake-on-focus:focus {
  animation: shake 0.3s ease-in-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Delay Classes */
.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-1500 {
  animation-delay: 1.5s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

/* Transition Classes */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus Styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(249, 168, 37, 0.2);
}

/* Hover Effects */
.hover\:rotate-12:hover {
  transform: rotate(12deg);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-1px);
}
</style>
