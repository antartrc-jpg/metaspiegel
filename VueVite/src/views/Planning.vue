<template>
  <div class="planning-view">
    <div class="content-section">
      <h1 class="section-title">Action Planning</h1>
      <p class="section-description">
        Develop a concrete action plan based on your assessment results and reflections.
      </p>

      <form @submit.prevent="submitPlanning" class="assessment-form">
        <QuestionGroup title="Priority Actions">
          <FormField
            label="Top 3 Priority Actions (next 30 days)"
            type="textarea"
            v-model="formData.shortTermActions"
            placeholder="List specific, actionable items that should be addressed within the next 30 days..."
            rows="5"
            required
          />

          <FormField
            label="Medium-term Actions (30-90 days)"
            type="textarea"
            v-model="formData.mediumTermActions"
            placeholder="Identify actions and initiatives for the 30-90 day timeframe..."
            rows="5"
            required
          />

          <FormField
            label="Long-term Actions (3-12 months)"
            type="textarea"
            v-model="formData.longTermActions"
            placeholder="Outline strategic initiatives and longer-term development areas..."
            rows="5"
            required
          />
        </QuestionGroup>

        <QuestionGroup title="Resource Requirements">
          <FormField
            label="Required Resources"
            type="textarea"
            v-model="formData.requiredResources"
            placeholder="What resources (people, budget, tools, time) will be needed to execute your plan?"
            rows="4"
            required
          />

          <FormField
            label="Key Stakeholders to Engage"
            type="textarea"
            v-model="formData.keyStakeholders"
            placeholder="Who needs to be involved in implementing these actions?"
            rows="4"
            required
          />
        </QuestionGroup>

        <QuestionGroup title="Success Measurement" v-if="getRoleSpecificPlanning().length > 0">
          <FormField
            v-for="question in getRoleSpecificPlanning()"
            :key="question.id"
            :label="question.label"
            :type="question.type"
            v-model="formData[question.id]"
            :placeholder="question.placeholder"
            :rows="question.rows"
            :required="question.required"
          />
        </QuestionGroup>

        <QuestionGroup title="Risk Mitigation">
          <FormField
            label="Potential Risks and Mitigation Strategies"
            type="textarea"
            v-model="formData.riskMitigation"
            placeholder="What could go wrong and how will you address these risks?"
            rows="4"
            required
          />
        </QuestionGroup>

        <QuestionGroup title="Communication Plan">
          <FormField
            label="How will you communicate progress and updates?"
            type="textarea"
            v-model="formData.communicationPlan"
            placeholder="Describe your approach to keeping stakeholders informed..."
            rows="4"
            required
          />
        </QuestionGroup>

        <NavigationButtons
          :can-proceed="isFormValid"
          @next="submitPlanning"
          @back="goBack"
          next-label="Complete Assessment"
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

const formData = ref({
  shortTermActions: assessmentStore.assessmentData.planning.shortTermActions || '',
  mediumTermActions: assessmentStore.assessmentData.planning.mediumTermActions || '',
  longTermActions: assessmentStore.assessmentData.planning.longTermActions || '',
  requiredResources: assessmentStore.assessmentData.planning.requiredResources || '',
  keyStakeholders: assessmentStore.assessmentData.planning.keyStakeholders || '',
  successMetrics: assessmentStore.assessmentData.planning.successMetrics || '',
  reviewSchedule: assessmentStore.assessmentData.planning.reviewSchedule || '',
  leadershipCommitments: assessmentStore.assessmentData.planning.leadershipCommitments || '',
  supportNeeds: assessmentStore.assessmentData.planning.supportNeeds || '',
  improvementTargets: assessmentStore.assessmentData.planning.improvementTargets || '',
  riskMitigation: assessmentStore.assessmentData.planning.riskMitigation || '',
  communicationPlan: assessmentStore.assessmentData.planning.communicationPlan || ''
})

const isFormValid = computed(() => {
  const requiredFields = [
    'shortTermActions',
    'mediumTermActions', 
    'longTermActions',
    'requiredResources',
    'keyStakeholders',
    'riskMitigation',
    'communicationPlan'
  ]
  return requiredFields.every(field => formData.value[field] && formData.value[field].trim())
})

function getRoleSpecificPlanning() {
  const role = assessmentStore.currentRole
  
  if (role === 'leadership') {
    return [
      {
        id: 'successMetrics',
        label: 'How will you measure success?',
        type: 'textarea',
        placeholder: 'Define specific, measurable outcomes and KPIs...',
        rows: 4,
        required: true
      },
      {
        id: 'reviewSchedule',
        label: 'Review and Monitoring Schedule',
        type: 'textarea',
        placeholder: 'How often will you review progress and adjust the plan?',
        rows: 3,
        required: true
      },
      {
        id: 'leadershipCommitments',
        label: 'Leadership Team Commitments',
        type: 'textarea',
        placeholder: 'What specific commitments will the leadership team make?',
        rows: 4,
        required: true
      }
    ]
  } else if (role === 'employee') {
    return [
      {
        id: 'supportNeeds',
        label: 'What support do you need from leadership and colleagues?',
        type: 'textarea',
        placeholder: 'Be specific about the support that would help you succeed...',
        rows: 4,
        required: true
      }
    ]
  } else if (role === 'kvp') {
    return [
      {
        id: 'improvementTargets',
        label: 'Specific Improvement Targets and Metrics',
        type: 'textarea',
        placeholder: 'Define measurable improvement goals and how you will track them...',
        rows: 4,
        required: true
      }
    ]
  }
  
  return []
}

function submitPlanning() {
  if (isFormValid.value) {
    assessmentStore.updateData('planning', formData.value)
    assessmentStore.updateStep(4)
    assessmentStore.completeAssessment()
    router.push('/export')
  }
}

function goBack() {
  router.push('/reflection')
}

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>

<style scoped>
.planning-view {
  max-width: 600px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.section-description {
  margin-bottom: 2rem;
  color: #555;
}

.assessment-form {
  text-align: left;
}

.insights-section {
  margin-bottom: 2rem;
}

.subsection-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.insight-card {
  padding: 1rem;
  border-radius: 6px;
  background: #f7f7f7;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.insight-card.insight-high {
  border-left: 6px solid #4caf50;
}

.insight-card.insight-medium {
  border-left: 6px solid #ff9800;
}

.insight-card.insight-low {
  border-left: 6px solid #f44336;
}

.insight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.insight-score {
  font-weight: bold;
  font-size: 1.1rem;
}

.insight-status {
  font-style: italic;
  margin-bottom: 0.5rem;
}

.insight-recommendations {
  padding-left: 1.2rem;
  list-style-type: disc;
}
</style>
