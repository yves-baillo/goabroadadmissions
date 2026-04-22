<template>
  <footer class="bg-black text-white relative footer-bg">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info with Logo -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
          class="space-y-4"
        >
          <img 
            src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
            alt="GoAbroad Admissions Logo" 
            class="w-50 h-12 object-contain"
          />
          <p class="text-sm leading-relaxed text-gray-300">
            Your trusted partner in transforming international education dreams into reality. 
            We bridge the gap between students and global education opportunities.
          </p>
          
          <!-- Social Media Section -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 500 } }"
            class="pt-4"
          >
            <p class="text-center text-sm text-gray-400 mb-3">Follow us on social media</p>
            <div class="flex justify-center gap-2 flex-wrap">
              <a
                v-for="(social, index) in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                v-motion
                :initial="{ scale: 0, rotate: -180 }"
                :visible="{ 
                  scale: 1, 
                  rotate: 0, 
                  transition: { 
                    delay: 300 + (index * 50), 
                    duration: 400,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  } 
                }"
                :while-hover="{ 
                  scale: 1.15, 
                  y: -3,
                  transition: { duration: 200 }
                }"
                :while-tap="{ scale: 0.95 }"
                class="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200"
                :class="social.bgColor"
              >
                <i :class="social.icon + ' text-sm'"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 150, duration: 500 } }"
        >
          <h3 class="text-base font-semibold mb-3 text-[#F9A825]">
            <i class="fas fa-link mr-2"></i>
            Quick Links
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <router-link 
                :to="link.to" 
                class="flex items-center gap-2 text-sm text-gray-300 hover:text-[#F9A825] transition-colors group"
              >
                <i class="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources - WITH DIRECT LINKS -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 500 } }"
        >
          <h3 class="text-base font-semibold mb-3 text-[#F9A825]">
            <i class="fas fa-book-open mr-2"></i>
            Resources
          </h3>
          <ul class="space-y-2">
            <li v-for="resource in resources" :key="resource.name">
              <a 
                :href="resource.link" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm text-gray-300 hover:text-[#F9A825] transition-colors group"
              >
                <i class="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                {{ resource.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 250, duration: 500 } }"
        >
          <h3 class="text-base font-semibold mb-3 text-[#F9A825]">
            <i class="fas fa-envelope mr-2"></i>
            Stay Updated
          </h3>
          <p class="text-sm text-gray-300 mb-3">
            Subscribe for latest scholarships and opportunities.
          </p>
          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <div class="relative">
              <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-[#F9A825] text-sm"></i>
              <input 
                v-model="email"
                type="email" 
                placeholder="Your email address"
                required
                class="w-full pl-10 pr-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#F9A825] transition-colors text-sm text-white placeholder-gray-400"
              />
            </div>
            <button 
              type="submit"
              v-motion
              :while-hover="{ scale: 1.02, y: -2 }"
              :while-tap="{ scale: 0.98 }"
              class="w-full bg-[#E91E8F] hover:bg-[#F9A825] text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <i class="fas fa-paper-plane text-xs"></i>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Bottom Bar - WITH DIRECT POLICY LINKS -->
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :visible="{ opacity: 1, transition: { delay: 300, duration: 500 } }"
      class="border-t border-gray-800/50 relative z-10"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p class="text-gray-500">
            &copy; {{ currentYear }} GoAbroad Admissions. All rights reserved.
          </p>
          <div class="flex gap-5">
            <a 
              v-for="policy in policies" 
              :key="policy.name" 
              :href="policy.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-[#F9A825] transition-colors"
            >
              {{ policy.name }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast Notification -->
    <Transition name="toast">
      <div 
        v-if="showToast"
        v-motion
        :initial="{ opacity: 0, x: 50, scale: 0.8 }"
        :visible="{ opacity: 1, x: 0, scale: 1 }"
        class="fixed bottom-4 right-4 px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-2 z-50 text-sm bg-[#F9A825] text-black"
      >
        <i class="fas fa-check-circle"></i>
        <span>Successfully subscribed to newsletter!</span>
      </div>
    </Transition>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = new Date().getFullYear()
const email = ref('')
const showToast = ref(false)

const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Scholarships', to: '/scholarships' },
  { name: 'News & Updates', to: '/news' },
  { name: 'Contact Us', to: '/contact' }
]

// Resources with DIRECT WORKING LINKS
const resources = [
  { name: 'Study Abroad Guide', link: 'https://www.studying-in-germany.org/study-abroad-guide/' },
  { name: 'Scholarship Tips', link: 'https://www.topuniversities.com/blog/scholarships/scholarship-application-tips' },
  { name: 'Visa Assistance', link: 'https://www.travel.state.gov/content/travel/en/us-visas.html' },
  { name: 'University Rankings', link: 'https://www.topuniversities.com/world-university-rankings' },
  { name: 'FAQs', link: '/faq' }
]

// Policies with DIRECT WORKING LINKS
const policies = [
  { name: 'Privacy Policy', link: '/privacy-policy' },
  { name: 'Terms of Service', link: '/terms-of-service' },
  { name: 'Cookie Policy', link: '/cookie-policy' }
]

const socialLinks = [
  { 
    name: 'YouTube', 
    url: 'https://youtube.com/@xmaopportunitiesportal', 
    icon: 'fab fa-youtube', 
    bgColor: 'bg-red-600 hover:bg-red-700'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/goabroad-admissions-361873399/', 
    icon: 'fab fa-linkedin-in', 
    bgColor: 'bg-blue-700 hover:bg-blue-800'
  },
  { 
    name: 'Facebook', 
    url: 'https://www.facebook.com/share/1JYd3mLj5X/', 
    icon: 'fab fa-facebook-f', 
    bgColor: 'bg-blue-600 hover:bg-blue-700'
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/goabroad_admissions', 
    icon: 'fab fa-instagram', 
    bgColor: 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600'
  },
  { 
    name: 'Twitter', 
    url: 'https://x.com/GoAbroad_Go', 
    icon: 'fab fa-twitter', 
    bgColor: 'bg-gray-800 hover:bg-gray-700'
  },
  { 
    name: 'TikTok', 
    url: 'https://www.tiktok.com/@xmaopportunitiesportal', 
    icon: 'fab fa-tiktok', 
    bgColor: 'bg-gray-800 hover:bg-gray-700'
  }
]

const handleSubscribe = () => {
  if (email.value) {
    console.log('Subscribed:', email.value)
    showToast.value = true
    email.value = ''
    
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  }
}
</script>
<style scoped>
/* Footer background with no image */
.footer-bg {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Dark overlay on top of background image */
.footer-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.92);
  z-index: 1;
  pointer-events: none;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.8);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

button {
  cursor: pointer;
}

a, button {
  transition: all 0.2s ease;
}
</style>