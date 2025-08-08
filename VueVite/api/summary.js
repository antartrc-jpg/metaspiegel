export default function handler(req, res) {
  if (req.method === 'GET') {
    const summary = generateSummary(); // z. B. aus Session lesen
    res.status(200).json({
      summary
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

function generateSummary() {
  // Beispielhafter Text – später dynamisch generieren
  return "Du hast angegeben, dass du Feedback nur zurückhaltend gibst und Veränderung im Team als herausfordernd empfindest.";
}
