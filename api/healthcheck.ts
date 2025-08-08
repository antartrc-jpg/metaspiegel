export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    message: 'Meta-Spiegel läuft erreichbar und öffentlich.',
  });
}
