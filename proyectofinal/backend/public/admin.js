document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const logoutBtn = document.getElementById('logoutBtn');
    const docentesTable = document.getElementById('docentesTable').getElementsByTagName('tbody')[0];
  
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    // Cargar datos de docentes
    const loadDocentes = async () => {
      try {
        const response = await fetch('/docentes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status === 401) {
          logout();
          return;
        }
  
        const docentes = await response.json();
        renderDocentes(docentes);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Renderizar tabla
    const renderDocentes = (docentes) => {
      docentesTable.innerHTML = '';
      docentes.forEach(docente => {
        const row = docentesTable.insertRow();
        row.innerHTML = `
          <td>${docente.id}</td>
          <td>${docente.nombre}</td>
          <td>${docente.especialidad}</td>
          <td>
            <button onclick="deleteDocente(${docente.id})">Eliminar</button>
          </td>
        `;
      });
    };
  
    // Cerrar sesión
    const logout = () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    };
  
    // Eliminar docente
    window.deleteDocente = async (id) => {
      if (!confirm('¿Estás seguro de eliminar este docente?')) return;
      
      try {
        const response = await fetch(`/docentes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          loadDocentes();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    logoutBtn.addEventListener('click', logout);
    loadDocentes();
  });