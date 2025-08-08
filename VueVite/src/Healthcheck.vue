<template>
  <div>
    <h1>Status: Online</h1>
    <p>Zeit: {{ timestamp }}</p>
    <p>Meta-Spiegel läuft erreichbar und öffentlich.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const timestamp = ref('')

onMounted(() => {
  timestamp.value = new Date().toISOString()
})
</script>
