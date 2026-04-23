<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
     <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back Button with Motion -->
      <div 
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :visible="{ opacity: 1, x: 0, transition: { delay: 100, duration: 500 } }"
        class="mb-6"
      >
        <button 
          @click="goBack"
          class="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-all hover:translate-x-[-4px]"
        >
          <ArrowLeft :size="20" />
          Back to Scholarships
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading scholarship details from XMA Portal...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12 bg-red-50 rounded-lg">
        <AlertCircle :size="48" class="text-red-500 mx-auto mb-4" />
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button @click="fetchScholarshipDetail" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
          Try Again
        </button>
      </div>

      <!-- Scholarship Details -->
      <div 
        v-else-if="scholarship"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <!-- Hero Image with Motion -->
        <div 
          v-motion
          :initial="{ opacity: 0, scale: 1.1 }"
          :visible="{ opacity: 1, scale: 1, transition: { duration: 700 } }"
          class="relative h-80 md:h-[500px] overflow-hidden"
        >
          <img 
            :src="scholarship.image" 
            :alt="scholarship.title"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <!-- Badges -->
          <div class="absolute top-6 left-6 flex flex-wrap gap-2">
            <span class="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <Trophy :size="14" />
              Fully Funded
            </span>
            <span class="bg-purple-600/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <ExternalLink :size="14" />
              {{ scholarship.source }}
            </span>
            <span v-if="scholarship.isNew" class="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
              <Bell :size="14" />
              NEW
            </span>
          </div>
          
          <!-- Title and Info -->
          <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight">{{ scholarship.title }}</h1>
            <div class="flex flex-wrap gap-6 text-sm md:text-base">
              <span class="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Globe :size="16" />
                {{ scholarship.country }}
              </span>
              <span class="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <GraduationCap :size="16" />
                {{ scholarship.degree }}
              </span>
              <span class="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Calendar :size="16" />
                Posted: {{ scholarship.date }}
              </span>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-6 md:p-8 lg:p-10">
          <!-- Quick Info Cards with Motion -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 200, stagger: 100 } }"
            class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <Award class="text-purple-600 mx-auto mb-2" :size="32" />
              <p class="text-xs text-gray-600">Scholarship Type</p>
              <p class="font-bold text-purple-700 text-sm">Fully Funded</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <GraduationCap class="text-purple-600 mx-auto mb-2" :size="32" />
              <p class="text-xs text-gray-600">Study Level</p>
              <p class="font-bold text-purple-700 text-sm">{{ scholarship.degree }}</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <Globe class="text-purple-600 mx-auto mb-2" :size="32" />
              <p class="text-xs text-gray-600">Country</p>
              <p class="font-bold text-purple-700 text-sm">{{ scholarship.country }}</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <ExternalLink class="text-purple-600 mx-auto mb-2" :size="32" />
              <p class="text-xs text-gray-600">Source</p>
              <p class="font-bold text-purple-700 text-sm">{{ scholarship.source }}</p>
            </div>
          </div>

          <!-- About Section with Motion -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            class="mb-10"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-5 flex items-center gap-3">
              <div class="w-1 h-8 bg-purple-600 rounded-full"></div>
              About This Scholarship
            </h2>
            <div class="prose max-w-none">
              <div class="scholarship-content text-gray-700 leading-relaxed" v-html="scholarship.formattedContent"></div>
            </div>
          </div>

          <!-- Important Note Box with Motion -->
          <div 
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visible="{ opacity: 1, x: 0, transition: { delay: 400 } }"
            class="bg-amber-50 border-l-4 border-amber-400 p-5 mb-10 rounded-r-xl"
          >
            <div class="flex items-start gap-3">
              <AlertCircle :size="22" class="text-amber-600 mt-0.5" />
              <div>
                <p class="font-semibold text-amber-800 mb-1 flex items-center gap-2">
                  <Bell :size="16" />
                  Important Information
                </p>
                <p class="text-sm text-amber-700">
                  Scholarship deadlines and requirements may change. Always visit the official source for the most up-to-date information.
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons with Motion -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 500 } }"
            class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200"
          >
            <a 
              :href="scholarship.link" 
              target="_blank"
              rel="noopener noreferrer"
              class="bg-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-purple-700 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 flex-1 group"
            >
              <ExternalLink :size="18" class="group-hover:rotate-12 transition-transform" />
              Read Full Details on XMA Portal
            </a>
            <button 
              @click="openGoogleForm"
              class="bg-yellow-400 text-gray-800 px-6 py-3.5 rounded-xl font-semibold hover:bg-yellow-500 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 flex-1 group"
            >
              <MessageSquare :size="18" class="group-hover:scale-110 transition-transform" />
              Request Assistance
            </button>
          </div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-12">
        <AlertCircle :size="48" class="text-gray-400 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Scholarship Not Found</h2>
        <p class="text-gray-600 mb-6">The scholarship you're looking for doesn't exist or has been removed.</p>
        <button 
          @click="goBack"
          class="bg-purple-600 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-purple-700 transition"
        >
          <ArrowLeft :size="18" />
          Back to Scholarships
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from './AppHeader.vue'
import { 
  ArrowLeft, 
  Globe, 
  GraduationCap, 
  Calendar, 
  Award, 
  ExternalLink,
  MessageSquare,
  AlertCircle,
  BookOpen,
  Trophy,
  Bell
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const scholarship = ref(null)
const loading = ref(true)
const error = ref(null)

// Blogger API URL for XMA Opportunities Portal
const BLOG_URL = 'https://xmaopportunitiesportal.blogspot.com'
const API_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(`${BLOG_URL}/feeds/posts/default?alt=json&max-results=50`)}`

// Country-specific REAL images (matching the first scholarship style)
const countryImages = {
  'United States': 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&h=600&fit=crop',
  'China': 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&h=600&fit=crop',
  'Hungary': 'https://images.unsplash.com/photo-1559582798-f7b7c2e6dfd0?w=1200&h=600&fit=crop',
  'Saudi Arabia': 'https://images.unsplash.com/photo-1541873676-a18131494184?w=1200&h=600&fit=crop',
  'France': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=600&fit=crop',
  'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=600&fit=crop',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=600&fit=crop',
  'Canada': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&h=600&fit=crop',
  'Australia': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&h=600&fit=crop',
  'International': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop'
}

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
    'United Kingdom': 'United Kingdom',
    'Germany': 'Germany',
    'Canada': 'Canada',
    'Australia': 'Australia',
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

// Get country-specific image
function getImageForCountry(country) {
  return countryImages[country] || countryImages['International']
}

// Clean and format text content from blog
function formatContentForDisplay(content, title) {
  if (!content) return `<p>Full scholarship details available on the official XMA Opportunities Portal website.</p>`
  
  let clean = content
  
  // Remove script and style tags
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  
  // Clean up HTML
  clean = clean.replace(/<br\s*\/?>/gi, '\n')
  clean = clean.replace(/<\/p>/gi, '\n\n')
  clean = clean.replace(/<p>/gi, '')
  clean = clean.replace(/<[^>]*>/g, '')
  
  // Decode HTML entities
  clean = clean.replace(/&nbsp;/g, ' ')
  clean = clean.replace(/&amp;/g, '&')
  clean = clean.replace(/&lt;/g, '<')
  clean = clean.replace(/&gt;/g, '>')
  clean = clean.replace(/&quot;/g, '"')
  clean = clean.replace(/&#39;/g, "'")
  
  // Remove excessive whitespace
  clean = clean.replace(/\s+/g, ' ').trim()
  
  // Split into paragraphs
  const paragraphs = clean.split(/\n\s*\n/)
  let formatted = ''
  
  for (let p of paragraphs) {
    p = p.trim()
    if (p && p.length > 0) {
      formatted += `<p class="mb-4">${p}</p>`
    }
  }
  
  // Add benefits section if not present
  if (!clean.toLowerCase().includes('benefit') && !clean.toLowerCase().includes('cover')) {
    formatted += `
      <div class="bg-green-50 p-4 rounded-lg mt-4">
        <p class="font-semibold text-green-800 mb-2">✨ Scholarship Benefits:</p>
        <ul class="list-disc ml-6 text-gray-700">
          <li>Full tuition fee coverage</li>
          <li>Monthly living stipend</li>
          <li>Accommodation allowance</li>
          <li>Health insurance</li>
          <li>Travel expenses</li>
        </ul>
      </div>
    `
  }
  
  // Add source note
  formatted += `
    <div class="bg-purple-50 p-4 rounded-lg mt-6">
      <p class="font-semibold text-purple-800 mb-2 flex items-center gap-2">
        <ExternalLink :size="16" />
        Source: XMA Opportunities Portal
      </p>
      <p class="text-sm text-gray-600">For complete details, requirements, and application instructions, visit the official scholarship page.</p>
    </div>
  `
  
  return formatted
}

// Time ago function
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  if (isNaN(seconds)) return "Recently"
  if (seconds < 60) return "Just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

// Fetch scholarship detail
async function fetchScholarshipDetail() {
  loading.value = true
  error.value = null
  
  try {
    const scholarshipId = route.params.id
    console.log('📡 Fetching scholarship details for ID:', scholarshipId)
    
    const response = await fetch(API_URL)
    
    if (!response.ok) throw new Error('Network error')
    
    const data = await response.json()
    
    if (!data.feed || !data.feed.entry) {
      throw new Error('No data received')
    }
    
    const posts = data.feed.entry
    
    // Find matching post
    let foundPost = null
    
    for (const post of posts) {
      const postId = post.id?.$t || ''
      const postTitle = post.title?.$t || ''
      const encodedTitle = encodeURIComponent(postTitle)
      
      if (postId === scholarshipId || 
          encodedTitle === scholarshipId ||
          postTitle.toLowerCase().includes(decodeURIComponent(scholarshipId).toLowerCase()) ||
          postId.includes(scholarshipId)) {
        foundPost = post
        break
      }
    }
    
    if (foundPost) {
      const title = foundPost.title?.$t || 'Scholarship Opportunity'
      const link = foundPost.link?.find(l => l.rel === 'alternate')?.href || `${BLOG_URL}/`
      const publishedDate = new Date(foundPost.published?.$t)
      
      // Get raw content
      let rawContent = ''
      if (foundPost.content) {
        rawContent = foundPost.content.$t
      } else if (foundPost.summary) {
        rawContent = foundPost.summary.$t
      }
      
      const country = extractCountry(title)
      
      scholarship.value = {
        id: foundPost.id?.$t,
        title: title,
        formattedContent: formatContentForDisplay(rawContent, title),
        link: link,
        date: timeAgo(publishedDate),
        rawDate: publishedDate,
        country: country,
        degree: extractDegree(title),
        image: getImageForCountry(country),
        source: 'XMA Portal',
        isNew: (Date.now() - publishedDate) < 7 * 24 * 60 * 60 * 1000 // Less than 7 days old
      }
      
      console.log('✅ Scholarship loaded:', scholarship.value.title)
    } else {
      error.value = 'Scholarship not found'
    }
    
  } catch (err) {
    console.error('Error:', err)
    error.value = 'Unable to load scholarship details. Please check your internet connection.'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

const openGoogleForm = () => {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSdel6b8-7EZ3nr1OleLs9bEony-WgymoLs1l0Dag0FyFxtSPQ/viewform', '_blank')
}

onMounted(() => {
  fetchScholarshipDetail()
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Scholarship content styles */
.scholarship-content {
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
}

.scholarship-content p {
  margin-bottom: 1rem;
}

.scholarship-content h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.scholarship-content ul, 
.scholarship-content ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.scholarship-content li {
  margin-bottom: 0.25rem;
}

.scholarship-content strong {
  color: #1f2937;
  font-weight: 700;
}
</style>