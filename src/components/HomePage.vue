<template>
  <div class="min-h-screen w-full bg-gray-50">
    <AppHeader />
    
    <!-- Hero Section with Swiper -->
    <section id="home" class="h-screen min-h-[800px] relative -mt-20">
      <swiper
        :modules="[SwiperAutoplay, SwiperEffectFade]"
        :loop="true"
        :speed="800"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :effect="'fade'"
        :fade-effect="{ crossFade: true }"
        class="h-full"
      >
        <swiper-slide v-for="(slide, index) in heroSlides" :key="index">
          <div 
            class="absolute inset-0 bg-cover bg-center animate-zoom"
            :style="{ backgroundImage: `url(${slide.image})` }"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
          <div class="relative z-10 h-full flex items-center justify-center text-white">
            <div class="container mx-auto px-4 text-center">
              <div class="max-w-4xl mx-auto mt-24 md:mt-32 lg:mt-36 xl:mt-40">
                <h1 
                  v-motion
                  :initial="{ opacity: 0, y: -50 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
                  class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-tight" 
                  v-html="slide.title"
                ></h1>
                <p 
                  v-motion
                  :initial="{ opacity: 0, y: 30 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
                  class="text-lg md:text-xl lg:text-2xl mb-12 opacity-95"
                >
                  {{ slide.subtitle }}
                </p>
                <div 
                  v-motion
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :enter="{ opacity: 1, scale: 1, transition: { delay: 600, duration: 500 } }"
                  class="flex flex-wrap gap-4 justify-center"
                >
                  <button 
                    @click="scrollToScholarships"
                    class="bg-gradient-to-r from-purple-900 to-purple-1600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    Explore Scholarships
                  </button>
                  <button 
                    @click="openGoogleForm"
                    class="bg-gradient-to-r from-purple-900 to-purple-1500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    Request Assistance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </section>
    
    <!-- Scholarships + Contact Section -->
    <section id="scholarships-section" class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: -30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-12"
        >
          <h2 class="text-3xl md:text-4xl font-extrabold text-purple-600 mb-4">
            Featured Scholarships
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Discover fully-funded opportunities to study at top universities worldwide
          </p>
        </div>

        <!-- Two Column Layout -->
        <div class="flex flex-col lg:flex-row gap-8">
          
          <!-- LEFT COLUMN: Scholarships -->
          <div class="flex-1">
            
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p class="mt-4 text-gray-500">Loading latest scholarships...</p>
            </div>
            
            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12 bg-red-50 rounded-lg">
              <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p class="text-red-600">{{ error }}</p>
              <button 
                @click="fetchScholarships" 
                class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Try Again
              </button>
            </div>
            
            <!-- Scholarships Grid -->
            <div v-else-if="scholarships.length > 0" class="space-y-6">
              <div 
                v-for="(scholarship, idx) in scholarships.slice(0, 5)" 
                :key="scholarship.id"
                v-motion
                :initial="{ opacity: 0, x: -50 }"
                :enter="{ opacity: 1, x: 0, transition: { delay: idx * 100, duration: 500 } }"
                :delay="idx * 100"
                class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                @click="openModal(scholarship)"
              >
                <div class="flex flex-col md:flex-row">
                  <!-- Scholarship Image -->
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
                  
                  <!-- Scholarship Content -->
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
              
              <!-- View All Link -->
              <div 
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 500 } }"
                class="text-center mt-6"
              >
                <router-link 
                  to="/scholarships"
                  class="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition group"
                >
                  View All Scholarships
                  <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </router-link>
              </div>
            </div>
            
            <!-- No Scholarships State -->
            <div v-else class="text-center py-12 bg-gray-100 rounded-lg">
              <BookOpen class="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-500">No scholarships available at the moment. Please check back later.</p>
            </div>
          </div>

          <!-- RIGHT COLUMN: SidebarSection Component -->
          <div 
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 300 } }"
            class="lg:w-96 flex-shrink-0"
          >
            <div class="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <SidebarSection :scholarships="scholarships" @submit="handleSidebarSubmit" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion 
          :initial="{ opacity: 0, y: 30 }" 
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-12"
        >
          <h2 class="text-3xl md:text-4xl font-extrabold text-purple-600 mb-4">Our Comprehensive Services</h2>
          <p class="text-gray-500 text-center max-w-3xl mx-auto text-sm">
            End-to-end support for every step of your study abroad journey
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(service, index) in services" 
            :key="service.title"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }"
            :delay="index * 100"
            class="bg-white p-6 rounded-xl border-l-4 border-purple-600 shadow-md hover:-translate-y-1 transition-all"
          >
            <div class="text-2xl text-purple-600 mb-3">
              <i :class="service.icon"></i>
            </div>
            <h3 class="text-base font-semibold mb-2">{{ service.title }}</h3>
            <p class="text-gray-500 text-sm">{{ service.description }}</p>
          </div>
        </div>

        <div 
          v-motion 
          :initial="{ opacity: 0, scale: 0.9 }" 
          :enter="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 500 } }"
          class="text-center mt-8"
        >
          <button 
            @click="openGoogleForm"
            class="bg-gradient-to-r from-purple-800 to-purple-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <i class="fas fa-handshake mr-1"></i> Request Service Assistance
          </button>
        </div>
      </div>
    </section>

    <!-- FOUNDER MESSAGE SECTION -->
    <section 
      id="founder" 
      class="py-5 relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');">
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-purple-800/50"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid md:grid-cols-[auto,1fr] gap-8 items-center max-w-5xl mx-auto">
          <div 
            v-motion
            :initial="{ opacity: 0, scale: 0, rotate: -180 }"
            :enter="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 200, duration: 800, type: 'spring', stiffness: 100 } }"
            class="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl mx-auto md:mx-0"
          >
            <img src="https://i.postimg.cc/FzCwLMSw/img40.png" alt="Alexis Hakizimana - Founder" class="w-full h-full object-cover">
          </div>
          <div 
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 300, duration: 600 } }"
            class="text-white"
          >
            <h2 class="text-xl md:text-2xl font-bold mb-3">Message from the founder of GoAbroad Admissions</h2>
            <p class="text-sm mb-3 opacity-95">
              "I founded GoAbroad Admissions with a clear mission: to help talented students access world-class education while eliminating financial barriers through scholarships. Having personally navigated the competitive admissions landscape and secured a fully-funded scholarship to Amherst College with a 3% acceptance rate, I understand the challenges students face."
            </p>
            <p class="text-sm mb-3 opacity-95">
              "My scholarship covered over $90,000 annually, including tuition, housing, meals, flights, and insurance. This transformative experience showed me that with the right guidance, any determined student can achieve similar success. At GoAbroad Admissions, we're committed to making that guidance accessible to everyone."
            </p>
            <p class="font-semibold text-sm">
              - Alexis Hakizimana, Founder & Education Consultant
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal for Scholarship Details -->
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
        :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 300, type: 'spring', stiffness: 300 } }"
        :leave="{ opacity: 0, scale: 0.9, y: 30, transition: { duration: 200 } }"
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
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 100, duration: 300 } }"
              class="bg-purple-50 rounded-lg p-3 text-center hover:bg-purple-100 transition"
            >
              <Globe class="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p class="text-xs text-gray-600">Country</p>
              <p class="text-sm font-semibold text-purple-600">{{ selectedScholarship?.country }}</p>
            </div>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 150, duration: 300 } }"
              class="bg-purple-50 rounded-lg p-3 text-center hover:bg-purple-100 transition"
            >
              <GraduationCap class="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p class="text-xs text-gray-600">Degree</p>
              <p class="text-sm font-semibold text-purple-600">{{ selectedScholarship?.degree }}</p>
            </div>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 300 } }"
              class="bg-purple-50 rounded-lg p-3 text-center hover:bg-purple-100 transition"
            >
              <Calendar class="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p class="text-xs text-gray-600">Posted</p>
              <p class="text-sm font-semibold text-purple-600">{{ selectedScholarship?.date }}</p>
            </div>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 250, duration: 300 } }"
              class="bg-purple-50 rounded-lg p-3 text-center hover:bg-purple-100 transition"
            >
              <Award class="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p class="text-xs text-gray-600">Source</p>
              <p class="text-sm font-semibold text-purple-600">{{ selectedScholarship?.source }}</p>
            </div>
          </div>

          <!-- Full Description -->
          <div 
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 300, duration: 400 } }"
            class="prose max-w-none mb-6"
          >
            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen class="w-5 h-5 text-purple-600" />
              Scholarship Details
            </h3>
            <div class="scholarship-content" v-html="selectedScholarship?.formattedContent"></div>
          </div>

          <!-- Action Buttons -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 400 } }"
            class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200"
          >
            
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
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from './AppHeader.vue'
import SidebarSection from './SidebarSection.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { 
  Globe, 
  GraduationCap, 
  Trophy,
  Calendar,
  BookOpen,
  MessageSquare,
  X,
  Award,
  ExternalLink,
  AlertCircle,
  ArrowRight
} from 'lucide-vue-next'

