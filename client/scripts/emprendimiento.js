const API_URL = 'http://localhost:3000/emprendimiento'; // La URL de tu API para emprendimientos

// Cargar emprendimientos al inicio
document.addEventListener('DOMContentLoaded', () => {
  loadEmprendimientos();
});

// Función para cargar los emprendimientos
function loadEmprendimientos() {
  fetch(API_URL)
    .then(response => response.json())
    .then(emprendimientos => {
      const tbody = document.getElementById('emprendimientosTableBody');
      tbody.innerHTML = '';
      emprendimientos.forEach(emprendimiento => {
        const row = `
          <tr>
            <td>${emprendimiento.id_emprendimiento}</td>
            <td>${emprendimiento.nombre_emprendimento}</td>
            <td>${emprendimiento.tipo_emprendimiento}</td>
            <td>${emprendimiento.telefono_emprendimiento}</td>
            <td>${emprendimiento.direccion_emprendimiento}</td>
            <td>${emprendimiento.correo_emprendimiento}</td>
            <td>${emprendimiento.propietario_emprendimiento}</td>
            <td>${emprendimiento.ciudad}</td>
            <td><img src="${emprendimiento.ruta_logo}" alt="Logo" width="50" height="50"></td>
           <td>
  <button class="btn btn-primary btn-sm" onclick="showEditForm(${emprendimiento.id_emprendimiento})">
    <i class="far  fa-edit"></i> Editar
  </button>
  <button class="btn btn-danger btn-sm" onclick="deleteEmprendimiento(${emprendimiento.id_emprendimiento})">
    <i class="far  fa-trash-alt"></i> Eliminar
  </button>
</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch(error => console.error('Error al cargar emprendimientos:', error));
}

// Mostrar formulario para crear
function showCreateForm() {
  document.getElementById('form-container').style.display = 'block';
  document.getElementById('emprendimientoId').value = ''; // Limpiar ID para crear
  document.getElementById('emprendimientoForm').onsubmit = saveEmprendimiento;
  resetForm();
}

// Mostrar formulario para editar
function showEditForm(id) {
  fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(emprendimiento => {
      document.getElementById('form-container').style.display = 'block';
      document.getElementById('emprendimientoId').value = emprendimiento.id_emprendimiento;
      document.getElementById('nombre_emprendimento').value = emprendimiento.nombre_emprendimento;
      document.getElementById('tipo_emprendimiento').value = emprendimiento.tipo_emprendimiento;
      document.getElementById('telefono_emprendimiento').value = emprendimiento.telefono_emprendimiento;
      document.getElementById('direccion_emprendimiento').value = emprendimiento.direccion_emprendimiento;
      document.getElementById('correo_emprendimiento').value = emprendimiento.correo_emprendimiento;
      document.getElementById('propietario_emprendimiento').value = emprendimiento.propietario_emprendimiento;
      document.getElementById('ciudad').value = emprendimiento.ciudad;
      document.getElementById('ruta_logo').value = emprendimiento.ruta_logo;

      document.getElementById('emprendimientoForm').onsubmit = saveEmprendimiento; // Asignar función de guardar
    })
    .catch(error => console.error('Error al cargar emprendimiento:', error));
}

// Guardar emprendimiento (crear o actualizar)
function saveEmprendimiento(event) {
  event.preventDefault();

  const id = document.getElementById('emprendimientoId').value;
  const isUpdate = id && id !== '';

  const data = {
    nombre_emprendimento: document.getElementById('nombre_emprendimento').value,
    tipo_emprendimiento: document.getElementById('tipo_emprendimiento').value,
    telefono_emprendimiento: document.getElementById('telefono_emprendimiento').value,
    direccion_emprendimiento: document.getElementById('direccion_emprendimiento').value,
    correo_emprendimiento: document.getElementById('correo_emprendimiento').value,
    propietario_emprendimiento: document.getElementById('propietario_emprendimiento').value,
    ciudad: document.getElementById('ciudad').value,
    ruta_logo: document.getElementById('ruta_logo').value,
  };

  const url = isUpdate ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar emprendimiento');
      }
      return response.json();
    })
    .then(() => {
      alert(isUpdate ? 'Emprendimiento actualizado correctamente' : 'Emprendimiento creado correctamente');
      loadEmprendimientos();
      resetForm(); // Limpiar el formulario
      document.getElementById('form-container').style.display = 'none';
    })
    .catch(error => console.error('Error al guardar emprendimiento:', error));
}

// Eliminar emprendimiento
function deleteEmprendimiento(id) {
  if (confirm('¿Estás seguro de eliminar este emprendimiento?')) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        alert('Emprendimiento eliminado');
        loadEmprendimientos();
      })
      .catch(error => console.error('Error al eliminar emprendimiento:', error));
  }
}

// Limpiar formulario
function resetForm() {
  document.getElementById('emprendimientoForm').reset();
  document.getElementById('emprendimientoId').value = '';
}
