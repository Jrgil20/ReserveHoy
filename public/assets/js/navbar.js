// Obtener correo del restaurante de sessionStorage
var correoRestaurante = sessionStorage.getItem('correoRestaurante');

if (correoRestaurante) {
  document.getElementById('login-button-nav').href = 'perfil.html?restaurante=' + correoRestaurante;
  document.getElementById('ConsultaLink').href = 'historialReservas.html?restaurante=' + correoRestaurante;
} else {
  document.getElementById('login-button-nav').href = 'login.html';
  document.getElementById('ConsultaLink').href = 'ConsultarReserva.html';
}


 