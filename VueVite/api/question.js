import metaSpiegel from '../../data/meta-spiegel.json';

let sessions = {}; // Einfacher In-Memory-Session-Store: { sessionId: currentIndex }

export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const sessionId = req.headers['x-session-id'] || 'default';

    if (!sessions[sessionId]) sessions[sessionId] = 0;
    const idx = sessions[sessionId];

    if (idx >= metaSpiegel.questions.length) {
      res.status(200).json({ done: true, question: null });
      return;
    }

    const question = metaSpiegel.questions[idx];
    res.status(200).json({ done: false, question });
    return;
  }

  res.status(405).end();
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Session-Id');
}
