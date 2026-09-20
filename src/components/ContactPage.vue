<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <!-- Contact Hero Section -->
    <section class="relative h-[500px] md:h-[600px] lg:h-[850px] -mt-20">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('https://i.postimg.cc/rm0MyKch/img10.avif')">
          <div class="absolute inset-0 bg-gradient-to-r from-green-400/40 to-black/70"></div>
        </div>
      </div>

      <div class="relative z-10 h-full flex items-center justify-center text-white">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 animate-fadeIn">Get in touch with us</h1>
          <p class="text-xl md:text-2xl max-w-2xl mx-auto opacity-95">
            Get in touch with our team. We're here to help you achieve your study abroad dreams. Just contact us through different lines provided or to the social media platforms
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Content Section -->
    <section class="py-16 md:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-12">

          <!-- Left Column: Contact Information -->
          <div class="flex-1">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Let's Talk</h2>
              <p class="text-gray-600 mb-8">
                Have questions about scholarships, university applications, or our services? Reach out to us through any of the channels below.
              </p>

              <div class="space-y-6">
                <div class="flex items-start gap-4 group">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-all">
                    <i class="fas fa-map-marker-alt text-purple-600 text-xl group-hover:text-white transition-all"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-1">Our Office</h3>
                    <p class="text-gray-500">Batsinda Taxi Park, Kigali, Rwanda</p>
                  </div>
                </div>

                <div class="flex items-start gap-4 group">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-all">
                    <i class="fas fa-envelope text-purple-600 text-xl group-hover:text-white transition-all"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-1">Email Us</h3>
                    <a href="mailto:goabroadadmissions@outlook.com" class="block text-gray-500 hover:text-purple-600 transition-colors">goabroadadmissions@outlook.com</a>
                    <a href="mailto:alexishakizimana911@gmail.com" class="block text-gray-500 hover:text-purple-600 transition-colors">alexishakizimana911@gmail.com</a>
                  </div>
                </div>

                <div class="flex items-start gap-4 group">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-all">
                    <i class="fas fa-phone-alt text-purple-600 text-xl group-hover:text-white transition-all"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-1">Call Us</h3>
                    <a href="tel:+250785197380" class="block text-gray-500 hover:text-purple-600 transition-colors">+250 785 197 380</a>
                    <a href="tel:+250784173351" class="block text-gray-500 hover:text-purple-600 transition-colors">+250 784 173 351</a>
                  </div>
                </div>

                <div class="flex items-start gap-4 group">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-all">
                    <i class="fas fa-clock text-purple-600 text-xl group-hover:text-white transition-all"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-1">Working Hours</h3>
                    <p class="text-gray-500">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p class="text-gray-500">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>

              <a href="https://wa.me/250784173351" target="_blank" rel="noopener noreferrer" class="flex items-start gap-4 group mt-6">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-all">
                  <i class="fab fa-whatsapp text-green-600 text-xl group-hover:text-white transition-all"></i>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800 mb-1">WhatsApp</h3>
                  <span class="text-gray-500 group-hover:text-green-600 transition-colors">Chat with us at +250 784 173 351</span>
                </div>
              </a>

              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="font-semibold text-gray-800 mb-4">Connect With Us</h3>
                <div class="flex gap-3 flex-wrap">
                  <a
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-1"
                    :class="social.bgColor"
                  >
                    <i :class="social.icon + ' text-white text-lg'"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Contact Form -->
          <div class="flex-1">
            <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

              <form @submit.prevent="submitForm">
                <div class="mb-5">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    v-model="form.fullName"
                    placeholder="Enter your full name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800 bg-white"
                    :disabled="isSubmitting"
                    required
                  >
                </div>

                <div class="mb-5">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    v-model="form.email"
                    placeholder="you@example.com"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800 bg-white"
                    :disabled="isSubmitting"
                    required
                  >
                </div>

                <div class="mb-5">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    v-model="form.phone"
                    placeholder="+250 788 123 456"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800 bg-white"
                    :disabled="isSubmitting"
                  >
                </div>

                <div class="mb-5">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <select
                    v-model="form.subject"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-800 bg-white"
                    :disabled="isSubmitting"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option>Scholarship Inquiry</option>
                    <option>University Application</option>
                    <option>Visa Assistance</option>
                    <option>General Question</option>
                    <option>Partnership Opportunity</option>
                  </select>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    v-model="form.message"
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none text-gray-800 bg-white"
                    :disabled="isSubmitting"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <i v-if="!isSubmitting" class="fas fa-paper-plane mr-2"></i>
                  <i v-else class="fas fa-spinner fa-spin mr-2"></i>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>

              <div v-if="showSuccess" class="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm">
                <i class="fas fa-check-circle mr-2"></i>
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>

              <div v-if="showError" class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm">
                <i class="fas fa-exclamation-circle mr-2"></i>
                {{ errorMessage || 'Something went wrong. Please try again or contact us directly.' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Map Section — Batsinda Taxi Park -->
    <section class="py-10 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Find Us Here</h2>
          <p class="text-gray-500">Visit our office at Batsinda Taxi Park for a face-to-face consultation</p>
        </div>
        <div class="rounded-xl overflow-hidden shadow-lg h-[400px]">
          <iframe
            src="https://maps.google.com/maps?q=Batsinda%20Taxi%20Park%20Kigali&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
          <p class="text-gray-500">Quick answers to common questions</p>
        </div>

        <div class="max-w-3xl mx-auto space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span class="font-semibold text-gray-800">{{ faq.question }}</span>
              <i :class="openFaqIndex === index ? 'fas fa-chevron-up text-purple-600' : 'fas fa-chevron-down text-gray-400'"></i>
            </button>
            <div
              v-if="openFaqIndex === index"
              class="px-6 pb-4 text-gray-600 border-t border-gray-100"
            >
              <p class="pt-3">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import AppHeader from './AppHeader.vue'
import { updateDatabase } from '../lib/jsonbin'

const API_URL = 'https://newbackend-gamma.vercel.app/api'

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const LOCAL_DATABASE_KEY = 'goabroad_jsonbin_fallback'

/* ---------- Local fallback (only used if JSONBin fails) ---------- */
const saveMessageLocally = (message) => {
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_DATABASE_KEY) || '{}')
    const database = (stored && typeof stored === 'object' && !Array.isArray(stored)) ? stored : {}
    const contacts = Array.isArray(database.contacts) ? database.contacts : []
    localStorage.setItem(LOCAL_DATABASE_KEY, JSON.stringify({
      ...database,
      contacts: [message, ...contacts]
    }))
  } catch (err) {
    console.error('Unable to save contact message locally:', err)
  }
}

