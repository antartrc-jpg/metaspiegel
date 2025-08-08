import metaSpiegelData from './meta-spiegel.json' assert { type: 'json' }

export class MetaSpiegelFlow {
  constructor() {
    this.mikrophasen = ['Wahrnehmung', 'Deutung', 'Resonanz', 'Reflexion', 'Integration']
    this.dimensions = ['Psychologische Sicherheit', 'Meta Lernen', 'Organisationale Resilienz', 'Veränderungsbiografien']

    this.currentMikrophaseIndex = 0
    this.currentDimensionIndex = 0
    this.currentQuestionIndex = 0
    this.answers = []

    this.questions = this.loadQuestions()
  }

  loadQuestions() {
    // Erwartet JSON mit Struktur: { "VC1|Wahrnehmung|Psychologische Sicherheit": { Fragen... }, ... }
    // Wir bauen ein Array der Fragen in Reihenfolge Mikrophase -> Dimension -> Fragen

    const questionsArray = []

    for (const mikro of this.mikrophasen) {
      for (const dimension of this.dimensions) {
        // Key im JSON
        const key = `VC${this.mikrophasen.indexOf(mikro) + 1}|${mikro}|${dimension}`
        const entry = metaSpiegelData[key]
        if (!entry) continue

        // Beispiel: Fragen aus Rückfragen-Logik als Fragen
        const fragen = entry['Rückfragen-Logik'] || []

        fragen.forEach((frage, idx) => {
          questionsArray.push({
            mikro,
            dimension,
            text: frage,
            key,
            questionIndex: idx
          })
        })
      }
    }

    return questionsArray
  }

  getCurrentQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      return null
    }
    return this.questions[this.currentQuestionIndex].text
  }

  answerCurrentQuestion(answer) {
    const current = this.questions[this.currentQuestionIndex]
    this.answers.push({
      mikro: current.mikro,
      dimension: current.dimension,
      questionIndex: current.questionIndex,
      questionText: current.text,
      answer
    })
  }

  nextStep() {
    this.currentQuestionIndex++

    if (this.currentQuestionIndex >= this.questions.length) {
      return false // Ende erreicht
    }
    return true
  }

  getSummary() {
    // Einfach eine Text-Zusammenfassung mit Anzahl Antworten je Mikrophase und Dimension

    const summary = {}

    this.answers.forEach(({ mikro, dimension, answer }) => {
      if (!summary[mikro]) summary[mikro] = {}
      if (!summary[mikro][dimension]) summary[mikro][dimension] = { total: 0, positive: 0 }

      summary[mikro][dimension].total++
      if (answer.toLowerCase() === 'ja') summary[mikro][dimension].positive++
    })

    let resultText = 'Zusammenfassung der Antworten:\n\n'
    for (const mikro of Object.keys(summary)) {
      resultText += `Mikrophase: ${mikro}\n`
      for (const dim of Object.keys(summary[mikro])) {
        const data = summary[mikro][dim]
        const percent = ((data.positive / data.total) * 100).toFixed(0)
        resultText += `  Dimension: ${dim} — Positive Antworten: ${data.positive} / ${data.total} (${percent}%)\n`
      }
      resultText += '\n'
    }

    return resultText
  }
}
