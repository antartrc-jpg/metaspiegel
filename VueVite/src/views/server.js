import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { MetaSpiegelFlow } from './metaSpiegelFlow.js' // Dein Flow-Modul

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

// Für Demo: einfacher Flow pro Server-Instanz (kein User-Tracking)
const flow = new MetaSpiegelFlow()

// GET /question – aktuelle Frage holen
app.get('/question', (req, res) => {
  const question = flow.getCurrentQuestion()
  if (!question) {
    return res.json({ done: true })
  }
  res.json({ done: false, question })
})

// POST /answer – Antwort empfangen, nächste Frage liefern
app.post('/answer', (req, res) => {
  const { answer } = req.body
  if (!answer) {
    return res.status(400).json({ error: 'Missing answer field' })
  }

  flow.answerCurrentQuestion(answer)
  const hasNext = flow.nextStep()

  if (!hasNext) {
    return res.json({ done: true })
  }

  res.json({ done: false, nextQuestion: flow.getCurrentQuestion() })
})

// GET /summary – Zusammenfassung ausgeben
app.get('/summary', (req, res) => {
  const summary = flow.getSummary() // Muss in MetaSpiegelFlow implementiert sein
  res.json({ summary })
})

app.listen(port, () => {
  console.log(`MetaSpiegel API läuft auf http://localhost:${port}`)
})
