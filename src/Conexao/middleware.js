// middleware.js

const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'sua_chave_secreta', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticate;
