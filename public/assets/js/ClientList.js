async function traeClientes(){
    try {
        const response = await fetch('/traerClientes/');
        //hacemos una peticion a la ruta /traerClientes
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
        const numClientes = data.length;
      } catch (error) {
        console.error('Error:', error);
      }
}

traeClientes();