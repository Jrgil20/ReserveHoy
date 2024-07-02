const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const correoRes = urlParams.get('cliente');
// obtenemos el valor de la url


generaPerfilcliente(correo);

async function generaPerfilcliente(correo){
    try {
        const response = await fetch('/buscarCliente/' + correo);

        const data = await response.json();

        document.getElementById('nombreCliente').textContent = data.NombreApellido;
        document.getElementById('correoCliente').textContent = data.correo;
        document.getElementById('telefonoCliente').textContent = data.telefono;
      } catch (error) {
        console.error('Error:', error);
      }
}

// Guardar correo del cliente en sessionStorage
sessionStorage.setItem('correoCliente', correo);