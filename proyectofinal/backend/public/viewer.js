document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const logoutBtn = document.getElementById('logoutBtn');
    const registrosTable = document.getElementById('registrosTable').getElementsByTagName('tbody')[0];
  
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    // Cargar registros
    const loadRegistros = async () => {
      try {
        const response = await fetch('/registros', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status === 401) {
          logout();
          return;
        }
  
        const registros = await response.json();
        renderRegistros(registros);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Renderizar tabla
    const renderRegistros = (registros) => {
      registrosTable.innerHTML = '';
      registros.forEach(registro => {
        const row = registrosTable.insertRow();
        row.innerHTML = `
          <td>${registro.id}</td>
          <td>${registro.nombre}</td>
          <td>${registro.especialidad}</td>
        `;
      });
    };
  
    // Cerrar sesión
    const logout = () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    };
  
    logoutBtn.addEventListener('click', logout);
    loadRegistros();
  });