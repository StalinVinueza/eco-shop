const API_URL = 'http://localhost:3000/cliente';

// Cargar clientes al inicio
document.addEventListener('DOMContentLoaded', () => {
  loadCliente();
});

// Función para cargar clientes
function loadCliente() {
  fetch(API_URL)
    .then(response => response.json())
    .then(clientes => {
      const tbody = document.getElementById('clientesTableBody');
      tbody.innerHTML = '';
      clientes.forEach(cliente => {
        const row = `
          <tr>
            <td>${cliente.id_cliente}</td>
            <td>${cliente.nombre_cliente}</td>
            <td>${cliente.apellido_cliente}</td>
            <td>${cliente.ci_cliente}</td>
            <td>${cliente.genero_cliente}</td>
            <td>${cliente.edad_cliente}</td>
            <td>${cliente.direccion_cliente}</td>
            <td>${cliente.telefono_cliente}</td>
            <td>${cliente.correo_cliente}</td>
              <td>
        <button class="btn btn-success btn-sm" onclick="showEditForm(${cliente.id_cliente})">
          <i class="far  fa-edit"></i> Editar
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteCliente(${cliente.id_cliente})">
          <i class="far  fa-trash-alt"></i> Eliminar
        </button>
      </td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch(error => console.error('Error al cargar clientes:', error));
}

// Mostrar formulario para crear
function showCreateForm() {
  document.getElementById('form-container').style.display = 'block';
  document.getElementById('clienteId').value = ''; // Limpiar ID para crear
  document.getElementById('clienteForm').onsubmit = saveCliente;
  resetForm();
}

// Mostrar formulario para editar
function showEditForm(id) {
  fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(cliente => {
      document.getElementById('form-container').style.display = 'block';
      document.getElementById('clienteId').value = cliente.id_cliente;
      document.getElementById('nombre').value = cliente.nombre_cliente;
      document.getElementById('apellido').value = cliente.apellido_cliente;
      document.getElementById('ci').value = cliente.ci_cliente;
      document.getElementById('genero').value = cliente.genero_cliente;
      document.getElementById('edad').value = cliente.edad_cliente;
      document.getElementById('direccion').value = cliente.direccion_cliente;
      document.getElementById('telefono').value = cliente.telefono_cliente;
      document.getElementById('correo').value = cliente.correo_cliente;

      document.getElementById('clienteForm').onsubmit = saveCliente; // Asignar función de guardar
    })
    .catch(error => console.error('Error al cargar cliente:', error));
}

// Guardar cliente (crear o actualizar)
function saveCliente(event) {
  event.preventDefault();

  const id = document.getElementById('clienteId').value;
  const isUpdate = id && id !== '';

  const data = {
    nombre_cliente: document.getElementById('nombre').value,
    apellido_cliente: document.getElementById('apellido').value,
    ci_cliente: document.getElementById('ci').value,
    genero_cliente: document.getElementById('genero').value,
    edad_cliente: parseInt(document.getElementById('edad').value, 10),
    direccion_cliente: document.getElementById('direccion').value,
    telefono_cliente: document.getElementById('telefono').value,
    correo_cliente: document.getElementById('correo').value,
  };

  const url = isUpdate ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar cliente');
      }
      return response.json();
    })
    .then(() => {
      alert(isUpdate ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente');
      loadCliente();
      resetForm(); // Limpiar el formulario
      document.getElementById('form-container').style.display = 'none';
    })
    .catch(error => console.error('Error al guardar cliente:', error));
}

// Eliminar cliente
function deleteCliente(id) {
  if (confirm('¿Estás seguro de eliminar este cliente?')) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        alert('Cliente eliminado');
        loadCliente();
      })
      .catch(error => console.error('Error al eliminar cliente:', error));
  }
}

// Limpiar formulario
function resetForm() {
  document.getElementById('clienteForm').reset();
  document.getElementById('clienteId').value = '';
}
