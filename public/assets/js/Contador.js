// Función asincrónica para actualizar contadores
async function actualizarContadores() {
  fetch('/contadores')
  .then(response => response.json())
  .then(data => {
      document.getElementById('nRestaurantes').textContent = data.nRestaurantes;
      document.getElementById('nClientes').textContent = data.nClientes;
      document.getElementById('nReservas').textContent = data.nReservas;
  })
  .catch(error => console.error('Error al cargar los contadores:', error));
}

// Llamar a la función al cargar el script
document.addEventListener('DOMContentLoaded', actualizarContadores);