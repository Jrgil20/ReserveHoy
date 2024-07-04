// Función asincrónica para actualizar contadores
async function actualizarContadores() {
  const response = await fetch('/traerClientes');

  if(response.status === 404){
    document.getElementById('nClientes').textContent = 0;
  }else{
    const dataClientes = await response.json();

    document.getElementById('nClientes').textContent = dataClientes.length;
  }

  const responseRestaurantes = await fetch('/traeRestaurantes');

  if(responseRestaurantes.status === 404){
    document.getElementById('nRestaurantes').textContent = 0;
  }else{
    const dataRestaurantes = await responseRestaurantes.json();

    document.getElementById('nRestaurantes').textContent = dataRestaurantes.length;
  }

  const responseReservas = await fetch('/traerReservas');

  if(responseReservas.status === 404){
    document.getElementById('nReservas').textContent = 0;
  }else{
    const dataReservas=  await responseReservas.json();

    document.getElementById('nReservas').textContent = dataReservas.length;
  }
}

// Llamar a la función al cargar el script
document.addEventListener('DOMContentLoaded', actualizarContadores);