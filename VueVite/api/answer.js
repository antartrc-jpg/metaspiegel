export default function handler(req, res) {
  if (req.method === 'POST') {
    const { answer } = req.body;

    if (!answer) {
      res.status(400).json({ error: 'Antwort fehlt.' });
      return;
    }

    // Verarbeite die Antwort hier
    const nextQuestion = getNextQuestionBasedOn(answer);

    res.status(200).json({
      done: !nextQuestion,
      nextQuestion: nextQuestion ?? null
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

function getNextQuestionBasedOn(answer) {
  // Beispielhafte Logik – später dynamisch über Session oder DB
  if (answer.toLowerCase() === "stop") return null;
  return "Wie gehst du mit Veränderungen im Team um?";
}
