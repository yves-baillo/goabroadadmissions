<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled 
        ? 'bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-2xl shadow-2xl shadow-yellow-500/10 py-3 border-b border-yellow-400/30' 
        : 'bg-transparent py-6'
    ]"
  >
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center gap-3 group">
          <img 
            src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
            alt="GoAbroad Admissions Logo" 
            class="h-12 w-auto md:h-14 brightness-110 group-hover:brightness-125 transition-all duration-300 hover:scale-105" 
          >
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-2">
          <router-link 
            to="/" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/' },
              'text-gray-300 hover:text-yellow-400'
            ]"
          >
            <span>Home</span>
          </router-link>

          <router-link 
            to="/scholarships" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/scholarships' },
              'text-gray-300 hover:text-yellow-400'
            ]"
          >
            <span>Scholarships</span>
          </router-link>

          <router-link 
            to="/about" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/about' },
              'text-gray-300 hover:text-yellow-400'
            ]"
          >
            <span>About</span>
          </router-link>

          <router-link 
            to="/contact" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/contact' },
              'text-gray-300 hover:text-yellow-400'
            ]"
          >
            <span>Contact</span>
          </router-link>

          <!-- Notifications Icon -->
          <div ref="notificationRoot" class="relative ml-4 pl-4 border-l border-yellow-400/20">
            <button 
              @click="toggleNotifications"
              class="relative p-2.5 rounded-lg transition-all duration-300 text-gray-400 hover:bg-yellow-400/10 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20"
            >
              <Bell :size="20" />
              <span 
                v-if="unreadCount > 0" 
                class="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg animate-pulse"
              >
                {{ unreadCount > 9 ? '9+' : unreadCount }}
              </span>
            </button>

            <!-- Notifications Dropdown -->
            <div 
              v-if="showNotifications"
              class="absolute right-0 mt-3 w-96 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 border border-yellow-400/20 animate-in fade-in duration-300"
            >
              <div class="p-5 border-b border-yellow-400/20 flex justify-between items-center bg-gradient-to-r from-yellow-400/5 to-transparent">
                <div>
                  <h3 class="font-bold text-white text-sm">Latest News</h3>
                  <p class="text-xs text-gray-400">Stay updated with opportunities</p>
                </div>
                <button 
                  v-if="unreadCount > 0"
                  @click="markAllAsRead"
                  class="text-xs text-yellow-400 hover:text-yellow-300 font-semibold bg-yellow-400/10 px-3 py-1 rounded-full transition-all hover:bg-yellow-400/20"
                >
                  Mark all
                </button>
              </div>
              <div class="max-h-96 overflow-y-auto space-y-0.5 p-1">
                <!-- Loading state -->
                <div v-if="isLoadingNotifications" class="flex justify-center items-center py-8">
                  <div class="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>

                <!-- Empty state -->
                <div v-else-if="notifications.length === 0" class="text-center py-8">
                  <Bell :size="32" class="text-gray-600 mx-auto mb-2" />
                  <p class="text-gray-400 text-sm">No new notifications</p>
                  <p class="text-gray-500 text-xs mt-1">Check back later for updates!</p>
                </div>

                <!-- Notifications list -->
                <div 
                  v-for="notification in notifications" 
                  :key="notification.id"
                  class="p-4 hover:bg-yellow-400/5 transition-all duration-200 cursor-pointer border-b border-white/5 last:border-0 rounded-lg m-1 group"
                  :class="{ 'bg-yellow-400/10 border-l-2 border-l-yellow-400': !notification.read }"
                  @click="markAsRead(notification)"
                >
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 mt-1">
                      <div v-if="notification.type === 'scholarship'" class="w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                      <div v-else-if="notification.type === 'deadline'" class="w-2.5 h-2.5 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></div>
                      <div v-else-if="notification.type === 'news'" class="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                      <div v-else class="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-start justify-between gap-2">
                        <p class="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">{{ notification.title }}</p>
                        <span class="text-[10px] text-gray-500 whitespace-nowrap">{{ formatTime(notification.created_at || notification.createdAt) }}</span>
                      </div>
                      <p class="text-xs text-gray-400 mt-1">{{ notification.message }}</p>
                      <div v-if="notification.scholarship_id || notification.scholarshipId" class="mt-2">
                        <router-link 
                          :to="`/scholarship/${notification.scholarship_id || notification.scholarshipId}`"
                          class="text-xs text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center gap-1"
                          @click.stop
                        >
                          View Scholarship
                          <span class="group-hover:translate-x-1 transition-transform">→</span>
                        </router-link>
                      </div>
                    </div>
                    <div v-if="!notification.read" class="w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 mt-1"></div>
                  </div>
                </div>
              </div>
              <div class="p-4 text-center border-t border-yellow-400/20 bg-gradient-to-r from-yellow-400/5 to-transparent">
                <router-link 
                  to="/news" 
                  class="text-xs text-yellow-400 hover:text-yellow-300 font-semibold inline-flex items-center gap-1 transition-all"
                  @click="closeNotifications"
                >
                  View All News
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2.5 rounded-lg transition-all duration-300 text-gray-400 hover:bg-yellow-400/10 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20"
        >
          <Menu :size="24" v-if="!mobileMenuOpen" />
          <X :size="24" v-else />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="mobileMenuOpen"
        class="md:hidden mt-4 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl shadow-2xl border border-yellow-400/20 animate-in fade-in duration-300"
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

          <!-- Mobile Notifications -->
          <div class="border-t border-yellow-400/20 my-3 pt-3">
            <div class="flex items-center justify-between px-4 py-3">
              <div class="flex items-center gap-2">
                <Bell :size="16" class="text-yellow-400" />
                <span class="text-sm font-semibold text-gray-300">Latest News</span>
                <span 
                  v-if="unreadCount > 0" 
                  class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-[9px] font-bold rounded-full px-2 py-0.5 shadow-lg"
                >
                  {{ unreadCount }}
                </span>
              </div>
              <router-link 
                to="/news" 
                class="text-xs text-yellow-400 hover:text-yellow-300 font-semibold"
                @click="closeMobileMenu"
              >
                View All
              </router-link>
            </div>
            <div class="space-y-2 px-3 max-h-64 overflow-y-auto">
              <div 
                v-for="notification in notifications.slice(0, 3)" 
                :key="notification.id"
                class="p-3 rounded-lg bg-gradient-to-r from-yellow-400/5 to-transparent border-l-2 border-yellow-400"
                :class="!notification.read ? 'bg-yellow-400/10' : 'bg-white/5'"
              >
                <p class="text-xs font-semibold text-gray-200">{{ notification.title }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ notification.message }}</p>
                <span class="text-[10px] text-gray-500 mt-1 block">{{ formatTime(notification.created_at || notification.createdAt) }}</span>
              </div>
              <div v-if="notifications.length === 0" class="text-center py-4">
                <p class="text-gray-400 text-xs">No notifications yet</p>
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
import axios from 'axios'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const showNotifications = ref(false)
const notificationRoot = ref(null)

