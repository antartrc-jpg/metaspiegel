export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    done: false,
    question: "Wie schätzen Sie Ihre Veränderungsbereitschaft aktuell ein?"
  });
}
