
const Restaurante = document.getElementById('RestauranteDondeReserva').textContent;

// Get the current date and time
let now = new Date();

// Format the date and time in the 'YYYY-MM-DDThh:mm' format
let dateTime = now.toISOString().substring(0, 16);

// Set the min attribute of the FechayhoradelaReserva input field to the current date and time
document.getElementById('FechayhoradelaReserva').min = dateTime;

const datetimeInput = document.getElementById('FechayhoradelaReserva');
const errorElement = document.getElementById('error');

// Get the input field
const FechayhoradelaReserva = document.getElementById('FechayhoradelaReserva');


HorariosDe(correoRes);

function HorariosDe(correoRes){
    // Make a request to the server to get the restaurant's opening hours
    fetch('/traeHorarios/' + correoRes)
    .then(response => response.json())
    .then(data => {
    // Split the horLunVier and horFinDe strings into minTime and maxTime
    const [minTimeWeek, maxTimeWeek] = data.horLunVier.split(' - ');
    const [minTimeWeekend, maxTimeWeekend] = data.horFinDe.split(' - ');
  
   

  })
  .catch(error => console.error('Error:', error));
  }