// Notifications data
const notifications = ref([])
const isLoadingNotifications = ref(false)

// ✅ UPDATED: Use your actual Vercel backend URL
const API_URL = 'https://newbackend-gamma.vercel.app/api'

// Fetch notifications from your Vercel backend
const fetchNotifications = async () => {
  isLoadingNotifications.value = true
  try {
    const response = await axios.get(`${API_URL}/notifications`, {
      params: {
        limit: 50
      },
      timeout: 10000
    })
    
    if (response.data && Array.isArray(response.data)) {
      notifications.value = response.data
      saveNotificationsToLocal()
    } else if (response.data && response.data.notifications) {
      notifications.value = response.data.notifications
      saveNotificationsToLocal()
    }
  } catch (error) {
    console.error('Failed to fetch notifications:', error)
    // Load from localStorage as fallback
    loadNotificationsFromLocal()
    
    // If still no notifications, add demo ones
    if (notifications.value.length === 0) {
      addDemoNotifications()
    }
  } finally {
    isLoadingNotifications.value = false
  }
}

// Add demo notifications for testing
const addDemoNotifications = () => {
  const demos = [
    {
      id: 'demo-1',
      type: 'scholarship',
      title: '🎓 New Scholarship Available!',
      message: 'Fulbright Scholarship 2025 is now open for applications',
      created_at: new Date().toISOString(),
      read: false
    },
    {
      id: 'demo-2',
      type: 'deadline',
      title: '⏰ Deadline Approaching',
      message: 'Chevening Scholarship deadline is in 7 days',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'demo-3',
      type: 'news',
      title: '📢 Application Tips',
      message: 'New guide available for writing a strong Statement of Purpose',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ]
  notifications.value = demos
  saveNotificationsToLocal()
}

// Mark a notification as read
const markNotificationAsRead = async (notificationId) => {
  try {
    await axios.patch(`${API_URL}/notifications/${notificationId}/read`)
    
    // Update local state
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      saveNotificationsToLocal()
    }
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
    // Still update locally even if API fails
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      saveNotificationsToLocal()
    }
  }
}

