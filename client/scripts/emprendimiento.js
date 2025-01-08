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
      const container = document.getElementById('emprendimientosContainer');
      container.innerHTML = ''; // Limpiar el contenedor
      emprendimientos.forEach(emprendimiento => {
        const card = `
          <div class="card" style="width: 18rem; margin: 10px;">
            <img src="${emprendimiento.ruta_logo}" class="card-img-top" alt="Logo" width="50" height="50">
            <div class="card-body">
              <h5 class="card-title">${emprendimiento.nombre_emprendimento}</h5>
              <p class="card-text"><strong>Tipo:</strong> ${emprendimiento.tipo_emprendimiento}</p>
              <p class="card-text"><strong>Teléfono:</strong> ${emprendimiento.telefono_emprendimiento}</p>
              <p class="card-text"><strong>Correo:</strong> ${emprendimiento.correo_emprendimiento}</p>
              <p class="card-text"><strong>Propietario:</strong> ${emprendimiento.propietario_emprendimiento}</p>
              <p class="card-text"><strong>Ciudad:</strong> ${emprendimiento.ciudad}</p>
              <button class="btn btn-success" onclick="showEditForm(${emprendimiento.id_emprendimiento})">
                <i class="far fa-edit"></i> Editar
              </button>
              <button class="btn btn-danger" onclick="deleteEmprendimiento(${emprendimiento.id_emprendimiento})">
                <i class="far fa-trash-alt"></i> Eliminar
              </button>
            </div>
          </div>
        `;
        container.innerHTML += card;
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
