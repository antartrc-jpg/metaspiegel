import { sessionsAnswers } from './sessionStore.js';

export default function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const sessionId = req.headers['x-session-id'] || 'default';
    const answers = sessionsAnswers[sessionId] || [];

    const summary = generateSummary(answers);
    res.status(200).json({ summary });
    return;
  }

  res.status(405).end(); // Methode nicht erlaubt
}

function generateSummary(answers) {
  if (answers.length === 0) {
    return "Es liegen noch keine Antworten vor.";
  }

  return "Deine bisherigen Antworten sind: " + answers.join(", ") + ".";
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Session-Id');
}
