<template>
  <div class="home-view">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Change Readiness Assessment</h1>
        <p class="hero-description">
          A comprehensive diagnostic tool to evaluate your organization's readiness for change. 
          This assessment helps identify strengths, challenges, and opportunities for successful transformation.
        </p>
        
        <div class="features-grid">
          <div class="feature-card">
            <i data-feather="users"></i>
            <h3>Role-Based Assessment</h3>
            <p>Tailored questions and insights for leadership, employees, and KVP teams.</p>
          </div>
          
          <div class="feature-card">
            <i data-feather="trending-up"></i>
            <h3>Comprehensive Analysis</h3>
            <p>Five core modules covering context, diagnosis, reflection, planning, and export.</p>
          </div>
          
          <div class="feature-card">
            <i data-feather="download"></i>
            <h3>Export Results</h3>
            <p>Generate detailed reports in multiple formats for stakeholder review.</p>
          </div>
        </div>

        <div class="cta-section">
          <router-link 
            :to="assessmentStore.currentRole ? '/context' : '/role-selection'" 
            class="btn btn-primary btn-large"
          >
            <i data-feather="arrow-right"></i>
            {{ assessmentStore.currentRole ? 'Continue Assessment' : 'Start Assessment' }}
          </router-link>
          
          <button 
            v-if="assessmentStore.currentRole" 
            @click="resetAssessment" 
            class="btn btn-secondary btn-large"
          >
            <i data-feather="refresh-cw"></i>
            Start Over
          </button>
        </div>

        <div v-if="assessmentStore.currentRole" class="current-progress">
          <p class="progress-text">Current Progress: {{ assessmentStore.progress }}% complete</p>
          <p class="role-text">Role: <strong>{{ assessmentStore.currentRole }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAssessmentStore } from '@/stores/assessment'

const assessmentStore = useAssessmentStore()

function resetAssessment() {
  if (confirm('Are you sure you want to start over? All progress will be lost.')) {
    assessmentStore.reset()
  }
}

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>
