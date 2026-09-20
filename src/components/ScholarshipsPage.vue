<template>
  <div class="min-h-screen w-full bg-gray-50">
    <AppHeader />

    <!-- Page Header -->
    <section class="relative text-white overflow-hidden" style="min-height: 400px; height: 50vh; max-height: 600px;">
      <div class="absolute inset-0 w-full h-full">
        <img
          src="https://images.pexels.com/photos/258117/pexels-photo-258117.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
          alt="Scholarship Opportunities"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-purple-500/60"></div>
      </div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex items-center justify-center" style="min-height: 400px; height: 50vh;">
        <div>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
            All Scholarships
          </h1>
          <p class="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto">
            Discover all fully-funded opportunities to study at top universities worldwide
          </p>
        </div>
      </div>
    </section>

    <!-- Scholarships Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading Skeleton -->
        <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="i in 4" :key="i" class="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-48 h-48 bg-gray-200"></div>
              <div class="flex-1 p-5">
                <div class="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div class="flex gap-2 mb-3">
                  <div class="h-5 bg-gray-200 rounded w-16"></div>
                  <div class="h-5 bg-gray-200 rounded w-20"></div>
                </div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                  <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div class="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12 bg-red-50 rounded-lg">
          <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button @click="fetchScholarships" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Refresh
          </button>
        </div>

        <!-- Main Content -->
        <div v-else>
          <!-- Filters Section -->
          <div class="mb-8 bg-white rounded-xl shadow-md p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div class="mt-4 flex flex-wrap justify-between items-center gap-2">
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

          <!-- Scholarships Grid -->
          <div v-if="filteredScholarships.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              v-for="(scholarship, idx) in filteredScholarships"
              :key="scholarship.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
              @click="openModal(scholarship)"
            >
              <div class="flex flex-col md:flex-row">
                <div class="md:w-48 h-48 md:h-auto relative overflow-hidden">
                  <img
                    :src="getScholarshipImage(scholarship, idx)"
                    :alt="scholarship.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    @error="setDefaultImage"
                  >
                  <div class="absolute top-3 left-3 flex gap-1">
                    <span class="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Trophy class="w-3 h-3" />
                      Fully Funded
                    </span>
                    <span v-if="scholarship.featured" class="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star class="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                </div>

                <div class="flex-1 p-5">
                  <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {{ scholarship.title }}
                  </h3>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="text-xs bg-gray-100 text-purple-700 px-2 py-1 rounded-full font-medium inline-flex items-center gap-1">
                      <Globe class="w-3 h-3" />
                      {{ scholarship.country || 'International' }}
                    </span>
                    <span class="text-xs bg-gray-100 text-purple-700 px-2 py-1 rounded-full font-medium inline-flex items-center gap-1">
                      <GraduationCap class="w-3 h-3" />
                      {{ scholarship.degree || 'All levels' }}
                    </span>
                    <span v-if="scholarship.deadline" class="text-xs bg-gray-100 text-purple-700 px-2 py-1 rounded-full font-medium inline-flex items-center gap-1">
                      <Calendar class="w-3 h-3" />
                      {{ formatDate(scholarship.deadline) }}
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                    {{ (scholarship.description || '').substring(0, 200) }}
                  </p>
                  <div class="flex gap-3">
                    <button
                      @click.stop="openModal(scholarship)"
                      class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition inline-flex items-center gap-2"
                    >
                      <BookOpen class="w-4 h-4" />
                      Read More
                    </button>
                    <button
                      @click.stop="openInquiryForm(scholarship)"
                      class="border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition inline-flex items-center gap-2"
                    >
                      <MessageSquare class="w-4 h-4" />
                      Request Assistance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <BookOpen class="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500 font-medium text-lg">
              {{ allScholarships.length === 0 ? 'No scholarships yet' : 'No scholarships match your criteria' }}
            </p>
            <p class="text-gray-400 text-sm mt-2">
              {{ allScholarships.length === 0
                ? 'Scholarships posted in the admin dashboard will appear here.'
                : 'Try adjusting your search or reset filters.' }}
            </p>
            <button
              v-if="allScholarships.length > 0"
              @click="resetFilters"
              class="mt-6 inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition"
            >
              <RefreshCw class="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="relative text-white py-16 overflow-hidden">
      <div class="absolute inset-0 w-full h-full">
        <img
          src="https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="Students studying together"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Need Help with Your Application?
        </h2>
        <p class="text-white opacity-95 mb-6 text-lg md:text-xl max-w-2xl mx-auto">
          Our expert consultants can guide you through the entire scholarship application process.
        </p>
        <button
          @click="openCalendly"
          class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg text-base font-semibold hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
        >
          <Calendar class="w-5 h-5" />
          Book a Free Consultation
        </button>
      </div>
    </section>

    <!-- Modal for Scholarship Details -->
    <div
      v-if="modalVisible && selectedScholarship"
      class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="relative h-64 md:h-80 overflow-hidden">
          <img
            :src="getModalImage(selectedScholarship)"
            :alt="selectedScholarship.title"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <button
            @click="closeModal"
            class="absolute top-5 right-5 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 hover:scale-110"
          >
            <X class="w-5 h-5 text-white" />
          </button>
          <div class="absolute bottom-6 left-6 right-6 text-white">
            <div class="flex gap-3 mb-3">
              <span class="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-lg">
                <Trophy class="w-3 h-3" />
                Fully Funded
              </span>
              <span
                class="text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-lg backdrop-blur-md"
                :class="selectedScholarship.featured ? 'bg-purple-600/90' : 'bg-blue-600/90'"
              >
                <ExternalLink class="w-3 h-3" />
                {{ selectedScholarship.featured ? 'Featured' : 'Scholarship' }}
              </span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold leading-tight">{{ selectedScholarship.title }}</h2>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-8">
          <!-- Quick Info Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group">
              <Globe class="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p class="text-xs text-gray-600 font-medium">Country</p>
              <p class="text-sm font-bold text-purple-700 mt-1">{{ selectedScholarship.country || 'International' }}</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group">
              <GraduationCap class="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p class="text-xs text-gray-600 font-medium">Degree</p>
              <p class="text-sm font-bold text-purple-700 mt-1">{{ selectedScholarship.degree || 'All levels' }}</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group">
              <Calendar class="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p class="text-xs text-gray-600 font-medium">Deadline</p>
              <p class="text-sm font-bold text-purple-700 mt-1">{{ formatDate(selectedScholarship.deadline) || 'Open' }}</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group">
              <Award class="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p class="text-xs text-gray-600 font-medium">Status</p>
              <p class="text-sm font-bold text-purple-700 mt-1">{{ selectedScholarship.status || 'Active' }}</p>
            </div>
          </div>

          <!-- Full Description -->
          <div class="prose max-w-none mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen class="w-5 h-5 text-purple-700" />
              Scholarship Details
            </h3>

            <div class="mb-6">
              <h4 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <FileText class="w-4 h-4 text-purple-600" />
                Description
              </h4>
              <div class="text-gray-600 leading-relaxed whitespace-pre-line">
                {{ selectedScholarship.description || 'No description provided.' }}
              </div>
            </div>

            <div v-if="selectedScholarship.eligibility" class="mb-6">
              <h4 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <CheckCircle class="w-4 h-4 text-green-600" />
                Eligibility Criteria
              </h4>
              <div class="text-gray-600 leading-relaxed whitespace-pre-line">
                {{ selectedScholarship.eligibility }}
              </div>
            </div>

            <div v-if="selectedScholarship.benefits" class="mb-6">
              <h4 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <Gift class="w-4 h-4 text-yellow-600" />
                Benefits
              </h4>
              <div class="text-gray-600 leading-relaxed whitespace-pre-line">
                {{ selectedScholarship.benefits }}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <a
              v-if="selectedScholarship.link"
              :href="selectedScholarship.link"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2 flex-1 group"
            >
              <ExternalLink class="w-4 h-4 group-hover:scale-110 transition-transform" />
              Apply on Official Site
            </a>
            <button
              @click="openInquiryForm(selectedScholarship)"
              class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2 flex-1 group"
            >
              <MessageSquare class="w-4 h-4 group-hover:scale-110 transition-transform" />
              Request Assistance
            </button>
            <button
              @click="closeModal"
              class="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <X class="w-4 h-4" />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Inquiry Modal -->
    <div
      v-if="inquiryModalVisible"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="closeInquiryModal"
    >
      <div class="bg-white rounded-2xl max-w-md w-full" @click.stop>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">Request Assistance</h2>
            <button @click="closeInquiryModal" class="text-gray-400 hover:text-gray-600">
              <X class="w-5 h-5" />
            </button>
          </div>
          <p class="text-gray-600 mb-4 text-sm">
            For <strong>{{ selectedScholarship?.title }}</strong>
          </p>
          <form @submit.prevent="submitInquiry">
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" v-model="inquiryForm.fullName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" v-model="inquiryForm.email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" v-model="inquiryForm.phone" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea v-model="inquiryForm.message" rows="3" required class="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
              </div>
              <div v-if="inquirySubmitting" class="text-center py-2">
                <div class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
              </div>
              <div v-if="inquirySuccess" class="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
                {{ inquirySuccessMessage }}
              </div>
              <div v-if="inquiryError" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {{ inquiryErrorMessage }}
              </div>
              <div class="flex gap-3 pt-2">
                <button type="submit" :disabled="inquirySubmitting" class="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg">
                  Submit
                </button>
                <button type="button" @click="closeInquiryModal" class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppHeader from './AppHeader.vue'
