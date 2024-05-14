let idDeLaReserva = '123'; // este id debe ser el id de la reserva que quieres buscar

fetch('/buscarReserva/' + idDeLaReserva)
.then(response => response.json())
.then(data => {
  console.log(data); // Aquí puedes usar los datos en tu código JavaScript
})
.catch((error) => {
  console.error('Error:', error);
});