document.getElementById('BuscaMesa').addEventListener('submit', function(event) {
    event.preventDefault();
    let valor = document.getElementById('correoRes').value;
    window.location.href = "mesas.html?restaurante=" + valor;
  });