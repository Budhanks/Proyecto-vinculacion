const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost', // Cambia por tu host de BD (ej: de ElephantSQL)
  user: 'root',
  password: '1234',
  database: 'fes_docentes',
  waitForConnections: true,
});

module.exports = pool;