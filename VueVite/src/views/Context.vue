<template>
  <div class="context-view">
    <div class="content-section">
      <h1 class="section-title">Assessment Context</h1>
      <p class="section-description">
        Help us understand your organizational context to provide relevant insights and recommendations.
      </p>

      <form @submit.prevent="submitContext" class="assessment-form">
        <QuestionGroup title="Organization Information">
          <FormField
            label="Organization Size"
            type="select"
            v-model="formData.organizationSize"
            :options="organizationSizeOptions"
            required
          />

          <FormField
            label="Industry Sector"
            type="select"
            v-model="formData.industrySector"
            :options="industrySectorOptions"
            required
          />

          <FormField
            label="Geographic Scope"
            type="select"
            v-model="formData.geographicScope"
            :options="geographicScopeOptions"
            required
          />
        </QuestionGroup>

        <QuestionGroup title="Change Context" v-if="getRoleSpecificQuestions().length > 0">
          <FormField
            v-for="question in getRoleSpecificQuestions()"
            :key="question.id"
            :label="question.label"
            :type="question.type"
            v-model="formData[question.id]"
            :options="question.options"
            :placeholder="question.placeholder"
            :required="question.required"
          />
        </QuestionGroup>

        <QuestionGroup title="Additional Context">
          <FormField
            label="Previous Change Experience"
            type="textarea"
            v-model="formData.previousExperience"
            placeholder="Briefly describe any significant organizational changes in the past 2 years..."
            rows="4"
          />

          <FormField
            label="Current Challenges"
            type="textarea"
            v-model="formData.currentChallenges"
            placeholder="What are the main challenges your organization is currently facing?"
            rows="4"
          />
        </QuestionGroup>

        <NavigationButtons
          :can-proceed="isFormValid"
          @next="submitContext"
          @back="goBack"
          next-label="Continue to Diagnosis"
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
  organizationSize: assessmentStore.assessmentData.context.organizationSize || '',
  industrySector: assessmentStore.assessmentData.context.industrySector || '',
  geographicScope: assessmentStore.assessmentData.context.geographicScope || '',
  changeType: assessmentStore.assessmentData.context.changeType || '',
  changeScope: assessmentStore.assessmentData.context.changeScope || '',
  timeframe: assessmentStore.assessmentData.context.timeframe || '',
  previousExperience: assessmentStore.assessmentData.context.previousExperience || '',
  currentChallenges: assessmentStore.assessmentData.context.currentChallenges || ''
})

const organizationSizeOptions = [
  { value: 'small', label: 'Small (1-50 employees)' },
  { value: 'medium', label: 'Medium (51-250 employees)' },
  { value: 'large', label: 'Large (251-1000 employees)' },
  { value: 'enterprise', label: 'Enterprise (1000+ employees)' }
]

const industrySectorOptions = [
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'retail', label: 'Retail' },
  { value: 'education', label: 'Education' },
  { value: 'government', label: 'Government' },
  { value: 'nonprofit', label: 'Non-profit' },
  { value: 'other', label: 'Other' }
]

const geographicScopeOptions = [
  { value: 'local', label: 'Local' },
  { value: 'regional', label: 'Regional' },
  { value: 'national', label: 'National' },
  { value: 'international', label: 'International' }
]

const isFormValid = computed(() => {
  return formData.value.organizationSize && 
         formData.value.industrySector && 
         formData.value.geographicScope
})

function getRoleSpecificQuestions() {
  const role = assessmentStore.currentRole
  
  if (role === 'leadership') {
    return [
      {
        id: 'changeType',
        label: 'Type of Change Initiative',
        type: 'select',
        options: [
          { value: 'digital', label: 'Digital Transformation' },
          { value: 'restructuring', label: 'Organizational Restructuring' },
          { value: 'process', label: 'Process Improvement' },
          { value: 'cultural', label: 'Cultural Change' },
          { value: 'technology', label: 'Technology Implementation' },
          { value: 'merger', label: 'Merger/Acquisition' },
          { value: 'other', label: 'Other' }
        ],
        required: true
      },
      {
        id: 'changeScope',
        label: 'Scope of Change',
        type: 'select',
        options: [
          { value: 'department', label: 'Department/Team Level' },
          { value: 'division', label: 'Division Level' },
          { value: 'organization', label: 'Organization-wide' },
          { value: 'multi-org', label: 'Multi-organizational' }
        ],
        required: true
      }
    ]
  } else if (role === 'employee') {
    return [
      {
        id: 'changeType',
        label: 'What type of change are you experiencing?',
        type: 'select',
        options: [
          { value: 'role', label: 'Role/Responsibility Changes' },
          { value: 'process', label: 'New Processes/Procedures' },
          { value: 'technology', label: 'New Technology/Systems' },
          { value: 'team', label: 'Team Structure Changes' },
          { value: 'location', label: 'Location/Work Arrangement Changes' },
          { value: 'other', label: 'Other' }
        ],
        required: true
      }
    ]
  } else if (role === 'kvp') {
    return [
      {
        id: 'changeType',
        label: 'Primary Improvement Focus',
        type: 'select',
        options: [
          { value: 'lean', label: 'Lean Implementation' },
          { value: 'six-sigma', label: 'Six Sigma' },
          { value: 'kaizen', label: 'Kaizen Events' },
          { value: 'digital', label: 'Digital Process Optimization' },
          { value: 'quality', label: 'Quality Management' },
          { value: 'safety', label: 'Safety Improvements' },
          { value: 'other', label: 'Other' }
        ],
        required: true
      },
      {
        id: 'timeframe',
        label: 'Typical Improvement Cycle',
        type: 'select',
        options: [
          { value: 'continuous', label: 'Continuous (Ongoing)' },
          { value: 'quarterly', label: 'Quarterly Reviews' },
          { value: 'project', label: 'Project-based (3-6 months)' },
          { value: 'annual', label: 'Annual Initiatives' }
        ],
        required: true
      }
    ]
  }
  
  return []
}

function submitContext() {
  if (isFormValid.value) {
    assessmentStore.updateData('context', formData.value)
    assessmentStore.updateStep(1)
    router.push('/diagnosis')
  }
}

function goBack() {
  router.push('/')
}

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>
