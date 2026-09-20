<template>
  <div class="min-h-screen bg-gray-50">
    <section class="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-800 to-indigo-900 py-24 text-white">
      <div class="absolute inset-0 opacity-20" aria-hidden="true">
        <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-yellow-400 blur-3xl"></div>
        <div class="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-fuchsia-400 blur-3xl"></div>
      </div>
      <div class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p class="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">GoAbroad Admissions</p>
        <h1 class="text-4xl font-extrabold md:text-6xl">How can we help?</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-purple-100">Get practical support with scholarships, applications, admissions and your next study-abroad step.</p>
      </div>
    </section>

    <main class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid gap-6 md:grid-cols-3">
        <a href="mailto:goabroadadmissions@outlook.com" class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl">
          <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 group-hover:bg-purple-700 group-hover:text-white">
            <Mail class="h-6 w-6" />
          </div>
          <h2 class="text-lg font-bold text-gray-900">Email support</h2>
          <p class="mt-2 text-sm text-gray-600">Send questions and documents to our admissions team.</p>
          <span class="mt-4 block text-sm font-semibold text-purple-700">goabroadadmissions@outlook.com</span>
        </a>

        <a href="https://wa.me/250784173351" target="_blank" rel="noopener noreferrer" class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-xl">
          <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white">
            <MessageCircle class="h-6 w-6" />
          </div>
          <h2 class="text-lg font-bold text-gray-900">WhatsApp chat</h2>
          <p class="mt-2 text-sm text-gray-600">Chat with a member of our team for quick guidance.</p>
          <span class="mt-4 block text-sm font-semibold text-green-600">+250 784 173 351</span>
        </a>

        <a href="tel:+250785197380" class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
          <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white">
            <Phone class="h-6 w-6" />
          </div>
          <h2 class="text-lg font-bold text-gray-900">Call us</h2>
          <p class="mt-2 text-sm text-gray-600">Talk through your goals and application questions.</p>
          <span class="mt-4 block text-sm font-semibold text-blue-600">+250 785 197 380</span>
        </a>
      </div>

      <section class="mt-12 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <h2 class="text-2xl font-bold text-gray-900">Common support topics</h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="topic in topics" :key="topic.title" class="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <component :is="topic.icon" class="h-5 w-5 text-purple-700" />
            <h3 class="mt-3 font-semibold text-gray-900">{{ topic.title }}</h3>
            <p class="mt-1 text-sm leading-relaxed text-gray-600">{{ topic.description }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { Mail, MessageCircle, Phone, FileText, GraduationCap, Plane } from 'lucide-vue-next'

const topics = [
  { title: 'Scholarship search', description: 'Find opportunities that match your study level, destination and goals.', icon: GraduationCap },
  { title: 'Application review', description: 'Get help preparing your documents, essays and application timeline.', icon: FileText },
  { title: 'Visa and travel', description: 'Prepare for visa steps, departure planning and your arrival abroad.', icon: Plane }
]
</script>
