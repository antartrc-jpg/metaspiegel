<template>
  <div class="progress-container">
    <div class="progress-header">
      <h3 class="progress-title">Assessment Progress</h3>
      <span class="progress-percentage">{{ assessmentStore.progress }}%</span>
    </div>
    
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${assessmentStore.progress}%` }"
      ></div>
    </div>
    
    <div class="progress-steps">
      <div 
        v-for="(step, index) in steps" 
        :key="step.name"
        class="progress-step"
        :class="{ 
          active: currentStepIndex === index,
          completed: index < currentStepIndex 
        }"
      >
        <div class="step-indicator">
          <i v-if="index < currentStepIndex" data-feather="check"></i>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'

const route = useRoute()
const assessmentStore = useAssessmentStore()

const steps = [
  { name: 'context', label: 'Context' },
  { name: 'diagnosis', label: 'Diagnosis' },
  { name: 'reflection', label: 'Reflection' },
  { name: 'planning', label: 'Planning' },
  { name: 'export', label: 'Export' }
]

const currentStepIndex = computed(() => {
  const stepIndex = steps.findIndex(step => step.name === route.name)
  return stepIndex >= 0 ? stepIndex : 0
})

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>
