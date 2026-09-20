<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">

    <main>
      <!-- ============================= HERO ============================= -->
      <section id="home" class="relative h-screen min-h-[850px] -mt-20 overflow-hidden">
        <div class="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80"
            alt=""
            class="absolute inset-0 w-full h-full object-cover"
          />
          <video
            autoplay muted loop playsinline
            class="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
          >
            <source src="/90933-629483642_medium.mp4" type="video/mp4" />
          </video>
        </div>

        <div class="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/50"></div>

        <div class="relative z-10 h-full flex items-center justify-center text-white pt-24">
          <div class="container mx-auto px-4 text-center">
            <div class="max-w-4xl mx-auto mt-16 md:mt-20">
              <h1
                v-motion
                :initial="{ opacity: 0, y: -60, scale: 0.95 }"
                :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 200, duration: 1000, type: 'spring', stiffness: 60 } }"
                class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 leading-tight"
              >
                Do you dream about it?<br>
                <span class="text-yellow-400">We help you make your study abroad journey a reality!</span>
              </h1>

              <p
                v-motion
                :initial="{ opacity: 0, y: 40 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800, type: 'spring', stiffness: 100 } }"
                class="text-lg md:text-xl lg:text-2xl mb-12 opacity-95 max-w-3xl mx-auto"
              >
                GoAbroad Admissions connects students to international-quality education at top destinations
                worldwide including USA, UK, Canada, Australia, China, and more.
              </p>

              <div
                v-motion
                :initial="{ opacity: 0, scale: 0.85, y: 30 }"
                :enter="{ opacity: 1, scale: 1, y: 0, transition: { delay: 600, duration: 600, type: 'spring', stiffness: 120 } }"
                class="flex flex-wrap gap-4 justify-center"
              >
                <button
                  @click="scrollTo('scholarships-section')"
                  class="btn-sweep bg-gradient-to-r from-purple-700 to-purple-900 text-white px-8 py-3 rounded-full text-sm font-bold shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <span class="flex items-center gap-2">
                    <Trophy class="w-4 h-4" />
                    Explore Scholarships
                  </span>
                </button>
                <button
                  @click="openGoogleForm"
                  class="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <span class="flex items-center gap-2">
                    <MessageSquare class="w-4 h-4" />
                    Request Assistance
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================= SCHOLARSHIPS (enhanced motion) ============================= -->
      <section id="scholarships-section" class="py-20 bg-gradient-to-br from-gray-50 via-purple-50/20 to-gray-100 relative overflow-hidden">
        <!-- Ambient floating blobs -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="absolute -top-32 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float-slow"></div>
          <div class="absolute bottom-0 -left-32 w-96 h-96 bg-yellow-300/15 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <!-- Section header with staggered reveals -->
          <div class="text-center mb-14">
            <div
              v-motion
              :initial="{ opacity: 0, scale: 0.7, y: 20 }"
              :visible-once="{ opacity: 1, scale: 1, y: 0, transition: { duration: 600, type: 'spring', stiffness: 120 } }"
              class="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4"
            >
              <GraduationCap class="w-4 h-4" />
              <span class="text-sm font-semibold">Scholarships Opportunities</span>
            </div>

            <h2
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 150, duration: 700 } }"
              class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-4"
            >
              Featured Scholarships
            </h2>

            <p
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 300, duration: 600 } }"
              class="text-gray-600 max-w-2xl mx-auto"
            >
              Discover fully-funded opportunities to study at top universities worldwide
            </p>
          </div>

          <div class="flex flex-col lg:flex-row gap-8">
            <div class="flex-1 min-w-0">

              <!-- Loading -->
              <div
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                v-if="loading"
                class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-700 mb-4"></div>
                <p class="text-gray-500 font-medium">Loading latest scholarships...</p>
              </div>

              <!-- Error -->
              <div
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                v-else-if="error"
                class="text-center py-20 bg-red-50 rounded-2xl shadow-sm border border-red-200"
              >
                <AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p class="text-red-600 font-medium mb-4">{{ error }}</p>
                <button
                  @click="fetchScholarships"
                  class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition inline-flex items-center gap-2 mx-auto"
                >
                  <RefreshCw class="w-4 h-4" /> Refresh
                </button>
              </div>

              <!-- List with staggered card motion -->
              <div v-else-if="allScholarships.length > 0" class="space-y-6">
                <article
                  v-for="(scholarship, idx) in displayedScholarships"
                  :key="scholarship.id"
                  v-motion
                  :initial="{ opacity: 0, x: -80, y: 40, scale: 0.95 }"
                  :visible-once="{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    transition: {
                      delay: idx * 140,
                      duration: 700,
                      type: 'spring',
                      stiffness: 90,
                      damping: 14
                    }
                  }"
                  :hovered="{
                    y: -8,
                    scale: 1.01,
                    transition: { duration: 300, type: 'spring', stiffness: 250, damping: 20 }
                  }"
                  class="card-hover group bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden border border-gray-100 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/20 relative transition-shadow duration-500"
                  @click="openModal(scholarship)"
                >
                  <!-- Top accent that grows on hover -->
                  <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-yellow-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div class="flex flex-col md:flex-row">
                    <div class="md:w-56 h-56 md:h-auto relative overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50 flex-shrink-0">
                      <img
                        :src="scholarship.image || scholarship.image_url || fallbackImg"
                        :alt="scholarship.title"
                        loading="lazy"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        @error="setDefaultImage"
                      />
                      <!-- Image overlay on hover -->
                      <div class="absolute inset-0 bg-gradient-to-t from-purple-900/0 via-purple-900/0 to-purple-900/0 group-hover:from-purple-900/40 transition-all duration-500 pointer-events-none"></div>

                      <div class="absolute top-4 left-4">
                        <span class="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md inline-flex items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                          <Trophy class="w-3 h-3" /> Fully Funded
                        </span>
                      </div>

                      <div class="absolute bottom-4 right-4">
                        <span
                          class="text-white text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1 backdrop-blur-md shadow-lg group-hover:scale-105 transition-transform duration-300"
                          :class="scholarship.source === 'GoAbroad' ? 'bg-green-600/90' : 'bg-blue-600/90'"
                        >
                          <ExternalLink class="w-3 h-3" />
                          {{ scholarship.source || 'GoAbroad' }}
                        </span>
                      </div>
                    </div>

                    <div class="flex-1 p-6 min-w-0">
                      <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
                        {{ scholarship.title }}
                      </h3>

                      <div class="flex flex-wrap gap-2 mb-4">
                        <span class="text-xs bg-gray-100 text-purple-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 group-hover:bg-purple-50 group-hover:scale-105 transition-all duration-300">
                          <Globe class="w-3 h-3" /> {{ scholarship.country || '—' }}
                        </span>
                        <span class="text-xs bg-gray-100 text-purple-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 group-hover:bg-purple-50 group-hover:scale-105 transition-all duration-300">
                          <GraduationCap class="w-3 h-3" /> {{ scholarship.degree || '—' }}
                        </span>
                        <span v-if="scholarship.deadline" class="text-xs bg-gray-100 text-purple-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 group-hover:bg-purple-50 group-hover:scale-105 transition-all duration-300">
                          <Calendar class="w-3 h-3" /> {{ scholarship.deadline }}
                        </span>
                        <span class="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 group-hover:scale-105 transition-all duration-300">
                          <Eye class="w-3 h-3" /> {{ scholarship.views || 0 }}
                        </span>
                      </div>

                      <p class="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                        {{ scholarship.shortDetails || scholarship.description }}
                      </p>

                      <div class="flex flex-wrap gap-3">
                        <button
                          @click.stop="openModal(scholarship)"
                          class="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 hover:shadow-purple-500/30 transition-all duration-300 inline-flex items-center gap-2 group/btn"
                        >
                          <BookOpen class="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" /> Read More
                        </button>
                        <button
                          @click.stop="openGoogleForm"
                          class="border-2 border-purple-600 text-purple-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-50 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 group/btn2"
                        >
                          <MessageSquare class="w-4 h-4 group-hover/btn2:-rotate-12 transition-transform duration-300" /> Request Assistance
                        </button>
                      </div>
                    </div>
                  </div>
                </article>

                <!-- View All link with slide-in -->
                <div
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 600, duration: 600 } }"
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

              <!-- Empty -->
              <div
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                v-else
                class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <BookOpen class="w-20 h-20 text-gray-300 mx-auto mb-4 animate-bounce-slow" />
                <p class="text-gray-500 font-medium">No scholarships available at the moment.</p>
                <p class="text-gray-400 text-sm mt-2">Please check back later.</p>
              </div>
            </div>

            <!-- Sidebar with staggered motion -->
            <aside class="lg:w-96 flex-shrink-0">
              <div class="sticky top-24 space-y-6">

                <!-- Request card -->
                <div
                  v-motion
                  :initial="{ opacity: 0, x: 60, scale: 0.95 }"
                  :visible-once="{ opacity: 1, x: 0, scale: 1, transition: { delay: 200, duration: 700, type: 'spring', stiffness: 80 } }"
                  :hovered="{ y: -4, transition: { duration: 300, type: 'spring', stiffness: 250 } }"
                  class="bg-gradient-to-br from-purple-800 to-purple-950 text-white rounded-3xl p-7 shadow-2xl relative overflow-hidden group"
                >
                  <!-- Rotating decorative blob -->
                  <div class="absolute -top-16 -right-16 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl animate-float-slow pointer-events-none"></div>

                  <div class="relative">
                    <div
                      v-motion
                      :initial="{ opacity: 0, scale: 0, rotate: -180 }"
                      :visible-once="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 500, duration: 700, type: 'spring', stiffness: 120 } }"
                      :hovered="{ scale: 1.1, rotate: 8, transition: { duration: 250, type: 'spring', stiffness: 300 } }"
                      class="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center mb-4 shadow-lg shadow-yellow-400/40"
                    >
                      <Send class="w-6 h-6 text-purple-900" />
                    </div>

                    <h3 class="text-xl font-bold mb-2">Request Assistance</h3>
                    <p class="text-sm text-white/80 mb-5 leading-relaxed">
                      Tell us about your study goals and our consultants will match you with the right
                      scholarships and universities — free of charge.
                    </p>
                    <button
                      @click="openGoogleForm"
                      class="w-full bg-yellow-400 text-purple-900 font-bold py-3 rounded-xl hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-400/30 transition-all duration-300 inline-flex items-center justify-center gap-2 group/btn"
                    >
                      <ExternalLink class="w-4 h-4 group-hover/btn:scale-110 transition-transform" /> Open Request Form
                    </button>
                  </div>
                </div>

                <!-- Destinations card -->
                <div
                  v-motion
                  :initial="{ opacity: 0, x: 60 }"
                  :visible-once="{ opacity: 1, x: 0, transition: { delay: 400, duration: 700 } }"
                  :hovered="{ y: -4, transition: { duration: 300, type: 'spring', stiffness: 250 } }"
                  class="bg-white rounded-3xl p-7 shadow-lg border border-gray-100 group"
                >
                  <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Globe class="w-4 h-4 text-purple-700 group-hover:rotate-12 transition-transform duration-300" /> Popular Destinations
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(c, ci) in ['USA','UK','Canada','Australia','China','Germany','Turkey','Rwanda']"
                      :key="c"
                      v-motion
                      :initial="{ opacity: 0, scale: 0.7 }"
                      :visible-once="{ opacity: 1, scale: 1, transition: { delay: 500 + ci * 60, duration: 400, type: 'spring', stiffness: 200 } }"
                      :hovered="{ scale: 1.15, y: -2, transition: { duration: 200, type: 'spring', stiffness: 400 } }"
                      class="text-xs bg-gray-100 text-purple-700 px-3 py-1.5 rounded-full font-medium cursor-pointer hover:bg-purple-100 transition-colors duration-300"
                    >{{ c }}</span>
                  </div>
                </div>

                <!-- Contact card -->
                <div
                  v-motion
                  :initial="{ opacity: 0, x: 60 }"
                  :visible-once="{ opacity: 1, x: 0, transition: { delay: 600, duration: 700 } }"
                  :hovered="{ y: -4, transition: { duration: 300, type: 'spring', stiffness: 250 } }"
                  class="bg-white rounded-3xl p-7 shadow-lg border border-gray-100 group"
                >
                  <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Phone class="w-4 h-4 text-purple-700 group-hover:rotate-12 transition-transform duration-300" /> Talk To Us
                  </h3>
                  <ul class="space-y-3 text-sm text-gray-600">
                    <li class="flex items-center gap-2 hover:text-purple-600 transition-colors cursor-pointer">
                      <Mail class="w-4 h-4 text-purple-600" /> info@goabroad-admissions.com
                    </li>
                    <li class="flex items-center gap-2 hover:text-purple-600 transition-colors cursor-pointer">
                      <Phone class="w-4 h-4 text-purple-600" /> +250 788 000 000
                    </li>
                    <li class="flex items-center gap-2 hover:text-purple-600 transition-colors cursor-pointer">
                      <MapPin class="w-4 h-4 text-purple-600" /> Kigali, Rwanda
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <!-- ============================= SERVICES ============================= -->
      <section id="services" class="py-20 bg-gradient-to-br from-gray-50 via-purple-50/30 to-yellow-50/20 relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="absolute -top-32 -left-32 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-0 -right-32 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
            class="text-center mb-14"
          >
            <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
              <Award class="w-4 h-4" />
              <span class="text-sm font-semibold">What We Offer</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-4">
              Our Comprehensive Services
            </h2>
            <p class="text-gray-500 max-w-3xl mx-auto">
              End-to-end support for every step of your study and work abroad journey
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(service, index) in services"
              :key="service.title"
              v-motion
              :initial="{ opacity: 0, y: 80, scale: 0.9 }"
              :visible-once="{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: 150 + index * 90,
                  duration: 700,
                  type: 'spring',
                  stiffness: 90,
                  damping: 14
                }
              }"
              :hovered="{
                y: -10,
                scale: 1.03,
                transition: { duration: 250, type: 'spring', stiffness: 300, damping: 20 }
              }"
              class="service-card group relative bg-white p-8 rounded-2xl border-l-4 border-purple-600 shadow-md hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/[0.06] via-purple-500/[0.04] to-yellow-400/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div class="absolute top-6 right-6 text-4xl font-black text-purple-100 group-hover:text-purple-200 transition-colors duration-300 select-none">
                {{ String(index + 1).padStart(2, '0') }}
              </div>

              <div class="relative">
                <div
                  v-motion
                  :hovered="{ scale: 1.15, rotate: -8, transition: { duration: 250, type: 'spring', stiffness: 400, damping: 15 } }"
                  class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-5 group-hover:from-purple-200 group-hover:to-yellow-100 transition-all duration-500 shadow-sm"
                >
                  <component :is="service.icon" class="w-7 h-7 text-purple-700" />
                </div>

                <h3 class="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                  {{ service.title }}
                </h3>
                <p class="text-gray-500 text-sm leading-relaxed">
                  {{ service.description }}
                </p>

                <div class="mt-5 h-1 w-8 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-full transition-all duration-500 group-hover:w-full"></div>
              </div>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            class="text-center mt-14"
          >
            <button
              @click="openGoogleForm"
              class="btn-sweep bg-gradient-to-r from-purple-700 to-purple-900 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span class="flex items-center gap-2">
                <MessageSquare class="w-4 h-4" /> Request Service Assistance
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- ============================= FOUNDER ============================= -->
      <section id="founder" class="py-20 relative overflow-hidden">
        <div class="absolute inset-0 w-full h-full">
          <img
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
            alt="University campus"
            class="w-full h-full object-cover scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-900/90 to-purple-800/85"></div>

          <div class="absolute top-20 left-10 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-float-slow pointer-events-none"></div>
          <div class="absolute bottom-10 right-20 w-80 h-80 bg-yellow-400/15 rounded-full blur-3xl animate-float-delayed pointer-events-none"></div>
          <div class="absolute top-1/2 left-1/3 w-40 h-40 bg-fuchsia-400/10 rounded-full blur-2xl animate-float pointer-events-none"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid md:grid-cols-[auto,1fr] gap-12 items-center max-w-5xl mx-auto">
            <div class="relative flex justify-center md:justify-start">
              <div
                v-motion
                :initial="{ opacity: 0, scale: 0.6, rotate: -90 }"
                :visible-once="{ opacity: 0.4, scale: 1, rotate: 0, transition: { delay: 200, duration: 1200, type: 'spring', stiffness: 60, damping: 12 } }"
                class="absolute inset-0 m-auto w-56 h-56 md:w-64 md:h-64 rounded-full border-2 border-dashed border-yellow-400/40 animate-spin-slow pointer-events-none"
              ></div>

              <div class="absolute inset-0 m-auto w-52 h-52 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-yellow-400/20 to-purple-500/20 blur-2xl animate-pulse-gentle pointer-events-none"></div>

              <div
                v-motion
                :initial="{ opacity: 0, scale: 0, rotate: -180 }"
                :visible-once="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 300, duration: 1000, type: 'spring', stiffness: 60, damping: 8 } }"
                class="relative"
              >
                <div
                  v-motion
                  :hovered="{ scale: 1.05, transition: { duration: 300, type: 'spring', stiffness: 300 } }"
                  class="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-400/40 hover:shadow-yellow-400/70 transition-shadow duration-500"
                >
                  <img src="https://i.postimg.cc/FzCwLMSw/img40.png" alt="Alexis Hakizimana" class="w-full h-full object-cover" />
                </div>

                <div
                  v-motion
                  :initial="{ opacity: 0, scale: 0, y: -20 }"
                  :visible-once="{ opacity: 1, scale: 1, y: 0, transition: { delay: 900, duration: 500, type: 'spring', stiffness: 200, damping: 10 } }"
                  class="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-3 shadow-xl shadow-yellow-400/50 animate-bounce-slow"
                >
                  <Quote class="w-5 h-5 text-purple-900" />
                </div>
              </div>
            </div>

            <div class="text-white">
              <h2
                v-motion
                :initial="{ opacity: 0, x: 60 }"
                :visible-once="{ opacity: 1, x: 0, transition: { delay: 400, duration: 700, type: 'spring', stiffness: 80 } }"
                class="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3"
              >
                <MessageCircle class="w-7 h-7 text-yellow-400 animate-wiggle" />
                Message from the Founder
              </h2>

              <p
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: 600, duration: 700 } }"
                class="text-base md:text-lg mb-5 opacity-95 leading-relaxed min-h-[72px]"
                :class="{ 'cursor-blink': typing1 }"
              >
                {{ founderText1 }}
              </p>

              <p
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: 800, duration: 700 } }"
                class="text-base md:text-lg mb-5 opacity-95 leading-relaxed min-h-[72px]"
                :class="{ 'cursor-blink': typing2 }"
              >
                {{ founderText2 }}
              </p>

              <div
                v-motion
                :initial="{ opacity: 0, y: 40 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: 1100, duration: 600, type: 'spring', stiffness: 80 } }"
                class="relative flex items-center gap-4 mt-8 pt-6"
              >
                <div
                  v-motion
                  :initial="{ scaleX: 0 }"
                  :visible-once="{ scaleX: 1, transition: { delay: 1200, duration: 800, ease: 'easeOut' } }"
                  class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-yellow-400 via-yellow-400/50 to-transparent origin-left"
                ></div>

                <div
                  v-motion
                  :hovered="{ scale: 1.1, rotate: 8, transition: { duration: 250, type: 'spring', stiffness: 300 } }"
                  class="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/40"
                >
                  <User class="w-7 h-7 text-purple-900" />
                </div>

                <div>
                  <p class="font-bold text-yellow-400 text-lg">Alexis Hakizimana</p>
                  <p class="text-sm opacity-80">Founder &amp; Education Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================= TEAM ============================= -->
      <section id="team" class="py-24 bg-gradient-to-br from-purple-100 via-purple-50 to-yellow-100 overflow-hidden relative">
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="absolute -top-24 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-float-slow"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-300/25 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center mb-16">
            <div
              v-motion
              :initial="{ opacity: 0, scale: 0.7, y: 20 }"
              :visible-once="{ opacity: 1, scale: 1, y: 0, transition: { duration: 600, type: 'spring', stiffness: 120 } }"
              class="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-2.5 rounded-full mb-5 shadow-lg shadow-purple-700/30"
            >
              <Users class="w-4 h-4" />
              <span class="text-sm font-semibold tracking-wide">Our People</span>
            </div>

            <h2
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 150, duration: 700 } }"
              class="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-800 via-purple-700 to-purple-950 bg-clip-text text-transparent mb-5"
            >
              Meet Our Team
            </h2>

            <p
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 300, duration: 600 } }"
              class="text-purple-900/75 max-w-2xl mx-auto text-lg"
            >
              A dedicated team of consultants ready to guide you at every step of your journey
            </p>
          </div>
        </div>

        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-purple-100 to-transparent z-20"></div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-yellow-100 to-transparent z-20"></div>

          <div class="team-marquee flex gap-8 py-6">
            <template v-for="loop in 2" :key="'loop-' + loop">
              <div
                v-for="member in teamMembers"
                :key="'m-' + loop + '-' + member.name"
                v-motion
                :hovered="{
                  y: -12,
                  scale: 1.04,
                  transition: { duration: 300, type: 'spring', stiffness: 300, damping: 20 }
                }"
                class="team-card group relative bg-white/90 backdrop-blur-sm rounded-3xl p-7 text-center shadow-xl border-2 border-purple-200/60 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer flex flex-col transition-all duration-500 overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-yellow-400/0 group-hover:from-purple-500/[0.06] group-hover:via-purple-500/[0.04] group-hover:to-yellow-400/[0.08] transition-all duration-500 pointer-events-none rounded-3xl"></div>

                <div class="relative w-32 h-32 mx-auto mb-6">
                  <div
                    class="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></div>

                  <div class="absolute -inset-2 rounded-full border-2 border-dashed border-purple-400/0 group-hover:border-purple-400/40 transition-all duration-500 group-hover:animate-spin-slow"></div>

                  <div class="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      :src="member.image"
                      :alt="member.name"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div class="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-purple-900 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-100">
                    <Sparkles class="w-4 h-4" />
                  </div>
                </div>

                <h3
                  class="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300 group-hover:-translate-y-0.5"
                >
                  {{ member.name }}
                </h3>

                <p class="text-sm font-semibold text-purple-600 mt-1.5 leading-snug transition-colors duration-300 group-hover:text-purple-700">
                  {{ member.role }}
                </p>

                <p class="text-xs text-gray-500 mt-4 leading-relaxed flex-1 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {{ member.bio }}
                </p>

                <div v-if="member.socials.length" class="flex justify-center gap-2 mt-5">
                  <a
                    v-for="(social, sIdx) in member.socials"
                    :key="social.name"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    v-motion
                    :initial="{ opacity: 0, scale: 0 }"
                    :visible-once="{ opacity: 1, scale: 1, transition: { delay: sIdx * 100, duration: 300, type: 'spring', stiffness: 200 } }"
                    :hovered="{ scale: 1.2, rotate: 8, transition: { duration: 250, type: 'spring', stiffness: 400 } }"
                    class="w-9 h-9 rounded-full bg-purple-50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-800 text-purple-600 hover:text-white flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-300"
                    :title="social.name"
                  >
                    <component :is="social.icon" class="w-4 h-4" />
                  </a>
                </div>

                <div class="mt-5 h-[3px] w-10 mx-auto bg-gradient-to-r from-purple-600 to-yellow-400 rounded-full transition-all duration-500 group-hover:w-24"></div>
              </div>
            </template>
          </div>
        </div>
      </section>
    </main>

    <!-- ============================= MODAL ============================= -->
    <transition name="modal">
      <div
        v-if="modalVisible && selectedScholarship"
        class="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          @click.stop
        >
          <div class="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
            <img :src="selectedScholarship.image || selectedScholarship.image_url || fallbackImg" :alt="selectedScholarship.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <button
              @click="closeModal"
              class="absolute top-5 right-5 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <X class="w-5 h-5 text-white" />
            </button>
            <div class="absolute bottom-6 left-6 right-6 text-white">
              <div class="flex flex-wrap gap-3 mb-3">
                <span class="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-lg">
                  <Trophy class="w-3 h-3" /> Fully Funded
                </span>
                <span
                  class="text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-lg backdrop-blur-md"
                  :class="selectedScholarship.source === 'GoAbroad' ? 'bg-green-600/90' : 'bg-blue-600/90'"
                >
                  <ExternalLink class="w-3 h-3" />
                  {{ selectedScholarship.source || 'GoAbroad' }}
                </span>
                <span class="text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-lg backdrop-blur-md bg-black/50">
                  <Eye class="w-3 h-3" />
                  {{ selectedScholarship.views || 0 }}
                </span>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold leading-tight">{{ selectedScholarship.title }}</h2>
            </div>
          </div>

          <div class="p-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div class="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <Globe class="w-5 h-5 text-purple-700 mx-auto mb-2" />
                <p class="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Country</p>
                <p class="text-sm font-bold text-gray-800 mt-1">{{ selectedScholarship.country || '—' }}</p>
              </div>
              <div class="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <GraduationCap class="w-5 h-5 text-purple-700 mx-auto mb-2" />
                <p class="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Degree</p>
                <p class="text-sm font-bold text-gray-800 mt-1">{{ selectedScholarship.degree || '—' }}</p>
              </div>
              <div class="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <Calendar class="w-5 h-5 text-purple-700 mx-auto mb-2" />
                <p class="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Deadline</p>
                <p class="text-sm font-bold text-gray-800 mt-1">{{ selectedScholarship.deadline || '—' }}</p>
              </div>
              <div class="bg-yellow-50 rounded-2xl p-4 text-center border border-yellow-100">
                <Eye class="w-5 h-5 text-yellow-700 mx-auto mb-2" />
                <p class="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Views</p>
                <p class="text-sm font-bold text-yellow-700 mt-1">{{ selectedScholarship.views || 0 }}</p>
              </div>
            </div>

            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen class="w-5 h-5 text-purple-700" /> Full Details
              </h3>
              <p class="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
                {{ selectedScholarship.fullDetails || selectedScholarship.description || selectedScholarship.shortDetails || 'No further details provided.' }}
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                @click="openGoogleForm"
                class="flex-1 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <MessageSquare class="w-4 h-4" /> Request Assistance
              </button>
              <button
                @click="closeModal"
                class="px-6 py-3.5 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import {
  MessageSquare, X, Trophy, GraduationCap, Globe,
  Calendar, ArrowRight, BookOpen, ExternalLink, AlertCircle,
  RefreshCw, Send, Award, Quote, MessageCircle, User, Mail, Phone, MapPin,
  Users, Sparkles,
  FileText, Plane, Home, Briefcase,
  Linkedin,
  FileCheck, Hotel, UserCheck, CreditCard, Eye
} from 'lucide-vue-next'
import { readDatabase, updateDatabase } from '../lib/jsonbin'

