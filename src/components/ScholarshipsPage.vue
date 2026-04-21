<template>
  <div class="min-h-screen w-full bg-gray-50">
    <AppHeader />
    
    <!-- Page Header with Motion -->
    <section class="relative text-white py-26 overflow-hidden">
      <div class="absolute inset-0 w-full h-full">
        <img 
          src="https://images.pexels.com/photos/258117/pexels-photo-258117.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop" 
          alt="Scholarship Opportunities"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-purple-500/50"></div>
      </div>
      
      <div 
        v-motion
        :initial="{ opacity: 0, y: -30 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
        class="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
          All Scholarships
        </h1>
        <p class="text-xl opacity-95 max-w-3xl mx-auto">
          Discover all fully-funded opportunities to study at top universities worldwide
        </p>
      </div>
    </section>

    <!-- Scholarships Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p class="text-gray-600">Loading scholarships...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12 bg-red-50 rounded-lg">
          <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button @click="fetchScholarships" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Try Again
          </button>
        </div>

        <!-- Main Content -->
        <div v-else>
          <!-- Filters Section with Motion -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
            class="mb-8 bg-white rounded-xl shadow-md p-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Search -->
              <div>
                <label class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                  <Search class="w-4 h-4 text-purple-600" />
                  Search Scholarships
                </label>
                <input 
                  type="text" 
                  v-model="searchQuery"
                  placeholder="Search by title or country..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                >
              </div>
              
              <!-- Country Filter -->
              <div>
                <label class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                  <Globe class="w-4 h-4 text-purple-600" />
                  Filter by Country
                </label>
                <select 
                  v-model="selectedCountry"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
                >
                  <option value="">All Countries</option>
                  <option v-for="country in uniqueCountries" :key="country" :value="country">
                    {{ country }}
                  </option>
                </select>
              </div>
              
              <!-- Sort by Date -->
              <div>
                <label class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
                  <Calendar class="w-4 h-4 text-purple-600" />
                  Sort by Date
                </label>
                <select 
                  v-model="sortOrder"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
            
            <!-- Results Count -->
            <div class="mt-4 flex justify-between items-center">
              <div class="text-sm font-medium text-purple-600 bg-purple-50 inline-flex items-center gap-2 px-4 py-2 rounded-lg">
                <BarChart3 class="w-4 h-4" />
                Found {{ filteredScholarships.length }} scholarship(s)
              </div>
              <button 
                @click="resetFilters"
                class="text-gray-500 hover:text-purple-600 text-sm flex items-center gap-1 transition-colors"
              >
                <RefreshCw class="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          </div>
          
          <!-- Scholarships Grid with Staggered Motion -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              v-for="(scholarship, index) in filteredScholarships.slice(0, 12)" 
              :key="scholarship.id"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: Math.min(index * 80, 600), duration: 400 } }"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
              @click="openModal(scholarship)"
            >
              <div class="flex flex-col md:flex-row">
                <!-- Image -->
                <div class="md:w-48 h-48 md:h-auto relative overflow-hidden">
                  <img 
                    :src="scholarship.image" 
                    :alt="scholarship.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    @error="setDefaultImage"
                  >
                  <div class="absolute top-3 left-3">
                    <span class="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Trophy class="w-3 h-3" />
                      Fully Funded
                    </span>
                  </div>
                  <div class="absolute bottom-3 right-3">
                    <span class="bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <ExternalLink class="w-3 h-3" />
                      {{ scholarship.source }}
                    </span>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="flex-1 p-5">
                  <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {{ scholarship.title }}
                  </h3>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="text-xs bg-gray-100 text-purple-700 px-2 py-1 rounded-full font-medium inline-flex items-center gap-1">
                      <Globe class="w-3 h-3" />
                      {{ scholarship.country }}
                    </span>
                    <span class="text-xs bg-gray-100 text-purple-700 px-2 py-1 rounded-full font-medium inline-flex items-center gap-1">
                      <GraduationCap class="w-3 h-3" />
                      {{ scholarship.degree }}
                    </span>
                    <span class="text-xs bg-gray-100 text-purple-700 px-2 py-1 rounded-full font-medium inline-flex items-center gap-1">
                      <Calendar class="w-3 h-3" />
                      {{ scholarship.date }}
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                    {{ scholarship.cleanDescription }}
                  </p>
                  <div class="flex gap-3">
                    <button 
                      @click.stop="openModal(scholarship)"
                      class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition inline-flex items-center gap-2 group/btn"
                    >
                      <BookOpen class="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Read More
                    </button>
                    <button 
                      @click.stop="openGoogleForm"
                      class="border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition inline-flex items-center gap-2 group/btn"
                    >
                      <MessageSquare class="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Request Assistance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- No Results -->
          <div v-if="filteredScholarships.length === 0 && !loading" class="text-center py-12">
            <Search class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500 text-lg">No scholarships found matching your criteria.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Call to Action with Motion -->
    <section 
      v-motion
      :initial="{ opacity: 0 }"
      :visible="{ opacity: 1, transition: { delay: 400, duration: 600 } }"
      class="bg-gradient-to-r from-purple-600 to-purple-700 py-12"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
          Need Help with Your Application?
        </h2>
        <p class="text-white opacity-95 mb-6 text-lg">
          Our expert consultants can guide you through the entire scholarship application process.
        </p>
        <button 
          @click="openCalendly"
          class="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 group"
        >
          <Calendar class="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Book a Free Consultation
        </button>
      </div>
    </section>

    <!-- Modal for Scholarship Details with Motion -->
    <div 
      v-if="modalVisible" 
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div 
        class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
        v-motion
        :initial="{ opacity: 0, scale: 0.9, y: 30 }"
        :visible="{ opacity: 1, scale: 1, y: 0, transition: { duration: 300 } }"
      >
        <!-- Modal Header -->
        <div class="relative h-56 md:h-64 overflow-hidden">
          <img 
            :src="selectedScholarship?.image" 
            :alt="selectedScholarship?.title"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
          >
            <X class="w-5 h-5 text-white" />
          </button>
          <div class="absolute bottom-4 left-4 right-4 text-white">
            <span class="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-2 flex items-center gap-1 w-fit">
              <Trophy class="w-3 h-3" />
              Fully Funded
            </span>
            <h2 class="text-xl md:text-2xl font-bold">{{ selectedScholarship?.title }}</h2>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Quick Info Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div class="bg-purple-50 rounded-lg p-3 text-center hover:bg-purple-100 transition">
              <Globe class="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p class="text-xs text-gray-600">Country</p>
              <p class="text-sm font-semibold text-purple-600">{{ selectedScholarship?.country }}</p>
            </div>
            <div class="bg-purple-50 rounded-lg p-3 text-center hover:bg-purple-100 transition">
              <GraduationCap class="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p class="text-xs text-gray-600">Degree</p>
              <p class="text-sm font-semibold text-purple-600">{{ selectedScholarship?.degree }}</p>
            </div>
            <div class="bg-purple-50 rounded-lg p-3 text-center hover:bg-purple-100 transition">
              <Calendar class="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p class="text-xs text-gray-600">Posted</p>
              <p class="text-sm font-semibold text-purple-600">{{ selectedScholarship?.date }}</p>
            </div>
            <div class="bg-purple-50 rounded-lg p-3 text-center hover:bg-purple-100 transition">
              <Award class="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p class="text-xs text-gray-600">Source</p>
              <p class="text-sm font-semibold text-purple-600">{{ selectedScholarship?.source }}</p>
            </div>
          </div>

          <!-- Full Description -->
          <div class="prose max-w-none mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen class="w-5 h-5 text-purple-600" />
              Scholarship Details
            </h3>
            <div class="scholarship-content" v-html="selectedScholarship?.formattedContent"></div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <a 
              :href="selectedScholarship?.link" 
              target="_blank"
              rel="noopener noreferrer"
              class="bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition inline-flex items-center justify-center gap-2 flex-1 group"
            >
              <ExternalLink class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Read Full Details
            </a>
            <button 
              @click="openGoogleForm"
              class="bg-yellow-400 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-yellow-500 transition inline-flex items-center justify-center gap-2 flex-1 group"
            >
              <MessageSquare class="w-4 h-4 group-hover:scale-110 transition-transform" />
              Request Assistance
            </button>
            <button 
              @click="closeModal"
              class="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition inline-flex items-center justify-center gap-2"
            >
              <X class="w-4 h-4" />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppHeader from './AppHeader.vue'
