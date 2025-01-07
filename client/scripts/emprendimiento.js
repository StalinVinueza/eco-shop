const API_URL = 'http://localhost:3000/emprendimiento'; // La URL de tu API para emprendimientos

// Cargar emprendimientos al inicio
document.addEventListener('DOMContentLoaded', () => {
  loadEmprendimientos();
});

// Función para cargar los emprendimientos en formato card
function loadEmprendimientos() {
  fetch(API_URL)
    .then(response => response.json())
    .then(emprendimientos => {
      const container = document.getElementById('emprendimientosCards');
      container.innerHTML = '';
      emprendimientos.forEach(emprendimiento => {
        const card = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${emprendimiento.ruta_logo}" class="card-img-top" alt="Logo de ${emprendimiento.nombre_emprendimento}">
              <div class="card-body">
                <h5 class="card-title">${emprendimiento.nombre_emprendimento}</h5>
                <p class="card-text"><strong>Categoría:</strong> ${emprendimiento.tipo_emprendimiento}</p>
                <p class="card-text"><strong>Teléfono:</strong> ${emprendimiento.telefono_emprendimiento}</p>
                <p class="card-text"><strong>Correo:</strong> ${emprendimiento.correo_emprendimiento}</p>
                <a href="detalle_emprendimiento.html?id=${emprendimiento.id_emprendimiento}" class="btn btn-primary">Ver más</a>
              </div>
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

// Limpiar formulario
function resetForm() {
  document.getElementById('emprendimientoForm').reset();
  document.getElementById('emprendimientoId').value = '';
}