/* ==================================================================
   CONFIG
   ================================================================== */
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/'
const FALLBACK_IMG    = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'

/* ============================ STATE ============================ */
const loading = ref(true)
const error = ref(null)
const allScholarships = ref([])
const modalVisible = ref(false)
const selectedScholarship = ref(null)
const fallbackImg = FALLBACK_IMG

const typing1 = ref(false)
const typing2 = ref(false)
const founderText1 = ref('')
const founderText2 = ref('')

const FOUNDER_TEXT_1 = 'When I started GoAbroad Admissions, I had one goal: to make world-class education accessible to every ambitious student, no matter where they come from. I have walked this road myself — I know how confusing the applications, the deadlines and the visa process can feel.'
const FOUNDER_TEXT_2 = 'Our team walks with you from your very first question to your visa approval: scholarships, university applications, essays, interviews and pre-departure preparation. Your dream is our mission.'

/* ============================ VIEW TRACKING ============================ */
const VIEWED_KEY = 'goabroad_viewed_scholarships'

function hasViewed(id) {
  try {
    const raw = localStorage.getItem(VIEWED_KEY)
    const ids = raw ? JSON.parse(raw) : []
    return Array.isArray(ids) && ids.includes(id)
  } catch {
    return false
  }
}

function markViewed(id) {
  try {
    const raw = localStorage.getItem(VIEWED_KEY)
    const ids = raw ? JSON.parse(raw) : []
    const list = Array.isArray(ids) ? ids : []
    if (!list.includes(id)) {
      list.push(id)
      localStorage.setItem(VIEWED_KEY, JSON.stringify(list.slice(-500)))
    }
  } catch {}
}

