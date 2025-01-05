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
            <td>${cliente.ci_cliente}</td>
            <td>${cliente.genero_cliente}</td>
            <td>${cliente.edad_cliente}</td>
            <td>${cliente.direccion_cliente}</td>
            <td>${cliente.telefono_cliente}</td>
            <td>${cliente.correo_cliente}</td>
            <td>
              
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
  event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

  const id = document.getElementById('clienteId').value; // Obtener el ID del cliente
  const isUpdate = id && id !== ''; // Verificar si estamos actualizando (si id está presente)

  const data = {
    nombre_cliente: document.getElementById('nombre').value,
    apellido_cliente: document.getElementById('apellido').value,
    ci_cliente: document.getElementById('ci').value,
    genero_cliente: document.getElementById('genero').value,
    edad_cliente: parseInt(document.getElementById('edad').value, 10),  // Asegúrate de convertir a número
    direccion_cliente: document.getElementById('direccion').value,
    telefono_cliente: document.getElementById('telefono').value,
    correo_cliente: document.getElementById('correo').value,
  };

  const url = isUpdate ? `${API_URL}/${id}` : API_URL; // Si estamos actualizando, añadimos el ID a la URL

  fetch(url, {
    method: isUpdate ? 'PUT' : 'POST', // Si es actualización, usamos PUT; si es creación, usamos POST
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
    loadCliente();  // Recargar la lista de clientes
  })
  .catch(error => {
    console.error('Error al guardar cliente:', error);
  });
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
