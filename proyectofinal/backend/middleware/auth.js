const jwt = require('jsonwebtoken');
const pool = require('../database/db');

module.exports = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Verificar usuario en MySQL
      const [users] = await pool.query(
        'SELECT role FROM users WHERE id = ?', 
        [decoded.id]
      );

      if (users.length === 0 || (requiredRole && users[0].role !== requiredRole)) {
        return res.status(403).json({ error: 'Permisos insuficientes' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Token inválido' });
    }
  };
};