<template>
  <div class="bg-black min-h-screen">
    <AppHeader />
    
    <div class="min-h-screen">
      <!-- Hero Section -->
      <div class="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1600&h=600&fit=crop');">
        <div class="absolute inset-0 bg-black/70"></div>
        <div class="relative z-10 text-center text-white px-4">
          <div v-motion :initial="{ opacity: 0, y: -30 }" :visible="{ opacity: 1, y: 0 }">
            <Bell class="mx-auto mb-4 text-yellow-400" :size="56" />
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Live Scholarship Updates</h1>
           </div>
        </div>
      </div>
        <div class="bg-black py-12">
        <div class="container mx-auto px-4">
          
          <!-- Stats Bar with Auto-Refresh Indicator -->
          <div class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 -mt-16 relative z-20 mb-10 border border-yellow-500/20">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-400">{{ news.length }}</div>
                <div class="text-sm text-gray-400">Scholarships</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-400">{{ sources.length }}</div>
                <div class="text-sm text-gray-400">Sources</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-400">{{ bookmarkedCount }}</div>
                <div class="text-sm text-gray-400">Saved</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center gap-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div class="text-xs text-green-400">Auto-refresh: {{ countdown }}s</div>
                </div>
                <div class="text-xs text-gray-500 mt-1">Updated: {{ lastUpdated }}</div>
              </div>
            </div>
          </div>

          <!-- Loading Indicator (Small, not blocking) -->
          <div v-if="loading" class="flex justify-center mb-4">
            <div class="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <div class="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              Fetching latest scholarships...
            </div>
          </div>

          <!-- Source Filters -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              @click="selectedSource = 'all'"
              class="px-5 py-2 rounded-full transition-all font-medium text-sm"
              :class="selectedSource === 'all' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
            >
              All ({{ news.length }})
            </button>
            <button
              v-for="source in sources"
              :key="source"
              @click="selectedSource = source"
              class="px-5 py-2 rounded-full transition-all font-medium text-sm"
              :class="selectedSource === source ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
            >
              {{ source }}
            </button>
          </div>

          <!-- News Grid - Shows content immediately -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Skeleton Loaders (only shows on first load) -->
            <div v-for="i in 6" :key="'skeleton-' + i" v-if="firstLoad && news.length === 0" class="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
              <div class="h-48 bg-gray-800"></div>
              <div class="p-6">
                <div class="h-6 bg-gray-800 rounded mb-3"></div>
                <div class="h-4 bg-gray-800 rounded mb-2"></div>
                <div class="h-4 bg-gray-800 rounded mb-2"></div>
                <div class="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>

            <!-- Actual News -->
            <div 
              v-for="(item, index) in filteredNews" 
              :key="item.id"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: Math.min(index * 50, 500) } }"
              class="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-gray-800 hover:border-yellow-500/50"
              @click="openLink(item.link)"
            >
              <div class="relative h-48 overflow-hidden">
                <img 
                  :src="item.image" 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  @error="useDefaultImage"
                >
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white flex items-center gap-1">
                    <Award :size="12" />
                    Scholarship
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <span class="px-2 py-1 bg-black/70 rounded text-xs text-white">
                    {{ item.source }}
                  </span>
                </div>
                <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span class="text-white text-xs flex items-center gap-1">
                    <Clock :size="12" />
                    {{ item.time }}
                  </span>
                </div>
                <!-- New badge for recently added -->
                <div v-if="item.isNew" class="absolute bottom-4 left-4">
                  <span class="px-2 py-1 bg-yellow-500 text-black rounded-full text-xs font-bold animate-pulse">
                    NEW
                  </span>
                </div>
              </div>

              <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  {{ item.title }}
                </h3>
                <p class="text-gray-400 mb-4 line-clamp-3">{{ item.message }}</p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-xs text-gray-500">
                    <Eye :size="14" />
                    <span>{{ item.views }} views</span>
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <button 
                      @click.stop="toggleBookmark(item)"
                      class="text-yellow-500 hover:text-yellow-400 transition-colors"
                    >
                      <Bookmark :size="20" :fill="item.bookmarked ? '#EAB308' : 'none'" />
                    </button>
                    <span class="text-yellow-500 text-sm flex items-center gap-1">
                      Apply Now
                      <ArrowRight :size="14" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div v-if="!firstLoad && !loading && filteredNews.length === 0" class="text-center py-12">
            <Bell :size="48" class="mx-auto text-gray-600 mb-4" />
            <p class="text-gray-400">No scholarships available at the moment</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Bell, Bookmark, Eye, Clock, Award, ArrowRight } from 'lucide-vue-next'
import AppHeader from './AppHeader.vue'