/* ---------- Social media ---------- */
const socialLinks = [
  { name: 'YouTube',   url: 'https://youtube.com/@goabroadadmissions?si=qSQhGhqrOCEOG7A7', icon: 'fab fa-youtube',    bgColor: 'bg-red-600 hover:bg-red-700' },
  { name: 'LinkedIn',  url: 'https://www.linkedin.com/in/goabroad-admissions-361873399/',   icon: 'fab fa-linkedin-in', bgColor: 'bg-blue-700 hover:bg-blue-800' },
  { name: 'Facebook',  url: 'https://www.facebook.com/share/1Hj4121teB/?mibextid=wwXIfr',   icon: 'fab fa-facebook-f',  bgColor: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'Instagram', url: 'https://www.instagram.com/go_abroad_admissions_rw?stkn=MTI0MGlxa3Uya25icg%3D%3D&utm_source=qr', icon: 'fab fa-instagram', bgColor: 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600' },
  { name: 'Twitter',   url: 'https://x.com/GoAbroad_Go',                                     icon: 'fab fa-twitter',     bgColor: 'bg-gray-800 hover:bg-gray-700' },
  { name: 'TikTok',    url: 'https://www.tiktok.com/@goabroadadmissions?_r=1&_t=ZP-99tiKvjCr43', icon: 'fab fa-tiktok',  bgColor: 'bg-gray-800 hover:bg-gray-700' }
]

/* ---------- FAQ ---------- */
const faqs = ref([
  { question: 'How long does it take to get a response?',   answer: 'We typically respond to all inquiries within 24-48 business hours. For urgent matters, please call us directly.' },
  { question: 'Do you offer free consultation?',             answer: 'Yes, we offer a free 30-minute initial consultation to understand your needs and explain how we can help you achieve your study abroad goals.' },
  { question: 'What countries do you help with?',            answer: 'We assist students with applications to universities in the USA, UK, Canada, Australia, China, Hungary, Saudi Arabia, Germany, France, and many other destinations.' },
  { question: 'Can you help with scholarship applications?', answer: 'Absolutely! Scholarship application assistance is one of our core services. We help identify suitable scholarships and guide you through the entire application process.' },
  { question: 'Is there a fee for your services?',           answer: 'We offer both free resources and premium consultation packages. Our initial consultation is free, and we provide transparent pricing for all our services.' }
])

const openFaqIndex = ref(null)
const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

/* ---------- Submit ---------- */
const submitForm = async () => {
  showSuccess.value = false
  showError.value = false
  errorMessage.value = ''

  if (!form.fullName || !form.email || !form.subject || !form.message) {
    errorMessage.value = 'Please fill in all required fields'
    showError.value = true
    setTimeout(() => (showError.value = false), 5000)
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errorMessage.value = 'Please enter a valid email address'
    showError.value = true
    setTimeout(() => (showError.value = false), 5000)
    return
  }

  isSubmitting.value = true

  const message = {
    id: `contact-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    full_name: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    subject: form.subject,
    message: form.message.trim(),
    created_at: new Date().toISOString(),
    status: 'new'
  }

  try {
    await updateDatabase((db) => ({
      ...db,
      contacts: [message, ...(Array.isArray(db.contacts) ? db.contacts : [])]
    }))
  } catch (storageError) {
    console.warn('JSONBin write failed, saving locally:', storageError)
    saveMessageLocally(message)
  }

  try {
    await axios.post(`${API_URL}/contact`, message, { timeout: 15000 })
  } catch (backendError) {
    console.warn('Contact API unavailable (non-fatal):', backendError)
  }

  showSuccess.value = true
  Object.assign(form, { fullName: '', email: '', phone: '', subject: '', message: '' })
  setTimeout(() => (showSuccess.value = false), 5000)

  isSubmitting.value = false
}
</script>

<style scoped>
button { cursor: pointer; }
@media (max-width: 640px) { .container { padding-left: 1rem; padding-right: 1rem; } }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.8s ease-out; }

input, select, textarea { color: #1f2937; background-color: #ffffff; }
input::placeholder, textarea::placeholder { color: #9ca3af; opacity: 1; }
input:focus, select:focus, textarea:focus { color: #1f2937; }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.fa-spinner { animation: spin 1s linear infinite; }
</style>