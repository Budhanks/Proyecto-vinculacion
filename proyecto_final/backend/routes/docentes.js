const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// Obtener todos los docentes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM docentes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Añadir más rutas (POST, PUT, DELETE)...

module.exports = router;