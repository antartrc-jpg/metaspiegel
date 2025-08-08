export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    summary: "Nutzer hat erste Einschätzung zur Veränderungsbereitschaft abgegeben."
  });
}
