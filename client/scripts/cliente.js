const API_URL = 'http://localhost:3000/cliente'

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
            <td>${cliente.email_cliente}</td>
            <td>${cliente.telefono_cliente}</td>
            <td>
              <button onclick="editCliente(${cliente.id_cliente})">Editar</button>
              <button onclick="deleteCliente(${cliente.id_cliente})">Eliminar</button>
            </td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch(error => console.error('Error al cargar clientes:', error));
}

// Mostrar formulario para crear/editar
function showCreateForm() {
  document.getElementById('form-container').style.display = 'block';
  document.getElementById('clienteForm').onsubmit = saveCliente;
}

// Guardar cliente (crear o actualizar)
function saveCliente(event) {
  event.preventDefault();
  const id = document.getElementById('clienteId').value;
  const data = {
    nombre_cliente: document.getElementById('nombre').value,
    apellido_cliente: document.getElementById('apellido').value,
    email_cliente: document.getElementById('email').value,
    telefono_cliente: document.getElementById('telefono').value,
  };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(() => {
      alert('Cliente guardado correctamente');
      document.getElementById('form-container').style.display = 'none';
      loadClientes();
    })
    .catch(error => console.error('Error al guardar cliente:', error));
}

// Editar cliente
function editCliente(id) {
  fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(cliente => {
      document.getElementById('clienteId').value = cliente.id_cliente;
      document.getElementById('nombre').value = cliente.nombre_cliente;
      document.getElementById('apellido').value = cliente.apellido_cliente;
      document.getElementById('email').value = cliente.email_cliente;
      document.getElementById('telefono').value = cliente.telefono_cliente;
      showCreateForm();
    })
    .catch(error => console.error('Error al cargar cliente:', error));
}

// Eliminar cliente
function deleteCliente(id) {
  if (confirm('¿Estás seguro de eliminar este cliente?')) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        alert('Cliente eliminado');
        loadClientes();
      })
      .catch(error => console.error('Error al eliminar cliente:', error));
  }
}
