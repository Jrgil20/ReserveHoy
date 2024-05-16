
async function traePlatos(){
    try {
        const response = await fetch('/consultarPlatos/',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ restaurante: correoRestau}),
        });
        //hacemos una peticion a la ruta /traeRestaurantes
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
        console.log(data);
        for(let i=0;i<data.length;i++){
            console.log(data[i].nombrePlato);
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

traePlatos();