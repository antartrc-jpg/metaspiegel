<template>
  <div class="role-selection-view">
    <div class="content-section">
      <h1 class="section-title">Select Your Role</h1>
      <p class="section-description">
        Choose the role that best describes your position in the organization. 
        This will customize the assessment questions and recommendations for your perspective.
      </p>

      <div class="roles-grid">
        <div 
          v-for="role in roles" 
          :key="role.id"
          class="role-card"
          :class="{ active: selectedRole === role.id }"
          @click="selectRole(role.id)"
        >
          <div class="role-icon">
            <i :data-feather="role.icon"></i>
          </div>
          <h3 class="role-title">{{ role.name }}</h3>
          <p class="role-description">{{ role.description }}</p>
          <ul class="role-focus">
            <li v-for="focus in role.focus" :key="focus">{{ focus }}</li>
          </ul>
        </div>
      </div>

      <div class="navigation-section">
        <button 
          @click="proceedToAssessment" 
          :disabled="!selectedRole"
          class="btn btn-primary btn-large"
        >
          <i data-feather="arrow-right"></i>
          Continue to Assessment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'

const router = useRouter()
const assessmentStore = useAssessmentStore()
const selectedRole = ref(assessmentStore.currentRole)

const roles = [
  {
    id: 'leadership',
    name: 'Leadership Team',
    icon: 'trending-up',
    description: 'Senior management, executives, and decision-makers driving organizational change.',
    focus: [
      'Strategic vision and alignment',
      'Resource allocation and support',
      'Stakeholder engagement',
      'Change communication strategy'
    ]
  },
  {
    id: 'employee',
    name: 'Employee',
    icon: 'users',
    description: 'Team members who will be directly affected by the organizational changes.',
    focus: [
      'Personal impact assessment',
      'Skill development needs',
      'Communication preferences',
      'Support requirements'
    ]
  },
  {
    id: 'kvp',
    name: 'KVP Team',
    icon: 'settings',
    description: 'Continuous improvement practitioners and change champions (Kontinuierlicher Verbesserungsprozess).',
    focus: [
      'Process improvement methodologies',
      'Change implementation tactics',
      'Training and development',
      'Measurement and monitoring'
    ]
  }
]

function selectRole(roleId) {
  selectedRole.value = roleId
}

function proceedToAssessment() {
  if (selectedRole.value) {
    assessmentStore.setRole(selectedRole.value)
    router.push('/context')
  }
}

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>
