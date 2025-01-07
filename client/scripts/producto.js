const API_URL = 'http://localhost:3000/producto';

// Cargar productos al inicio
document.addEventListener('DOMContentLoaded', () => {
  loadProducto();
});

// Función para cargar productos
function loadProducto() {
  fetch(API_URL)
    .then(response => response.json())
    .then(productos => {
      const tbody = document.getElementById('productosTableBody');
      tbody.innerHTML = '';
      productos.forEach(producto => {
        const row = `
          <tr>
            <td>${producto.id_producto}</td>
            <td>${producto.nombre_producto}</td>
            <td>${producto.costo_producto}</td>
            <td>${producto.stock}</td>
            <td><img src="${producto.ruta_imagen}" alt="${producto.nombre_producto}" width="50"></td>
        <td>
  <button class="btn btn-primary btn-sm" onclick="showEditForm(${producto.id_producto})">
    <i class="far  fa-edit"></i> Editar
  </button>
  <button class="btn btn-danger btn-sm" onclick="deleteProducto(${producto.id_producto})">
    <i class="far  fa-trash-alt"></i> Eliminar
  </button>
</td>

          </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch(error => console.error('Error al cargar productos:', error));
}

// Mostrar formulario para crear
function showCreateForm() {
  document.getElementById('form-container').style.display = 'block';
  document.getElementById('productoId').value = ''; // Limpiar ID para crear
  document.getElementById('productoForm').onsubmit = saveProducto;
  resetForm();
}

// Mostrar formulario para editar
function showEditForm(id) {
  fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(producto => {
      document.getElementById('form-container').style.display = 'block';
      document.getElementById('productoId').value = producto.id_producto;
      document.getElementById('nombre').value = producto.nombre_producto;
      document.getElementById('costo').value = producto.costo_producto;
      document.getElementById('stock').value = producto.stock;
      document.getElementById('imagen').value = producto.ruta_imagen;

      document.getElementById('productoForm').onsubmit = saveProducto; // Asignar función de guardar
    })
    .catch(error => console.error('Error al cargar producto:', error));
}

// Guardar producto (crear o actualizar)
function saveProducto(event) {
  event.preventDefault();

  const id = document.getElementById('productoId').value;
  const isUpdate = id && id !== '';

  const data = {
    nombre_producto: document.getElementById('nombre').value,
    costo_producto: parseFloat(document.getElementById('costo').value),
    stock: parseInt(document.getElementById('stock').value, 10),
    ruta_imagen: document.getElementById('imagen').value,
  };

  const url = isUpdate ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar producto');
      }
      return response.json();
    })
    .then(() => {
      alert(isUpdate ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
      loadProducto();
      resetForm(); // Limpiar el formulario
      document.getElementById('form-container').style.display = 'none';
    })
    .catch(error => console.error('Error al guardar producto:', error));
}

// Eliminar producto
function deleteProducto(id) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        alert('Producto eliminado');
        loadProducto();
      })
      .catch(error => console.error('Error al eliminar producto:', error));
  }
}

// Limpiar formulario
function resetForm() {
  document.getElementById('productoForm').reset();
  document.getElementById('productoId').value = '';
}
