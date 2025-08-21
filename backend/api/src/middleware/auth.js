
const jwt = require('jsonwebtoken');

// Use your Supabase project's JWT secret
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || 'dhH01BEENBHDmGbLuleam7/EsH/sBq+GM3dTskIJxf0d1mgZYL1h6n3XQznq1165BpSDVxbyIHysbh3zxz4hfA==';

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send({ error: 'missing auth' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, SUPABASE_JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).send({ error: 'invalid token' });
  }
}

module.exports = { authMiddleware };
