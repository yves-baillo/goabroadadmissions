<template>
  <div>
    <AppHeader v-if="showLayout" />
    <router-view />
    <AppFooter v-if="showLayout" />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const showLayout = computed(() => {
  // Routes that should NOT show header/footer
  const noLayoutRoutes = ['/login', '/dashboard']
  return !noLayoutRoutes.includes(route.path)
})
</script>
