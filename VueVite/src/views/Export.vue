<template>
  <div class="export-view">
    <div class="content-section">
      <h1 class="section-title">Export Results</h1>
      <p class="section-description">
        Your change readiness assessment is complete. Export your results and action plan in your preferred format.
      </p>

      <div class="completion-summary">
        <div class="summary-card">
          <h2>Assessment Complete!</h2>
          <div class="summary-stats">
            <div class="stat-item">
              <i data-feather="user"></i>
              <span>Role: {{ assessmentStore.currentRole }}</span>
            </div>
            <div class="stat-item">
              <i data-feather="calendar"></i>
              <span>Completed: {{ formatDate(assessmentStore.assessmentData.metadata.completedAt) }}</span>
            </div>
            <div class="stat-item">
              <i data-feather="check-circle"></i>
              <span>Progress: {{ assessmentStore.progress }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="export-options">
        <h2 class="subsection-title">Export Options</h2>
        
        <div class="export-grid">
          <div class="export-card">
            <div class="export-header">
              <i data-feather="file-text"></i>
              <h3>PDF Report</h3>
            </div>
            <p>Comprehensive assessment report with recommendations and action plan.</p>
            <button @click="exportPDF" :disabled="isExporting" class="btn btn-primary">
              <i data-feather="download"></i>
              {{ isExporting ? 'Generating...' : 'Download PDF' }}
            </button>
          </div>

          <div class="export-card">
            <div class="export-header">
              <i data-feather="grid"></i>
              <h3>CSV Data</h3>
            </div>
            <p>Raw assessment data in spreadsheet format for further analysis.</p>
            <button @click="exportCSV" class="btn btn-primary">
              <i data-feather="download"></i>
              Download CSV
            </button>
          </div>

          <div class="export-card">
            <div class="export-header">
              <i data-feather="code"></i>
              <h3>JSON Data</h3>
            </div>
            <p>Complete assessment data in JSON format for system integration.</p>
            <button @click="exportJSON" class="btn btn-primary">
              <i data-feather="download"></i>
              Download JSON
            </button>
          </div>
        </div>
      </div>

      <div class="next-steps">
        <h2 class="subsection-title">Next Steps</h2>
        <div class="next-steps-content">
          <p>Now that you've completed your change readiness assessment:</p>
          <ul>
            <li>Review your action plan with key stakeholders</li>
            <li>Schedule regular progress reviews</li>
            <li>Begin implementing your priority actions</li>
            <li>Consider conducting follow-up assessments to track improvement</li>
          </ul>
        </div>
      </div>

      <div class="navigation-section">
        <button @click="goBack" class="btn btn-secondary">
          <i data-feather="arrow-left"></i>
          Back to Planning
        </button>
        
        <button @click="startNewAssessment" class="btn btn-outline">
          <i data-feather="refresh-cw"></i>
          Start New Assessment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'
import { exportToPDF, exportToCSV, exportToJSON } from '@/utils/exportUtils'

const router = useRouter()
const assessmentStore = useAssessmentStore()
const isExporting = ref(false)

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function exportPDF() {
  isExporting.value = true
  try {
    await exportToPDF(assessmentStore.assessmentData, assessmentStore.currentRole)
  } catch (error) {
    console.error('PDF export failed:', error)
    alert('PDF export failed. Please try again.')
  } finally {
    isExporting.value = false
  }
}

function exportCSV() {
  try {
    exportToCSV(assessmentStore.assessmentData, assessmentStore.currentRole)
  } catch (error) {
    console.error('CSV export failed:', error)
    alert('CSV export failed. Please try again.')
  }
}

function exportJSON() {
  try {
    exportToJSON(assessmentStore.assessmentData, assessmentStore.currentRole)
  } catch (error) {
    console.error('JSON export failed:', error)
    alert('JSON export failed. Please try again.')
  }
}

function goBack() {
  router.push('/planning')
}

function startNewAssessment() {
  if (confirm('Are you sure you want to start a new assessment? Current data will be lost.')) {
    assessmentStore.reset()
    router.push('/')
  }
}

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>