// Swiper modules
const SwiperAutoplay = Autoplay
const SwiperEffectFade = EffectFade

// Hero slides data
const heroSlides = ref([
  {
    image: 'https://i.postimg.cc/rm0MyKch/img10.avif',
    title: 'Do you dream about it?<br><span class="text-yellow-400">We help you make your study abroad journey a reality!</span>',
    subtitle: 'GoAbroad Admissions connects students to international-quality education at top destinations worldwide including USA, UK, Canada, Australia, China, and more.'
  },
  {
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: '<span class="text-yellow-400">Multiple Scholarships</span><br>For Students Worldwide',
    subtitle: 'Access scholarship databases and find the perfect funding opportunity for your studies.'
  },
  {
    image: 'https://i.postimg.cc/6qj0g7vM/img60.jpg',
    title: 'Professional Application<br><span class="text-yellow-400">Guidance & Support</span>',
    subtitle: 'From university selection to visa processing - we handle every step of your study abroad journey.'
  }
])

// Services Data
const services = [
  {
    icon: 'fas fa-university',
    title: 'University Admissions',
    description: 'Strategic school selection, application preparation, and submission for universities worldwide with personalized guidance.'
  },
  {
    icon: 'fas fa-award',
    title: 'Scholarship Applications',
    description: 'Full and partial scholarship applications with personalized strategy, essay development, and deadline management.'
  },
  {
    icon: 'fas fa-edit',
    title: 'Essay Writing & Review',
    description: 'From scratch writing, editing, and professional review of SOPs, personal statements, and all application essays.'
  },
  {
    icon: 'fas fa-file-alt',
    title: 'Document Preparation',
    description: 'SOP, research proposals, CV/resume, motivation letters, recommendation letters, transcripts, and portfolio preparation.'
  },
  {
    icon: 'fas fa-passport',
    title: 'Visa & Travel Support',
    description: 'Visa application assistance, flight bookings, accommodation arrangements, and pre-departure orientation.'
  },
  {
    icon: 'fas fa-users',
    title: 'Interview Preparation',
    description: 'Mock interviews, coaching for university and scholarship interviews, and communication skills development.'
  }
]

