require('dotenv').config();
const express = require('express');
const cors = require('cors');
const docentesRoutes = require('./routes/docentes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/docentes', docentesRoutes);

const PORT = process.env.PORT || 3024;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});