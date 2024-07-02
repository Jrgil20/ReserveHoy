// Obtener correo del restaurante de sessionStorage
var correoRestaurante = sessionStorage.getItem('correoRestaurante');

if (correoRestaurante) {
  document.getElementById('login-button-nav').href = './view/perfil.html?restaurante=' + correoRestaurante;
  document.getElementById('ConsultaLink').href = './view/historialReservas.html?restaurante=' + correoRestaurante;
} else {
  document.getElementById('login-button-nav').href = './view/login.html';
  document.getElementById('ConsultaLink').href = './view/ConsultarReserva.html';
}
