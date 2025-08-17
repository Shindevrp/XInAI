const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send({ error: 'missing auth' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).send({ error: 'invalid token' });
  }
}

module.exports = { authMiddleware };
