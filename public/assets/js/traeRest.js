console.log("Entro traeRes");
async function traeRestaurantes(){
    try {
        const response = await fetch('/traeRestaurantes/');
        //hacemos una peticion a la ruta /traeRestaurantes
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
        console.log(data);
        for(let i=0;i<data.length;i++){
            console.log(data[i].nombre);
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

traeRestaurantes();