// Obtener correo del restaurante de sessionStorage
var correoRestaurante = sessionStorage.getItem('correoRestaurante');
var correoCliente = sessionStorage.getItem('correoCliente');

if (correoRestaurante) {
  document.getElementById('login-button-nav').href = './view/perfil.html?restaurante=' + correoRestaurante;
  document.getElementById('ConsultaLink').href = './view/historialReservas.html?restaurante=' + correoRestaurante;
  console.log(correoRestaurante);
} else 
  if(correoCliente){
    document.getElementById('login-button-nav').href = './view/perfilCliente.html?cliente=' + correoCliente;
    document.getElementById('ConsultaLink').href = './view/historialReservas.html?cliente=' + correoCliente;
    console.log(correoCliente);
  } else{
    document.getElementById('login-button-nav').href = './view/login.html';
    document.getElementById('ConsultaLink').href = './view/ConsultarReserva.html';
  }