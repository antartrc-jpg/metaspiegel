// src/utils/flowLogic.js
import metaSpiegelData from '@/data/meta-spiegel.json'

export class MetaSpiegelFlow {
  constructor() {
    this.vcLevel = 1
    this.mikrophasen = ['Wahrnehmung', 'Deutung', 'Resonanz', 'Reflexion', 'Integration']
    this.dimensions = ['Psychologische Sicherheit', 'Meta Lernen', 'Organisationale Resilienz', 'Veränderungsbiografien']

    this.currentMikrophaseIndex = 0
    this.currentDimensionIndex = 0
    this.currentQuestionIndex = 0

    this.answers = {} // { "VC1|Wahrnehmung|Psychologische Sicherheit": [antworten...] }
  }

  get currentKey() {
    return `VC${this.vcLevel}|${this.mikrophasen[this.currentMikrophaseIndex]}|${this.dimensions[this.currentDimensionIndex]}`
  }

  getCurrentQuestions() {
    return metaSpiegelData[this.currentKey]?.['Rückfragen-Logik'] || []
  }

  getCurrentQuestion() {
    const questions = this.getCurrentQuestions()
    return questions[this.currentQuestionIndex] || null
  }

  answerCurrentQuestion(answer) {
    if (!this.answers[this.currentKey]) this.answers[this.currentKey] = []
    this.answers[this.currentKey].push(answer)
    this.currentQuestionIndex++
  }

  hasMoreQuestions() {
    return this.currentQuestionIndex < this.getCurrentQuestions().length
  }

  nextStep() {
    if (this.hasMoreQuestions()) {
      return true // Noch Fragen in aktuellem Key
    }
    // Fragen durch, nächster Key

    this.currentQuestionIndex = 0
    this.currentDimensionIndex++
    if (this.currentDimensionIndex >= this.dimensions.length) {
      this.currentDimensionIndex = 0
      this.currentMikrophaseIndex++
      if (this.currentMikrophaseIndex >= this.mikrophasen.length) {
        this.currentMikrophaseIndex = 0
        this.vcLevel++
        if (this.vcLevel > 5) {
          return false // Ende aller VC-Level
        }
      }
    }
    return true
  }

  isFinished() {
    return this.vcLevel > 5
  }

  // Optional: Hole Problemtypen (für Folgefragen etc.)
  getCurrentProblemTypes() {
    return metaSpiegelData[this.currentKey]?.['Problemtypen'] || []
  }

  // Optional: Hole Handlungsempfehlungen (für Auswertung)
  getRecommendations() {
    // Hier könntest du basierend auf Antworten Empfehlungen ableiten
    return metaSpiegelData[this.currentKey]?.['Handlungsempfehlungen'] || []
  }
}
