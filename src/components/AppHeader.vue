<template>
  <header 
    v-motion
    :initial="{ opacity: 0, y: -20 }"
    :enter="{ opacity: 1, y: 0 }"
    :duration="500"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/30 backdrop-blur-md shadow-md py-2' 
        : 'bg-transparent py-5'
    ]"
  >
    <nav class="container mx-auto px-4 sm:px-6 lg:px-4">
      <div class="flex justify-between items-center">
        
        <!-- Logo with Text -->
        <div class="flex items-center gap-3">
          <img 
            src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
            alt="GoAbroad Admissions Logo" 
            class="h-15 w-60" 
          >
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link 
            to="/" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/' },
              'text-black hover:text-yellow-500'
            ]"
          >
            <span>Home</span>
          </router-link>

          <router-link 
            to="/scholarships" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/scholarships' },
              'text-black hover:text-yellow-500'
            ]"
          >
            <span>Scholarships</span>
          </router-link>

          <router-link 
            to="/about" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/about' },
              'text-black hover:text-yellow-500'
            ]"
          >
            <span>About</span>
          </router-link>

          <router-link 
            to="/contact" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/contact' },
              'text-black hover:text-yellow-500'
            ]"
          >
            <span>Contact</span>
          </router-link>

          <!-- Notifications Icon with Counter for Latest News -->
          <div class="relative ml-2">
            <button 
              @click="toggleNotifications"
              class="relative p-2 rounded-full transition-colors text-black hover:bg-gray-100"
            >
              <Bell :size="20" />
              <!-- Notification Counter instead of red dot -->
              <span 
                v-if="unreadCount > 0" 
                class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
              >
                {{ unreadCount > 9 ? '9+' : unreadCount }}
              </span>
            </button>

            <!-- Notifications Dropdown -->
            <div 
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100"
            >
              <div class="p-3 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 class="font-semibold text-gray-800">Latest News</h3>
                  <p class="text-xs text-gray-500">Stay updated with the latest announcements</p>
                </div>
                <button 
                  v-if="unreadCount > 0"
                  @click="markAllAsRead"
                  class="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Mark all as read
                </button>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div 
                  v-for="notification in notifications" 
                  :key="notification.id"
                  class="p-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                  :class="{ 'bg-yellow-50/30': !notification.read }"
                  @click="markAsRead(notification)"
                >
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 mt-0.5">
                      <div v-if="notification.type === 'news'" class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div v-else-if="notification.type === 'deadline'" class="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div v-else class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-800">{{ notification.title }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ notification.message }}</p>
                      <span class="text-xs text-gray-400 mt-1 inline-block">{{ notification.time }}</span>
                    </div>
                    <div v-if="!notification.read" class="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div class="p-2 text-center border-t border-gray-100">
                <router-link 
                  to="/news" 
                  class="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                  @click="closeNotifications"
                >
                  View All News →
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
        >
          <Menu :size="24" v-if="!mobileMenuOpen" />
          <X :size="24" v-else />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="mobileMenuOpen"
        v-motion
        :initial="{ opacity: 0, height: 0 }"
        :enter="{ opacity: 1, height: 'auto' }"
        :leave="{ opacity: 0, height: 0 }"
        class="md:hidden mt-4 rounded-xl overflow-hidden bg-white shadow-lg"
      >
        <div class="py-3 space-y-1">
          <router-link 
            to="/" 
            class="mobile-nav-link"
            :class="{ 'active': $route.path === '/' }"
            @click="closeMobileMenu"
          >
            <span>Home</span>
          </router-link>

          <router-link 
            to="/scholarships" 
            class="mobile-nav-link"
            :class="{ 'active': $route.path === '/scholarships' }"
            @click="closeMobileMenu"
          >
            <span>Scholarships</span>
          </router-link>

          <router-link 
            to="/about" 
            class="mobile-nav-link"
            :class="{ 'active': $route.path === '/about' }"
            @click="closeMobileMenu"
          >
            <span>About</span>
          </router-link>

          <router-link 
            to="/contact" 
            class="mobile-nav-link"
            :class="{ 'active': $route.path === '/contact' }"
            @click="closeMobileMenu"
          >
            <span>Contact</span>
          </router-link>

          <!-- Mobile Notifications Link with Counter -->
          <div class="border-t border-gray-100 my-2 pt-2">
            <div class="flex items-center justify-between px-4 py-3">
              <div class="flex items-center gap-2">
                <Bell :size="16" class="text-gray-600" />
                <span class="text-sm font-medium text-gray-600">Latest News</span>
                <span 
                  v-if="unreadCount > 0" 
                  class="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5"
                >
                  {{ unreadCount }}
                </span>
              </div>
              <router-link 
                to="/news" 
                class="text-xs text-yellow-600 hover:text-yellow-700"
                @click="closeMobileMenu"
              >
                View All
              </router-link>
            </div>
            <div class="space-y-2 px-2">
              <div 
                v-for="notification in notifications.slice(0, 3)" 
                :key="notification.id"
                class="p-2 rounded-lg"
                :class="!notification.read ? 'bg-yellow-50' : 'bg-gray-50'"
              >
                <p class="text-xs font-medium text-gray-800">{{ notification.title }}</p>
                <p class="text-xs text-gray-500">{{ notification.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Menu, X, Bell } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const showNotifications = ref(false)

// Notifications data
const notifications = ref([
  {
    id: 1,
    type: 'news',
    title: 'New Scholarship Opportunity',
    message: 'Fulbright scholarships now open for 2025! Apply before the deadline.',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    type: 'deadline',
    title: 'Application Deadline Approaching',
    message: 'Chevening Scholarship deadline is in 2 weeks.',
    time: 'Yesterday',
    read: false
  },
  {
    id: 3,
    type: 'update',
    title: 'New Partner University Added',
    message: 'University of Toronto is now part of our admissions network.',
    time: '2 days ago',
    read: true
  },
  {
    id: 4,
    type: 'news',
    title: 'Study Abroad Webinar',
    message: 'Join our free webinar on "How to Choose the Right University".',
    time: '3 days ago',
    read: true
  }
])

// Compute unread count
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const closeNotifications = () => {
  showNotifications.value = false
}

const markAsRead = (notification) => {
  if (!notification.read) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  showNotifications.value = false
}

// Handle clicking outside notifications dropdown
const handleClickOutside = (event) => {
  if (showNotifications.value) {
    const dropdown = event.target.closest('.relative.ml-2')
    if (!dropdown) {
      showNotifications.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@reference "tailwindcss";

.nav-link {
  @apply flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 font-medium;
}

.nav-link.active {
  @apply font-semibold text-yellow-500;
}

.mobile-nav-link {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium;
}

.mobile-nav-link.active {
  @apply bg-yellow-50 text-yellow-600;
}
</style>