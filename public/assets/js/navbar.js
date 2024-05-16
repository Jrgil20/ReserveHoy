// Obtener correo del restaurante de sessionStorage
var correoRestaurante = sessionStorage.getItem('correoRestaurante');

if (correoRestaurante) {
  document.getElementById('login-button-nav').href = 'perfil.html?restaurante=' + correoRestaurante;
} else {
  document.getElementById('login-button-nav').href = 'login.html';
}