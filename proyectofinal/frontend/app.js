document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.querySelector('#docentesTable tbody');
    const btnExport = document.getElementById('btnExport');
  
    const cargarDocentes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/docentes');
        const docentes = await response.json();
        
        tbody.innerHTML = docentes.map(docente => `
          <tr>
            <td>${docente.nombre}</td>
            <td>${docente.categoria}</td>
            <td>${docente.antiguedad} años</td>
            <td>${docente.grado_academico}</td>
            <td>${docente.email}</td>
          </tr>
        `).join('');
      } catch (err) {
        console.error('Error al cargar docentes:', err);
      }
    };
  
    btnExport.addEventListener('click', () => {
      window.open('http://localhost:4000/api/docentes/exportar-excel');
    });
  
    cargarDocentes();
  });