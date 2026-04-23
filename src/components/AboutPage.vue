<template>
  <div class="min-h-screen w-full bg-gray-50">
    <AppHeader />
    
    <!-- Hero Section with Full-Width Background Slider (Reed College Style) -->
    <section class="relative h-screen min-h-[600px] overflow-hidden">
      <!-- Background Image Slider -->
      <div class="absolute inset-0">
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000"
          :class="{ 'opacity-100 z-10': currentHeroSlide === index, 'opacity-0': currentHeroSlide !== index }"
        >
          <img 
            :src="slide.image" 
            :alt="slide.title"
            class="w-full h-full object-cover"
          >
          <!-- Dark Overlay for text readability -->
          <div class="absolute inset-0 bg-black/50"></div>
        </div>
      </div>     
      
      <!-- Centered Content Overlay -->
      <div class="absolute inset-0 z-10 flex items-center justify-center text-center text-white">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
          class="max-w-4xl mx-auto px-6"
        >
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            About <span class="text-yellow-400">GoAbroad Admissions</span>
          </h1>
          <p class="text-lg md:text-xl opacity-95 mb-8 max-w-2xl mx-auto">
            Your trusted partner in transforming international education dreams into reality
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button 
              @click="openRequestForm"
              class="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-6 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <FileText class="w-4 h-4" />
              Request Assistance
            </button>
            <button 
              @click="scrollToAbout"
              class="border-2 border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Info class="w-4 h-4" />
              Learn More
            </button>
          </div>
        </div>
      </div>
      
    
    </section>

    <!-- About Section with Image Slider -->
    <section id="about" class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="flex justify-center mb-4"
        >
          <span class="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <Info class="w-3 h-3" />
            ABOUT US
          </span>
        </div>
        
        <h2 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="text-3xl md:text-4xl font-extrabold text-purple-600 text-center mb-4"
        >
          About GoAbroad Admissions
        </h2>
        
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-gray-500 text-center max-w-3xl mx-auto mb-12 text-sm"
        >
          Bridging the gap between students and global education opportunities
        </p>
        
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div 
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 300 } }"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-purple-600 mb-6">Your Pathway to Global Education</h2>
            <p class="text-gray-600 mb-4 text-sm">
              At GoAbroad Admissions, we specialize in eliminating the gap between students and their global education dreams.
              We address inaccessibility to credible sources of information, the need for financial assistance through scholarships,
              and the guidance required to secure admissions at competitive universities worldwide.
            </p>
            <p class="text-gray-600 mb-8 text-sm">
              Whether you're familiar with international university applications or just starting your journey, we have a team
              of dedicated professionals who have been in your shoes before. We know how to help you stand out and land
              transformative scholarships and educational opportunities.
            </p>
            <button 
              @click="openRequestForm"
              class="bg-gradient-to-r from-purple-700 to-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <FileText class="w-4 h-4" />
              Request Assistance
            </button>
          </div>

          <!-- About Slider -->
          <div 
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 700, delay: 400 } }"
            class="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl"
          >
            <div 
              v-for="(slide, index) in aboutSlides" 
              :key="index"
              class="absolute inset-0 transition-opacity duration-800"
              :class="{ 'opacity-100 z-10': currentAboutSlide === index, 'opacity-0': currentAboutSlide !== index }"
            >
              <img :src="slide.image" :alt="slide.caption.title" class="w-full h-full object-cover">
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h4 class="text-base font-semibold">{{ slide.caption.title }}</h4>
                <p class="text-xs opacity-90">{{ slide.caption.description }}</p>
              </div>
            </div>
            //arrows was here
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="py-20 bg-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Mission Card -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="bg-white rounded-2xl p-8 shadow-lg text-center hover:-translate-y-2 transition-all border-t-4 border-purple-500"
          >
            <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p class="text-gray-600">
              To democratize access to international education by providing expert guidance, 
              scholarship opportunities, and comprehensive support to students worldwide, 
              enabling them to achieve their academic and career aspirations.
            </p>
          </div>
          
          <!-- Vision Card -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
            class="bg-white rounded-2xl p-8 shadow-lg text-center hover:-translate-y-2 transition-all border-t-4 border-purple-500"
          >
            <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p class="text-gray-600">
              To become the world's most trusted education consultancy, creating a global 
              community of empowered scholars who drive positive change in their home 
              countries and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="text-center mb-12"
        >
          <span class="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-semibold inline-block mb-3 flex items-center gap-2 justify-center">
            <Heart class="w-3 h-3" />
            OUR VALUES
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-purple-600 mb-4">What We Stand For</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
        </div>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(value, index) in coreValues" 
            :key="index"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
            class="text-center p-6 rounded-xl hover:shadow-lg transition-all bg-gradient-to-b from-white to-purple-50"
          >
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="value.icon" class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ value.title }}</h3>
            <p class="text-gray-600 text-sm">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Founder Section -->
    <section class="py-20 bg-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="text-center mb-12"
        >
          <span class="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-semibold inline-block mb-3">
            MEET THE FOUNDER
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-purple-600 mb-4">The Vision Behind GoAbroad</h2>
        </div>
        
        <div 
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 700, delay: 200 } }"
          class="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl"
        >
          <div class="flex flex-col md:flex-row">
            <div class="md:w-2/5">
              <img 
                :src="founder.image" 
                :alt="founder.name"
                class="w-full h-full object-cover"
              >
            </div>
            <div class="md:w-3/5 p-8">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ founder.name }}</h3>
              <p class="text-purple-600 font-semibold mb-4">{{ founder.role }}</p>
              <p class="text-gray-600 leading-relaxed mb-6">
                {{ founder.bio }}
              </p>
              <div class="flex flex-wrap gap-3">
                <button 
                  @click="openRequestForm"
                  class="bg-purple-900 hover:bg-blue-900 text-white px-10 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                  <FileText class="w-4 h-4" />
                  Request Assistance
                </button>
                <button 
                  @click="openLinkedIn"
                  class="border border-purple-900 text-purple-900 hover:bg-purple-50 px-5 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                  <Linkedin class="w-4 h-4" />
                  Connect on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from './AppHeader.vue'
