<template>
  <div class="navigation-buttons">
    <button 
      v-if="showBack"
      @click="$emit('back')"
      type="button"
      class="btn btn-secondary"
    >
      <i data-feather="arrow-left"></i>
      {{ backLabel }}
    </button>
    
    <div class="spacer"></div>
    
    <button 
      @click="$emit('next')"
      type="submit"
      :disabled="!canProceed"
      class="btn btn-primary"
    >
      <i data-feather="arrow-right"></i>
      {{ nextLabel }}
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

defineProps({
  canProceed: {
    type: Boolean,
    default: true
  },
  nextLabel: {
    type: String,
    default: 'Next'
  },
  backLabel: {
    type: String,
    default: 'Back'
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

defineEmits(['next', 'back'])

onMounted(() => {
  if (window.feather) {
    window.feather.replace()
  }
})
</script>
