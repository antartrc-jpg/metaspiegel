<template>
  <div class="reflection-view">
    <div class="content-section">
      <h1 class="section-title">Reflection & Analysis</h1>
      <p class="section-description">
        Reflect on the assessment results and identify key insights for your change initiative.
      </p>

      <div class="insights-section" v-if="diagnosticInsights.length > 0">
        <h2 class="subsection-title">Diagnostic Insights</h2>
        <div class="insights-grid">
          <div 
            v-for="insight in diagnosticInsights" 
            :key="insight.dimension"
            class="insight-card"
            :class="`insight-${insight.level}`"
          >
            <div class="insight-header">
              <h3>{{ insight.dimension }}</h3>
              <span class="insight-score">{{ insight.score }}/5</span>
            </div>
            <p class="insight-status">{{ insight.status }}</p>
            <ul class="insight-recommendations">
              <li v-for="rec in insight.recommendations" :key="rec">{{ rec }}</li>
            </ul>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitReflection" class="assessment-form">
        <QuestionGroup title="Key Reflections">
          <FormField
            label="What are your main takeaways from the diagnostic results?"
            type="textarea"
            v-model="formData.mainTakeaways"
            placeholder="Reflect on the most important insights from your assessment results..."
            rows="4"
            required
          />

          <FormField
            label="What are the biggest opportunities for improvement?"
            type="textarea"
            v-model="formData.improvements"
            placeholder="Identify the areas with the greatest potential for positive impact..."
            rows="4"
            required
          />

          <FormField
            label="What are the primary barriers or challenges you anticipate?"
            type="textarea"
            v-model="formData.barriers"
            placeholder="Consider potential obstacles and how they might be addressed..."
            rows="4"
            required
          />
        </QuestionGroup>

        <QuestionGroup title="Strategic Priorities" v-if="getRoleSpecificReflections().length > 0">
          <FormField
            v-for="question in getRoleSpecificReflections()"
            :key="question.id"
            :label="question.label"
            :type="question.type"
            v-model="formData[question.id]"
            :placeholder="question.placeholder"
            :rows="question.rows"
            :required="question.required"
          />
        </QuestionGroup>

        <QuestionGroup title="Success Factors">
          <FormField
            label="What factors would be most critical for successful change implementation?"
            type="textarea"
            v-model="formData.successFactors"
            placeholder="Consider leadership support, communication, training, resources, etc..."
            rows="4"
            required
          />
        </QuestionGroup>

        <NavigationButtons
          :can-proceed="isFormValid"
          @next="submitReflection"
          @back="goBack"
          next-label="Continue to Planning"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'
import FormField from '@/components/FormField.vue'
import QuestionGroup from '@/components/QuestionGroup.vue'
import NavigationButtons from '@/components/NavigationButtons.vue'

const router = useRouter()
const assessmentStore = useAssessmentStore()

// Initialisiere Formulardaten aus Store oder Standardwerten
const formData = ref({
  mainTakeaways: assessmentStore.assessmentData.reflection.mainTakeaways || '',
  improvements: assessmentStore.assessmentData.reflection.improvements || '',
  barriers: assessmentStore.assessmentData.reflection.barriers || '',
  successFactors: assessmentStore.assessmentData.reflection.successFactors || '',
  leadershipActions: assessmentStore.assessmentData.reflection.leadershipActions || '',
  communicationStrategy: assessmentStore.assessmentData.reflection.communicationStrategy || '',
  trainingNeeds: assessmentStore.assessmentData.reflection.trainingNeeds || '',
  processImprovements: assessmentStore.assessmentData.reflection.processImprovements || ''
})

// Berechne diagnostische Insights aus den Ergebnissen der Diagnose
const diagnosticInsights = computed(() => {
  const diagnosis = assessmentStore.assessmentData.diagnosis
  const insights = []

  // Definiere Dimensionen und zugehörige Fragen-IDs für die Berechnung
  const dimensionGroups = {
    'Leadership & Vision': ['leadership_commitment', 'vision_clarity', 'communication_effectiveness'],
    'Organizational Culture': ['culture_openness', 'trust_levels', 'collaboration'],
    'Capability & Resources': ['skill_readiness', 'resource_availability', 'training_support'],
    'Process & Structure': ['process_maturity', 'structure_flexibility', 'decision_making']
  }

  Object.entries(dimensionGroups).forEach(([dimension, questions]) => {
    const scores = questions.map(q => parseInt(diagnosis[q]) || 0).filter(s => s > 0)
    if (scores.length > 0) {
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
      const roundedScore = Math.round(avgScore * 10) / 10

      let status = ''
      let level = ''
      let recommendations = []

      if (roundedScore >= 4) {
        status = 'Strong foundation for change'
        level = 'high'
        recommendations = ['Leverage this strength to support other areas', 'Share best practices across the organization']
      } else if (roundedScore >= 3) {
        status = 'Moderate readiness - some improvement needed'
        level = 'medium'
        recommendations = ['Focus on incremental improvements', 'Build on existing capabilities']
      } else {
        status = 'Significant development required'
        level = 'low'
        recommendations = ['Prioritize this area for immediate attention', 'Consider additional support and resources']
      }

      insights.push({
        dimension,
        score: roundedScore,
        status,
        level,
        recommendations
      })
    }
  })

  return insights
})

// Validierung der Pflichtfelder
const isFormValid = computed(() => {
  const requiredFields = ['mainTakeaways', 'improvements', 'barriers', 'successFactors']
  return requiredFields.every(field => formData.value[field] && formData.value[field].trim())
})

// Spezifische Reflexionsfragen pro Rolle
function getRoleSpecificReflections() {
  const role = assessmentStore.currentRole
  
  if (role === 'leadership') {
    return [
      {
        id: 'leadershipActions',
        label: 'What specific leadership actions will be most important for driving change?',
        type: 'textarea',
        placeholder: 'Consider communication, resource allocation, modeling behaviors, etc...',
        rows: 4,
        required: true
      },
      {
        id: 'communicationStrategy',
        label: 'How should the change vision and progress be communicated to stakeholders?',
        type: 'textarea',
        placeholder: 'Think about different audiences, channels, and messaging approaches...',
        rows: 4,
        required: true
      }
    ]
  } else if (role === 'employee') {
    return [
      {
        id: 'trainingNeeds',
        label: 'What training or support would be most helpful for you and your colleagues?',
        type: 'textarea',
        placeholder: 'Consider skill development, change management support, etc...',
        rows: 4,
        required: true
      }
    ]
  } else if (role === 'kvp') {
    return [
      {
        id: 'processImprovements',
        label: 'What process improvements or methodologies would best support the change initiative?',
        type: 'textarea',
        placeholder: 'Consider KVP tools, measurement approaches, implementation tactics...',
        rows: 4,
        required: true
      }
    ]
  }
  
  return []
}

// Absenden und Speichern der Reflexionen
function submitReflection() {
  if (isFormValid.value) {
    assessmentStore.updateData('reflection', formData.value)
    assessmentStore.updateStep(3)
    router.push('/planning')
  }
}

// Zurück zur Diagnosestufe
function goBack() {
  router.push('/diagnosis')
}

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>
