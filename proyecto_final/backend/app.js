const express = require('express');
const cors = require('cors');
const docentesRoutes = require('./routes/docentes');
const app = express();

app.use(cors());
app.use(express.json());

// Ruta base
app.use('/api/docentes', docentesRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});