export default async function handler(req, res){
  // simple proxy to avoid CORS in dev when needed
  const url = process.env.NEXT_PUBLIC_API_URL + req.url.replace('/api', '');
  const r = await fetch(url, { method: req.method, headers: req.headers, body: req.body });
  const text = await r.text();
  res.status(r.status).send(text);
}
