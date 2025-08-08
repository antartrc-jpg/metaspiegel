export default function handler(req, res) {
  if (req.method === 'GET') {
    const question = getNextQuestion(); // hier kannst du deine Logik einfügen
    res.status(200).json({
      done: false,
      question: question ?? null
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

// Beispiel-Funktion
function getNextQuestion() {
  // Platzhalter-Logik (z. B. aus Session/DB ziehen)
  return "Wie sicher fühlst du dich, Feedback zu geben?";
}