const incrementViews = async (scholarshipId) => {
  const idx = allScholarships.value.findIndex(s => s.id === scholarshipId)
  if (idx === -1) return

  allScholarships.value[idx].views = (allScholarships.value[idx].views || 0) + 1

  try {
    await updateDatabase((db) => ({
      ...db,
      scholarships: (db.scholarships || []).map(s =>
        s.id === scholarshipId ? { ...s, views: (s.views || 0) + 1 } : s
      )
    }))
  } catch (err) {
    console.warn('[views] Failed to save view count:', err)
    allScholarships.value[idx].views = Math.max(0, (allScholarships.value[idx].views || 1) - 1)
  }
}

/* ============================ SERVICES ============================ */
const services = [
  { icon: Trophy,    title: 'Scholarship Search and Application', description: 'We help you find and apply for fully-funded and partial scholarships worldwide that match your profile.' },
  { icon: FileCheck, title: 'Visa Guidance and Application',      description: 'Complete visa filing support, document preparation and interview coaching for your destination country.' },
  { icon: Plane,     title: 'Booking Flight Tickets',             description: 'Affordable and student-friendly flight booking to your study or work destination.' },
  { icon: Hotel,     title: 'Hotel and Accommodation Booking',    description: 'Short-term hotels and long-term housing to settle into your new city smoothly.' },
  { icon: Briefcase, title: 'Work Abroad',                        description: 'Assistance finding legitimate work opportunities abroad with visa sponsorship and relocation support.' },
  { icon: Users,     title: 'Career Counseling',                  description: 'One-on-one guidance to align your studies and career path with long-term goals.' },
  { icon: FileText,  title: 'Document Processing',                description: 'Filing, attestation and processing of all required academic and personal documents.' },
  { icon: UserCheck, title: 'Career Services',                    description: 'CV/Resume preparation, interview coaching, job applications and internship placement support.' },
  { icon: CreditCard,title: 'International Money Transfer',       description: 'Safe and cost-effective international money transfers for tuition, living costs and more.' },
  { icon: Globe,     title: 'Migration / Relocation Guidance',    description: 'End-to-end support for relocating abroad — housing, banking, registration and settling in.' }
]

