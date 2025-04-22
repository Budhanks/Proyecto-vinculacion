const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const excel = require('excel4node');

router.get('/exportar-excel', async (req, res) => {
  try {
    const [docentes] = await pool.query('SELECT * FROM docentes');

    const workbook = new excel.Workbook({
      password: process.env.EXCEL_PASSWORD || '1234'
    });

    const worksheet = workbook.addWorksheet('Docentes');
    
    worksheet.cell(1, 1).string('Nombre');
    worksheet.cell(1, 2).string('Categoría');
    worksheet.cell(1, 3).string('Antigüedad');
    worksheet.cell(1, 4).string('Grado Académico');

    docentes.forEach((docente, index) => {
      const row = index + 2;
      worksheet.cell(row, 1).string(docente.nombre || '');
      worksheet.cell(row, 2).string(docente.categoria || '');
      worksheet.cell(row, 3).number(docente.antiguedad || 0);
      worksheet.cell(row, 4).string(docente.grado_academico || '');
    });

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=docentes.xlsx'
    );
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    
    workbook.write('docentes.xlsx', res);

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error al exportar' });
  }
});

module.exports = router;