// State
const news = ref([])
const loading = ref(false)
const firstLoad = ref(true)
const selectedSource = ref('all')
const lastUpdated = ref('')
const countdown = ref(30)

// Load saved bookmarks
const loadBookmarks = () => {
  const saved = localStorage.getItem('scholarshipBookmarks')
  if (saved) {
    const bookmarkedIds = JSON.parse(saved)
    news.value.forEach(item => {
      item.bookmarked = bookmarkedIds.includes(item.id)
    })
  }
}

const saveBookmarks = () => {
  const bookmarkedIds = news.value.filter(item => item.bookmarked).map(item => item.id)
  localStorage.setItem('scholarshipBookmarks', JSON.stringify(bookmarkedIds))
}

// Scholarship sites (only 2 for speed)
const scholarshipSites = [
  {
    name: "Scholars4Dev",
    url: "https://scholars4dev.com/feed/"
  },
  {
    name: "Opportunity Desk",
    url: "https://opportunitydesk.org/feed/"
  }
]

// Store previous news IDs to detect new ones
let previousNewsIds = new Set()

// Fetch from one site
async function fetchFromSite(site) {
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(site.url)}`
    const response = await fetch(proxyUrl)
    const text = await response.text()
    
    const parser = new DOMParser()
    const xml = parser.parseFromString(text, "text/xml")
    const items = xml.querySelectorAll("item")
    
    const scholarships = []
    
    for (let i = 0; i < Math.min(items.length, 5); i++) {
      const item = items[i]
      const title = item.querySelector("title")?.textContent || "New Scholarship Available"
      let description = item.querySelector("description")?.textContent || ""
      const link = item.querySelector("link")?.textContent || "#"
      const pubDate = item.querySelector("pubDate")?.textContent || new Date().toISOString()
      
      description = description.replace(/<[^>]*>/g, '').substring(0, 180)
      
      scholarships.push({
        id: `${site.name}-${link}`,
        title: title.substring(0, 90),
        message: description,
        link: link,
        time: getTimeAgo(new Date(pubDate)),
        rawDate: new Date(pubDate),
        source: site.name,
        image: getRandomImage(),
        views: Math.floor(Math.random() * 200) + 20,
        bookmarked: false,
        isNew: false
      })
    }
    
    return scholarships
  } catch (error) {
    console.error(`Error from ${site.name}:`, error)
    return []
  }
}

// Fetch all scholarships
async function fetchScholarships() {
  if (loading.value) return // Don't fetch if already loading
  
  loading.value = true
  
  const promises = scholarshipSites.map(site => fetchFromSite(site))
  const results = await Promise.all(promises)
  
  let allScholarships = []
  results.forEach(scholarships => {
    allScholarships.push(...scholarships)
  })
  
  // Sort by date
  allScholarships.sort((a, b) => b.rawDate - a.rawDate)
  
  // Mark new scholarships
  const newIds = new Set(allScholarships.map(s => s.id))
  allScholarships.forEach(scholarship => {
    if (!previousNewsIds.has(scholarship.id)) {
      scholarship.isNew = true
      // Remove NEW badge after 5 seconds
      setTimeout(() => {
        scholarship.isNew = false
      }, 5000)
    }
  })
  
  previousNewsIds = newIds
  news.value = allScholarships
  loadBookmarks()
  lastUpdated.value = new Date().toLocaleTimeString()
  loading.value = false
  firstLoad.value = false
}

// Time ago function
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  if (isNaN(seconds)) return "Recently"
  if (seconds < 60) return "Just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

// Images
const scholarshipImages = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=250&fit=crop"
]

function getRandomImage() {
  return scholarshipImages[Math.floor(Math.random() * scholarshipImages.length)]
}

function useDefaultImage(e) {
  e.target.src = scholarshipImages[0]
}

// Computed
const sources = computed(() => [...new Set(news.value.map(n => n.source))])
const bookmarkedCount = computed(() => news.value.filter(n => n.bookmarked).length)
const filteredNews = computed(() => {
  if (selectedSource.value === 'all') return news.value
  return news.value.filter(n => n.source === selectedSource.value)
})

// Actions
const toggleBookmark = (item) => {
  item.bookmarked = !item.bookmarked
  saveBookmarks()
}

const openLink = (url) => {
  window.open(url, '_blank')
}

// Auto-refresh timer
let refreshInterval
let countdownInterval

onMounted(() => {
  // Load immediately on page load
  fetchScholarships()
  
  // Auto-refresh every 30 seconds
  refreshInterval = setInterval(() => {
    fetchScholarships()
    countdown.value = 30
  }, 30000)
  
  // Countdown timer
  countdownInterval = setInterval(() => {
    if (countdown.value > 0 && !loading.value) {
      countdown.value--
    }
  }, 1000)
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>