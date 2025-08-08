import metaSpiegel from '../../data/meta-spiegel.json';

let sessions = {}; // Gleicher Store wie bei question.js, für Demo lokal

export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const sessionId = req.headers['x-session-id'] || 'default';
    const { answer } = req.body;

    if (!answer) {
      res.status(400).json({ error: 'Antwort fehlt.' });
      return;
    }

    if (!sessions[sessionId]) sessions[sessionId] = 0;
    sessions[sessionId]++;

    if (sessions[sessionId] >= metaSpiegel.questions.length) {
      res.status(200).json({ done: true, nextQuestion: null });
      return;
    }

    const nextQuestion = metaSpiegel.questions[sessions[sessionId]];
    res.status(200).json({ done: false, nextQuestion });
    return;
  }

  res.status(405).end();
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Session-Id');
}
