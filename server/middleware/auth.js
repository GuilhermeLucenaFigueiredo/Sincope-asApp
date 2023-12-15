const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Formato de token inválido.' });
  }

  const tokenValue = token.split(' ')[1]; // Obtendo apenas o valor do token

  jwt.verify(tokenValue, 'teste_segredo', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido ou expirado.' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;


module.exports = { authenticateToken };