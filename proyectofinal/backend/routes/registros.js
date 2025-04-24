const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const authenticate = require('../middleware/auth');

// Solo requiere autenticación (cualquier rol)
router.use(authenticate());

router.get('/', async (req, res) => {
  try {
    const [docentes] = await pool.query('SELECT * FROM docentes');
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;