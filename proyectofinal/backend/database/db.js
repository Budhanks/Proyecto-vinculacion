const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'fes_docentes',
  waitForConnections: true,
  connectionLimit: 10
});

// Verificar conexión al iniciar
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Conexión a MySQL exitosa');
    conn.release();
  } catch (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
    process.exit(1);
  }
})();

module.exports = pool;
//yesyes
