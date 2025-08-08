import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAssessmentStore = defineStore('assessment', () => {
  // State
  const currentRole = ref('')
  const currentStep = ref(0)
  const assessmentData = ref({
    context: {},
    diagnosis: {},
    reflection: {},
    planning: {},
    metadata: {
      startedAt: null,
      completedAt: null,
      version: '1.0'
    }
  })

  // Computed
  const progress = computed(() => {
    const totalSteps = 5
    return Math.round((currentStep.value / totalSteps) * 100)
  })

  const isComplete = computed(() => {
    return currentStep.value >= 5
  })

  // Actions
  function setRole(role) {
    currentRole.value = role
    if (!assessmentData.value.metadata.startedAt) {
      assessmentData.value.metadata.startedAt = new Date().toISOString()
    }
    saveToStorage()
  }

  function updateStep(step) {
    currentStep.value = Math.max(currentStep.value, step)
    saveToStorage()
  }

  function updateData(section, data) {
    assessmentData.value[section] = { ...assessmentData.value[section], ...data }
    saveToStorage()
  }

  function completeAssessment() {
    assessmentData.value.metadata.completedAt = new Date().toISOString()
    currentStep.value = 5
    saveToStorage()
  }

  function saveToStorage() {
    const data = {
      currentRole: currentRole.value,
      currentStep: currentStep.value,
      assessmentData: assessmentData.value
    }
    localStorage.setItem('changeReadinessAssessment', JSON.stringify(data))
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('changeReadinessAssessment')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        currentRole.value = data.currentRole || ''
        currentStep.value = data.currentStep || 0
        assessmentData.value = data.assessmentData || assessmentData.value
      } catch (error) {
        console.error('Error loading stored data:', error)
      }
    }
  }

  function reset() {
    currentRole.value = ''
    currentStep.value = 0
    assessmentData.value = {
      context: {},
      diagnosis: {},
      reflection: {},
      planning: {},
      metadata: {
        startedAt: null,
        completedAt: null,
        version: '1.0'
      }
    }
    localStorage.removeItem('changeReadinessAssessment')
  }

  return {
    currentRole,
    currentStep,
    assessmentData,
    progress,
    isComplete,
    setRole,
    updateStep,
    updateData,
    completeAssessment,
    saveToStorage,
    loadFromStorage,
    reset
  }
})
