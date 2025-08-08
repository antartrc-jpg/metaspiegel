import metaSpiegel from '../../data/meta-spiegel.json';

let sessions = {}; // SessionId → aktuelle Frage-Index

export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const sessionId = req.headers['x-session-id'] || 'default';

    // Falls Session noch nicht existiert, starte bei Frage 0
    if (!sessions[sessionId]) sessions[sessionId] = 0;
    const idx = sessions[sessionId];

    // Wenn alle Fragen durch sind
    if (idx >= metaSpiegel.questions.length) {
      res.status(200).json({ done: true, question: null });
      return;
    }

    const question = metaSpiegel.questions[idx];
    res.status(200).json({ done: false, question });
    return;
  }

  res.status(405).end(); // Methode nicht erlaubt
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Session-Id');
}
