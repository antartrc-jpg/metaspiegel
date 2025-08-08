import metaSpiegel from '../../data/meta-spiegel.json'; // Pfad anpassen

// Einfaches Beispiel, um die Fragen der Reihe nach auszugeben
let currentIndex = 0;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    if (currentIndex >= metaSpiegel.questions.length) {
      res.status(200).json({ done: true, question: null });
      return;
    }

    const question = metaSpiegel.questions[currentIndex];
    res.status(200).json({ done: false, question });
  } else {
    res.status(405).end();
  }
}