import {
  Search, Globe, GraduationCap, BarChart3, Trophy, Calendar,
  BookOpen, MessageSquare, RefreshCw, X, Award, ExternalLink,
  AlertCircle, Star, Clock, FileText, CheckCircle, Gift
} from 'lucide-vue-next'
import { readDatabase, updateDatabase } from '../lib/jsonbin'

/* ================= STATE ================= */
const loading = ref(true)
const error = ref(null)
const allScholarships = ref([])
const searchQuery = ref('')
const selectedCountry = ref('')
const sortOrder = ref('newest')
const modalVisible = ref(false)
const inquiryModalVisible = ref(false)
const selectedScholarship = ref(null)
const inquirySubmitting = ref(false)
const inquirySuccess = ref(false)
const inquiryError = ref(false)
const inquirySuccessMessage = ref('')
const inquiryErrorMessage = ref('')

const inquiryForm = ref({ fullName: '', email: '', phone: '', message: '' })

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'

/* ================= COMPUTED ================= */
const uniqueCountries = computed(() =>
  [...new Set(allScholarships.value.map(s => s.country).filter(Boolean))].sort()
)

const filteredScholarships = computed(() => {
  let filtered = [...allScholarships.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(s =>
      String(s.title || '').toLowerCase().includes(q) ||
      String(s.country || '').toLowerCase().includes(q) ||
      String(s.degree || '').toLowerCase().includes(q)
    )
  }

  if (selectedCountry.value) {
    filtered = filtered.filter(s => s.country === selectedCountry.value)
  }

  if (sortOrder.value === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
  } else {
    filtered.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
  }

  return filtered
})

