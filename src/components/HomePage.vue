<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
    <AppHeader />
    
    <!-- Hero Section with Video Background -->
    <section id="home" class="h-screen min-h-[850px] relative -mt-20 overflow-hidden">
      <!-- Video Background -->
      <!-- Video Background -->
<!-- Video Background -->
<div class="absolute inset-0 w-full h-full">
  <video 
    autoplay 
    muted 
    loop 
    playsinline
    class="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
  >
    <source src="/public/90933-629483642_medium.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <!-- Fallback image in case video fails to load -->
  
</div>      
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
      
      <!-- Hero Content -->
      <div class="relative z-10 h-full flex items-center justify-center text-white">
        <div class="container mx-auto px-4 text-center">
          <div class="max-w-4xl mx-auto mt-24 md:mt-32 lg:mt-36 xl:mt-40">
            <h1 
              v-motion
              :initial="{ opacity: 0, y: -60, scale: 0.95 }"
              :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 200, duration: 1000, type: 'spring', stiffness: 60 } }"
              class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-tight"
            >
              Do you dream about it?<br><span class="text-yellow-400">We help you make your study abroad journey a reality!</span>
            </h1>
            <p 
              v-motion
              :initial="{ opacity: 0, y: 40 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800, type: 'spring', stiffness: 100 } }"
              class="text-lg md:text-xl lg:text-2xl mb-12 opacity-95"
            >
              GoAbroad Admissions connects students to international-quality education at top destinations worldwide including USA, UK, Canada, Australia, China, and more.
            </p>
            <div 
              v-motion
              :initial="{ opacity: 0, scale: 0.85, y: 30 }"
              :enter="{ opacity: 1, scale: 1, y: 0, transition: { delay: 600, duration: 600, type: 'spring', stiffness: 120 } }"
              class="flex flex-wrap gap-4 justify-center"
            >
              <button 
                @click="scrollToScholarships"
                class="group relative overflow-hidden bg-gradient-to-r from-purple-700 to-purple-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <span class="relative z-10 flex items-center gap-2">
                  <Trophy class="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Explore Scholarships
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <button 
                @click="openGoogleForm"
                class="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <span class="relative z-10 flex items-center gap-2">
                  <MessageSquare class="w-4 h-4" />
                  Request Assistance
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Scholarships + Contact Section -->
    <section id="scholarships-section" class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: -30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, type: 'spring' } }"
          class="text-center mb-12"
        >
          <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <GraduationCap class="w-4 h-4" />
            <span class="text-sm font-semibold">Scholarships Opportunities</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-4">
            Featured Scholarships
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Discover fully-funded opportunities to study at top universities worldwide
          </p>
          
          <!-- Source Badges with Motion -->
          
        </div>

        <!-- Two Column Layout -->
        <div class="flex flex-col lg:flex-row gap-8">
          
          <!-- LEFT COLUMN: Scholarships -->
          <div class="flex-1">
            
            <!-- Loading State -->
            <div 
              v-if="loading" 
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1 }"
              class="text-center py-20 bg-white rounded-2xl shadow-sm"
            >
              <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-700 mb-4"></div>
              <p class="text-gray-500 font-medium">Loading latest scholarships...</p>
            </div>
            
            <!-- Error State -->
            <div 
              v-else-if="error" 
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :enter="{ opacity: 1, scale: 1 }"
              class="text-center py-20 bg-red-50 rounded-2xl shadow-sm border border-red-200"
            >
              <AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p class="text-red-600 font-medium mb-4">{{ error }}</p>
              <button 
                @click="fetchAllScholarships" 
                class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2 mx-auto"
              >
                <RefreshCw class="w-4 h-4" />
                Refresh
              </button>
            </div>
            
            <!-- Scholarships Grid -->
            <div v-else-if="allScholarships.length > 0" class="space-y-6">
              <div 
                v-for="(scholarship, idx) in displayedScholarships" 
                :key="scholarship.id"
                v-motion
                :initial="{ opacity: 0, x: -80, y: 40 }"
                :enter="{ opacity: 1, x: 0, y: 0, transition: { delay: idx * 120, duration: 600, type: 'spring', stiffness: 100, damping: 12 } }"
                :while-hover="{ y: -8, scale: 1.02, transition: { duration: 300 } }"
                class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-purple-200"
                @click="openModal(scholarship)"
              >
                <div class="flex flex-col md:flex-row">
                  <!-- Scholarship Image -->
                  <div class="md:w-56 h-56 md:h-auto relative overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50">
                    <img 
                      :src="scholarship.image_url || scholarship.image" 
                      :alt="scholarship.title"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      @error="setDefaultImage"
                    >
                    <div class="absolute top-4 left-4 flex gap-2 transform transition-transform duration-300 group-hover:translate-y-0 -translate-y-2 opacity-0 group-hover:opacity-100">
                      <span class="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 animate-pulse">
                        <Trophy class="w-3 h-3" />
                        Fully Funded
                      </span>
                    </div>
                    <div class="absolute bottom-4 right-4">
                      <span 
                        class="text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-md shadow-lg transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100"
                        :class="scholarship.source === 'GoAbroad' ? 'bg-green-600/90' : 'bg-blue-600/90'"
                      >
                        <ExternalLink class="w-3 h-3" />
                        {{ scholarship.source }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Scholarship Content -->
                  <div class="flex-1 p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
                      {{ scholarship.title }}
                    </h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span 
                        v-motion
                        :initial="{ opacity: 0, scale: 0.8 }"
                        :enter="{ opacity: 1, scale: 1, transition: { delay: idx * 120 + 100, duration: 400 } }"
                        class="text-xs bg-gray-100 text-purple-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 hover:bg-purple-100 transition-colors"
                      >
                        <Globe class="w-3 h-3" />
                        {{ scholarship.country }}
                      </span>
                      <span 
                        v-motion
                        :initial="{ opacity: 0, scale: 0.8 }"
                        :enter="{ opacity: 1, scale: 1, transition: { delay: idx * 120 + 150, duration: 400 } }"
                        class="text-xs bg-gray-100 text-purple-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 hover:bg-purple-100 transition-colors"
                      >
                        <GraduationCap class="w-3 h-3" />
                        {{ scholarship.degree }}
                      </span>
                      <span 
                        v-if="scholarship.deadline || scholarship.date"
                        v-motion
                        :initial="{ opacity: 0, scale: 0.8 }"
                        :enter="{ opacity: 1, scale: 1, transition: { delay: idx * 120 + 200, duration: 400 } }"
                        class="text-xs bg-gray-100 text-purple-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 hover:bg-purple-100 transition-colors"
                      >
                        <Calendar class="w-3 h-3" />
                        {{ scholarship.deadline || scholarship.date }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                      {{ scholarship.cleanDescription || scholarship.description }}
                    </p>
                    <div 
                      v-motion
                      :initial="{ opacity: 0, y: 10 }"
                      :enter="{ opacity: 1, y: 0, transition: { delay: idx * 120 + 250, duration: 500 } }"
                      class="flex gap-3"
                    >
                      <button 
                        @click.stop="openModal(scholarship)"
                        class="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 group/btn"
                      >
                        <BookOpen class="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        Read More
                      </button>
                      <button 
                        @click.stop="openGoogleForm"
                        class="border-2 border-purple-600 text-purple-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-50 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 group/btn"
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
                class="text-center mt-8"
              >
                <router-link 
                  to="/scholarships"
                  class="group inline-flex items-center gap-3 text-purple-700 font-semibold hover:text-purple-800 transition-all duration-300 px-6 py-3 rounded-full hover:bg-purple-50"
                >
                  <span>View All Scholarships</span>
                  <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </router-link>
              </div>
            </div>
            
            <!-- No Scholarships State -->
            <div 
              v-else 
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :enter="{ opacity: 1, scale: 1 }"
              class="text-center py-20 bg-white rounded-2xl shadow-sm"
            >
              <BookOpen class="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500 font-medium">No scholarships available at the moment.</p>
              <p class="text-gray-400 text-sm mt-2">Please check back later.</p>
            </div>
          </div>

          <!-- RIGHT COLUMN: SidebarSection Component -->
          <div 
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 300, type: 'spring' } }"
            class="lg:w-96 flex-shrink-0"
          >
            <div class="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <SidebarSection :scholarships="allScholarships" @submit="handleSidebarSubmit" />
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
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, type: 'spring' } }"
          class="text-center mb-12"
        >
          <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Award class="w-4 h-4" />
            <span class="text-sm font-semibold">What We Offer</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-4">
            Our Comprehensive Services
          </h2>
          <p class="text-gray-500 max-w-3xl mx-auto text-base">
            End-to-end support for every step of your study abroad journey
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(service, index) in services" 
            :key="service.title"
            v-motion
            :initial="{ opacity: 0, y: 60, scale: 0.9 }"
            :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: index * 80, duration: 600, type: 'spring', stiffness: 80, damping: 10 } }"
            :while-hover="{ y: -12, scale: 1.05, transition: { duration: 300 } }"
            class="group bg-white p-8 rounded-2xl border-l-4 border-purple-600 shadow-md hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 cursor-pointer"
          >
            <div 
              v-motion
              :initial="{ scale: 0.8, rotate: -20 }"
              :enter="{ scale: 1, rotate: 0, transition: { delay: index * 80 + 100, duration: 500, type: 'spring', stiffness: 120 } }"
              class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
            >
              <component :is="service.iconComponent" class="w-7 h-7 text-purple-700" />
            </div>
            <h3 
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: index * 80 + 150, duration: 500 } }"
              class="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors"
            >
              {{ service.title }}
            </h3>
            <p 
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { delay: index * 80 + 200, duration: 500 } }"
              class="text-gray-500 text-sm leading-relaxed"
            >
              {{ service.description }}
            </p>
          </div>
        </div>

        <div 
          v-motion 
          :initial="{ opacity: 0, scale: 0.9 }" 
          :enter="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 500, type: 'spring' } }"
          class="text-center mt-12"
        >
          <button 
            @click="openGoogleForm"
            class="group relative overflow-hidden bg-gradient-to-r from-purple-700 to-purple-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <span class="relative z-10 flex items-center gap-2">
              <MessageSquare class="w-4 h-4" />
              Request Service Assistance
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </section>
<!-- FOUNDER MESSAGE SECTION -->
<section 
  id="founder" 
  class="py-16 relative overflow-hidden"
