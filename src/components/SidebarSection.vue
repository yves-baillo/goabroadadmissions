<template>
  <div 
    v-motion
    :initial="{ opacity: 0, x: 50 }"
    :enter="{ opacity: 1, x: 0 }"
    :duration="500"
    class="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24"
  >
    <!-- Contact Header -->
    <div 
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="100"
      class="text-center border-b border-gray-200 pb-5 mb-5"
    >
      <div 
        v-motion
        :initial="{ scale: 0 }"
        :enter="{ scale: 1 }"
        :delay="200"
        :duration="300"
        class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <i class="fas fa-address-card text-purple-600 text-2xl"></i>
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-2">Contact With Us</h3>
      <p class="text-gray-500 text-sm">
        Have questions? We're here to help you navigate your study abroad journey.
      </p>
    </div>

    <!-- Direct Contact Options -->
    <div class="space-y-3">
      <!-- WhatsApp -->
      <a 
        href="https://api.whatsapp.com/send/?phone=250784173351" 
        target="_blank"
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :enter="{ opacity: 1, x: 0 }"
        :delay="300"
        class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-all group cursor-pointer"
      >
        <div 
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="400"
          class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition"
        >
          <i class="fab fa-whatsapp text-2xl"></i>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-gray-800">WhatsApp Chat</p>
          <p class="text-sm text-gray-500">+250 784 173 351</p>
        </div>
        <i class="fas fa-chevron-right text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition"></i>
      </a>
        <!-- Phone Call -->
      <a 
        href="tel:+250789410951"
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :enter="{ opacity: 1, x: 0 }"
        :delay="500"
        class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all group cursor-pointer"
      >
        <div 
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="600"
          class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition"
        >
          <i class="fas fa-phone-alt text-2xl"></i>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-gray-800">Call Us</p>
          <p class="text-sm text-gray-500">+250 789 410 951</p>
        </div>
        <i class="fas fa-chevron-right text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition"></i>
      </a>

      <!-- Book Consultation -->
      <button 
        @click="openCalendly"
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :enter="{ opacity: 1, x: 0 }"
        :delay="600"
        class="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-yellow-50 rounded-xl hover:shadow-lg transition-all group"
      >
        <div 
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="700"
          class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800 shadow-md group-hover:scale-110 transition"
        >
          <i class="fas fa-calendar-check text-2xl"></i>
        </div>
        <div class="flex-1 text-left">
          <p class="font-semibold text-gray-800">Book Free Consultation</p>
          <p class="text-sm text-gray-500">Schedule a call with our experts</p>
        </div>
        <i class="fas fa-chevron-right text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition"></i>
      </button>
    </div>

    <!-- Newsletter Subscription Section - Email Only -->
   

    <!-- Social Media Links -->
    <div 
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="1100"
      class="mt-8 pt-6 border-t border-gray-200"
    >
      <p class="text-center text-sm text-gray-500 mb-4">Follow us on social media</p>
      <div class="flex justify-center gap-3 flex-wrap">
        <a 
          href="https://youtube.com/@xmaopportunitiesportal" 
          target="_blank"
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="1200"
          class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition"
        >
          <i class="fab fa-youtube text-lg"></i>
        </a>
        <a 
          href="https://www.linkedin.com/in/goabroad-admissions-361873399/" 
          target="_blank"
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="1250"
          class="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition"
        >
          <i class="fab fa-linkedin-in text-lg"></i>
        </a>
        <a 
          href="https://www.facebook.com/share/1JYd3mLj5X/" 
          target="_blank"
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="1300"
          class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition"
        >
          <i class="fab fa-facebook-f text-lg"></i>
        </a>
        <a 
          href="https://www.instagram.com/goabroad_admissions" 
          target="_blank"
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="1350"
          class="w-10 h-10 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition"
        >
          <i class="fab fa-instagram text-lg"></i>
        </a>
        <a 
          href="https://x.com/GoAbroad_Go" 
          target="_blank"
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="1400"
          class="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition"
        >
          <i class="fab fa-twitter text-lg"></i>
        </a>
        <a 
          href="https://www.tiktok.com/@xmaopportunitiesportal" 
          target="_blank"
          v-motion
          :initial="{ scale: 0 }"
          :enter="{ scale: 1 }"
          :delay="1450"
          class="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition"
        >
          <i class="fab fa-tiktok text-lg"></i>
        </a>
      </div>
    </div>
    
    <!-- Success Toast Message -->
    <div 
      v-if="showSuccess"
      v-motion
      :initial="{ opacity: 0, x: 50 }"
      :enter="{ opacity: 1, x: 0 }"
      :leave="{ opacity: 0, x: 50 }"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm z-50"
    >
      <i class="fas fa-check-circle"></i>
      <span>Successfully subscribed! Check your email.</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const subscriberEmail = ref('')
const isSubscribing = ref(false)
const showSuccess = ref(false)

const openCalendly = () => {
  window.open('https://calendly.com/goabroadadmissions/one-on-one-consultation', '_blank')
}

const subscribeNewsletter = async () => {
  if (!subscriberEmail.value) {
    alert('Please enter your email address')
    return
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(subscriberEmail.value)) {
    alert('Please enter a valid email address')
    return
  }
  
  isSubscribing.value = true
  
  // Simulate API call (replace with actual endpoint)
  try {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
    
    // Clear form
    subscriberEmail.value = ''
    
  } catch (error) {
    console.error('Subscription failed:', error)
    alert('Subscription failed. Please try again later.')
  } finally {
    isSubscribing.value = false
  }
}
</script>