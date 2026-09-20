<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :style="headerStyle"
    :class="isScrolled ? 'py-3' : 'py-6'"
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
              'text-white hover:text-yellow-300'
            ]"
          >
            <span>Home</span>
          </router-link>

          <router-link 
            to="/scholarships" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/scholarships' },
              'text-white hover:text-yellow-300'
            ]"
          >
            <span>Scholarships</span>
          </router-link>

          <router-link 
            to="/about" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/about' },
              'text-white hover:text-yellow-300'
            ]"
          >
            <span>About</span>
          </router-link>

          <router-link 
            to="/contact" 
            class="nav-link"
            :class="[
              { 'active': $route.path === '/contact' },
              'text-white hover:text-yellow-300'
            ]"
          >
            <span>Contact</span>
          </router-link>

          <!-- Notifications Icon -->
          <div ref="notificationRoot" class="relative ml-4">
            <button 
              @click="toggleNotifications"
              class="relative p-2.5 rounded-lg transition-all duration-300 text-white/90 hover:bg-yellow-400/10 hover:text-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20"
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
              class="absolute right-0 mt-3 w-96 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in duration-300"
            >
              <div class="p-5 flex justify-between items-center">
                <div>
                  <h3 class="font-bold text-white text-sm">Latest Scholarships</h3>
                  <p class="text-xs text-gray-400">New opportunities from your dashboard</p>
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

                <!-- Error state -->
                <div v-else-if="notificationError" class="text-center py-8 px-4">
                  <Bell :size="32" class="text-gray-600 mx-auto mb-2" />
                  <p class="text-gray-400 text-sm">Could not load notifications</p>
                  <button 
                    @click="fetchNotifications"
                    class="mt-2 text-xs text-yellow-400 hover:text-yellow-300 font-semibold"
                  >
                    Try again
                  </button>
                </div>

                <!-- Empty state -->
                <div v-else-if="notifications.length === 0" class="text-center py-8">
                  <Bell :size="32" class="text-gray-600 mx-auto mb-2" />
                  <p class="text-gray-400 text-sm">No scholarships yet</p>
                  <p class="text-gray-500 text-xs mt-1">New scholarships added to the dashboard will appear here.</p>
                </div>

                <!-- Notifications list -->
                <div 
                  v-for="notification in notifications" 
                  :key="notification.id"
                  class="p-4 hover:bg-yellow-400/5 transition-all duration-200 cursor-pointer rounded-lg m-1 group"
                  :class="{ 'bg-yellow-400/10': !notification.read }"
                  @click="markAsRead(notification)"
                >
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 mt-1">
                      <img v-if="notification.image" :src="notification.image" alt="" class="h-10 w-10 rounded-lg object-cover shadow-lg" @error="onImageError" />
                      <div v-else class="w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-2">
                        <p class="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">{{ notification.title }}</p>
                        <span class="text-[10px] text-gray-500 whitespace-nowrap flex-shrink-0">{{ formatTime(notification.createdAt) }}</span>
                      </div>
                      <p class="text-xs text-gray-400 mt-1 line-clamp-2">{{ notification.message }}</p>
                      <div class="mt-2">
                        <router-link 
                          to="/scholarships"
                          class="text-xs text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center gap-1"
                          @click.stop="closeNotifications"
                        >
                          View Scholarships
                          <span class="group-hover:translate-x-1 transition-transform">→</span>
                        </router-link>
                      </div>
                    </div>
                    <div v-if="!notification.read" class="w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 mt-1 flex-shrink-0"></div>
                  </div>
                </div>
              </div>
              <div class="p-4 text-center">
                <button 
                  @click="refreshNotifications"
                  :disabled="isLoadingNotifications"
                  class="text-xs text-yellow-400 hover:text-yellow-300 font-semibold inline-flex items-center gap-1 transition-all disabled:opacity-50"
                >
                  <span v-if="isLoadingNotifications" class="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
                  <span v-else>↻</span>
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2.5 rounded-lg transition-all duration-300 text-white hover:bg-yellow-400/10 hover:text-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20"
        >
          <Menu :size="24" v-if="!mobileMenuOpen" />
          <X :size="24" v-else />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="mobileMenuOpen"
        class="md:hidden mt-4 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl shadow-2xl animate-in fade-in duration-300"
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
          <div class="my-3 pt-3">
            <div class="flex items-center justify-between px-4 py-3">
              <div class="flex items-center gap-2">
                <Bell :size="16" class="text-yellow-400" />
                <span class="text-sm font-semibold text-gray-300">Latest Scholarships</span>
                <span 
                  v-if="unreadCount > 0" 
                  class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-[9px] font-bold rounded-full px-2 py-0.5 shadow-lg"
                >
                  {{ unreadCount }}
                </span>
              </div>
            </div>
            <div class="space-y-2 px-3 max-h-64 overflow-y-auto">
              <div 
                v-for="notification in notifications.slice(0, 3)" 
                :key="notification.id"
                class="p-3 rounded-lg bg-gradient-to-r from-yellow-400/5 to-transparent"
                :class="!notification.read ? 'bg-yellow-400/10' : 'bg-white/5'"
              >
                <p class="text-xs font-semibold text-gray-200">{{ notification.title }}</p>
                <p class="text-xs text-gray-400 mt-0.5 line-clamp-2">{{ notification.message }}</p>
                <span class="text-[10px] text-gray-500 mt-1 block">{{ formatTime(notification.createdAt) }}</span>
              </div>
              <div v-if="notifications.length === 0" class="text-center py-4">
                <p class="text-gray-400 text-xs">No scholarships yet</p>
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
import { readDatabase } from '../lib/jsonbin'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const showNotifications = ref(false)
const notificationRoot = ref(null)

