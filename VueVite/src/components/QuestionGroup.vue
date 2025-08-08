<template>
  <div class="question-group">
    <div class="group-header">
      <h3 class="group-title">{{ title }}</h3>
      <p v-if="description" class="group-description">{{ description }}</p>
    </div>
    
    <div class="group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>
