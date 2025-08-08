<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">
          <i data-feather="activity"></i>
          Change Readiness Assessment
        </h1>
        <div class="header-info" v-if="assessmentStore.currentRole">
          <span class="role-badge">{{ assessmentStore.currentRole }}</span>
        </div>
      </div>
    </header>

    <main class="app-main">
      <div class="container">
        <ProgressBar v-if="showProgress" />
        <router-view />
      </div>
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2025 Change Readiness Assessment. Professional organizational development tool.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'
import ProgressBar from '@/components/ProgressBar.vue'

const route = useRoute()
const assessmentStore = useAssessmentStore()

const showProgress = computed(() => {
  const progressRoutes = ['context', 'diagnosis', 'reflection', 'planning', 'export']
  return progressRoutes.includes(route.name)
})

onMounted(() => {
  // Initialize feather icons
  if (window.feather) {
    window.feather.replace()
  }
  
  // Load persisted data
  assessmentStore.loadFromStorage()
})
</script>
