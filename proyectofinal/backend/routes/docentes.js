const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const authenticate = require('../middleware/auth');

// Todas las rutas requieren autenticación como admin
router.use(authenticate('admin'));

router.get('/', async (req, res) => {
  try {
    const [docentes] = await pool.query('SELECT * FROM docentes');
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ejemplo de ruta POST
router.post('/', async (req, res) => {
  try {
    const { nombre, especialidad } = req.body;
    const [result] = await pool.query(
      'INSERT INTO docentes (nombre, especialidad) VALUES (?, ?)',
      [nombre, especialidad]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;