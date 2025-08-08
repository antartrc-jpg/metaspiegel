<template>
  <div class="diagnosis-view">
    <h1 class="section-title">Change Readiness Diagnosis</h1>

    <div v-if="currentQuestion">
      <p class="info-text">
        Phase: <strong>{{ currentMikrophase }}</strong> | Dimension: <strong>{{ currentDimension }}</strong>
      </p>

      <p class="question-text" role="heading" aria-level="2">{{ currentQuestion }}</p>

      <div class="answer-buttons" role="group" aria-label="Antwortmöglichkeiten">
        <button @click="answerQuestion('Ja')" type="button" aria-pressed="false">Ja</button>
        <button @click="answerQuestion('Nein')" type="button" aria-pressed="false">Nein</button>
        <button @click="answerQuestion('Unsicher')" type="button" aria-pressed="false">Unsicher</button>
      </div>

      <p class="progress-text">
        Frage {{ currentQuestionIndex + 1 }} von {{ totalQuestions }} (Dimension {{ currentDimensionIndex + 1 }} von {{ totalDimensions }}, Phase {{ currentMikrophaseIndex + 1 }} von {{ totalMikrophasen }})
      </p>
    </div>

    <div v-else>
      <p>Alle Fragen wurden beantwortet.</p>
      <button @click="finishDiagnosis" type="button">Weiter zur Reflexion</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { MetaSpiegelFlow } from '@/utils/flowLogic.js'

const router = useRouter()
const flow = new MetaSpiegelFlow()

const currentQuestion = ref(flow.getCurrentQuestion())
const currentMikrophase = ref(flow.mikrophasen[flow.currentMikrophaseIndex])
const currentDimension = ref(flow.dimensions[flow.currentDimensionIndex])
const currentQuestionIndex = ref(flow.currentQuestionIndex)
const currentDimensionIndex = ref(flow.currentDimensionIndex)
const currentMikrophaseIndex = ref(flow.currentMikrophaseIndex)

const totalDimensions = flow.dimensions.length
const totalMikrophasen = flow.mikrophasen.length

const totalQuestions = computed(() => flow.getCurrentQuestions().length)

function answerQuestion(answer) {
  if (!currentQuestion.value) return

  flow.answerCurrentQuestion(answer)
  currentQuestionIndex.value = flow.currentQuestionIndex

  const hasNext = flow.nextStep()

  currentDimensionIndex.value = flow.currentDimensionIndex
  currentMikrophaseIndex.value = flow.currentMikrophaseIndex
  currentMikrophase.value = flow.mikrophasen[currentMikrophaseIndex.value]
  currentDimension.value = flow.dimensions[currentDimensionIndex.value]

  if (hasNext) {
    currentQuestion.value = flow.getCurrentQuestion()
  } else {
    currentQuestion.value = null
  }
}

function finishDiagnosis() {
  console.log('Diagnose abgeschlossen. Antworten:', flow.answers)
  router.push('/reflection')
}
</script>

<style scoped>
.diagnosis-view {
  max-width: 600px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.info-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.question-text {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.answer-buttons button {
  margin: 0 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
}

.progress-text {
  margin-top: 1rem;
  font-style: italic;
  color: #666;
}
</style>