/* ============================ TEAM ============================ */
const teamMembers = [
  {
    name: 'Alexis Hakizimana',
    role: 'Managing Director',
    bio: 'Junior at Parami University, USA — BA in Philosophy & Economics. Equity Leaders Program beneficiary and college counseling mentor who has mentored 4 students into fully funded scholarships abroad.',
    image: 'https://i.postimg.cc/FzCwLMSw/img40.png',
    socials: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/goabroad-admissions-361873399/', icon: Linkedin }
    ]
  },
  {
    name: 'Jimmy Muhawenimana',
    role: 'Director of Operations',
    bio: 'Final year Pharmacy student at the University of Rwanda. President of Equity Leadership Huye Chapter, Aspire Leaders Program Alumni and Millennium Campus Network Fellow.',
    image: 'https://i.postimg.cc/s2xSF3Xr/Whats-App-Image-2026-09-20-at-7-25-57-PM.jpg',
    socials: [
      { name: 'LinkedIn', url: '#', icon: Linkedin }
    ]
  },
  {
    name: 'Valens Iraguha',
    role: 'Deputy Director for Special Projects and Student Affairs',
    bio: 'Final year medical student at the University of Rwanda. Member of the Medical Students Association (MEDSAR) and special adviser to the president of MEDSAR.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80',
    socials: [
      { name: 'LinkedIn', url: '#', icon: Linkedin }
    ]
  },
  {
    name: 'Themistocles Ntaganira',
    role: 'Mentor',
    bio: 'Junior at Wesleyan University, USA pursuing a BA. Alumni and mentor of the Equity College Counseling Program. Has helped 10+ students access local and international scholarships. Currently IT Services Specialist at Wesleyan University and part-time mentor at GoAbroad Admissions.',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&q=80',
    socials: [
      { name: 'LinkedIn', url: '#', icon: Linkedin }
    ]
  }
]