import { 
  Search, 
  Globe, 
  GraduationCap, 
  BarChart3,
  Trophy,
  Calendar,
  BookOpen,
  MessageSquare,
  RefreshCw,
  X,
  Award,
  ExternalLink,
  AlertCircle
} from 'lucide-vue-next'

// State
const loading = ref(true)
const error = ref(null)
const allScholarships = ref([])
const searchQuery = ref('')
const selectedCountry = ref('')
const sortOrder = ref('newest')
const modalVisible = ref(false)
const selectedScholarship = ref(null)
let refreshInterval = null

// Faster API endpoint
const BLOG_URL = 'https://xmaopportunitiesportal.blogspot.com'
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`${BLOG_URL}/feeds/posts/default?alt=rss`)}`

// Extract country from title
function extractCountry(title) {
  const countries = {
    'USA': 'United States',
    'United States': 'United States',
    'China': 'China',
    'Hungary': 'Hungary',
    'Saudi Arabia': 'Saudi Arabia',
    'France': 'France',
    'UK': 'United Kingdom',
    'KAUST': 'Saudi Arabia'
  }
  
  for (const [key, value] of Object.entries(countries)) {
    if (title.toUpperCase().includes(key.toUpperCase())) {
      return value
    }
  }
  return 'International'
}

// Extract degree level from title
function extractDegree(title) {
  if (title.includes('Master') && title.includes('PhD')) return "Master's & PhD"
  if (title.includes('PhD') || title.includes('Doctoral')) return 'PhD'
  if (title.includes('Master')) return "Master's"
  if (title.includes('Bachelor')) return "Bachelor's"
  return "Master's & PhD"
}

// Clean text
function cleanText(text) {
  if (!text) return ''
  let clean = text.replace(/<[^>]*>/g, '')
  clean = clean.replace(/&nbsp;/g, ' ')
  clean = clean.replace(/&amp;/g, '&')
  clean = clean.replace(/\s+/g, ' ')
  return clean.substring(0, 200).trim()
}

// Format content for modal
function formatContent(content) {
  if (!content) return '<p>Full scholarship details available on the official XMA Opportunities Portal website.</p>'
  
  let clean = content
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  clean = clean.replace(/<[^>]*>/g, '')
  clean = clean.replace(/&nbsp;/g, ' ')
  clean = clean.replace(/&amp;/g, '&')
  
  const paragraphs = clean.split(/\n\s*\n/).filter(p => p.trim())
  let formatted = paragraphs.map(p => `<p class="mb-3">${p.trim()}</p>`).join('')
  
  if (!formatted) {
    formatted = `<p>${clean.substring(0, 500)}</p>`
  }
  
  return formatted
}

// Get image for country
function getImageForCountry(country) {
  const images = {
    'United States': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop',
    'China': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=500&fit=crop',
    'Hungary': 'https://images.unsplash.com/photo-1559582798-f7b7c2e6dfd0?w=800&h=500&fit=crop',
    'Saudi Arabia': 'https://images.unsplash.com/photo-1541873676-a18131494184?w=800&h=500&fit=crop',
    'France': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop',
    'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop',
    'International': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=500&fit=crop'
  }
  return images[country] || images['International']
}

// Time ago function
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (isNaN(seconds)) return "Recently"
  if (seconds < 60) return "Just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return new Date(date).toLocaleDateString()
}

// Fetch scholarships
const fetchScholarships = async () => {
  loading.value = true
  error.value = null
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(API_URL, { signal: controller.signal })
    clearTimeout(timeoutId)
    
    if (!response.ok) throw new Error('Network error')
    
    const data = await response.json()
    
    if (!data.items || data.items.length === 0) {
      throw new Error('No data received')
    }
    
    const scholarshipsList = data.items.slice(0, 12).map((item, index) => {
      const title = item.title || 'Scholarship Opportunity'
      const country = extractCountry(title)
      
      return {
        id: item.guid || `post-${index}`,
        title: title,
        cleanDescription: cleanText(item.description || item.content || ''),
        formattedContent: formatContent(item.content || item.description || ''),
        link: item.link,
        date: timeAgo(item.pubDate),
        rawDate: new Date(item.pubDate),
        country: country,
        degree: extractDegree(title),
        image: getImageForCountry(country),
        source: 'XMA Portal'
      }
    })
    
    allScholarships.value = scholarshipsList
    console.log(`✅ Loaded ${scholarshipsList.length} scholarships`)
    
  } catch (err) {
    console.error('Error:', err)
    if (err.name === 'AbortError') {
      error.value = 'Request timeout. Please check your connection.'
    } else {
      error.value = 'Unable to load scholarships. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// Set default image
const setDefaultImage = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop'
}

// Computed
const uniqueCountries = computed(() => {
  return [...new Set(allScholarships.value.map(s => s.country))].sort()
})

const filteredScholarships = computed(() => {
  let filtered = [...allScholarships.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(query) || 
      s.country.toLowerCase().includes(query)
    )
  }
  
  if (selectedCountry.value) {
    filtered = filtered.filter(s => s.country === selectedCountry.value)
  }
  
  if (sortOrder.value === 'newest') {
    filtered.sort((a, b) => b.rawDate - a.rawDate)
  } else {
    filtered.sort((a, b) => a.rawDate - b.rawDate)
  }
  
  return filtered
})

// Reset filters
const resetFilters = () => {
  searchQuery.value = ''
  selectedCountry.value = ''
  sortOrder.value = 'newest'
}

// Modal functions
const openModal = (scholarship) => {
  selectedScholarship.value = scholarship
  modalVisible.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  modalVisible.value = false
  selectedScholarship.value = null
  document.body.style.overflow = ''
}

// Actions
const openCalendly = () => {
  window.open('https://calendly.com/goabroadadmissions/one-on-one-consultation', '_blank')
}

const openGoogleForm = () => {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSdel6b8-7EZ3nr1OleLs9bEony-WgymoLs1l0Dag0FyFxtSPQ/viewform', '_blank')
}

// Auto-refresh every 2 minutes
const startAutoRefresh = () => {
  if (refreshInterval) clearInterval(refreshInterval)
  refreshInterval = setInterval(() => {
    if (!modalVisible.value) {
      fetchScholarships()
    }
  }, 2 * 60 * 1000)
}

onMounted(() => {
  fetchScholarships()
  startAutoRefresh()
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
  document.body.style.overflow = ''
})
</script>

<style scoped>
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

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237f00b3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

/* Modal scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c084fc;
  border-radius: 3px;
}

/* Scholarship content */
.scholarship-content {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #374151;
}

.scholarship-content p {
  margin-bottom: 1rem;
}

.scholarship-content ul, 
.scholarship-content ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.scholarship-content li {
  margin-bottom: 0.25rem;
}
</style>