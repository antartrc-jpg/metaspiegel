export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { answer } = req.body;

  // Simulierter Antwortprozess – später mit Logik ersetzen
  res.status(200).json({
    done: false,
    nextQuestion: "Wie sicher fühlen Sie sich, Veränderungen offen anzusprechen?"
  });
}