>
  <!-- Background Image Container -->
  <div class="absolute inset-0 w-full h-full">
    <img 
      src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
      alt="University campus background"
      class="w-full h-full object-cover"
    >
    <!-- Dark gradient overlay for text readability -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-900/85 to-purple-800/85"></div>
  </div>
  
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid md:grid-cols-[auto,1fr] gap-10 items-center max-w-5xl mx-auto">
      <div 
        v-motion
        :initial="{ opacity: 0, scale: 0, rotate: -180 }"
        :enter="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 200, duration: 1000, type: 'spring', stiffness: 60, damping: 8 } }"
        class="relative"
      >
        <div 
          v-motion
          :initial="{ scale: 0.8, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { delay: 400, duration: 600 } }"
          class="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-400/30 mx-auto md:mx-0 hover:shadow-yellow-400/50 transition-shadow duration-300"
        >
          <img src="https://i.postimg.cc/FzCwLMSw/img40.png" alt="Alexis Hakizimana" class="w-full h-full object-cover">
        </div>
        <div 
          v-motion
          :initial="{ scale: 0, rotate: 360 }"
          :enter="{ scale: 1, rotate: 0, transition: { delay: 600, duration: 600, type: 'spring', stiffness: 120 } }"
          class="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
        >
          <Quote class="w-5 h-5 text-purple-900" />
        </div>
      </div>
      <div 
        v-motion
        :initial="{ opacity: 0, x: 80, y: 40 }"
        :enter="{ opacity: 1, x: 0, y: 0, transition: { delay: 300, duration: 700, type: 'spring', stiffness: 80 } }"
        class="text-white"
      >
        <h2 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 500 } }"
          class="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2"
        >
          <MessageCircle class="w-6 h-6 text-yellow-400" />
          Message from the Founder
        </h2>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 550, duration: 600 } }"
          class="text-base mb-4 opacity-95 leading-relaxed"
        >
          "{{ founderText1TypedContent }}"
        </p>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 600 } }"
          class="text-base mb-4 opacity-95 leading-relaxed"
        >
          "{{ founderText2TypedContent }}"
        </p>
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 650, duration: 600 } }"
          class="flex items-center gap-3 mt-6 pt-4 border-t border-white/20 hover:border-white/40 transition-colors"
        >
          <div class="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
            <User class="w-6 h-6 text-purple-900" />
          </div>
          <div>
            <p class="font-bold text-yellow-400">Alexis Hakizimana</p>
            <p class="text-sm opacity-80">Founder & Education Consultant</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    <!-- Modal for Scholarship Details (NO "View Original Post" button) -->
    <div 
      v-if="modalVisible" 
      class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div 
        class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        @click.stop
        v-motion
        :initial="{ opacity: 0, scale: 0.9, y: 30 }"
        :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 400, type: 'spring', stiffness: 300 } }"
        :leave="{ opacity: 0, scale: 0.9, y: 30, transition: { duration: 200 } }"
      >
        <!-- Modal Header -->
        <div class="relative h-64 md:h-80 overflow-hidden">
          <img 
            :src="selectedScholarship?.image_url || selectedScholarship?.image" 
            :alt="selectedScholarship?.title"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <button 
            @click="closeModal"
            v-motion
            :initial="{ scale: 0.8, rotate: 90 }"
            :enter="{ scale: 1, rotate: 0, transition: { delay: 100, duration: 400, type: 'spring', stiffness: 150 } }"
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
                :class="selectedScholarship?.source === 'GoAbroad' ? 'bg-green-600/90' : 'bg-blue-600/90'"
              >
                <ExternalLink class="w-3 h-3" />
                {{ selectedScholarship?.source }}
              </span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold leading-tight">{{ selectedScholarship?.title }}</h2>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-8">
          <!-- Quick Info Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20, scale: 0.95 }"
              :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 200, duration: 400, type: 'spring', stiffness: 110 } }"
              class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group"
            >
              <Globe class="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p class="text-xs text-gray-600 font-medium">Country</p>
              <p class="text-sm font-bold text-purple-700 mt-1">{{ selectedScholarship?.country }}</p>
            </div>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20, scale: 0.95 }"
              :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 250, duration: 400, type: 'spring', stiffness: 110 } }"
              class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group"
            >
              <GraduationCap class="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p class="text-xs text-gray-600 font-medium">Degree</p>
              <p class="text-sm font-bold text-purple-700 mt-1">{{ selectedScholarship?.degree }}</p>
            </div>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20, scale: 0.95 }"
              :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 300, duration: 400, type: 'spring', stiffness: 110 } }"
              class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group"
            >
              <Calendar class="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p class="text-xs text-gray-600 font-medium">{{ selectedScholarship?.deadline ? 'Deadline' : 'Posted' }}</p>
              <p class="text-sm font-bold text-purple-700 mt-1">{{ selectedScholarship?.deadline || selectedScholarship?.date || 'Open' }}</p>
            </div>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20, scale: 0.95 }"
              :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 350, duration: 400, type: 'spring', stiffness: 110 } }"
              class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 group"
            >
              <Award class="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p class="text-xs text-gray-600 font-medium">Source</p>
              <p class="text-sm font-bold text-purple-700 mt-1">{{ selectedScholarship?.source }}</p>
            </div>
          </div>

          <!-- Full Description -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 500 } }"
            class="prose max-w-none mb-8"
          >
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen class="w-5 h-5 text-purple-700" />
              Scholarship Details
            </h3>
            
            <!-- Description -->
            <div class="mb-6">
              <h4 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <FileText class="w-4 h-4 text-purple-600" />
                Description
              </h4>
              <div class="text-gray-600 leading-relaxed" v-html="selectedScholarship?.formattedContent || selectedScholarship?.description"></div>
            </div>
            
            <!-- Eligibility (for GoAbroad scholarships) -->
            <div v-if="selectedScholarship?.eligibility" class="mb-6">
              <h4 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <CheckCircle class="w-4 h-4 text-green-600" />
                Eligibility Criteria
              </h4>
              <div class="text-gray-600 leading-relaxed" v-html="formatText(selectedScholarship?.eligibility)"></div>
            </div>
            
            <!-- Benefits (for GoAbroad scholarships) -->
            <div v-if="selectedScholarship?.benefits" class="mb-6">
              <h4 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <Gift class="w-4 h-4 text-yellow-600" />
                Benefits
              </h4>
              <div class="text-gray-600 leading-relaxed" v-html="formatText(selectedScholarship?.benefits)"></div>
            </div>
          </div>

          <!-- Action Buttons (NO "View Original Post" button) -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 450, duration: 500 } }"
            class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200"
          >
            <button 
              @click="openGoogleForm"
              v-motion
              :while-hover="{ scale: 1.05, transition: { duration: 200 } }"
              class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2 flex-1 group"
            >
              <MessageSquare class="w-4 h-4 group-hover:scale-110 transition-transform" />
              Request Assistance
            </button>
            <button 
              @click="closeModal"
              v-motion
              :while-hover="{ scale: 1.05, transition: { duration: 200 } }"
              class="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
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
import { useRouter } from 'vue-router'
import AppHeader from './AppHeader.vue'
import SidebarSection from './SidebarSection.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import axios from 'axios'