import { 
  ChevronLeft, 
  ChevronRight, 
  Target, 
  Eye,
  Heart,
  Users,
  Info,
  Star,
  Handshake,
  Lightbulb,
  FileText,
  Linkedin
} from 'lucide-vue-next'

// Hero Slides
const heroSlides = ref([
  {
    image: 'https://i.postimg.cc/rm0MyKch/img10.avif',
    title: 'Global Education Opportunities'
  },
  {
    image: 'https://i.postimg.cc/6qj0g7vM/img60.jpg',
    title: 'University Placements'
  }
])

// About Slider Data
const aboutSlides = ref([
  {
    image: 'https://i.postimg.cc/rm0MyKch/img10.avif',
    caption: {
      title: 'We handle scholarship application process',
      description: 'From top destinations such as the USA, UK, Finland, China and more'
    }
  },
  {
    image: 'https://i.postimg.cc/6qj0g7vM/img60.jpg',
    caption: {
      title: 'University Partnerships',
      description: 'Direct connections with international universities'
    }
  },
  {
    image: 'https://i.postimg.cc/1XrTyQg0/img20.avif',
    caption: {
      title: 'Workshop Sessions',
      description: 'Interactive guidance sessions for applicants'
    }
  }
])

// Core Values
const coreValues = ref([
  {
    icon: Star,
    title: 'Excellence',
    description: 'We strive for the highest quality in every service we provide.'
  },
  {
    icon: Handshake,
    title: 'Integrity',
    description: 'Honest, transparent guidance you can trust.'
  },
  {
    icon: Users,
    title: 'Student-Centric',
    description: 'Your success is our number one priority.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Constantly improving our methods and strategies.'
  }
])

// Founder Data
const founder = ref({
  name: 'Alexis Hakizimana',
  role: 'Founder & Lead Consultant',
  bio: 'Amherst College alumnus with expertise in scholarship applications. Dedicated to helping students worldwide access quality international education through personalized guidance and support. With over 8 years of experience in international admissions, Alexis has helped hundreds of students secure fully-funded scholarships to top universities across the globe.',
  image: 'https://i.postimg.cc/FzCwLMSw/img40.png'
})

// Slider States
const currentHeroSlide = ref(0)
const currentAboutSlide = ref(0)
let heroInterval = null
let aboutInterval = null

// Hero Slider Methods
const changeHeroSlide = (direction) => {
  currentHeroSlide.value = (currentHeroSlide.value + direction + heroSlides.value.length) % heroSlides.value.length
}

const goToHeroSlide = (index) => {
  currentHeroSlide.value = index
  if (heroInterval) {
    clearInterval(heroInterval)
    startHeroAutoSlide()
  }
}

// About Slider Methods
const changeAboutSlide = (direction) => {
  currentAboutSlide.value = (currentAboutSlide.value + direction + aboutSlides.value.length) % aboutSlides.value.length
}

const goToAboutSlide = (index) => {
  currentAboutSlide.value = index
  if (aboutInterval) {
    clearInterval(aboutInterval)
    startAboutAutoSlide()
  }
}

// Auto-slide functions
const startHeroAutoSlide = () => {
  heroInterval = setInterval(() => {
    changeHeroSlide(1)
  }, 5000)
}

const startAboutAutoSlide = () => {
  aboutInterval = setInterval(() => {
    changeAboutSlide(1)
  }, 5000)
}

// Working Button Functions
const openRequestForm = () => {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSdel6b8-7EZ3nr1OleLs9bEony-WgymoLs1l0Dag0FyFxtSPQ/viewform', '_blank')
}

const openLinkedIn = () => {
  window.open('https://www.linkedin.com/company/goabroad-admissions', '_blank')
}

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Lifecycle
onMounted(() => {
  startHeroAutoSlide()
  startAboutAutoSlide()
})

onUnmounted(() => {
  if (heroInterval) clearInterval(heroInterval)
  if (aboutInterval) clearInterval(aboutInterval)
})
</script>

<style scoped>
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

button {
  cursor: pointer;
}

.transition-opacity {
  transition-property: opacity;
}

.duration-800 {
  transition-duration: 800ms;
}

.duration-1000 {
  transition-duration: 1000ms;
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>