/* ================= HELPERS ================= */
const formatDate = (dateString) => {
  if (!dateString) return 'Open'
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return dateString
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getScholarshipImage = (scholarship) => {
  return scholarship.image_url || scholarship.image || FALLBACK_IMG
}

const getModalImage = (scholarship) => {
  if (!scholarship) return FALLBACK_IMG
  return scholarship.image_url || scholarship.image || FALLBACK_IMG
}

const setDefaultImage = (e) => {
  e.target.onerror = null
  e.target.src = FALLBACK_IMG
}

/* ================= DATA LOADING ================= */
const fetchScholarships = async () => {
  loading.value = true
  error.value = null

  try {
    const db = await readDatabase()
    const list = Array.isArray(db.scholarships) ? db.scholarships : []

    // Only show active scholarships (unless none has a status — then show all)
    const active = list.filter(s => (s.status || 'active') === 'active')
    allScholarships.value = active
  } catch (err) {
    console.error('[ScholarshipsPage]', err)
    error.value = err?.message || 'Unable to load scholarships.'
    allScholarships.value = []
  } finally {
    loading.value = false
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCountry.value = ''
  sortOrder.value = 'newest'
}

/* ================= INQUIRY ================= */
const submitInquiry = async () => {
  if (!inquiryForm.value.fullName || !inquiryForm.value.email || !inquiryForm.value.message) {
    inquiryError.value = true
    inquiryErrorMessage.value = 'Please fill in all required fields'
    setTimeout(() => { inquiryError.value = false }, 3000)
    return
  }

  inquirySubmitting.value = true
  inquiryError.value = false
  inquirySuccess.value = false

  try {
    const inquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      full_name: inquiryForm.value.fullName.trim(),
      email: inquiryForm.value.email.trim().toLowerCase(),
      phone: inquiryForm.value.phone.trim(),
      scholarship_title: selectedScholarship.value?.title || '',
      message: inquiryForm.value.message.trim(),
      status: 'pending',
      created_at: new Date().toISOString()
    }

    await updateDatabase((db) => ({
      ...db,
      inquiries: [inquiry, ...(Array.isArray(db.inquiries) ? db.inquiries : [])]
    }))

    inquirySuccess.value = true
    inquirySuccessMessage.value = 'Submitted successfully! We will contact you soon.'
    setTimeout(() => {
      closeInquiryModal()
      inquiryForm.value = { fullName: '', email: '', phone: '', message: '' }
      inquirySuccess.value = false
    }, 2000)
  } catch (err) {
    inquiryError.value = true
    inquiryErrorMessage.value = 'Failed to submit. Please try again.'
    setTimeout(() => { inquiryError.value = false }, 3000)
  } finally {
    inquirySubmitting.value = false
  }
}

/* ================= MODAL ================= */
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

const openInquiryForm = (scholarship) => {
  selectedScholarship.value = scholarship
  inquiryModalVisible.value = true
  inquiryForm.value = { fullName: '', email: '', phone: '', message: '' }
  inquiryError.value = false
  inquirySuccess.value = false
  document.body.style.overflow = 'hidden'
}

const closeInquiryModal = () => {
  inquiryModalVisible.value = false
  document.body.style.overflow = ''
}

const openCalendly = () => {
  window.open('https://calendly.com/goabroadadmissions/one-on-one-consultation', '_blank')
}

/* ================= LIFECYCLE ================= */
onMounted(() => {
  fetchScholarships()
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 1s linear infinite; }

@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237f00b3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
::-webkit-scrollbar-thumb { background: #c084fc; border-radius: 3px; }

.backdrop-blur-md { backdrop-filter: blur(12px); }

.prose { font-size: 0.95rem; line-height: 1.6; color: #374151; }
.prose p { margin-bottom: 1rem; }
</style>