// Import all icons from lucide-vue-next
import { 
  Globe, GraduationCap, Trophy, Calendar, BookOpen, MessageSquare, X,
  Award, ExternalLink, AlertCircle, ArrowRight, Database, Rss, BarChart3,
  RefreshCw, Quote, MessageCircle, User, FileText, CheckCircle, Gift,
  Sparkles, Target, Heart, Star, Clock, MapPin, Mail, Phone, Briefcase,
  Users, Edit, FileCheck, Handshake, Lightbulb, TrendingUp, Shield, University
} from 'lucide-vue-next'

// Swiper modules
const SwiperAutoplay = Autoplay
const SwiperEffectFade = EffectFade

// API URL
const API_URL = 'https://newbackend-gamma.vercel.app/api'

// RSS Feed Configuration
const BLOG_URL = 'https://xmaopportunitiesportal.blogspot.com'
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`${BLOG_URL}/feeds/posts/default?alt=rss`)}`

// Services Data
const services = [
  { iconComponent: University, title: 'University Admissions', description: 'Strategic school selection, application preparation, and submission for universities worldwide with personalized guidance.' },
  { iconComponent: Award, title: 'Scholarship Applications', description: 'Full and partial scholarship applications with personalized strategy, essay development, and deadline management.' },
  { iconComponent: Edit, title: 'Essay Writing & Review', description: 'From scratch writing, editing, and professional review of SOPs, personal statements, and all application essays.' },
  { iconComponent: FileCheck, title: 'Document Preparation', description: 'SOP, research proposals, CV/resume, motivation letters, recommendation letters, transcripts, and portfolio preparation.' },
  { iconComponent: Handshake, title: 'Visa & Travel Support', description: 'Visa application assistance, flight bookings, accommodation arrangements, and pre-departure orientation.' },
  { iconComponent: Users, title: 'Interview Preparation', description: 'Mock interviews, coaching for university and scholarship interviews, and communication skills development.' }
]

// State
const loading = ref(true)
const error = ref(null)
const apiScholarships = ref([])
const rssScholarships = ref([])
const allScholarships = ref([])
const modalVisible = ref(false)
const selectedScholarship = ref(null)

// Founder Message Typewriter Animation
const founderText1 = "I founded GoAbroad Admissions with a clear mission: to help talented students access world-class education while eliminating financial barriers through scholarships. Having personally navigated the competitive admissions landscape and secured a fully-funded scholarship to Amherst College with a 3% acceptance rate, I understand the challenges students face."
const founderText2 = "My scholarship covered over $90,000 annually, including tuition, housing, meals, flights, and insurance. This transformative experience showed me that with the right guidance, any determined student can achieve similar success. At GoAbroad Admissions, we're committed to making that guidance accessible to everyone."

const founderText1TypedContent = ref('')
const founderText2TypedContent = ref('')

const typewriterText = (fullText, ref, startDelay = 0, typingSpeed = 30) => {
  let charIndex = 0
  const startTyping = () => {
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          ref.value += fullText[charIndex]
          charIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, typingSpeed)
    }, startDelay)
  }
  startTyping()
}
const apiScholarshipsCount = computed(() => apiScholarships.value.length)
const rssScholarshipsCount = computed(() => rssScholarships.value.length)
const displayedScholarships = computed(() => allScholarships.value.slice(0, 5))

// Helper Functions
function extractCountry(title) {
  const countries = { 'USA': 'United States', 'United States': 'United States', 'China': 'China', 'Hungary': 'Hungary', 'Saudi Arabia': 'Saudi Arabia', 'France': 'France', 'UK': 'United Kingdom', 'KAUST': 'Saudi Arabia', 'Australia': 'Australia', 'Canada': 'Canada', 'Germany': 'Germany', 'Japan': 'Japan', 'Korea': 'South Korea' }
  for (const [key, value] of Object.entries(countries)) {
    if (title.toUpperCase().includes(key.toUpperCase())) return value
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
  let clean = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  clean = clean.replace(/<[^>]*>/g, '')
  clean = clean.replace(/&nbsp;/g, ' ')
  clean = clean.replace(/&amp;/g, '&')
  const paragraphs = clean.split(/\n\s*\n/).filter(p => p.trim())
  let formatted = paragraphs.map(p => `<p class="mb-3">${p.trim()}</p>`).join('')
  if (!formatted) formatted = `<p>${clean.substring(0, 500)}</p>`
  return formatted
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

function getImageForCountry(country) {
  const images = {
    'USA': 'https://images.unsplash.com/photo-1627556704283-452301a45fd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNjaG9sYXJzaGlwfGVufDB8fDB8fHww',
    'United States': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop',
    'UK': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop',
    'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop',
    'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=500&fit=crop',
    'France': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop',
    'Canada': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    'Australia': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=500&fit=crop',
    'China': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=500&fit=crop',
    'Japan': 'https://images.unsplash.com/photo-1542051841853-5f900f0e6c6a?w=800&h=500&fit=crop',
    'South Korea': 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=500&fit=crop',
    'Hungary': 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800&h=500&fit=crop',
    'Saudi Arabia': 'https://images.unsplash.com/photo-1607013407627-6ee814329547?w=800&h=500&fit=crop',
    'International': 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=500&fit=crop'
  }
  return images[country] || images['International']
}

// Fetch scholarships
const fetchApiScholarships = async () => {
  try {
    const response = await axios.get(`${API_URL}/scholarships?status=active`)
    if (response.data && response.data.length > 0) {
      apiScholarships.value = response.data.map(scholarship => ({
        id: `api-${scholarship.id}`,
        title: scholarship.title,
        description: scholarship.description,
        eligibility: scholarship.eligibility,
        benefits: scholarship.benefits,
        country: scholarship.country,
        degree: scholarship.degree,
        deadline: scholarship.deadline ? `Deadline: ${new Date(scholarship.deadline).toLocaleDateString()}` : 'Rolling Deadline',
        rawDate: scholarship.created_at ? new Date(scholarship.created_at) : new Date(),
        link: scholarship.link,
        image_url: scholarship.image_url || getImageForCountry(scholarship.country),
        status: scholarship.status,
        featured: scholarship.featured === 1 || scholarship.featured === true,
        source: 'GoAbroad',
        cleanDescription: scholarship.description?.substring(0, 200) || '',
        formattedContent: scholarship.description
      }))
    }
  } catch (err) {
    console.warn('DB fetch error:', err.message)
    apiScholarships.value = []
  }
}

const fetchRssScholarships = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    const response = await fetch(RSS_API_URL, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!response.ok) throw new Error('Network error')
    const data = await response.json()
    if (!data.items || data.items.length === 0) throw new Error('No data received')
    const scholarshipsList = data.items.slice(0, 10).map((item, index) => {
      const title = item.title || 'Scholarship Opportunity'
      const country = extractCountry(title)
      return {
        id: `rss-${item.guid || index}`,
        title: title,
        description: cleanText(item.description || item.content || ''),
        cleanDescription: cleanText(item.description || item.content || ''),
        formattedContent: formatContent(item.content || item.description || ''),
        link: item.link,
        date: timeAgo(item.pubDate),
        rawDate: new Date(item.pubDate),
        country: country,
        degree: extractDegree(title),
        image: getImageForCountry(country),
        image_url: getImageForCountry(country),
        source: 'XMA Portal'
      }
    })
    rssScholarships.value = scholarshipsList
  } catch (err) {
    console.error('RSS Error:', err)
    rssScholarships.value = []
  }
}

const combineScholarships = () => {
  const all = [...apiScholarships.value, ...rssScholarships.value]
  const seenTitles = new Set()
  const unique = []
  for (const scholarship of all) {
    const titleKey = scholarship.title.toLowerCase().trim()
    if (!seenTitles.has(titleKey)) {
      seenTitles.add(titleKey)
      unique.push(scholarship)
    }
  }
  unique.sort((a, b) => b.rawDate - a.rawDate)
  allScholarships.value = unique
}

const fetchAllScholarships = async () => {
  loading.value = true
  error.value = null
  try {
    await Promise.all([fetchApiScholarships(), fetchRssScholarships()])
    combineScholarships()
    if (allScholarships.value.length === 0) error.value = 'No scholarships found from any source.'
  } catch (err) {
    error.value = 'Unable to load scholarships. Please try again.'
  } finally {
    loading.value = false
  }
}

const formatText = (text) => {
  if (!text) return ''
  return text.replace(/\n/g, '<br>')
}

const setDefaultImage = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop'
}

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

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) section.scrollIntoView({ behavior: 'smooth' })
}

const scrollToScholarships = () => scrollToSection('scholarships-section')

const openGoogleForm = () => {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSdel6b8-7EZ3nr1OleLs9bEony-WgymoLs1l0Dag0FyFxtSPQ/viewform', '_blank')
}

const handleSidebarSubmit = (formData) => {
  console.log('Form submitted from sidebar:', formData)
}

let refreshInterval = null
const startAutoRefresh = () => {
  if (refreshInterval) clearInterval(refreshInterval)
  refreshInterval = setInterval(() => {
    if (!modalVisible.value) fetchAllScholarships()
  }, 2 * 60 * 1000)
}

// Video fallback handler
const handleVideoError = (e) => {
  const fallback = document.getElementById('video-fallback')
  if (fallback) {
    fallback.classList.remove('hidden')
    e.target.style.display = 'none'
  }
}

onMounted(() => {
  fetchAllScholarships()
  startAutoRefresh()
  
  // Start typewriter animations for founder section
  // Delay for motion animations to complete: ~550ms for first text, then start typing
  typewriterText(founderText1, founderText1TypedContent, 1200, 25)
  // Second text starts after first text is mostly done: 1200ms + (3000ms typing) + stagger
  typewriterText(founderText2, founderText2TypedContent, 4500, 25)
  
  // Add video error handler
  const video = document.querySelector('video')
  if (video) {
    video.addEventListener('error', handleVideoError)
  }
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
  document.body.style.overflow = ''
  
  // Remove video error handler
  const video = document.querySelector('video')
  if (video) {
    video.removeEventListener('error', handleVideoError)
  }
})
</script>

<style scoped>
@keyframes zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes slideInTypewriter {
  from {
    width: 0;
    border-right: 3px solid rgba(250, 204, 21, 0.8);
  }
  to {
    width: 100%;
    border-right: none;
  }
}

.animate-zoom { animation: zoom 20s ease-in-out infinite alternate; }

.typewriter-text {
  position: relative;
  min-height: 1.5em;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
  line-height: 1.6;
}

.typewriter-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: rgba(250, 204, 21, 0.9);
  margin-left: 2px;
  animation: blink 1s infinite;
  vertical-align: middle;
}

.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.overflow-y-auto::-webkit-scrollbar { width: 8px; }
.overflow-y-auto::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 4px; }
.overflow-y-auto::-webkit-scrollbar-thumb { background: #8b5cf6; border-radius: 4px; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
::-webkit-scrollbar-thumb { background: #c084fc; border-radius: 3px; }
.prose { font-size: 0.95rem; line-height: 1.6; color: #374151; }
.prose p { margin-bottom: 1rem; }
* { transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
button { cursor: pointer; }
@media (max-width: 640px) { .container { padding-left: 1rem; padding-right: 1rem; } h1 { font-size: 1.5rem !important; } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin { animation: spin 1s linear infinite; }
.backdrop-blur-sm { backdrop-filter: blur(8px); }
.hover\:shadow-2xl:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.bg-gradient-to-r { background-size: 200% auto; transition: all 0.3s ease; }
.bg-gradient-to-r:hover { background-position: right center; }
</style>