// State
const loading = ref(true)
const error = ref(null)
const scholarships = ref([])
const modalVisible = ref(false)
const selectedScholarship = ref(null)
let refreshInterval = null

// XMA Portal RSS Feed
const BLOG_URL = 'https://xmaopportunitiesportal.blogspot.com'
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`${BLOG_URL}/feeds/posts/default?alt=rss`)}`

// Helper Functions
function extractCountry(title) {
  const countries = {
    'USA': 'United States',
    'United States': 'United States',
    'China': 'China',
    'Hungary': 'Hungary',
    'Saudi Arabia': 'Saudi Arabia',
    'France': 'France',
    'UK': 'United Kingdom',
    'KAUST': 'Saudi Arabia',
    'Germany': 'Germany',
    'Canada': 'Canada',
    'Australia': 'Australia',
    'Japan': 'Japan',
    'Korea': 'South Korea'
  }
  
  for (const [key, value] of Object.entries(countries)) {
    if (title.toUpperCase().includes(key.toUpperCase())) {
      return value
    }
  }
  return 'International'
}

function extractDegree(title) {
  if (title.includes('Master') && title.includes('PhD')) return "Master's & PhD"
  if (title.includes('PhD') || title.includes('Doctoral')) return 'PhD'
  if (title.includes('Master')) return "Master's"
  if (title.includes('Bachelor')) return "Bachelor's"
  return "Master's & PhD"
}

function cleanText(text) {
  if (!text) return ''
  let clean = text.replace(/<[^>]*>/g, '')
  clean = clean.replace(/&nbsp;/g, ' ')
  clean = clean.replace(/&amp;/g, '&')
  clean = clean.replace(/\s+/g, ' ')
  return clean.substring(0, 200).trim()
}

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

function getImageForCountry(country) {
  const images = {
    'United States': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop',
    'China': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=500&fit=crop',
    'Hungary': 'https://images.unsplash.com/photo-1559582798-f7b7c2e6dfd0?w=800&h=500&fit=crop',
    'Saudi Arabia': 'https://images.unsplash.com/photo-1541873676-a18131494184?w=800&h=500&fit=crop',
    'France': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop',
    'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop',
    'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=500&fit=crop',
    'Canada': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    'Australia': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=500&fit=crop',
    'International': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=500&fit=crop'
  }
  return images[country] || images['International']
}

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

// Fetch scholarships from XMA Portal
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
    
    const scholarshipsList = data.items.slice(0, 10).map((item, index) => {
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
    
    scholarships.value = scholarshipsList
    console.log(`✅ Loaded ${scholarshipsList.length} scholarships from XMA Portal`)
    
  } catch (err) {
    console.error('Error fetching scholarships:', err)
    if (err.name === 'AbortError') {
      error.value = 'Request timeout. Please check your connection.'
    } else {
      error.value = 'Unable to load scholarships. Please try again.'
    }
    scholarships.value = []
  } finally {
    loading.value = false
  }
}

// Set default image on error
const setDefaultImage = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop'
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

// Methods
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToScholarships = () => {
  scrollToSection('scholarships-section')
}

const openCalendly = () => {
  window.open('https://calendly.com/goabroadadmissions/one-on-one-consultation', '_blank')
}

const openGoogleForm = () => {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSdel6b8-7EZ3nr1OleLs9bEony-WgymoLs1l0Dag0FyFxtSPQ/viewform', '_blank')
}

const handleSidebarSubmit = (formData) => {
  console.log('Form submitted from sidebar:', formData)
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

// Lifecycle
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
@keyframes zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

.animate-zoom {
  animation: zoom 20s ease-in-out infinite alternate;
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

/* Custom scrollbar for sidebar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #8b5cf6;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
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

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

button {
  cursor: pointer;
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  h1 {
    font-size: 1.5rem !important;
  }
}

/* Loading spinner animation */
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