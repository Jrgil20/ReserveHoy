const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const Correo = urlParams.get('cliente');
// obtenemos el valor de la url

generaPerfilcliente(Correo);

async function generaPerfilcliente(Correo){
    try {
        const response = await fetch('/buscarCliente/' + Correo);

        const data = await response.json();

        document.getElementById('nombreCliente').textContent = data.NombreApellido;
        
        document.getElementById('correoCliente').textContent = data.correo;

        document.getElementById('telefonoCliente').textContent = data.telefono;
      } catch (error) {
        console.error('Error:', error);
      }
}

// Guardar correo del cliente en sessionStorage
sessionStorage.setItem('correoCliente', Correo);