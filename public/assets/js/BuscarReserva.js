document.getElementById('BuscaReserva').addEventListener('submit', function(event) {
    event.preventDefault();
    let valor = document.getElementById('IdABuscar').value;
    window.location.href = "/view/reserva.html?reserva=" + valor;
  });