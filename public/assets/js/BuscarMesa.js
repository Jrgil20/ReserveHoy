document.getElementById('BuscaMesa').addEventListener('submit', function(event) {
    event.preventDefault();
    let valor = sessionStorage.getItem('correoRestaurante');
    window.location.href = "mesas.html?restaurante=" + valor;
  });