const headerStyle = computed(() => {
  if (!isScrolled.value) {
    return {
      background: 'transparent',
      borderBottom: 'none',
      boxShadow: 'none',
      backdropFilter: 'none'
    }
  }

  return {
    background: 'linear-gradient(90deg, rgba(250, 204, 21, 0.9), rgba(252, 211, 77, 0.85), rgba(107, 33, 168, 0.9))',
    borderBottom: '1px solid rgba(254, 240, 138, 0.4)',
    boxShadow: '0 12px 30px rgba(88, 28, 135, 0.22)',
    backdropFilter: 'blur(10px)'
  }
})

/* -------- Notifications from JSONBin (scholarships only) -------- */
const notifications = ref([])
const isLoadingNotifications = ref(false)
const notificationError = ref(false)

const READ_KEYS_STORAGE = 'goabroad_notifications_read'

const readIds = ref(loadReadIds())

function loadReadIds() {
  try {
    const raw = localStorage.getItem(READ_KEYS_STORAGE)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveReadIds() {
  try {
    localStorage.setItem(READ_KEYS_STORAGE, JSON.stringify(readIds.value.slice(-500)))
  } catch {}
}

/* Only scholarships are turned into notifications now */
function buildNotificationsFromDatabase(db) {
  const items = []
  const scholarships = Array.isArray(db?.scholarships) ? db.scholarships : []

  scholarships
    .slice()
    .sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0))
    .slice(0, 15)
    .forEach((s) => {
      items.push({
        id: `sch-${s.id}`,
        type: 'scholarship',
        title: s.title || 'New scholarship',
        message: `${s.country || 'International'} · ${s.degree || 'All levels'}${s.deadline ? ' · Deadline ' + s.deadline : ''}`,
        image: s.image_url || s.image,
        createdAt: s.createdAt || s.created_at || new Date().toISOString(),
      })
    })

  return items
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 15)
    .map((n) => ({ ...n, read: readIds.value.includes(n.id) }))
}

async function fetchNotifications() {
  isLoadingNotifications.value = true
  notificationError.value = false
  try {
    const db = await readDatabase()
    notifications.value = buildNotificationsFromDatabase(db)
  } catch (err) {
    console.error('[Notifications] Failed to load from JSONBin:', err)
    notificationError.value = true
    notifications.value = []
  } finally {
    isLoadingNotifications.value = false
  }
}

const refreshNotifications = () => fetchNotifications()

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const formatTime = (dateString) => {
  if (!dateString) return 'Just now'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Just now'

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
  if (showNotifications.value) {
    fetchNotifications()
  }
}

const closeNotifications = () => {
  showNotifications.value = false
}

const markAsRead = (notification) => {
  if (!notification.read) {
    notification.read = true
    if (!readIds.value.includes(notification.id)) {
      readIds.value.push(notification.id)
      saveReadIds()
    }
  }
}

const markAllAsRead = () => {
  notifications.value.forEach((n) => {
    n.read = true
    if (!readIds.value.includes(n.id)) {
      readIds.value.push(n.id)
    }
  })
  saveReadIds()
}

const onImageError = (e) => {
  e.target.onerror = null
  e.target.style.display = 'none'
}

const handleScroll = () => {
  isScrolled.value = window.scrollY >= 1
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  showNotifications.value = false
}

const handleClickOutside = (event) => {
  if (!showNotifications.value) return
  if (notificationRoot.value && notificationRoot.value.contains(event.target)) return
  showNotifications.value = false
}

let pollInterval = null
const startPolling = () => {
  if (pollInterval) clearInterval(pollInterval)
  fetchNotifications()
  pollInterval = setInterval(() => {
    if (document.visibilityState === 'visible' && !showNotifications.value) {
      fetchNotifications()
    }
  }, 60000)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  handleScroll()
  startPolling()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  if (pollInterval) clearInterval(pollInterval)
})
</script>

<style scoped>
.nav-link {
  position: relative;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.875rem;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #facc15, #eab308);
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.nav-link:hover::before {
  width: 100%;
  box-shadow: 0 0 12px rgba(250, 204, 21, 0.5);
}

.nav-link.active {
  font-weight: 700;
  color: #facc15;
  background-color: rgba(250, 204, 21, 0.1);
}

.nav-link.active::before {
  width: 100%;
  box-shadow: 0 0 12px rgba(250, 204, 21, 0.5);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.875rem;
  margin: 0 0.5rem;
  color: rgba(255, 255, 255, 0.85);
}

.mobile-nav-link:hover {
  background-color: rgba(250, 204, 21, 0.1);
  color: #facc15;
}

.mobile-nav-link.active {
  background: linear-gradient(to right, rgba(250, 204, 21, 0.2), transparent);
  color: #facc15;
  font-weight: 700;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>