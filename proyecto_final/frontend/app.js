document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3001/api/docentes');
    const docentes = await response.json();
    const contenedor = document.getElementById('docentes');
    
    docentes.forEach(docente => {
      contenedor.innerHTML += `<p>${docente.nombre} - ${docente.categoria}</p>`;
    });
  });