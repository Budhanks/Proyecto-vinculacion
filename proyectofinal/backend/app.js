require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // 👈 Importa 'path' para manejar rutas de archivos
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // 👈 Ruta absoluta para seguridad

// Rutas API
app.use('/auth', require('./routes/auth'));
app.use('/docentes', require('./routes/docentes'));
app.use('/registros', require('./routes/registros'));

// 👇 Redirige la ruta raíz a login.html (opcional pero recomendado)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 👇 Manejo de errores para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html')); // Crea este archivo
});

// 👇 Middleware para errores internos (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});