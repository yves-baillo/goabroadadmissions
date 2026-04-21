<template>
  <div class="min-h-screen w-full bg-gray-50">
    <AppHeader />
    <!-- Hero Section with Swiper (Dots Removed) -->
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
                  :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
                  class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-tight" 
                  v-html="slide.title"
                ></h1>
                <p 
                  v-motion
                  :initial="{ opacity: 0, y: 30 }"
                  :visible="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
                  class="text-lg md:text-xl lg:text-2xl mb-12 opacity-95"
                >
                  {{ slide.subtitle }}
                </p>
                <div 
                  v-motion
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :visible="{ opacity: 1, scale: 1, transition: { delay: 600, duration: 500 } }"
                  class="flex flex-wrap gap-4 justify-center"
                >
                  <button 
                    @click="scrollToScholarships"
                    class="bg-gradient-to-r from-purple-900 to-purple-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    Explore Scholarships
                  </button>
                  <button 
            @click="openGoogleForm"
            class="bg-gradient-to-r from-purple-900 to-purple-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
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
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
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
              <p class="mt-4 text-gray-500">Loading scholarships...</p>
            </div>
            
            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12 bg-red-50 rounded-lg">
              <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-3"></i>
              <p class="text-red-600">Failed to load scholarships: {{ error }}</p>
              <button 
                @click="fetchScholarships" 
                class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Try Again
              </button>
            </div>
            
            <!-- No Scholarships State -->
            <div v-else-if="scholarships.length === 0" class="text-center py-12">
              <i class="fas fa-book-open text-gray-400 text-4xl mb-3"></i>
              <p class="text-gray-500">No scholarships available at the moment. Please check back later.</p>
            </div>
            
            <!-- Scholarships Grid -->
            <div v-else class="space-y-6">
              <div 
                v-for="(scholarship, idx) in scholarships" 
                :key="scholarship.id"
                class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                v-motion
                :initial="{ opacity: 0, x: -50 }"
                :visible="{ opacity: 1, x: 0, transition: { delay: idx * 100, duration: 500 } }"
                @motion:complete="onScholarshipMotionComplete"
              >
                <div class="flex flex-col md:flex-row">
                  <!-- Scholarship Image -->
                  <div class="md:w-48 h-48 md:h-auto relative overflow-hidden">
                    <img 
                      :src="scholarship.image" 
                      :alt="scholarship.title"
                      class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    >
                    <div class="absolute top-3 left-3">
                      <span class="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                        {{ scholarship.funding || 'Fully Funded' }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Scholarship Content -->
                  <div class="flex-1 p-5">
                    <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {{ scholarship.title }}
                    </h3>
                    <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <i class="fas fa-university"></i>
                      <span>{{ scholarship.university || 'Partner Universities' }}</span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span class="text-xs bg-gray-100 text-purple-600 px-2 py-1 rounded-full">
                        <i class="fas fa-globe mr-1"></i>{{ scholarship.country || 'Various' }}
                      </span>
                      <span class="text-xs bg-gray-100 text-purple-600 px-2 py-1 rounded-full">
                        <i class="fas fa-graduation-cap mr-1"></i>{{ scholarship.degree || 'Various' }}
                      </span>
                      <span class="text-xs bg-gray-100 text-purple-600 px-2 py-1 rounded-full">
                        <i class="fas fa-calendar-alt mr-1"></i>{{ scholarship.deadline || 'Check Website' }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                      {{ scholarship.description || 'Scholarship opportunity for international students.' }}
                    </p>
                    <div class="flex gap-3">
                      <router-link 
                        :to="`/scholarship/${scholarship.id}`"
                        class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition inline-block"
                      >
                        Read More
                      </router-link>
                      <button 
                        @click="openGoogleForm"
                        class="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition"
                      >
                        Request Assistance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: SidebarSection Component -->
          <div 
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 300 } }"
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
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
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
            class="bg-white p-6 rounded-xl border-l-4 border-purple-600 shadow-md hover:-translate-y-1 transition-all"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }"
            @mouseenter="onServiceHover($event, index)"
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
          :visible="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 500 } }"
          class="text-center mt-8"
        >
          <button 
            @click="openGoogleForm"
            class="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
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
      v-motion
      :initial="{ opacity: 0, scale: 0.95 }"
      :visible="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
      @motion:complete="onFounderSectionComplete"
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
            :visible="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 200, duration: 800, type: 'spring', stiffness: 100 } }"
            class="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl mx-auto md:mx-0"
          >
            <img src="https://i.postimg.cc/FzCwLMSw/img40.png" alt="Alexis Hakizimana - Founder" class="w-full h-full object-cover">
          </div>
          <div 
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible="{ opacity: 1, x: 0, transition: { delay: 300, duration: 600 } }"
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

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppHeader from './AppHeader.vue'
import SidebarSection from './SidebarSection.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

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

// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://scholarship-api.onrender.com'  // Your Render backend URL
  : 'http://localhost:3001'                 // Local development

// Scholarship data from API
const scholarships = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch scholarships from backend
const fetchScholarships = async () => {
  loading.value = true
  error.value = null
  
  try {
    console.log('📡 Fetching scholarships from:', `${API_BASE_URL}/api/scholarships`)
    const response = await fetch(`${API_BASE_URL}/api/scholarships`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    scholarships.value = data
    console.log('✅ Loaded', scholarships.value.length, 'scholarships')
  } catch (err) {
    console.error('❌ Error fetching scholarships:', err)
    error.value = err.message
    scholarships.value = []
  } finally {
    loading.value = false
  }
}

// Load scholarships when component mounts
onMounted(() => {
  fetchScholarships()
})

// Event handlers
const onScholarshipMotionComplete = () => {
  console.log('Scholarship animation completed')
}

const onServiceHover = (event, index) => {
  console.log(`Service ${index} hovered`)
}

const onFounderSectionComplete = () => {
  console.log('Founder section animation completed')
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

// Clean up on unmount
onBeforeUnmount(() => {
  const swiper = document.querySelector('.swiper')?.swiper
  if (swiper) {
    swiper.destroy(true, true)
  }
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