/* ============================ COMPUTED ============================ */
const displayedScholarships = computed(() => allScholarships.value.slice(0, 4))

/* ============================ ACTIONS ============================ */
function scrollTo(id) {
  const target = document.getElementById(id)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openGoogleForm() {
  window.open(GOOGLE_FORM_URL, '_blank', 'noopener')
}

function setDefaultImage(e) {
  e.target.onerror = null
  e.target.src = FALLBACK_IMG
}

function openModal(scholarship) {
  selectedScholarship.value = scholarship
  modalVisible.value = true
  document.body.style.overflow = 'hidden'

  if (scholarship?.id && !hasViewed(scholarship.id)) {
    markViewed(scholarship.id)
    incrementViews(scholarship.id)
  }
}

function closeModal() {
  modalVisible.value = false
  selectedScholarship.value = null
  document.body.style.overflow = ''
}

/* ============================ STORAGE ============================ */
async function fetchScholarships() {
  loading.value = true
  error.value = null

  try {
    const database = await readDatabase()
    const list = Array.isArray(database.scholarships) ? database.scholarships : []
    allScholarships.value = list.filter(s => (s.status || 'active') === 'active')
  } catch (err) {
    console.error('[Storage]', err)
    error.value = err.message || 'Unable to load scholarships.'
    allScholarships.value = []
  } finally {
    loading.value = false
  }
}

/* ============================ MOTION HELPERS ============================ */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

async function startFounderTyping() {
  if (prefersReduced) {
    founderText1.value = FOUNDER_TEXT_1
    founderText2.value = FOUNDER_TEXT_2
    return
  }
  if (typing1.value || typing2.value || founderText1.value) return

  typing1.value = true
  for (let i = 0; i <= FOUNDER_TEXT_1.length; i++) {
    founderText1.value = FOUNDER_TEXT_1.slice(0, i)
    await new Promise((r) => setTimeout(r, 14))
  }
  typing1.value = false
  typing2.value = true
  for (let i = 0; i <= FOUNDER_TEXT_2.length; i++) {
    founderText2.value = FOUNDER_TEXT_2.slice(0, i)
    await new Promise((r) => setTimeout(r, 14))
  }
  typing2.value = false
}

/* ============================ LIFECYCLE ============================ */
function handleScroll() {
  const founder = document.getElementById('founder')
  if (founder) {
    const rect = founder.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) startFounderTyping()
  }
}