// Mark all notifications as read
const markAllNotificationsAsRead = async () => {
  try {
    await axios.patch(`${API_URL}/notifications/read-all`)
    
    notifications.value.forEach(notification => {
      notification.read = true
    })
    saveNotificationsToLocal()
  } catch (error) {
    console.error('Failed to mark all as read:', error)
    notifications.value.forEach(notification => {
      notification.read = true
    })
    saveNotificationsToLocal()
  }
}

// Save to localStorage
const saveNotificationsToLocal = () => {
  localStorage.setItem('scholarship_notifications', JSON.stringify(notifications.value))
}

const loadNotificationsFromLocal = () => {
  const saved = localStorage.getItem('scholarship_notifications')
  if (saved) {
    try {
      notifications.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load saved notifications', e)
    }
  }
}

// Compute unread count
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Format time relative
const formatTime = (dateString) => {
  if (!dateString) return 'Just now'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value && notifications.value.length === 0) {
    fetchNotifications()
  }
}

const closeNotifications = () => {
  showNotifications.value = false
}

const markAsRead = (notification) => {
  if (!notification.read) {
    markNotificationAsRead(notification.id)
  }
  if (notification.scholarship_id || notification.scholarshipId) {
    closeNotifications()
  }
}

const markAllAsRead = () => {
  markAllNotificationsAsRead()
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
  if (!showNotifications.value) return
  if (notificationRoot.value && notificationRoot.value.contains(event.target)) return
  showNotifications.value = false
}

// Request notification permission
const requestNotificationPermission = () => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
}

// Poll for new notifications
let pollInterval = null
const startPolling = () => {
  if (pollInterval) clearInterval(pollInterval)
  
  // Initial fetch
  fetchNotifications()
  
  // Poll every 30 seconds
  pollInterval = setInterval(() => {
    if (!showNotifications.value) {
      fetchNotifications()
    }
  }, 30000)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  handleScroll()
  
  // Load from localStorage first for immediate display
  loadNotificationsFromLocal()
  
  // Request notification permission
  requestNotificationPermission()
  
  // Start polling for notifications
  startPolling()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  
  if (pollInterval) clearInterval(pollInterval)
})
</script>

<style scoped>
@reference "tailwindcss";

.nav-link {
  @apply relative px-3 py-2 rounded-lg transition-all duration-300 font-medium text-sm;
}

.nav-link::before {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300;
}

.nav-link:hover::before {
  @apply w-full shadow-lg shadow-yellow-400/50;
}

.nav-link.active {
  @apply font-bold text-yellow-400 bg-yellow-400/10;
}

.nav-link.active::before {
  @apply w-full shadow-lg shadow-yellow-400/50;
}

.mobile-nav-link {
  @apply flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-300 font-medium text-sm mx-2;
}

.mobile-nav-link:hover {
  @apply bg-yellow-400/10 text-yellow-400;
}

.mobile-nav-link.active {
  @apply bg-gradient-to-r from-yellow-400/20 to-transparent text-yellow-400 font-bold;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeIn 0.3s ease-out;
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