function handleKey(e) {
  if (e.key === 'Escape') closeModal()
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleKey)

  await fetchScholarships()
  nextTick(() => {
    handleScroll()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
[data-motion] { will-change: transform, opacity; }

.card-hover {
  transition: transform 0.3s cubic-bezier(.22, 1, .36, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-8px) scale(1.015);
  box-shadow: 0 28px 50px -18px rgba(109, 40, 217, 0.35);
}

.service-card {
  transition: box-shadow 0.4s ease, border-color 0.4s ease;
}

.btn-sweep { position: relative; overflow: hidden; }
.btn-sweep > span { position: relative; z-index: 2; }
.btn-sweep::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateY(100%);
  background: linear-gradient(to right, #7c3aed, #5b21b6);
  transition: transform 0.35s cubic-bezier(.22, 1, .36, 1);
  z-index: 1;
}
.btn-sweep:hover::after { transform: translateY(0); }

.cursor-blink::after {
  content: '|';
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }

/* ============ ANIMATION KEYFRAMES ============ */
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(30px, -30px) scale(1.1); }
}
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
  50%      { transform: translate(40px, -40px) scale(1.15); opacity: 0.25; }
}
@keyframes float-delayed {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
  50%      { transform: translate(-50px, -30px) scale(1.1); opacity: 0.22; }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(-8deg); }
  75%      { transform: rotate(8deg); }
}
@keyframes pulse-gentle {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50%      { opacity: 0.6; transform: scale(1.08); }
}

.animate-float { animation: float 14s ease-in-out infinite; }
.animate-float-slow { animation: float-slow 16s ease-in-out infinite; }
.animate-float-delayed { animation: float-delayed 18s ease-in-out infinite; }
.animate-spin-slow { animation: spin-slow 20s linear infinite; }
.animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }
.animate-wiggle { animation: wiggle 3s ease-in-out infinite; }
.animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }

.modal-enter-active,
.modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }

.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

/* ============ TEAM MARQUEE ============ */
.team-marquee {
  display: flex;
  width: max-content;
  animation: team-scroll 44s linear infinite;
}
.team-marquee:hover { animation-play-state: paused; }
.team-card { width: 300px; flex-shrink: 0; }

@keyframes team-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (max-width: 640px) {
  .team-marquee { animation-duration: 30s; }
  .team-card { width: 260px; }
}

@media (prefers-reduced-motion: reduce) {
  .team-marquee,
  .animate-float,
  .animate-float-slow,
  .animate-float-delayed,
  .animate-spin-slow,
  .animate-bounce-slow,
  .animate-wiggle,
  .animate-pulse-gentle { animation: none !important; }

  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
</style>